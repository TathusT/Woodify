import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import { Radio } from "@material-tailwind/react";
import { modules, formats, getImage } from "../../tools/tools";
import axios from "axios";
import path from "../../../path";
import { Modal } from "antd";

const RadioButton: any = Radio


const ManageManual: React.FC = () => {
    const [modalConfirmSave, setModalConfirmSave] = useState(false);
    const [modalCancel, setModalCancel] = useState(false);
    const [body, setBody] = useState("");
    const [manualTitle, setManualTitle] = useState("");
    const [status, setStatus] = useState(true)
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [backupImage, setBackupImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { id } = useParams();
    const isCreateMode = id === undefined;
    const router = useNavigate();

    const CreateManual = async (title: string, body: string, status: boolean, image: any) => {
        try {
            const formData = new FormData();
            const token = localStorage.getItem('access_token');
            if (token) {
                formData.append('title', title);
                formData.append('body', body);
                formData.append('status', status.toString());
                formData.append('token', token)
                if (image) {
                    formData.append('image', image);
                }
                const response = await axios.post(`${path}/create_manual`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log(response.data);
            } else {
                console.log('Token is missing or invalid');
            }
            router('/admin/manual')
        } catch (error) {
            console.error(error);
        }
    }

    const editManual = async (title: string, body: string, status: boolean, image: any | null, id: string) => {
        try {
            const formData = new FormData();
            const token = localStorage.getItem('access_token');
            if (image != undefined) {
                if (token) {
                    formData.append('title', title);
                    formData.append('body', body);
                    formData.append('status', status.toString());
                    formData.append('token', token)
                    formData.append('image', image);
                    formData.append('id', id);
                    const response = await axios.post(`${path}/edit_manual_updateImage`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    console.log(response.data);
                } else {
                    console.log('Token is missing or invalid');
                }
            } else {
                if (token) {
                    formData.append('title', title);
                    formData.append('body', body);
                    formData.append('status', status.toString());
                    formData.append('token', token)
                    if (image) {
                        formData.append('image', image);
                    }
                    const response = await axios.post(`${path}/edit_manual_noupdateImage`, {
                        title: title,
                        body: body,
                        status: status,
                        token: token,
                        id: id
                    });
                    console.log(response.data);
                } else {
                    console.log('Token is missing or invalid');
                }
            }
            router('/admin/manual')
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        axios.get(`${path}/manual/${id}`)
            .then((res) => {
                const data = res.data[0]
                setBody(data.description)
                setManualTitle(data.topic)
                const image = getImage(`/image/manual/${data.image}`)
                setSelectedImage(image)
                setBackupImage(image);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (event: ProgressEvent<FileReader>) => {
                const result = event.target?.result as string;
                setSelectedImage(result);
            };

            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
    };

    const handleUploadImage = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };



    const handleChange = (value) => {
        setBody(value);
    };

    const handleTitleChange = (event) => {
        setManualTitle(event.target.value);
    };
    return (
        <div className="pt-6">
            <p className="text-[24px]">แก้ไขข้อมูลการใช้งานระบบเบื้องต้น</p>
            <div className="pt-10 pb-6">
                <p className="text-[#5C5C5C] text-xl">ชื่อหัวข้อคู่มือการใช้งาน</p>
                <input
                    onChange={handleTitleChange}
                    value={manualTitle}
                    className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="line_lastname"
                    type="text"
                />
            </div>
            <div>
                <p className="text-[#5C5C5C] text-xl">รายละเอียดการใช้งาน</p>
                <ReactQuill
                    className="rounded-xl border box-border overflow-hidden bg-white"
                    style={{ height: '600px' }}
                    theme="snow"
                    value={body}
                    placeholder="เขียนคู่มือ"
                    onChange={(value) => handleChange(value)}
                    modules={modules}
                    formats={formats}
                />
            </div>
            <div className="flex items-center justify-center py-12">
                <label htmlFor="imageUpload" className="w-96 h-60 border border-2 border-dashed border-gray-300 bg-white cursor-pointer flex items-center justify-center relative">
                    {selectedImage ? (
                        <>
                            <img src={selectedImage} alt="Selected" className="w-full h-full object-cover" />
                            <button onClick={() => handleRemoveImage()} className="absolute top-2 right-2 text-white bg-red-500 p-1 rounded-full">
                                Remove
                            </button>
                        </>
                    ) : (
                        <span className="text-gray-500">คลิกเพื่อเลือกรูปภาพหรือลากมาวางที่นี่</span>
                    )}
                </label>
                <input
                    ref={fileInputRef}
                    type="file"
                    id="imageUpload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </div>
            <div className="flex items-center justify-center py-4">
                <div className="space-y-8">
                    <div className="flex justify-center"><button onClick={() => handleUploadImage()} className="bg-[#61876E] w-40 py-2 text-xl rounded-xl text-white">เพิ่มรูปภาพปก</button></div>
                    <div className="flex space-x-4">
                        <p className="text-xl text-center">สถานะการแสดงผล : </p>
                        <div className="flex items-center space-x-3 text-xl">
                            <input onClick={() => setStatus(true)} defaultChecked type="radio" name="display" />
                            <p>แสดง</p>
                        </div>
                        <div className="flex items-center space-x-3 text-xl">
                            <input onClick={() => setStatus(false)} type="radio" name="display" />
                            <p>ไม่แสดง</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center space-x-8">
                        <button onClick={() => setModalConfirmSave(true)} className="bg-[#61876E] w-40 py-3 text-xl rounded-xl text-white font-bold">บันทึก</button>
                        <button onClick={() => setModalCancel(true)} className="bg-[#C1C1C1] w-40 py-3 text-xl rounded-xl font-bold">ยกเลิก</button>
                    </div>
                </div>
            </div>
            <p className='text-center text-xl font-semibold pb-3'>© 2023 COPYRIGHT 2023 WOODIFY. ALL RIGHTS RESERVED.</p>
            {/* modal */}
            <Modal
                title={[
                <div className="text-center text-[24px] mt-4">
                    <p>ยืนยันการบันทึกข้อมูล</p>
                </div>
                ]}
                className="Kanit"
                centered
                open={modalConfirmSave}
                width={550}
                onCancel={() => setModalConfirmSave(false)}
                footer={[
                <div className="flex items-center justify-center space-x-2 font-semibold pt-3 mb-4">
                    <div onClick={() => isCreateMode ? CreateManual(manualTitle, body, status, fileInputRef.current?.files?.[0]) : editManual(manualTitle, body, status, fileInputRef.current?.files?.[0], id)} className="bg-[#3C6255] py-2 w-1/4 text-white cursor-pointer rounded-[10px] text-center">
                        <p>ยืนยันการบันทึก</p>
                    </div>
                    <div onClick={() => setModalConfirmSave(false)} className="bg-[#C1C1C1] py-2 w-1/4 cursor-pointer rounded-[10px] text-center">
                        <p>ยกเลิก</p>
                    </div>
                </div>
                ]}
            >
                <div className="flex justify-center my-10">
                <p className="text-lg font-semibold">คุณต้องการบันทึกข้อมูลนี้ ใช่หรือไม่?</p>
                </div>
            </Modal>
            {/* modal */}
            <Modal
                title={[
                <div className="text-center text-[24px] mt-4">
                    <p>ยืนยันการยกเลิกการบันทึกข้อมูล</p>
                </div>
                ]}
                className="Kanit"
                centered
                open={modalCancel}
                width={550}
                onCancel={() => setModalCancel(false)}
                footer={[
                <div className="flex items-center justify-center space-x-2 font-semibold pt-3 mb-4">
                    <div onClick={() => router('/admin/manual')} className="bg-[#3C6255] py-2 w-1/4 text-white cursor-pointer rounded-[10px] text-center">
                        <p>ยกเลิกการบันทึก</p>
                    </div>
                    <div onClick={() => setModalCancel(false)} className="bg-[#C1C1C1] py-2 w-1/4 cursor-pointer rounded-[10px] text-center">
                        <p>ยกเลิก</p>
                    </div>
                </div>
                ]}
            >
                <div className="flex justify-center my-10">
                <p className="text-lg font-semibold">คุณต้องการยกเลิกการบันทึกข้อมูลนี้ ใช่หรือไม่?</p>
                </div>
            </Modal>
        </div>
    );
};

export default ManageManual;
