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


const SignUpWeb: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const signUp = async () => {

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
            <div className="px-4 py-2 rounded-md bg-white box-shadow">
                <p>เข้าสู่ระบบ</p>
            </div>
        </div>
      </div>
      <div className="flex justify-center items-center h-full">
        <div className="bg-white rounded-[20px] w-[40%] px-16 pt-8 pb-14 flex flex-col items-center box-shadow">
            <p className="text-2xl text-[32px] font-bold">ลงทะเบียน</p>
            <div className="w-full space-y-8 mt-8">
              <div className="space-y-3">
                <div className="flex flex-col">
                    <p className="font-medium text-[18px]">ชื่อผู้ใช้</p>
                    <input defaultValue={username} onChange={(text) =>{
                      setUsername(text.target.value)
                    }} id="userName" className="p-3 border-[#61876E] border-[1px] w-full rounded-[15px] focus:border-[#61876E]" type="text" />
                </div>
                <div className="flex flex-col">
                    <p className="font-medium text-[18px]">ชื่อจริง</p>
                    <input defaultValue={name} onChange={(text) =>{
                      setName(text.target.value)
                    }} id="name"  className="p-3 border-[#61876E] border-[1px] w-full rounded-[15px] focus:border-[#61876E]" type="text" />
                </div>
                <div className="flex flex-col">
                    <p className="font-medium text-[18px]">นามสกุล</p>
                    <input defaultValue={surname} onChange={(text) =>{
                      setSurname(text.target.value)
                    }} id="surname"  className="p-3 border-[#61876E] border-[1px] w-full rounded-[15px] focus:border-[#61876E]" type="text" />
                </div>
                <div className="flex flex-col">
                    <p className="font-medium text-[18px]">อีเมล</p>
                    <input defaultValue={email} onChange={(text) =>{
                      setEmail(text.target.value)
                    }} id="email"  className="p-3 border-[#61876E] border-[1px] w-full rounded-[15px] focus:border-[#61876E]" type="text" />
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
                <div>
                    <p>ยืนยันรหัสผ่าน</p>
                    <div className="relative">
                      <input defaultValue={confirmPassword} onChange={(text) =>{
                      setConfirmPassword(text.target.value)
                    }} id="userPassword" className="p-3 border-[#61876E] border-[1px] w-full rounded-[15px] focus:border-[#61876E]" type={showConfirmPassword ? 'text' : 'password'} />
                      <button className="w-[24px] cursor-pointer absolute top-3 right-3" onClick={toggleConfirmPasswordVisibility}>
                        {showConfirmPassword ? 
                          <img src={eye} alt="" /> : 
                          <img src={closeEye} alt="" />
                        }
                      </button>
                    </div>
                </div>
              </div>
                <div onClick={() => {
                  signUp()
                }} className="py-3 rounded-[15px] bg-[#3C6255] flex justify-center">
                    <p className="text-white text-[20px]">สมัครสมาชิก</p>
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

export default SignUpWeb;