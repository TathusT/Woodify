import React, {useState} from "react";
import LogoWoodify from "../../assets/logo_woodify.svg";
import { Link } from "react-router-dom";
import background from "../../assets/background-homepage.svg";
import grass from "../../assets/background-grass.svg";
const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#E6F2FD] Kanit">
      <div className="flex justify-between px-24 pt-7 items-center absolute w-full z-50">
        <img src={LogoWoodify} className="w-[96px]" alt="" />
        <div className="flex space-x-20">
        <a href="#home">
              หน้าหลัก
            </a>
            <a href="#about">
              เกี่ยวกับ
            </a>
            <a href="#contact">
              ติดต่อ
            </a>
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
      <div className="w-full min-h-screen">
        <div className="w-full flex justify-center items-center relative">
          <div className="w-[85%] absolute">
            <div className="mb-[35rem]">
              <p className="leading-[5rem] mb-[5rem] text-6xl font-lexend select-none">
                มาเริ่มการจัดการระบบการจำแนกไม้กัน<br />
                กดเพื่อเริ่มได้เลย!
              </p>
              <Link
                to={"/dashboard"}
                className="bg-[#3C6255] font-jura font-semibold text-lg text-white px-6 py-3.5 rounded-xl"
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
              <div className="font-jura text-2xl tracking-wider mt-10">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                <br /> incididunt ut labore et dolore magna aliqua. Aliquet enim tortor at auctor urna nunc.
                innovative solutions that
                <br />Convallis aenean et tortor at risus. At elementum eu facilisis sed odio morbi quis 
              </div>
              {/* <div className="font-jura text-2xl tracking-wider mt-10">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;At our core, we believe that everyone should have access to
                high-quality<br /> financial management tools, regardless of their
                income or background. That's why<br /> we've designed our products to
                be easy to use and affordable for everyone.
              </div> */}
            </div>
          </div>
        </div>
        <div className="w-full relative">
          <img src={grass} className="w-full" alt="" />
          <div className="w-full absolute bottom-[5rem] flex justify-center">
            <div className="w-[85%] flex justify-between">
              <div id="contact" className="flex font-jura flex-col">
                <p className="font-semibold text-4xl">CONTACT US</p>
                {/* <div className="collaborate py-4 text-xl">
                  <p>Phufa Rujipatsawat</p>
                  <p>Wongsapat Asavawongsanon</p>
                  <p>Tanavich Leksana</p>
                </div> */}
                <div className="flex space-x-3">
                  {/* <img src={icon_fb} alt="" />
                  <img src={icon_ig} alt="" />
                  <img src={icon_tw} alt="" />
                  <img src={icon_yt} alt="" /> */}
                </div>
              </div>
              <div className="h-full flex items-end">
                {/* <div className="font-jura space-y-4 text-right">
                  <div className="flex justify-end items-center font-jura">
                    <p className="text-3xl">Pocketmon</p>
                  </div>
                  <p className="text-xl">
                    FAQ | Terms of Use | Privacy Statement
                  </p>
                  <p className="text-xl">
                    © 2023 POCKETMON. ALL RIGHTS RESERVED.
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;