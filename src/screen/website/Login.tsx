import React, {useState} from "react";
import LogoWoodify from "../../assets/logo_woodify.svg";
import LogoLine from "../../assets/logo_line.svg";
import LogoGoogle from "../../assets/logo_google.svg";
import Line from "../../assets/line.svg";
import eye from "../../assets/iconOpenEye.svg";
import closeEye from "../../assets/iconCloseEye.svg";
import background from "../../assets/bgAuthen_website.svg";
import axios from "axios";
import path from "../../../path";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const LoginWeb: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const LoginUP = async (username : string, password : string) =>{
    await axios.post(`${path}/admin/login`, {
      username : username,
      password : password
    }).then((res) => {
      if(res.data.status == 0){
        alert("ไม่พบผู้ใช้งาน โปรดตรวจสอบชื่อผู้ใช้และรหัสผ่าน")
      }
      else if(res.data.status == 1){
        localStorage.setItem('access_token', res.data.access_token)
        navigate('/admin/dashboard');
      }
    }).catch(() => {
      
    })
  }

  return (
    <div className="Kanit h-[100vh] min-h-screen bg-[#E6F2FD] flex flex-col bg-no-repeat bg-cover bg-[center_top_-4rem]" style={{ backgroundImage: `url(${background})` }}>
      <div className="flex justify-between px-24 pt-7 items-center">
        <img src={LogoWoodify} className="w-[96px]" alt="" />
        <div className="flex space-x-20">
            <p>หน้าหลัก</p>
            <p>เกี่ยวกับ</p>
            <p>ติดต่อ</p>
        </div>
        <div className="flex space-x-3">
            <div className="px-4 py-2 rounded-md bg-white">
                <p>เข้าสู่ระบบ</p>
            </div>
            <div className="px-4 py-2 rounded-md bg-[#3C6255] text-white">
                <p>ลงทะเบียน</p>
            </div>
        </div>
      </div>
      <div className="flex justify-center items-center h-full">
        <div className="bg-white rounded-[20px] w-[40%] px-16 pt-8 pb-14 flex flex-col items-center box-shadow">
            <p className="text-2xl text-[32px] font-bold">เข้าสู่ระบบ</p>
            <div className="w-full space-y-8 mt-8">
              <div className="space-y-2">
                <div className="flex flex-col">
                    <p className="font-medium text-[18px]">ชื่อผู้ใช้</p>
                    <input defaultValue={username} onChange={(text) =>{
                      setUsername(text.target.value)
                    }} id="userName" className="p-3 border-[#61876E] border-[1px] w-full rounded-[15px] focus:border-[#61876E]" type="text" />
                </div>
                <div>
                    <p>รหัสผ่าน</p>
                    <div className="relative">
                      <input defaultValue={password} onChange={(text) =>{
                      setPassword(text.target.value)
                    }} id="userPassword" className="p-3 border-[#61876E] border-[1px] w-full rounded-[15px] focus:border-[#61876E]" type={showPassword ? 'text' : 'password'} />
                      <button className="w-[24px] cursor-pointer absolute top-3 right-3" onClick={togglePasswordVisibility}>
                        {showPassword ? 
                          <img src={eye} alt="" /> : 
                          <img src={closeEye} alt="" />
                        }
                      </button>
                    </div>
                </div>
              </div>
                <div className="py-2 rounded-[15px] border-[#61876E] border-[1px] flex justify-center items-center space-x-1">
                    <img className="w-[2rem]" src={LogoGoogle} alt="" />
                    <p>เข้าสู่ระบบผ่าน Google</p>
                </div>
                <div onClick={() => {
                  LoginUP(username, password)
                }} className="py-3 rounded-[15px] bg-[#3C6255] flex justify-center">
                    <p className="text-white">เข้าสู่ระบบ</p>
                </div>
            </div>
        </div>
      </div>
      <div className="flex justify-center mb-5">
        <p>© 2023 COPYRIGHT 2023 WOODIFY. ALL RIGHTS RESERVED.</p>
      </div>
    </div>
  );
};

export default LoginWeb;