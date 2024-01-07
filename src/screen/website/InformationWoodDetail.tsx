import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import arrowIcon from "../../assets/arrow-left-icon.svg"
import arrowLeft from "../../assets/arrow-left-carousel.svg"
import arrowRight from "../../assets/arrow-right-carousel.svg"
import Carousel from "react-elastic-carousel";

const InformationWoodDetail: React.FC = () => {
  return (
    <div className="w-full Kanit flex flex-col min-h-screen">
      <div className="flex mt-10">
        <img src={arrowIcon} alt="" />
        <p className="text-[24px] font-semibold ml-6">ข้อมูลต้นแดง</p>
      </div>
      <Carousel></Carousel>
    </div>
  );
};

export default InformationWoodDetail;
