import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import garbage from "../../assets/garbage.svg";
import picNoUpload from "../../assets/pic-no-upload.svg"
import addPicWhite from "../../assets/add-pic-white.svg"
import img1 from "../../assets/cover-pic-ประดู่.png"
import img2 from "../../assets/cover-pic-พยุง.png"
import img3 from "../../assets/cover-pic-พะยอม.jpg"
import img4 from "../../assets/cover-pic-ประดู่.png"
import img5 from "../../assets/cover-pic-พยุง.png"
import img6 from "../../assets/cover-pic-พะยอม.jpg"


const ManageInformationWood: React.FC = () => {
    const [status, setStatus] = useState(true)
    const [images, setImages] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const slides = [img1, img2, img3, img4, img5, img6];
    
    const handleImageUploa = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            setImages((prevImages) => [...prevImages, event.target?.result as string]);
        };
        reader.readAsDataURL(file);
        }
    };
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
          const newImages: string[] = [];
    
          // Process each selected file
          for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onload = (event) => {
              if (event.target) {
                newImages.push(event.target.result as string);
                // If all images are processed, update the state
                if (i === files.length - 1) {
                  setImages((prevImages) => [...prevImages, ...newImages]);
                }
              }
            };
            reader.readAsDataURL(files[i]);
          }
        }
      };

    const handleDeleteImage = (index: number) => {
        setImages((prevImages) => {
        const updatedImages = [...prevImages];
        updatedImages.splice(index, 1);
        return updatedImages;
        });
    };

    const handleUploadImage = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
  return (
    <div className="w-full Kanit flex flex-col min-h-screen">
      <div className="flex mt-10">
        <p className="text-[32px] font-semibold ml-6">เพิ่มข้อมูลต้นไม้</p>
      </div>
      <div className="flex flex-col space-y-7 mt-5">
        <div className="grid grid-cols-6 gap-5">
            <div className="col-span-3 space-y-1">
                <p className="text-[20px]">ชื่อสามัญ</p>
                <input className="w-full text-[18px] p-2 rounded-[15px] border border-1 border-[#61876E]" type="text" />
            </div>
            <div className="col-span-3 space-y-1">
                <div className="flex space-x-5 items-center">
                    <p className="text-[20px]">ชื่อการค้า-ชื่ออังกฤษ</p>
                    <p className="text-[20px] text-[#C0C0C0]">รูปแบบการเขียน : ชื่อที่1, ชื่อที่2 </p>
                </div>
                <input className="w-full text-[18px] p-2 rounded-[15px] border border-1 border-[#61876E]" type="text" />
            </div>
        </div>
        <div className="grid grid-cols-6 gap-5">
            <div className="col-span-3 space-y-1">
                <p className="text-[20px]">ชื่อพฤษศาสตร์</p>
                <input className="w-full text-[18px] p-2 rounded-[15px] border border-1 border-[#61876E]" type="text" />
            </div>
            <div className="col-span-3 space-y-1">
                <p className="text-[20px]">วงศ์</p>
                <input className="w-full text-[18px] p-2 rounded-[15px] border border-1 border-[#61876E]" type="text" />
            </div>
        </div>
        <div className="col-span-3 space-y-1">
            <p className="text-[20px]">ถิ่นกำเนิด</p>
            <input className="w-full text-[18px] p-2 rounded-[15px] border border-1 border-[#61876E]" type="text" />
        </div>
        <div className="col-span-3 space-y-1">
            <p className="text-[20px]">ลักษณะเนื้อไม้</p>
            <input className="w-full text-[18px] p-2 rounded-[15px] border border-1 border-[#61876E]" type="text" />
        </div>
        <div className="col-span-3 space-y-1">
            <p className="text-[20px]">ลักษณะทางกายวิภาค</p>
            <textarea className="w-full text-[18px] p-2 rounded-[15px] border border-1 border-[#61876E]"/>
        </div>
      </div>
      <div className="flex items-center justify-center py-6">
        <label className={`min-w-96 min-h-60 border border-2 border-dashed border-gray-300 bg-white flex items-center justify-center gap-6 p-7 ${images.length > 3 ? 'grid grid-cols-12': ''}`}>
            {images.length != 0? (
                images.map((image, index) => (
                <div className="col-span-3" key={index} style={{ marginBottom: '10px' }}>
                    <div className="rounded-[10px] bg-cover aspect-[1.73/1] relative bg-center" style={{backgroundImage:`url(${image})`, height: 190}}>
                        <div className="absolute w-7 h-7 bg-[#FF5F5F] rounded-full flex justify-center items-center cursor-pointer" style={{right: -13, top: -13}} onClick={() => handleDeleteImage(index)}>
                            <img width={18} src={garbage} alt="" />
                        </div>
                    </div>
                </div>
                ))
            ):
            (
                <div className="flex flex-col justify-center items-center">
                    <img src={picNoUpload} alt="" />
                    <span className="text-[#C0C0C0]">ยังไม่มีรูปภาพที่อัปโหลด</span>
                </div>
            )
            }
        </label>
        <input
                    ref={fileInputRef}
                    type="file"
                    id="imageUpload"
                    className="hidden"
                    onChange={handleImageUpload}
                    multiple
                />
        </div>
        <div className="flex items-center justify-center pb-6">
            <div className="space-y-8">
                <div className="flex justify-center text-[18px] space-x-2">
                    <p>จำนวนรูป: </p>
                    <p>{images.length}/30</p>
                </div>
                <div className="flex justify-center">
                    <button onClick={() => handleUploadImage()} disabled={images.length >= 30} className={`py-2 px-3 text-xl rounded-xl text-white flex justify-center items-center space-x-2 ${images.length >= 30 ? 'bg-[#C1C1C1]' : 'bg-[#61876E]'}`}>
                        <p>เพิ่มรูปภาพ</p>
                        <img src={addPicWhite} alt="" />
                    </button>
                </div>
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
                    <button className="bg-[#61876E] w-40 py-3 text-xl rounded-xl text-white font-bold">บันทึก</button>
                    <button className="bg-[#C1C1C1] w-40 py-3 text-xl rounded-xl font-bold">ยกเลิก</button>
                </div>
            </div>
        </div>
        <p className='text-center text-xl font-semibold pb-3'>© 2023 COPYRIGHT 2023 WOODIFY. ALL RIGHTS RESERVED.</p>
    </div>
  );
};

export default ManageInformationWood;
