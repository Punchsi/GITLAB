"use client";
import { useCallback, useEffect, useState } from "react";
import { AlertTriangle, Upload, Trash2 } from "lucide-react";
import { useDropzone } from "react-dropzone";

export default function Home() {
  const [uploadedFiles, setUploadedFiles] = useState<
    Record<string, Array<{ file: File; doc_type: number }> | null>
  >({});

  const documentgroup = [
    {
      id: 1,
      name: "สำเนาบัตรประจำตัวประชาชนของผู้มีอำนาจลงนามพร้อมรับรองสำเนาถูกต้อง",
      document_types: [
        {
          id: 1,
          name: "",
          documents: [
            {
              id: 7,
              file_name: "logo02.jpg",
              file_size: 67198,
              delete_flag: false,
              content_type: "image/jpeg",
              request_document: {
                id: 7,
                request_id: 2,
                result: null,
                suggestion_y_n: null,
                request_additional_document_y_n: null,
                suggestion: null,
                request_additional_document: null,
                annotation: null,
              },
            }
            
          ],
        },
      ],
    },
    {
      id: 2,
      name: "สำเนาใบอนุญาตประกอบกิจการโรงงานหรือสำเนาใบสำคัญแสดงการจดทะเบียนห้างหุ้นส่วนบริษัท",
      document_types: [
        {
          id: 2,
          name: "",
          documents: [
            {
              id: 19,
              file_name: "logo02.jpg",
              file_size: 67198,
              delete_flag: false,
              content_type: "image/jpeg",
              request_document: {
                id: 19,
                request_id: 2,
                result: null,
                suggestion_y_n: null,
                request_additional_document_y_n: null,
                suggestion: null,
                request_additional_document: null,
                annotation: null,
              },
            },
            {
              id: 27,
              file_name: "chart-figure-5.png",
              file_size: 28484,
              delete_flag: false,
              content_type: "image/png",
              request_document: {
                id: 27,
                request_id: 2,
                result: null,
                suggestion_y_n: null,
                request_additional_document_y_n: null,
                suggestion: null,
                request_additional_document: null,
                annotation: null,
              },
            },
            {
              id: 30,
              file_name: "chart-figure-5.png",
              file_size: 28484,
              delete_flag: false,
              content_type: "image/png",
              request_document: {
                id: 30,
                request_id: 2,
                result: null,
                suggestion_y_n: null,
                request_additional_document_y_n: null,
                suggestion: null,
                request_additional_document: null,
                annotation: null,
              },
            },
            {
              id: 33,
              file_name: "chart-figure-5.png",
              file_size: 28484,
              delete_flag: false,
              content_type: "image/png",
              request_document: {
                id: 33,
                request_id: 2,
                result: null,
                suggestion_y_n: null,
                request_additional_document_y_n: null,
                suggestion: null,
                request_additional_document: null,
                annotation: null,
              },
            },
            {
              id: 38,
              file_name: "chart-figure-5.png",
              file_size: 28484,
              delete_flag: false,
              content_type: "image/png",
              request_document: {
                id: 38,
                request_id: 2,
                result: null,
                suggestion_y_n: null,
                request_additional_document_y_n: null,
                suggestion: null,
                request_additional_document: null,
                annotation: null,
              },
            },
            {
              id: 42,
              file_name: "logo02.jpg",
              file_size: 67198,
              delete_flag: false,
              content_type: "image/jpeg",
              request_document: {
                id: 42,
                request_id: 2,
                result: null,
                suggestion_y_n: null,
                request_additional_document_y_n: null,
                suggestion: null,
                request_additional_document: null,
                annotation: null,
              },
            },
            {
              id: 45,
              file_name: "model2.pdf",
              file_size: 7124,
              delete_flag: false,
              content_type: "application/pdf",
              request_document: {
                id: 45,
                request_id: 2,
                result: null,
                suggestion_y_n: null,
                request_additional_document_y_n: null,
                suggestion: null,
                request_additional_document: null,
                annotation: null,
              },
            },
            {
              id: 49,
              file_name: "undergrad-sample-thai.pdf",
              file_size: 321279,
              delete_flag: false,
              content_type: "application/pdf",
              request_document: {
                id: 49,
                request_id: 2,
                result: null,
                suggestion_y_n: null,
                request_additional_document_y_n: null,
                suggestion: null,
                request_additional_document: null,
                annotation: null,
              },
            },
            {
              id: 54,
              file_name: "logo02.jpg",
              file_size: 67198,
              delete_flag: false,
              content_type: "image/jpeg",
              request_document: {
                id: 54,
                request_id: 2,
                result: null,
                suggestion_y_n: null,
                request_additional_document_y_n: null,
                suggestion: null,
                request_additional_document: null,
                annotation: null,
              },
            },
            {
              id: 56,
              file_name: "chart-figure-5.png",
              file_size: 28484,
              delete_flag: false,
              content_type: "image/png",
              request_document: {
                id: 56,
                request_id: 2,
                result: null,
                suggestion_y_n: null,
                request_additional_document_y_n: null,
                suggestion: null,
                request_additional_document: null,
                annotation: null,
              },
            },
            {
              id: 58,
              file_name: "logo02.jpg",
              file_size: 67198,
              delete_flag: false,
              content_type: "image/jpeg",
              request_document: {
                id: 58,
                request_id: 2,
                result: null,
                suggestion_y_n: null,
                request_additional_document_y_n: null,
                suggestion: null,
                request_additional_document: null,
                annotation: null,
              },
            },
            {
              id: 62,
              file_name: "logo02.jpg",
              file_size: 67198,
              delete_flag: false,
              content_type: "image/jpeg",
              request_document: {
                id: 62,
                request_id: 2,
                result: null,
                suggestion_y_n: null,
                request_additional_document_y_n: null,
                suggestion: null,
                request_additional_document: null,
                annotation: null,
              },
            },
            {
              id: 67,
              file_name: "logo02.jpg",
              file_size: 67198,
              delete_flag: false,
              content_type: "image/jpeg",
              request_document: {
                id: 67,
                request_id: 2,
                result: null,
                suggestion_y_n: null,
                request_additional_document_y_n: null,
                suggestion: null,
                request_additional_document: null,
                annotation: null,
              },
            },
            {
              id: 69,
              file_name: "logo02.jpg",
              file_size: 67198,
              delete_flag: false,
              content_type: "image/jpeg",
              request_document: {
                id: 69,
                request_id: 2,
                result: null,
                suggestion_y_n: null,
                request_additional_document_y_n: null,
                suggestion: null,
                request_additional_document: null,
                annotation: null,
              },
            },
            {
              id: 75,
              file_name: "logo02.jpg",
              file_size: 67198,
              delete_flag: false,
              content_type: "image/jpeg",
              request_document: {
                id: 75,
                request_id: 2,
                result: null,
                suggestion_y_n: null,
                request_additional_document_y_n: null,
                suggestion: null,
                request_additional_document: null,
                annotation: null,
              },
            },
            {
              id: 77,
              file_name: "logo02.jpg",
              file_size: 67198,
              delete_flag: false,
              content_type: "image/jpeg",
              request_document: {
                id: 77,
                request_id: 2,
                result: null,
                suggestion_y_n: null,
                request_additional_document_y_n: null,
                suggestion: null,
                request_additional_document: null,
                annotation: null,
              },
            },
            {
              id: 83,
              file_name: "logo02.jpg",
              file_size: 67198,
              delete_flag: false,
              content_type: "image/jpeg",
              request_document: {
                id: 83,
                request_id: 2,
                result: null,
                suggestion_y_n: null,
                request_additional_document_y_n: null,
                suggestion: null,
                request_additional_document: null,
                annotation: null,
              },
            },
          ],
        },
      ],
    },
    {
      id: 3,
      name: "สำเนาหนังสือรับรองนิติบุคคลของสำนักงานทะเบียนหุ้นส่วนบริษัทที่มีอายุไม่เกิน 6 เดือน",
      document_types: [
        {
          id: 3,
          name: "",
          documents: [
            {
              id: 34,
              file_name: "logo02.jpg",
              file_size: 67198,
              delete_flag: false,
              content_type: "image/jpeg",
              request_document: {
                id: 34,
                request_id: 2,
                result: null,
                suggestion_y_n: null,
                request_additional_document_y_n: null,
                suggestion: null,
                request_additional_document: null,
                annotation: null,
              },
            },
            {
              id: 37,
              file_name: "logo02.jpg",
              file_size: 67198,
              delete_flag: false,
              content_type: "image/jpeg",
              request_document: {
                id: 37,
                request_id: 2,
                result: null,
                suggestion_y_n: null,
                request_additional_document_y_n: null,
                suggestion: null,
                request_additional_document: null,
                annotation: null,
              },
            },
            {
              id: 43,
              file_name: "chart-figure-5.png",
              file_size: 28484,
              delete_flag: false,
              content_type: "image/png",
              request_document: {
                id: 43,
                request_id: 2,
                result: null,
                suggestion_y_n: null,
                request_additional_document_y_n: null,
                suggestion: null,
                request_additional_document: null,
                annotation: null,
              },
            },
            {
              id: 46,
              file_name: "undergrad-sample-thai.pdf",
              file_size: 321279,
              delete_flag: false,
              content_type: "application/pdf",
              request_document: {
                id: 46,
                request_id: 2,
                result: null,
                suggestion_y_n: null,
                request_additional_document_y_n: null,
                suggestion: null,
                request_additional_document: null,
                annotation: null,
              },
            },
            {
              id: 50,
              file_name: "model2.pdf",
              file_size: 7124,
              delete_flag: false,
              content_type: "application/pdf",
              request_document: {
                id: 50,
                request_id: 2,
                result: null,
                suggestion_y_n: null,
                request_additional_document_y_n: null,
                suggestion: null,
                request_additional_document: null,
                annotation: null,
              },
            },
            {
              id: 55,
              file_name: "logo02.jpg",
              file_size: 67198,
              delete_flag: false,
              content_type: "image/jpeg",
              request_document: {
                id: 55,
                request_id: 2,
                result: null,
                suggestion_y_n: null,
                request_additional_document_y_n: null,
                suggestion: null,
                request_additional_document: null,
                annotation: null,
              },
            },
            {
              id: 59,
              file_name: "chart-figure-5.png",
              file_size: 28484,
              delete_flag: false,
              content_type: "image/png",
              request_document: {
                id: 59,
                request_id: 2,
                result: null,
                suggestion_y_n: null,
                request_additional_document_y_n: null,
                suggestion: null,
                request_additional_document: null,
                annotation: null,
              },
            },
            {
              id: 60,
              file_name: "logo02.jpg",
              file_size: 67198,
              delete_flag: false,
              content_type: "image/jpeg",
              request_document: {
                id: 60,
                request_id: 2,
                result: null,
                suggestion_y_n: null,
                request_additional_document_y_n: null,
                suggestion: null,
                request_additional_document: null,
                annotation: null,
              },
            },
            {
              id: 68,
              file_name: "chart-figure-5.png",
              file_size: 28484,
              delete_flag: false,
              content_type: "image/png",
              request_document: {
                id: 68,
                request_id: 2,
                result: null,
                suggestion_y_n: null,
                request_additional_document_y_n: null,
                suggestion: null,
                request_additional_document: null,
                annotation: null,
              },
            },
          ],
        },
      ],
    },
    {
      id: 4,
      name: "รายละเอียดสถานที่และภาวะแวดล้อมของหน่วยทดสอบเครือข่าย",
      document_types: [
        {
          id: 4,
          name: "",
          documents: [
            {
              id: 39,
              file_name: "logo02.jpg",
              file_size: 67198,
              delete_flag: false,
              content_type: "image/jpeg",
              request_document: {
                id: 39,
                request_id: 2,
                result: null,
                suggestion_y_n: null,
                request_additional_document_y_n: null,
                suggestion: null,
                request_additional_document: null,
                annotation: null,
              },
            },
            {
              id: 40,
              file_name: "chart-figure-5.png",
              file_size: 28484,
              delete_flag: false,
              content_type: "image/png",
              request_document: {
                id: 40,
                request_id: 2,
                result: null,
                suggestion_y_n: null,
                request_additional_document_y_n: null,
                suggestion: null,
                request_additional_document: null,
                annotation: null,
              },
            },
            {
              id: 44,
              file_name: "model2.pdf",
              file_size: 7124,
              delete_flag: false,
              content_type: "application/pdf",
              request_document: {
                id: 44,
                request_id: 2,
                result: null,
                suggestion_y_n: null,
                request_additional_document_y_n: null,
                suggestion: null,
                request_additional_document: null,
                annotation: null,
              },
            },
            {
              id: 47,
              file_name: "logo02.jpg",
              file_size: 67198,
              delete_flag: false,
              content_type: "image/jpeg",
              request_document: {
                id: 47,
                request_id: 2,
                result: null,
                suggestion_y_n: null,
                request_additional_document_y_n: null,
                suggestion: null,
                request_additional_document: null,
                annotation: null,
              },
            },
            {
              id: 51,
              file_name: "logo02.jpg",
              file_size: 67198,
              delete_flag: false,
              content_type: "image/jpeg",
              request_document: {
                id: 51,
                request_id: 2,
                result: null,
                suggestion_y_n: null,
                request_additional_document_y_n: null,
                suggestion: null,
                request_additional_document: null,
                annotation: null,
              },
            },
          ],
        },
      ],
    },
    {
      id: 5,
      name: "เอกสารแสดงคุณสมบัติของบุคลากรประจำห้องปฏิบัติการทดสอบ",
      document_types: [
        {
          id: 5,
          name: "โครงสร้างการบริหารจัดการห้องทดสอบ",
          documents: [
            {
              id: 52,
              file_name: "logo02.jpg",
              file_size: 67198,
              delete_flag: false,
              content_type: "image/jpeg",
              request_document: {
                id: 52,
                request_id: 2,
                result: null,
                suggestion_y_n: null,
                request_additional_document_y_n: null,
                suggestion: null,
                request_additional_document: null,
                annotation: null,
              },
            },
          ],
        },
        {
          id: 6,
          name: "คุณวุฒิการศึกษา",
          documents: [],
        },
        {
          id: 7,
          name: "หนังสือรับรองประสบการณ์การฝึกอบรม",
          documents: [],
        },
      ],
    },
    {
      id: 6,
      name: "หนังสือรับรองประสบการณ์การฝึกอบรมของบุคลากรด้านการสอบเทียบ (ถ้ามี)",
      document_types: [
        {
          id: 8,
          name: "",
          documents: [],
        },
      ],
    },
    {
      id: 8,
      name: "เอกสารแสดงรายละเอียดของเครื่องทดสอบและการสอบเทียบ",
      document_types: [
        {
          id: 12,
          name: "",
          documents: [],
        },
      ],
    },
    {
      id: 9,
      name: "สำเนาวิธีปฏิบัติงาน/วิธีทดสอบ (Work Instruction/Test Procedure)",
      document_types: [
        {
          id: 13,
          name: "",
          documents: [],
        },
      ],
    },
    {
      id: 10,
      name: "เอกสารรับรองด้านคุณภาพ เช่น มาตรฐานระบบบริหารงานคุณภาพ ISO 9001 มาตรฐานผลิตภัณฑ์อุตสาหกรรม",
      document_types: [],
    },
    {
      id: 11,
      name: "เอกสารคำขอขึ้นทะเบียนหน่วยทดสอบเครือข่าย",
      document_types: [],
    },
    {
      id: 12,
      name: "รายการเอกสารประกอบการพิจารณาขึ้นทะเบียนหน่วยทดสอบเครือข่าย",
      document_types: [],
    },
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
              <span className="text-purple-700">คลิกเพื่ออัปโหลดเอกสาร</span>{" "}
              หรือ ลากไฟล์เอกสารมาวางบริเวณนี้
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

  const handleUpload = (
    groupIndex: number,
    docIndex: number,
    files: File[]
  ) => {
    const doc_type = documentgroup[groupIndex].document_types[docIndex].id;

    const formData = new FormData();
    formData.append("file", files[0]); // ส่งไฟล์ไปยัง server

    // อัปเดตไฟล์ที่อัปโหลด
    setUploadedFiles((prev: any) => {
      const key = `${groupIndex}-${docIndex}`;
      return {
        ...prev,
        [key]: prev[key]
          ? [...prev[key], { file: files[0], doc_type }]
          : [{ file: files[0], doc_type }],
      };
    });
  };

  const handleDelete = (groupIndex: number, docIndex: number) => {
    setUploadedFiles((prev: any) => {
      const key = `${groupIndex}-${docIndex}`; // ประกาศ key ก่อน
      return {
        ...prev, // ก๊อปปี้ข้อมูลใน prev
        [key]: null, // ลบไฟล์จาก key ที่ตรง
      };
    });
  };

  
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




    return (
      <div>
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
                        onUpload={(files) =>
                          handleUpload(groupIndex, docIndex, files)
                        }
                        onDelete={() => handleDelete(groupIndex, docIndex)}
                        accept={{
                          "image/svg+xml": [".svg"],
                          "image/png": [".png"],
                          "image/jpeg": [".jpg", ".jpeg"],
                          "image/gif": [".gif"],
                        }}
                        maxSize={5 * 1024 * 1024}
                        uploadedFile={
                          uploadedFiles[`${groupIndex}-${docIndex}`]?.[0]
                            ?.file ?? null
                        }
                      />

                      {/* แสดงไฟล์ที่อัปโหลด */}
                      {/* {uploadedFiles && uploadedFiles[`${groupIndex}-${docIndex}`] && Array.isArray(uploadedFiles[`${groupIndex}-${docIndex}`]) && (
                        <div className="mt-4 text-left">
                          <h4 className="text-sm font-semibold">
                            ไฟล์ที่อัปโหลด:
                          </h4>
                          <ul className="mt-2 space-y-1">
                            {uploadedFiles && uploadedFiles[`${groupIndex}-${docIndex}`] && uploadedFiles[`${groupIndex}-${docIndex}`] !== null ? (
                              uploadedFiles[`${groupIndex}-${docIndex}`]?.map(
                                (file: any, index: number) => (
                                  <li
                                    key={index}
                                    className="text-xs text-gray-600"
                                  >
                                    {file?.name} ({(file?.size / 1024).toFixed(2)}{" "}
                                    KB)
                                  </li>
                                )
                              )
                            ) : null}
                          </ul>
                        </div>
                      )} */}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
      </div>
    );
  }
