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
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { getOAuthInstance } from "../auth/GoogleAuth.ts";



const LoginLine: React.FC = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const navigate = useNavigate();
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
  }, [])

  const loginGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      getOAuthInstance().get('/oauth2/v1/userinfo', {
        params: {
          access_token: tokenResponse.access_token
        }
      }).then((res) => {
        localStorage.setItem("google_data", JSON.stringify(res.data))
        liff.login();
      })
    },
  });

  async function signIn() {
    await axios.post(`${path}/line/login`, {
      username: username,
      password: password
    }).then((res) => {
      if (res.data.status == 0) {
        alert("ไม่พบผู้ใช้งาน โปรดตรวจสอบชื่อผู้ใช้และรหัสผ่าน")
      }
      else if (res.data.status == 1) {
        localStorage.setItem('access_token', res.data.access_token)
        liff.closeWindow();
      }
    }).catch(() => {

    })
  }

  async function loginLiff() {
    try {
      liff.login();
    } catch (error) {
      console.log(error);
    }
  }
  function getProfileAndChangeRichmenu() {
    const data = localStorage.getItem('data')
    const google_data = localStorage.getItem('google_data')
    if (data == undefined && google_data == undefined) {
      liff.getProfile()
        .then(profile => {
          axios.post(`${path}/liff/login`, {
            lineProfile: profile
          }).then((res) => {
            localStorage.clear();
            localStorage.setItem('access_token', res.data.line_access_token)
            liff.closeWindow();
          }).catch(() => {
          })
        })
        .catch(err => {
          console.error('Error getting profile:', err);
        });
    }
    else if (google_data != undefined && data == undefined) {
      liff.getProfile()
        .then(profile => {
          axios.post(`${path}/line/google_login`, {
            lineProfile: profile,
            googleData: localStorage.getItem('google_data')
          }, {
            headers: { "Access-Control-Allow-Origin": "*" }
          }).then((res) => {
            localStorage.clear();
            localStorage.setItem('access_token', res.data.line_access_token)
            liff.closeWindow();
          }).catch(() => {
          })
        })
        .catch(err => {
          console.error('Error getting profile:', err);
        });
    }
    else {
      liff.getProfile()
        .then(profile => {
          axios.post(`${path}/line/register`, {
            lineProfile: profile,
            data: localStorage.getItem('data')
          }, {
            headers: { "Access-Control-Allow-Origin": "*" }
          }).then((res) => {
            localStorage.clear();
          }).catch(() => {
          })
        })
        .catch(err => {
          console.error('Error getting profile:', err);
        });
    }
  }

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
              defaultValue={username}
              onChange={(text) => {
                setUsername(text.target.value)
              }}
              className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="line_username"
              type="text"
            />
          </div>
          <div>
            <p className="text-[#5C5C5C] text-xl">รหัสผ่าน</p>
            <input
              defaultValue={password}
              onChange={(text) => {
                setPassword(text.target.value)
              }}
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
          <div onClick={() => loginGoogle()} className="border border-[#61876E] rounded-xl py-2 px-3 flex justify-center space-x-4">
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
};

export default LoginLine;

