import React, { useEffect, useState } from "react";
import LogoWoodify from "../../assets/logo_woodify.svg";
import { Link, useLocation } from "react-router-dom";
import liff from "@line/liff";
import axios from "axios";
import path from "../../../path";
import Loading from "../component/Loading";
import { useNavigate } from "react-router-dom";

const RegisterLine: React.FC = () => {
  const location = useLocation();
  const data = location.state?.data;
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    localStorage.clear();
    liff.init({
      liffId: '2001173297-AoDv0582'
    }).then(() => {

    })
      .catch(err => {
        console.error("Error initializing LIFF:", err);
      });
  }, [])

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState()
  async function registerAccount() {
    setIsLoading(true)
    await axios.put(`${path}/update_verify_data`, {
      firstname: firstname,
      lastname: lastname,
      email: email,
      phone: phone,
      line_id: data.user.line_id
    })
      .then((res) => {
        if (res.data.message == 'update_success') {
          localStorage.clear();
          localStorage.setItem('access_token', data.line_access_token)
          liff.closeWindow();
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div className="Kanit bg-[#CEDEBD] min-h-screen flex flex-col">
      {isLoading ? <div className="flex items-center justify-center flex-1 h-full"><Loading /></div> : (
        <div className="flex flex-col min-h-screen">
          <div className="flex justify-center py-8">
            <img src={LogoWoodify} alt="logo_woodify" />
          </div>
          <div className="pt-12 bg-white flex-grow" style={{ borderTopLeftRadius: "2.5rem", borderTopRightRadius: "2.5rem" }}>
            <p className="text-center text-3xl">สมัครสมาชิก</p>
            <div className="px-12 pt-2 space-y-4">
              <div>
                <p className="text-[#5C5C5C] text-xl">ชื่อจริง</p>
                <input
                  onChange={(text) => {
                    setFirstname(text.target.value)
                  }}
                  defaultValue={firstname}
                  className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="line_firstname"
                  type="text"
                />
              </div>
              <div>
                <p className="text-[#5C5C5C] text-xl">นามสกุล</p>
                <input
                  onChange={(text) => {
                    setLastname(text.target.value)
                  }}
                  defaultValue={lastname}
                  className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="line_lastname"
                  type="text"
                />
              </div>
              <div>
                <p className="text-[#5C5C5C] text-xl">เบอร์โทรศัพท์</p>
                <input
                  onChange={(text) => {
                    const input = text.target.value;
                    const numericInput: any = input.replace(/\D/g, '');
                    setPhone(numericInput)
                  }}
                  value={phone}
                  className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="line_phone"
                  type="tel"
                  pattern="[0-9]*"
                />
              </div>
              <div>
                <p className="text-[#5C5C5C] text-xl">อีเมล</p>
                <input
                  onChange={(text) => {
                    setEmail(text.target.value)
                  }}
                  defaultValue={email}
                  className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="line_email"
                  type="text"
                />
              </div>
              <div onClick={() => registerAccount()} className="bg-[#3C6255] rounded-xl py-2 px-3 cursor-pointer">
                <p className="text-center text-xl text-white">สมัครสมาชิก</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterLine;
