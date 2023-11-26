import React, { useEffect } from "react";
import LogoWoodify from "../../assets/logo_woodify.svg";
import { Link } from "react-router-dom";
import liff from "@line/liff";

const RegisterLine: React.FC = () => {
  useEffect(() => {
    liff.init({
      liffId: '2001173297-AoDv0582'
    }).then(() => {
      liff.logout();
    })
      .catch(err => {
        console.error("Error initializing LIFF:", err);
      });
  })
  return (
    <div className="Kanit bg-[#CEDEBD] min-h-screen flex flex-col">
      <div className="flex justify-center py-8">
        <img src={LogoWoodify} alt="logo_woodify" />
      </div>
      <div className="pt-12 bg-white flex-grow" style={{borderTopLeftRadius : "2.5rem", borderTopRightRadius : "2.5rem"}}>
        <p className="text-center text-3xl">สมัครสมาชิก</p>
        <div className="px-12 pt-2 space-y-4">
          <div>
            <p className="text-[#5C5C5C] text-xl">ชื่อผู้ใช้</p>
            <input
              className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="line_username"
              type="text"
            />
          </div>
          <div>
            <p className="text-[#5C5C5C] text-xl">ชื่อจริง</p>
            <input
              className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="line_firstname"
              type="text"
            />
          </div>
          <div>
            <p className="text-[#5C5C5C] text-xl">นามสกุล</p>
            <input
              className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="line_lastname"
              type="text"
            />
          </div>
          <div>
            <p className="text-[#5C5C5C] text-xl">อีเมล</p>
            <input
              className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="line_email"
              type="text"
            />
          </div>
          <div>
            <p className="text-[#5C5C5C] text-xl">รหัสผ่าน</p>
            <input
              className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="line_password"
              type="text"
            />
          </div>
          <div>
            <p className="text-[#5C5C5C] text-xl">ยืนยันรหัสผ่าน</p>
            <input
              className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="line_confirm_password"
              type="text"
            />
          </div>
          <div className="bg-[#3C6255] rounded-xl py-2 px-3">
            <p className="text-center text-xl"><Link to='/line/login' className="text-white">สมัครสมาชิก</Link></p>
          </div>
          <div className="text-sm pb-6">
            <p className="text-[#5C5C5C] text-center">มีบัญชีอยู่แล้วใช่หรือไม่? <Link to='/line/login' className="text-[#051937]">เข้าสู่ระบบที่นี่</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterLine;
