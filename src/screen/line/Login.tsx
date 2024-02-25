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
import { deleteAllCookies } from "../../tools/tools.ts";
import Loading from "../component/Loading.tsx";



const LoginLine: React.FC = () => {
  const router = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    liff.init({
      liffId: '2001173297-AoDv0582'
    }).then(() => {
      if (liff.isLoggedIn()) {
        getProfileAndChangeRichmenu();
      }
      else {
        loginLiff();
      }
    })
      .catch(err => {
        console.error("Error initializing LIFF:", err);
      });
  }, [])

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
      setIsLoading(true);
      liff.getProfile()
        .then(profile => {
          axios.post(`${path}/liff/login`, {
            lineProfile: profile
          }).then((res) => {
            console.log(res.data);

            if (res.data.message == 'not_have_data' || res.data.message == "new_user") {
              liff.logout();
              router('/line/signup', { state: { data: res.data } })
            }
            else {
              localStorage.setItem('access_token', res.data.line_access_token)
              if (localStorage.getItem('current_page') == "classifyDetail") {
                router('/line/alert/login')
              }
              localStorage.removeItem('current_page');
              liff.closeWindow();
              liff.logout();
            }
          }).catch((err) => {
            console.log(err);
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
            sessionStorage.clear();
            deleteAllCookies();
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
      {isLoading ? <div className="flex items-center justify-center flex-1 h-full"><Loading /></div> : (
        <div className="min-h-screen flex flex-col">
          <div className="flex justify-center py-8">
            <img src={LogoWoodify} alt="" />
          </div>
          <div className="pt-12 bg-white flex-grow" style={{ borderTopLeftRadius: "2.5rem", borderTopRightRadius: "2.5rem" }}>
            <p className="text-center text-3xl">เข้าสู่ระบบ</p>
            <div className="px-12 pt-2 space-y-4">
              <div onClick={() => {
                loginLiff()
              }} className="bg-[#06C654] rounded-xl py-2 px-3 flex justify-center space-x-4">
                <img className="w-7" src={LogoLine} alt="" />
                <p className="text-white text-lg">เข้าสู่ระบบผ่าน Line</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginLine;

