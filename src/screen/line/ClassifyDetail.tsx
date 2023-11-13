import React, { useState } from "react";
import classify from '../../json/classify.json'
import Dot from '../../assets/classify_dot.svg'
import StatusWait from '../../assets/wait_for_classify.svg'
import Send from '../../assets/send.svg'
import Wood from '../../assets/S12-3balau 2.png'

const similarColor = [
    "text-green-500",
    "text-yellow-500",
    "text-red-500"
]

function RenderClassifyInformation() {
    return (
        <div className="m-6 shadow border rounded p-4 space-y-4">
            <div className="flex items-center"><img className="pr-2" src={Dot} alt="" />ชื่อพันธ์ุไม้ : {classify.name}</div>
            <div className="grid grid-cols-2 items-start gap-4">
                <p className="flex items-center "><img className="pr-2" src={Dot} alt="" />ผลการตรวจสอบ :</p>
                <div>
                    {classify && classify.similar.map((value, index) => {
                        const [woodName, similar] = value
                        return (
                            <div key={index} className="grid grid-cols-6">
                                <p className="col-span-1">{index + 1}.</p>
                                <p className="col-span-3">{woodName}</p>
                                <p className={`col-span-2 text-center font-bold ${similarColor[index]}`}>{similar}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <img className="pr-2" src={Dot} alt="" />
                สถานะ :
                <img className="pr-1" src={StatusWait} alt="" />
                {classify.status}
            </div>
            <p className="flex items-center"><img className="pr-2" src={Dot} alt="" />วันที่ตรวจสอบ : {classify.create_at}</p>
            <div className="flex items-center space-x-2">
                <img className="pr-2" src={Dot} alt="" />
                สถานที่พบ :
                <button className="bg-[#61876E] px-4 py-1 text-sm rounded-lg text-white">เพิ่มสถานที่</button>
            </div>
        </div>
    )
}

function RenderNote() {
    return (
        <div className="flex flex-col mx-6 py-4 flex-1">
            <div className="overflow-y-auto flex-1">
                <div className="bg-[#EAEAEA] rounded p-2">
                    <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aenean et tortor at risus viverra adipiscing. Euismod in pellentesque massa placerat. Massa sed elementum tempus egestas sed sed risus pretium. Sed arcu non odio euismod lacinia. Etiam erat velit scelerisque in. Consequat mauris nunc congue nisi vitae suscipit tellus mauris a. At elementum eu facilisis sed odio morbi quis. Venenatis a condimentum vitae sapien pellentesque habitant morbi tristique. Odio tempor orci dapibus ultrices in. Pharetra massa massa</p>
                    <p className="text-right text-xs text-[#AA9F9F]">บันทึกเมื่อ 17 ตุลาคม 2566 11:46:30</p>
                    <p className="text-right text-xs text-[#AA9F9F]">เขียนโดย Bot</p>
                </div>
                {/* <div className="bg-[#EAEAEA] rounded p-2">
                    <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aenean et tortor at risus viverra adipiscing. Euismod in pellentesque massa placerat. Massa sed elementum tempus egestas sed sed risus pretium. Sed arcu non odio euismod lacinia. Etiam erat velit scelerisque in. Consequat mauris nunc congue nisi vitae suscipit tellus mauris a. At elementum eu facilisis sed odio morbi quis. Venenatis a condimentum vitae sapien pellentesque habitant morbi tristique. Odio tempor orci dapibus ultrices in. Pharetra massa massa</p>
                    <p className="text-right text-xs text-[#AA9F9F]">บันทึกเมื่อ 17 ตุลาคม 2566 11:46:30</p>
                    <p className="text-right text-xs text-[#AA9F9F]">เขียนโดย Bot</p>
                </div>
                <div className="bg-[#EAEAEA] rounded p-2">
                    <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aenean et tortor at risus viverra adipiscing. Euismod in pellentesque massa placerat. Massa sed elementum tempus egestas sed sed risus pretium. Sed arcu non odio euismod lacinia. Etiam erat velit scelerisque in. Consequat mauris nunc congue nisi vitae suscipit tellus mauris a. At elementum eu facilisis sed odio morbi quis. Venenatis a condimentum vitae sapien pellentesque habitant morbi tristique. Odio tempor orci dapibus ultrices in. Pharetra massa massa</p>
                    <p className="text-right text-xs text-[#AA9F9F]">บันทึกเมื่อ 17 ตุลาคม 2566 11:46:30</p>
                    <p className="text-right text-xs text-[#AA9F9F]">เขียนโดย Bot</p>
                </div> */}
            </div>
        </div>
    )
}

function RenderInputSend() {
    return (
        <div className="mx-6 bg-[#EAEAEA] p-1 rounded-lg mb-1 relative mt-auto">
            <input className="py-1 px-2 rounded-lg w-full" type="text" placeholder="พิมพ์ข้อความ..." />
            <button className="absolute z-50 right-2"><img className="w-8 h-8" src={Send} alt="" /></button>
        </div>
    )
}

const ClassidyDetail: React.FC = () => {
    const [menuFocus, setMenuFocus] = useState('ข้อมูลการตรวจสอบ');
    return (
        <div className="Kanit flex flex-col min-h-screen">
            <div className="flex justify-center">
                <img className="h-96" src={Wood} alt="" />
            </div>
            <div className="grid grid-cols-2 mx-6 shadow-lg rounded overflow-hidden">
                <div onClick={() => {
                    setMenuFocus('ข้อมูลการตรวจสอบ')
                }} className={`${menuFocus == 'ข้อมูลการตรวจสอบ' ? 'bg-[#3C6255] text-white' : 'bg-[#ECECEC]'} py-2`}>
                    <p className="text-center">ข้อมูลการตรวจสอบ</p>
                </div>
                <div onClick={() => {
                    setMenuFocus('บันทึก');
                }} className={`${menuFocus == 'บันทึก' ? 'bg-[#3C6255] text-white' : 'bg-[#ECECEC]'} py-2`}>
                    <p className="text-center">บันทึก</p>
                </div>
            </div>
            {menuFocus == 'ข้อมูลการตรวจสอบ'
                ? <RenderClassifyInformation />
                : <div className="flex-grow flex flex-col"><RenderNote /><RenderInputSend /></div>}
        </div>
    );
};

export default ClassidyDetail;
