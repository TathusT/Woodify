import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import arrowIcon from "../../assets/arrow-left-icon.svg"
import arrowLeft from "../../assets/arrow-left-carousel.svg"
import arrowRight from "../../assets/arrow-right-carousel.svg"
import Slider from "react-slick";
import img1 from "../../assets/cover-pic-ประดู่.png"
import img2 from "../../assets/cover-pic-พยุง.png"
import img3 from "../../assets/cover-pic-พะยอม.jpg"
import img4 from "../../assets/cover-pic-ประดู่.png"
import img5 from "../../assets/cover-pic-พยุง.png"
import img6 from "../../assets/cover-pic-พะยอม.jpg"

const InformationWoodDetail: React.FC = () => {
  const slides = [img1, img2, img3, img4, img5, img6];
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    centerMode: true,
    slidesToShow: 3,
    slidesToScroll: 6,
    initialSlide: 0,
    nextArrow: <img src={arrowRight} alt="" />,
    prevArrow: <img src={arrowLeft} alt="" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className="w-full Kanit flex flex-col min-h-screen">
      <div className="flex mt-10">
        <img src={arrowIcon} alt="" />
        <p className="text-[24px] font-semibold ml-6">ข้อมูลต้นแดง</p>
      </div>
      <div className="py-7 px-8 bg-white box-shadow rounded-[10px] mt-10">
        <Slider {...settings}>
          {slides.map((img) => (
            <div>
              <img className="rounded-[10px] bg-contain aspect-[1.73/1] bg-center" src={img} alt="" />
            </div>
            ))}
        </Slider>
      </div>
      <p className="text-[20px] font-semibold mt-4">รายละเอียดต้นไม้</p>
      <div className="mt-3 bg-white box-shadow rounded-[10px] p-5 text-[20px] font-semibold space-y-6">
            <div className="flex items-center space-x-3">
              <div className="h-4 w-4 rounded-full bg-[#3C6255]"></div>
              <p>ชื่อสามัญ : แดง</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex items-start h-full">
                <div className="h-4 w-4 rounded-full bg-[#3C6255] mt-2"></div>
              </div>
              <p>ชื่อการค้า-ชื่ออังกฤษ :  ironwood, Daeng</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex items-start h-full">
                <div className="h-4 w-4 rounded-full bg-[#3C6255] mt-2"></div>
              </div>
              <p>ชื่อพฤษศาสตร์ : Xylia xylocarpa (Roxb.) W. Theob</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex items-start h-full">
                <div className="h-4 w-4 rounded-full bg-[#3C6255] mt-2"></div>
              </div>
              <p>วงศ์ : FABACEAE</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex items-start h-full">
                <div className="h-4 w-4 rounded-full bg-[#3C6255] mt-2"></div>
              </div>
              <p>ถิ่นกำเนิด : ขึ้นทั่วไปในป่าเบญจพรรณแล้ง ทางเหนือ ภาคกลาง ตะวันกลาง ตะวันออกเฉียงเหนือ และภาคใต้</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex items-start h-full">
                <div className="h-4 w-4 rounded-full bg-[#3C6255] mt-2"></div>
              </div>
              <p>ลักษณะเนื้อไม้ : สีแดงหรือน้ำตาลอมแดง เสี้ยนสนเป็นคลื่น เนื้อค่อนข้างละเอียด</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex items-start h-full">
                <div className="h-4 w-4 rounded-full bg-[#3C6255] mt-2"></div>
              </div>
              <p>ลักษณะทางกายวิภาค : เห็นได้ด้วยแว่นขยาย 10-15 เท่า (handlens) พอร์เป็นแบบ พอร์เดี่ยวส่วนมาก พอร์แฝดมีน้อย การเรียงตัวมีทั้งแบบ solitary และ oblique การกระจายเป็นแบบ กระจัดกระจาย (diffuse porous) ทางภายใน พอร์มี ไทโลส (tylose) เกือบทุกพอร์ พอร์มีขนาดปานกลาง เส้นเรย์เห็นชัด</p>
            </div>
      </div>
      <div className="flex justify-end mt-6">
            <div className="py-2 px-8 rounded-[10px] bg-[#61876E]">
              <p className="text-[20px] font-semibold text-white">แก้ไขข้อมูล</p>
            </div>
      </div>
    </div>
  );
};

export default InformationWoodDetail;
