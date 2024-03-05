import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import arrowIcon from "../../assets/arrow-left-icon.svg"
import { Link, useNavigate, useParams } from "react-router-dom";
import { getImage } from "../../tools/tools";
import Loading from "../component/Loading";
import axios from "axios";
import path from "../../../path";


const ManualDetail: React.FC = () => {
  const { w_id } = useParams();
  const [wood, setWood] = useState<any>();
  const [slides, setSlides] = useState<any>();
  const router = useNavigate();
  return (
    <div className="w-full Kanit flex flex-col min-h-screen">
      <div className="flex mt-10">
        <img className="cursor-pointer" onClick={() => {router('/admin/manual')}} src={arrowIcon} alt="" />
        <p className="text-[24px] font-semibold ml-6">คู่มือการใช้งานระบบเบิ้องต้น</p>
      </div>
      <div className="w-full flex justify-center">
        <div className="rounded-[8px] bg-white w-[385px] h-[248px] box-shadow flex justify-center items-center">
          
        </div>
      </div>
      <p className="text-[20px] font-semibold mt-4">รายละเอียดต้นไม้</p>
        <div className="w-full rounded-[10px] bg-white h-[530px] mt-3 box-shadow">
        </div>
      <div className="flex justify-end mt-6">
        <Link to='' className="py-2 px-8 rounded-[10px] bg-[#61876E]">
          <p className="text-[20px] font-semibold text-white">แก้ไขข้อมูล</p>
        </Link>
      </div>
      <p className='text-center text-xl font-semibold pb-3'>© 2024 COPYRIGHT 2023 WOODIFY. ALL RIGHTS RESERVED.</p>
    </div>
  );
};

export default ManualDetail;
