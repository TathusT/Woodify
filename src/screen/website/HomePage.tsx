import React, {useState} from "react";
import LogoWoodify from "../../assets/logo_woodify.svg";
import { Link } from "react-router-dom";
import background from "../../assets/background-homepage.svg";
import grass from "../../assets/background-grass.svg";
import facebook from "../../assets/icon-facebook.svg"
import instagram from "../../assets/icon-instagram.svg"
import youtube from "../../assets/icon-youtube.svg"
import twitter from "../../assets/icon-twitter.svg"
import rfd from "../../assets/icon-rfd.svg"
import logoIt from "../../assets/it-logo.png"
const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#E6F2FD] Kanit">
      <div className="flex justify-between px-24 pt-7 items-center absolute w-full z-50">
        <img src={LogoWoodify} className="w-[96px]" alt="" />
        <div className="flex space-x-20">
            <a className="text-[20px]" href="#home">
              หน้าหลัก
            </a>
            <a className="text-[20px]" href="#about">
              เกี่ยวกับ
            </a>
            <a className="text-[20px]" href="#contact">
              ติดต่อ
            </a>
        </div>
        <div className="flex space-x-3">
            <Link to={"/admin/login"} className="px-4 py-2 rounded-md bg-white">
                <p>เข้าสู่ระบบ</p>
            </Link>
        </div>
      </div>
      <div className="w-full min-h-screen">
        <div className="w-full flex justify-center items-center relative">
          <div className="w-[85%] absolute">
            <div className="mb-[40rem]">
              <p className="leading-[5rem] mb-[3rem] text-[48px] font-lexend select-none">
                มาเริ่มการจัดการระบบจำแนกชนิดไม้เศรษฐกิจกัน<br />
                กดเพื่อเริ่มได้เลย!
              </p>
              <Link
                to={"/admin/login"}
                className="bg-[#3C6255] font-semibold text-lg text-white px-8 py-3 rounded-xl"
              >
                เริ่มเลย
              </Link>
            </div>
          </div>
          <img src={background} className="w-full" alt="" />
        </div>
        <div className="w-full absolute flex justify-center z-10">
          <div className="w-[70%]">
            <div id="about" className="absolute">
              <div className="text-4xl w-32 border-b-4 pb-1 border-[#07636B]">
                เกี่ยวกับ
              </div>
              <div className="text-2xl tracking-wider mt-10">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                <br /> incididunt ut labore et dolore magna aliqua. Aliquet enim tortor at auctor urna nunc.
                innovative solutions that
                <br />Convallis aenean et tortor at risus. At elementum eu facilisis sed odio morbi quis 
              </div>
            </div>
          </div>
        </div>
        <div className="w-full relative">
          <img src={grass} className="w-full" alt="" />
        </div>
        <div id="contact" className="w-full flex justify-between font-semibold px-12 py-10">
              <div className="space-y-3">
                <p className="text-[36px]">ติดต่อเรา</p>
                <p className="text-[20px]">โทรศัพท์: 025614292-3</p>
                <p className="text-[20px]">Email: saraban@forest.go.th</p>
                <div className="flex space-x-5">
                  <img src={facebook} alt="" />
                  <img src={instagram} alt="" />
                  <img src={youtube} alt="" />
                  <img src={twitter} alt="" />
                </div>
              </div>
              <div className="flex space-y-5 flex-col justify-end">
                <div className="flex space-x-3 justify-end">
                  <img src={rfd} alt="" />
                  <img src={LogoWoodify} width={96} alt="" />
                  <img src={logoIt} width={96} alt="" />
                </div>
                <p>© 2024 COPYRIGHT WOODIFY. ALL RIGHTS RESERVED.</p>
              </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;