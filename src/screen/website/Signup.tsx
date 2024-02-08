import React, { useEffect, useState } from "react";
import LogoWoodify from "../../assets/logo_woodify.svg";
import LogoLine from "../../assets/logo_line.svg";
import LogoGoogle from "../../assets/logo_google.svg";
import Line from "../../assets/line.svg";
import eye from "../../assets/iconOpenEye.svg";
import closeEye from "../../assets/iconCloseEye.svg";
import background from "../../assets/bgAuthen_website.svg";
import axios from "axios";
import path from "../../../path";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Loading from "../component/Loading";
import liff from "@line/liff";


const SignUpWeb: React.FC = () => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState()
  const [profile, setProfile] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const { a_id } : any = useParams();
  let aid : any = ''
  if(!a_id){
    aid = localStorage.getItem('aid')
  }
  else{
    aid = a_id;
  }
  const router = useNavigate();

  const getToken = async () => {
    console.log(aid);
    
    await axios.post(`${path}/token_invited`, {
      a_id: aid
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.a_token.message == "update success") {;
          localStorage.clear();
          localStorage.setItem('access_token', res.data.access_token)
          router('/admin/dashboard')
        }
        else if (res.data.message == 'timeout') {
          alert('ลิงค์หมดอายุ')
        }
        else {
          setEmail(res.data.a_token.data.invited_to)
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
  const getData = async () => {
    await getToken();
  }

  useEffect(() => {
    if(a_id){
      localStorage.setItem('aid', a_id)
    }
    liff.init({
      liffId: '2001173297-rzlZA1Oy'
    }).then(() => {
      if (liff.isLoggedIn()) {
        getProfileAndChangeRichmenu();
      }
      else{
        loginLiff();
      }
    })
    .catch(err => {
      console.error("Error initializing LIFF:", err);
    });
  }, [])
  
  async function loginLiff() {
    try {
      await liff.login();
      await setIsLoading(false);
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
          setProfile(profile)
          setIsLoading(false);
        })
        .catch(err => {
          console.error('Error getting profile:', err);
        });
    }
  }

  async function registerAccount() {
    setIsLoading(true)
    await axios.post(`${path}/create_expert`, {
      firstname: name,
      lastname: surname,
      email: email,
      phone: phone,
      line_id: profile.userId,
      image : profile.pictureUrl,
      role : "EXPERT",
      verify_data : true
    })
      .then((res) => {
        if (res.data.message == 'create_success') {
          localStorage.clear();
          localStorage.setItem('access_token', res.data.access_token)
          router('/admin/dashboard')
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <div className="Kanit h-[100vh] min-h-screen bg-[#E6F2FD] flex flex-col bg-no-repeat bg-cover bg-[center_top_-4rem]" style={{ backgroundImage: `url(${background})` }}>
      {isLoading ? <div className="flex items-center justify-center flex-1 h-full"><Loading /></div> : (
        <div>
          <div className="flex justify-between px-24 pt-7 items-center">
            <img src={LogoWoodify} className="w-[96px]" alt="" />
            <div className="flex space-x-3">
            </div>
          </div>
          <div className="flex justify-center items-center h-full">
            <div className="bg-white rounded-[20px] w-[40%] px-16 pt-8 pb-14 flex flex-col items-center box-shadow">
              <p className="text-2xl text-[32px] font-bold">ลงทะเบียน</p>
              <div className="w-full space-y-8 mt-8">
                <div className="space-y-3">
                  <div className="flex flex-col">
                    <p className="font-medium text-[18px]">ชื่อจริง</p>
                    <input defaultValue={name} onChange={(text) => {
                      setName(text.target.value)
                    }} id="name" className="p-3 border-[#61876E] border-[1px] w-full rounded-[15px] focus:border-[#61876E]" type="text" />
                  </div>
                  <div className="flex flex-col">
                    <p className="font-medium text-[18px]">นามสกุล</p>
                    <input defaultValue={surname} onChange={(text) => {
                      setSurname(text.target.value)
                    }} id="surname" className="p-3 border-[#61876E] border-[1px] w-full rounded-[15px] focus:border-[#61876E]" type="text" />
                  </div>
                  <div className="flex flex-col">
                    <p className="font-medium text-[18px]">เบอร์โทรศัพท์</p>
                    <input value={phone} id="line_phone"
                      type="tel"
                      pattern="[0-9]*" onChange={(text) => {
                        const input = text.target.value;
                        const numericInput: any = input.replace(/\D/g, '');
                        setPhone(numericInput)
                      }} className="p-3 border-[#61876E] border-[1px] w-full rounded-[15px] focus:border-[#61876E]" />
                  </div>
                  <div className="flex flex-col">
                    <p className="font-medium text-[18px]">อีเมล</p>
                    <input disabled defaultValue={email} onChange={(text) => {
                      setEmail(text.target.value)
                    }} id="email" className="p-3 border-[#61876E] border-[1px] w-full rounded-[15px] focus:border-[#61876E]" type="text" />
                  </div>
                </div>
                <div onClick={() => {
                  registerAccount()
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
      )}
    </div>
  );
};

export default SignUpWeb;