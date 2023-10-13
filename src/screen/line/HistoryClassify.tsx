import React, { useState } from "react";
import LogoWoodify from "../../assets/logo_woodify.svg";
import { Link } from "react-router-dom";

const HistoryClassify: React.FC = () => {
    const [menuFocus, setMenuFocus] = useState('ประวัติการตรวจสอบ');
    return (
        <div className="Kanit bg-[#CEDEBD] min-h-screen flex flex-col">
            <p className="text-center py-4 text-2xl">ประวัติการใช้งาน</p>
            <div className="grid grid-cols-2 mx-6 shadow-lg rounded-lg overflow-hidden">
                <div onClick={() => {
                    setMenuFocus('ประวัติการตรวจสอบ')
                }} className={`${menuFocus == 'ประวัติการตรวจสอบ' ? 'bg-[#3C6255] text-white' : 'bg-[#ECECEC]'} py-2`}>
                    <p className="text-center">ประวัติการตรวจสอบ</p>
                </div>
                <div onClick={() => {
                    setMenuFocus('แสดงแผนภูมิวงกลม');
                }} className={`${menuFocus == 'แสดงแผนภูมิวงกลม' ? 'bg-[#3C6255] text-white' : 'bg-[#ECECEC]'} py-2`}>
                    <p className="text-center">แสดงแผนภูมิวงกลม</p>
                </div>
            </div>
        </div>
    );
};

export default HistoryClassify;
