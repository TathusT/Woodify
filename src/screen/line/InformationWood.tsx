import React, { useEffect, useState } from "react";
import LogoWoodify from "../../assets/logo_woodify.svg";
import { Link } from "react-router-dom";
import liff from "@line/liff";
import axios from "axios";
import path from "../../../path";
import { useNavigate } from "react-router-dom";
import { convertIsoToThaiDateTime, getImage } from "../../tools/tools";
import coverTree from "../../assets/cover-pic-ประดู่.png"

const InformationWood: React.FC = () => {
  return (
    <div className="Kanit bg-[#CEDEBD] min-h-screen flex flex-col p-5">
        <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col items-center col-span-2 space-y-3 box-shadow p-3 rounded-[10px] bg-white">
                <img src={coverTree}  className="w-full aspect-[1.73/1] rounded-[10px]" alt="" />
                <p className="text-[20px] font-semibold">ต้นมะเกลือ</p>
                <p className="text-left text-ellipsis line-clamp-3 text-[16px] font-medium">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard</p>
                <button className="w-full flex justify-center py-2 bg-[#3C6255] roundedd-[8px] rounded-[5px] box-shadow">
                <p className="text-white">รายละเอียด</p>
                </button>
            </div>
            <div className="flex flex-col items-center col-span-2 space-y-3 box-shadow p-3 rounded-[10px] bg-white">
                <img src={coverTree}  className="w-full aspect-[1.73/1] rounded-[10px]" alt="" />
                <p className="text-[20px] font-semibold">ต้นมะเกลือ</p>
                <p className="text-left text-ellipsis line-clamp-3 text-[16px] font-medium">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard</p>
                <button className="w-full flex justify-center py-2 bg-[#3C6255] roundedd-[8px] rounded-[5px] box-shadow">
                <p className="text-white">รายละเอียด</p>
                </button>
            </div>
        </div>
    </div>
  );
};

export default InformationWood;
