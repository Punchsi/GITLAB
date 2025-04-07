"use client";

import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { steps } from "@/layout/ProgressBar/ProgressBar";
import ProgressBar from "@/layout/ProgressBar/ProgressBar";
import { AlertTriangle, Upload, Trash2 } from "lucide-react";
import Link from "next/link";
import uploadFile from "@/hooks/api/uploadFile";
import getRequestID from "@/hooks/api/getRequestID";
import getDocumentgroup from "@/hooks/api/getDocumentgroup";
import { log } from "console";

interface RequestAttachPageProps {
  id: string;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  requestid: string;
}
const deviceTypes = [
  "Disconnecting Switch",
  "Remote Control Switch (RCS)",
  "Surge Arrester",
  "Insulator",
  "Drop-out Fuse cutout",
];
const FileUpload: React.FC<{
  onUpload: (files: File[]) => void;
  accept: Record<string, string[]>;
  maxSize: number;
  uploadedFile: File | null;
  onDelete: () => void;
}> = ({ onUpload, accept, maxSize, uploadedFile, onDelete }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!uploadedFile) {
        onUpload(acceptedFiles);
      }
    },
    [onUpload, uploadedFile]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    maxSize,
    disabled: !!uploadedFile,
  });

  return (
    <div className="mt-2 border border-purple-300 p-4 rounded-lg bg-purple-50">
      {uploadedFile ? (
        <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow">
          <div className="flex items-center space-x-2">
            <Upload className="w-5 h-5 text-purple-700" />
            <div>
              <p className="text-sm font-medium text-gray-800">
                {uploadedFile.name}
              </p>
              <p className="text-xs text-gray-500">
                {Math.round(uploadedFile.size / 1024)} KB -{" "}
                {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
          <button
            onClick={onDelete}
            className="text-gray-500 hover:text-red-600"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className="mt-2 text-center border border-dashed border-gray-400 p-4 rounded-lg bg-white cursor-pointer"
        >
          <input {...getInputProps()} />
          <Upload className="w-6 h-6 text-gray-500 mx-auto mb-2" />
          <p className="text-sm text-gray-500 mb-2">
            <span className="text-purple-700">คลิกเพื่ออัปโหลดเอกสาร</span> หรือ
            ลากไฟล์เอกสารมาวางบริเวณนี้
          </p>
          <p className="text-xs text-gray-400">
            รองรับไฟล์: {Object.keys(accept).join(", ")} (สูงสุด{" "}
            {maxSize / 1024 / 1024} MB)
          </p>
        </div>
      )}
    </div>
  );
};

const RequestAttachPage: React.FC<RequestAttachPageProps> = ({
  id,
  setStep,
}) => {
  const [selectedMenu, setSelectedMenu] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: number]: File[] }>(
    {}
  );
  const [selectedDevice, setSelectedDevice] = useState("");
  const handleDeviceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDevice(event.target.value);
  };
  // State สำหรับเปิดปิด modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getIdFromUrl = () => {
    const pathname = window.location.pathname; // ดึง path จาก URL
    const segments = pathname.split("/"); // แยก path ด้วย '/'
    return segments[segments.length - 1]; // id จะเป็นส่วนสุดท้าย
  };

  const { sendRequest: sendFile } = uploadFile();

  const { data: documentgroup } = getDocumentgroup();

  const requestid = getIdFromUrl();
  const { data: requests } = getRequestID({ id: requestid });

  useEffect(() => {
    const uploaded: Record<string, { file: File; doc_type: number }[]> = {};
  
    documentgroup.forEach((group, groupIndex) => {
      group.document_types.forEach((docType, typeIndex) => {
        const key = `${groupIndex}-${typeIndex}`;
  
        uploaded[key] = docType.documents.map((doc) => {
          const mockFile = new File(
            ["dummy content"],
            doc.file_name,
            {
              type: doc.content_type,
              lastModified: doc.request_document?.request_id
                ? new Date().getTime()
                : 0,
            }
          );
  
          return {
            file: mockFile,
            doc_type: docType.id,
          };
        });
      });
    });
  
    setUploadedFiles((prev) => ({
      ...prev,
      ...uploaded,
    }));
  }, []);
  
  
    

    console.log("uploadedFiles", uploadedFiles)


  const handleUpload = (
    groupIndex: number,
    docIndex: number,
    files: File[]
  ) => {
    const doc_type = documentgroup[groupIndex].document_types[docIndex].id;

    const formData = new FormData();
    formData.append("file", files[0]); // ส่งไฟล์ไปยัง server

    const id = getIdFromUrl(); // รับ id จาก URL

    sendFile(Number(id), files[0], doc_type); // ส่งไฟล์ไปที่เซิร์ฟเวอร์ พร้อม doc_type ที่ถูกต้อง

    const newUploadedFiles = {
      ...uploadedFiles,
      [`${groupIndex}-${docIndex}`]: { file: files[0], doc_type },
    };

    setUploadedFiles(newUploadedFiles);
    localStorage.setItem("uploadedFiles", JSON.stringify(newUploadedFiles));
    // อัปเดต state และ localStorage
    setUploadedFiles((prev) => {
      const updatedFiles = {
        ...prev,
        [`${groupIndex}-${docIndex}`]: { file: files[0], doc_type },
      }; // ใช้การประกอบ key ที่ไม่ซ้ำกัน
      localStorage.setItem("uploadedFiles", JSON.stringify(updatedFiles));
      return updatedFiles;
    });
  };

  const handleDelete = (groupIndex: number, docIndex: number) => {
    setUploadedFiles((prev) => {
      const updatedFiles = { ...prev };
      delete updatedFiles[`${groupIndex}-${docIndex}`];

      localStorage.setItem("uploadedFiles", JSON.stringify(updatedFiles));
      return updatedFiles;
    });
  };

  const handleBack = () => {
    setStep(0);
  };

  const handleNext = () => {
    setStep(2);
  };

  // ฟังก์ชันสำหรับเปิด modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // ฟังก์ชันสำหรับปิด modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = async () => {
    const id = getIdFromUrl(); // ดึง ID จาก URL

    const formData = {
      requestId: id, // ID ของ request
      selectedDevice, // อุปกรณ์ที่เลือก
      uploadedFiles: Object.keys(uploadedFiles).map((key) => ({
        doc_type: uploadedFiles[key]?.doc_type,
        fileName: uploadedFiles[key]?.file?.name,
      })),
    };

    try {
      const response = await fetch("/api/saveRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("บันทึกสำเร็จ!");
      } else {
        alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    }
  };

  return (
    <div className="p-8">
      {/* Dropdown สำหรับเลือกประเภทอุปกรณ์ */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          เลือกประเภทอุปกรณ์:
        </label>
        <select
          value={selectedDevice}
          onChange={handleDeviceChange}
          className="w-full p-2 border rounded-lg"
        >
          <option value="">-- กรุณาเลือก --</option>
          {deviceTypes.map((device, index) => (
            <option key={index} value={device}>
              {device}
            </option>
          ))}
        </select>
      </div>

      {/* แสดงประเภทที่เลือก */}
      {selectedDevice && (
        <div className="mb-4 p-2 bg-purple-100 text-purple-700 rounded-lg">
          <p>
            ประเภทอุปกรณ์ที่เลือก: <strong>{selectedDevice}</strong>
          </p>
        </div>
      )}

      {/* Tab Menu and Buttons */}
      <div className="flex justify-between items-center mt-8">
        <div className="flex space-x-4">
          <button
            onClick={() => setSelectedMenu(1)}
            className={`px-4 py-2 rounded-lg ${
              selectedMenu === 1
                ? "bg-purple-700 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            แนบเอกสาร
          </button>
          <button
            onClick={() => setSelectedMenu(2)}
            className={`px-4 py-2 rounded-lg ${
              selectedMenu === 2
                ? "bg-purple-700 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            เอกสารเพิ่มเติม
          </button>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handleBack}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            ย้อนกลับ
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800"
          >
            บันทึก
          </button>

          {/* ปุ่ม "ส่งเอกสาร" เปิด modal */}
          <button
            onClick={handleOpenModal}
            // <button
            //   onClick={handleNext}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
          >
            ส่งเอกสาร
          </button>
        </div>
      </div>

      {/* Modal แสดงเมื่อ isModalOpen เป็น true */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96 h-64 max-w-lg">
            {/* เพิ่มไอคอน SVG ที่นี่ */}
            <div className="flex justify-center mb-4">
              <svg
                width="56"
                height="56"
                viewBox="0 0 56 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="4"
                  y="4"
                  width="48"
                  height="48"
                  rx="24"
                  fill="#E5C2FF"
                />
                <rect
                  x="4"
                  y="4"
                  width="48"
                  height="48"
                  rx="24"
                  stroke="#F7ECFF"
                  strokeWidth="8"
                />
                <path
                  d="M27.9998 24.0012V28.0012M27.9998 32.0012H28.0098M26.2898 18.8612L17.8198 33.0012C17.6451 33.3036 17.5527 33.6465 17.5518 33.9957C17.5508 34.3449 17.6413 34.6883 17.8142 34.9917C17.9871 35.2951 18.2365 35.5479 18.5375 35.725C18.8385 35.9021 19.1806 35.9973 19.5298 36.0012H36.4698C36.819 35.9973 37.1611 35.9021 37.4621 35.725C37.7631 35.5479 38.0124 35.2951 38.1854 34.9917C38.3583 34.6883 38.4488 34.3449 38.4478 33.9957C38.4468 33.6465 38.3544 33.3036 38.1798 33.0012L29.7098 18.8612C29.5315 18.5673 29.2805 18.3243 28.981 18.1557C28.6814 17.987 28.3435 17.8984 27.9998 17.8984C27.656 17.8984 27.3181 17.987 27.0186 18.1557C26.7191 18.3243 26.468 18.5673 26.2898 18.8612Z"
                  stroke="#7E2CBA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h2 className="text-xl font-bold mb-2">ยืนยันการส่งเอกสาร?</h2>
            <p className="text-sm text-gray-500 mb-8">
              หากยืนยันแล้ว จะไม่สามารถแก้ไขได้อีก
            </p>

            <div className="flex justify-center">
              <button
                className="px-4 py-2 bg-white text-black-700 border border-gray-300 rounded-lg mr-2"
                onClick={handleCloseModal}
              >
                ยกเลิก
              </button>
              <Link href="/submitdoc">
                <button className="px-4 py-2 bg-purple-700 text-white rounded-lg">
                  ยืนยัน
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="mt-8">
        {selectedMenu === 1 && (
          <>
            {documentgroup
              .filter((group, groupIndex) => groupIndex >= 0 && groupIndex <= 8)
              .map((group, groupIndex) => (
                <div
                  key={group.id}
                  className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">
                      {groupIndex + 1} . {group.name}
                    </h3>
                  </div>

                  {/* แสดง document_types ภายใน group */}
                  <div className="mt-4">
                    <ul className="space-y-2">
                      {group.document_types.map((doc, docIndex) => (
                        <li key={doc.id}>
                          {doc.name !== "" && (
                            <div className="font-semibold text-gray-800 ml-12">
                              {groupIndex + 1}.{docIndex + 1} . {doc.name}
                            </div>
                          )}

                          {/* อัปโหลดไฟล์ */}
                          <FileUpload
                            onUpload={(files) => {
                              handleUpload(groupIndex, docIndex, files);
                              console.log("files", files);
                            }}
                            onDelete={() => handleDelete(groupIndex, docIndex)}
                            accept={{
                              "image/svg+xml": [".svg"],
                              "image/png": [".png"],
                              "image/jpeg": [".jpg", ".jpeg"],
                              // "pdf": [".pdf"],
                            }}
                            maxSize={5 * 1024 * 1024}
                            uploadedFile={
                              uploadedFiles[`${groupIndex}-${docIndex}`]
                                ?.file ?? null
                            }
                          />

                          {/* แสดงไฟล์ที่อัปโหลด */}
                          {uploadedFiles[`${groupIndex}-${docIndex}`] &&
                            Array.isArray(
                              uploadedFiles[`${groupIndex}-${docIndex}`]
                            ) &&
                            uploadedFiles[`${groupIndex}-${docIndex}`].length >
                              0 && (
                              <div className="mt-4 text-left">
                                <h4 className="text-sm font-semibold">
                                  ไฟล์ที่อัปโหลด:
                                </h4>
                                <ul className="mt-2 space-y-1">
                                  {uploadedFiles[
                                    `${groupIndex}-${docIndex}`
                                  ].map((file, index) => (
                                    <li
                                      key={index}
                                      className="text-xs text-gray-600"
                                    >
                                      {file.name} (
                                      {(file.size / 1024).toFixed(2)} KB)
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
          </>
        )}

        {selectedMenu === 2 && (
          <div className="mt-8">
            {/* หัวข้อเอกสารเพิ่มเติม */}
            <div className="text-sm text-gray-800 bg-purple-100 border border-purple-200 p-4 rounded-md">
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  ดาวน์โหลดเอกสาร: กรุณาคลิกที่ปุ่ม "ดาวน์โหลดเอกสาร"
                  เพื่อดาวน์โหลดเอกสารที่ต้องลงนาม
                </li>
                <li>
                  ลงนามในเอกสารที่ต้องลงนาม:
                  พิมพ์เอกสารออกมาและลงนามในช่องที่กำหนดด้วยลายมือของท่าน
                </li>
                <li>
                  อัปโหลดเอกสารที่ลงนามแล้ว:
                  อัปโหลดไฟล์กลับเข้ามาในระบบโดยคลิกที่ปุ่ม "อัปโหลดเอกสาร"
                </li>
              </ol>
            </div>

            {documentgroup
              .filter(
                (group, groupIndex) => groupIndex >= 9 && groupIndex <= 11
              )
              .map((group, groupIndex) => (
                <div
                  key={group.id}
                  className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">
                      {groupIndex + 1} . {group.name}
                    </h3>
                    <AlertTriangle className="text-yellow-500" size={20} />
                  </div>

                  {/* แสดง document_types ภายใน group */}
                  <div className="mt-4">
                    <ul className="space-y-2">
                      {group.document_types.map((doc, docIndex) => (
                        <li key={doc.id}>
                          <div className="font-semibold text-gray-800 ml-12">
                            {doc.name}
                          </div>

                          {/* อัปโหลดไฟล์ */}
                          <FileUpload
                            onUpload={(files) =>
                              handleUpload(groupIndex, docIndex, files)
                            }
                            onDelete={() => handleDelete(groupIndex, docIndex)}
                            accept={{
                              "image/svg+xml": [".svg"],
                              "image/png": [".png"],
                              "image/jpeg": [".jpg", ".jpeg"],
                              "application/pdf": [".pdf"],
                            }}
                            maxSize={5 * 1024 * 1024}
                            uploadedFile={
                              uploadedFiles[`${groupIndex}-${docIndex}`]
                                ? {
                                    name: uploadedFiles[
                                      `${groupIndex}-${docIndex}`
                                    ].name,
                                    size: uploadedFiles[
                                      `${groupIndex}-${docIndex}`
                                    ].size,
                                    uploadDate:
                                      uploadedFiles[`${groupIndex}-${docIndex}`]
                                        .uploadDate,
                                  }
                                : null
                            }
                          />

                          {/* แสดงไฟล์ที่อัปโหลด */}
                          {uploadedFiles[`${groupIndex}-${docIndex}`]?.file && (
                            <div className="mt-4 text-left">
                              <h4 className="text-sm font-semibold">
                                ไฟล์ที่อัปโหลด:
                              </h4>
                              <ul className="mt-2 space-y-1">
                                {uploadedFiles[group.id].map((file, index) => (
                                  <li
                                    key={index}
                                    className="text-xs text-gray-600"
                                  >
                                    {file.name} ({(file.size / 1024).toFixed(2)}{" "}
                                    KB)
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>

  );
};

export default RequestAttachPage;
