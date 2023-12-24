import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import { Radio } from "@material-tailwind/react";

const RadioButton: any = Radio

const ManageManual: React.FC = () => {
    const [body, setBody] = useState("");
    const [manualTitle, setManualTitle] = useState("");

    const modules = {
        toolbar: [
            [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }, { font: [] }],
            [{ size: {} }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image", "video"],
            ["clean"],
            ["code-block"],
        ],
    };
    const formats = [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "link",
        "image",
        "video",
        "code-block",
    ];

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
                    style={{ height: '600px' }}  // กำหนดความสูงตามที่ต้องการ
                    theme="snow"
                    placeholder="เขียนคู่มือ"
                    onChange={(value) => handleChange(value)}
                    modules={modules}
                    formats={formats}
                />
            </div>
            <div className="flex items-center justify-center py-12">
                <div className="w-96 h-60 border border-2 border-dashed border-gray-300 bg-white">

                </div>
            </div>
            <div className="flex items-center justify-center py-4">
                <div className="space-y-8">
                    <div className="flex justify-center"><button className="bg-[#61876E] w-40 py-2 text-xl rounded-xl text-white">เพิ่มรูปภาพปก</button></div>
                    <div className="flex space-x-4">
                        <p className="text-xl text-center">สถานะการแสดงผล : </p>
                        <div className="flex items-center space-x-3 text-xl">
                            <input type="radio" name="display" />
                            <p>แสดง</p>
                        </div>
                        <div className="flex items-center space-x-3 text-xl">
                            <input type="radio" name="display" />
                            <p>ไม่แสดง</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center space-x-8">
                        <button className="bg-[#61876E] w-40 py-3 text-xl rounded-xl text-white font-bold">บันทึก</button>
                        <button className="bg-[#C1C1C1] w-40 py-3 text-xl rounded-xl font-bold">ยกเลิก</button>
                    </div>
                </div>
            </div>
            <p className='text-center text-xl font-semibold pb-3'>© 2023 COPYRIGHT 2023 WOODIFY. ALL RIGHTS RESERVED.</p>
        </div>
    );
};

export default ManageManual;
