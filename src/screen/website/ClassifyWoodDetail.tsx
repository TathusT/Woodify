import React, { useRef, useEffect, useState } from 'react';
import Wood from '../../assets/S12-3balau 2.png'
import selectIcon from "../../assets/select-icon.svg"
import { Select } from "antd";

const ClassifyWoodDetail: React.FC = () => {
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
      };
    const [heightBox, setHeightBox] = useState(0)
    const divRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleResize = () => {
        if (divRef.current) {
            const divHeight = divRef.current.offsetHeight;
            setHeightBox(divHeight)
        }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div className="w-full Kanit flex flex-col min-h-screen">
            <p className="text-[32px] font-bold mt-10">การตรวจสอบไม้ ไอดี 3145</p>
            <div className="pt-6 flex space-x-4">
                <div className=" w-8/12">
                    <p className="text-xl text-[#5C5C5C] font-semibold">ข้อมูลการตรวจสอบ</p>
                    <div className="box-shadow bg-white rounded-[10px] p-5 mt-2 flex" style={{height: heightBox}}>
                        <div className="w-3/12 flex items-center justify-center">
                            <img style={{height: heightBox-50}} src={Wood} alt="" />
                        </div>
                        <div className="grid grid-cols-9 w-5/12 ml-20 gap-3 gap-x-7">
                            <div className="col-span-5">
                                <div className="flex items-center space-x-4">
                                    <div className="bg-[#3C6255] rounded-full w-5 h-5"></div>
                                    <p className="text-lg font-semibold">ผลการตรวจสอบ:</p>
                                </div>
                            </div>
                            <div className="col-span-4">
                                <div className="flex flex-col space-y-4 text-lg font-semibold">
                                    <div className="flex justify-between">
                                        <p>1. ประดู่</p>
                                        <p>98%</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>2. พะยอม</p>
                                        <p>78%</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>3. มะเกลือ</p>
                                        <p>56%</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-5">
                                <div className="flex items-center space-x-4">
                                    <div className="bg-[#3C6255] rounded-full w-5 h-5"></div>
                                    <p className="text-lg font-semibold">วัน-เวลาที่ทำการตรวจ:</p>
                                </div>
                            </div>
                            <div className="col-span-4">
                                <p className="text-lg font-semibold">4/9/2566 12:08 น.</p>
                            </div>
                            <div className="col-span-5">
                                <div className="flex items-center space-x-4">
                                    <div className="bg-[#3C6255] rounded-full w-5 h-5"></div>
                                    <p className="text-lg font-semibold">ผู้ส่งการตรวจ:</p>
                                </div>
                            </div>
                            <div className="col-span-4">
                                <p className="text-lg font-semibold">ธนวิชญ์ ลักษณะ</p>
                            </div>
                            <div className="col-span-5">
                                <div className="flex items-center space-x-4">
                                    <div className="bg-[#3C6255] rounded-full w-5 h-5"></div>
                                    <p className="text-lg font-semibold">สถานที่พบ:</p>
                                </div>
                            </div>
                            <div className="col-span-4">
                                <p className="text-lg font-semibold">กรุงเทพมหานคร</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-4/12">
                    <p  className="text-xl text-[#5C5C5C] font-semibold">การรับรอง</p>
                    <div ref={divRef} className="bg-white rounded-[10px] box-shadow py-7 px-12 mt-2 flex flex-col items-center space-y-9">
                        <p className="text-lg font-semibold">เลือกเปลี่ยนผล </p>
                        <Select
                            defaultValue="ประดู่"
                            suffixIcon={<img src={selectIcon}></img>}
                            className="h-full w-full"
                            style={{height: 40}}
                            onChange={handleChange}
                            options={[
                            { value: "ประดู่", label: "1. ประดู่ 98%" },
                            { value: "พะยอม", label: "2. พะยอม 78%" },
                            { value: "มะเกลือ", label: "3. มะเกลือ 56%" },
                            ]}
                        />
                        <div className="flex text-lg font-semibold space-x-4 items-center">
                            <p>สถานะ:</p>
                            <p>รอตรวจสอบ</p>
                        </div>
                        <div className="flex items-center space-x-2 text-lg font-semibold">
                            <div className="bg-[#61876E] text-white py-2 px-5 rounded-[10px]">
                                <p>ผ่านการรับรอง</p>
                            </div>
                            <div className="bg-[#FF5F5F] text-white py-2 px-5 rounded-[10px]">
                                <p>ไม่ผ่านการรับรอง</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p  className="text-xl text-[#5C5C5C] font-semibold mt-4">บันทึกของการตรวจสอบ</p>
            <div className='w-full border border-1 border-[#61876E] rounded-[10px] h-[500px] bg-white mt-3'>
            </div>
            <div className='flex mt-4 space-x-4 mb-6'>
                <input className='p-3 border border-1 border-[#61876E] rounded-[10px] w-full' type="text" />
                <div className='bg-[#61876E] flex justify-center items-center py-2 px-6 rounded-[10px]'>
                    <p className='text-lg font-semibold text-white'>โพสต์</p>
                </div>
            </div>
        </div>
    );
};

export default ClassifyWoodDetail;
