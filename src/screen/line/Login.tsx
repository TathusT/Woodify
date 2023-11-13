import React, { useEffect, useState } from "react";
import LogoWoodify from "../../assets/logo_woodify.svg";
import LogoLine from "../../assets/logo_line.svg";
import LogoGoogle from "../../assets/logo_google.svg";
import Line from "../../assets/line.svg";
import users from '../../json/user.json'
import { Link } from "react-router-dom";
import liff from "@line/liff";
import axios from "axios";
import path from '../../../path.tsx'

const LoginLine: React.FC = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  useEffect(() => {
    liff.init({
      liffId: '2001173297-AoDv0582'
    }).then(() => {
      if (liff.isLoggedIn()) {
        getProfileAndChangeRichmenu();
      }
    })
      .catch(err => {
        console.error("Error initializing LIFF:", err);
      });
  })
  return (
    <div className="Kanit bg-[#CEDEBD] min-h-screen flex flex-col">
      <div className="flex justify-center py-8">
        <img src={LogoWoodify} alt="" />
      </div>
      <div className="pt-12 bg-white flex-grow" style={{ borderTopLeftRadius: "2.5rem", borderTopRightRadius: "2.5rem" }}>
        <p className="text-center text-3xl">เข้าสู่ระบบ</p>
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
            <p className="text-[#5C5C5C] text-xl">รหัสผ่าน</p>
            <input
              className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="line_password"
              type="password"
            />
          </div>
          <div>
            <p className="text-right hover:text-[#4075DC] duration-500">
              ลืมรหัสผ่าน
            </p>
          </div>
          <div className="bg-[#3C6255] rounded-xl py-2 px-3">
            <p onClick={() => {
              signIn()
            }} className="text-white text-center text-xl">เข้าสู่ระบบ</p>
          </div>

          <div className="flex justify-between gap-2 py-2">
            <img style={{ width: "38%" }} src={Line} alt="" />
            <p className="text-sm">หรือ</p>
            <img style={{ width: "38%" }} src={Line} alt="" />
          </div>
          <div onClick={() => {
            loginLiff()
          }} className="bg-[#06C654] rounded-xl py-2 px-3 flex justify-center space-x-4">
            <img className="w-7" src={LogoLine} alt="" />
            <p className="text-white text-lg">เข้าสู่ระบบผ่าน Line</p>
          </div>
          <div className="border border-[#61876E] rounded-xl py-2 px-3 flex justify-center space-x-4">
            <img className="w-7" src={LogoGoogle} alt="" />
            <p className="text-[#5C5C5C] text-center text-lg">
              เข้าสู่ระบบผ่าน Google
            </p>
          </div>
          <div className="text-sm">
            <p className="text-[#5C5C5C] text-center">ยังไม่มีบัญชีใช่หรือไม่? <Link to='/line/signup' className="text-[#051937]">สมัครสมาชิกที่นี่</Link></p>
          </div>
        </div>
      </div>
    </div>
  );

  function signIn() {
    users.forEach(user => {
      if (user.username == username && user.password == password) {

      }
    });
  }

  async function loginLiff() {

    try {
      liff.login();
    } catch (error) {
      console.log(error);
    }
  }
  function getProfileAndChangeRichmenu() {
    liff.getProfile()
      .then(profile => {
        axios.post(`${path}/login`, {
          lineProfile: profile
        }).then((res) => {
          console.log(res.data);
          liff.closeWindow();
        }).catch(() => {
        })
      })
      .catch(err => {
        console.error('Error getting profile:', err);
      });
  }
};
export default LoginLine;

