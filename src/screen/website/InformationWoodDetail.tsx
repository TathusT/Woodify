import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import arrowIcon from "../../assets/arrow-left-icon.svg"
import arrowLeft from "../../assets/arrow-left-carousel.svg"
import arrowRight from "../../assets/arrow-right-carousel.svg"
import Slider from "react-slick";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getImage } from "../../tools/tools";
import Loading from "../component/Loading";
import axios from "axios";
import path from "../../../path";


const MySlider = ({ slides }: { slides: string[] }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slides.length > 4 ? 4 : slides.length,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <img src={arrowRight} alt="" />,
    prevArrow: <img src={arrowLeft} alt="" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
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
    <Slider {...settings}>
      {slides.map((img: any) => (
        <div>
          <img className="rounded-[10px] bg-contain bg-center w-96 h-60 object-cover aspect-[1.73/1]" src={getImage(img.path)} alt="" />
        </div>
      ))}
    </Slider>
  );
};



const InformationWoodDetail: React.FC = () => {
  const { w_id } = useParams();
  const [wood, setWood] = useState<any>();
  const [slides, setSlides] = useState<any>();
  const router = useNavigate();

  useEffect(() => {
    axios.get(`${path}/wood/${w_id}`)
      .then((res) => {
        setWood(res.data[0])
        setSlides(res.data[0].wood_image)
      }).catch((err) => {
        console.log(err);
      })
  }, [])
  return (
    <div className="w-full Kanit flex flex-col min-h-screen">
      <div className="flex mt-10">
        <img className="cursor-pointer" onClick={() => {router('/admin/information_wood')}} src={arrowIcon} alt="" />
        <p className="text-[32px] font-semibold ml-6">ข้อมูลต้น{wood.common_name}</p>
      </div>
      {slides && (
        <div className={`py-7 px-8 bg-white box-shadow rounded-[10px] mt-10 ${slides.length <= 4 ? 'flex justify-center' : ""}`}>
          <MySlider slides={slides} />
        </div>
      )}
      <p className="text-[20px] mt-4">รายละเอียดต้นไม้</p>
      {wood && (
        <div className="mt-3 bg-white box-shadow rounded-[10px] p-5 text-[20px] space-y-6">
          <div className="flex items-center space-x-3">
            <div className="h-4 w-4 rounded-full bg-[#3C6255]"></div>
            <p>ชื่อสามัญ : {wood.common_name}</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex items-start h-full">
              <div className="h-4 w-4 rounded-full bg-[#3C6255] mt-2"></div>
            </div>
            <p>ชื่อการค้า-ชื่ออังกฤษ :  {wood.eng_name}</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex items-start h-full">
              <div className="h-4 w-4 rounded-full bg-[#3C6255] mt-2"></div>
            </div>
            <p>ชื่อพฤษศาสตร์ : {wood.botanical_name}</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex items-start h-full">
              <div className="h-4 w-4 rounded-full bg-[#3C6255] mt-2"></div>
            </div>
            <p>วงศ์ : {wood.pedigree}</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex items-start h-full">
              <div className="h-4 w-4 rounded-full bg-[#3C6255] mt-2"></div>
            </div>
            <p>ถิ่นกำเนิด : {wood.place_of_origin}</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex items-start h-full">
              <div className="h-4 w-4 rounded-full bg-[#3C6255] mt-2"></div>
            </div>
            <p>ลักษณะเนื้อไม้ : {wood.wood_characteristics}</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex items-start h-full">
              <div className="h-4 w-4 rounded-full bg-[#3C6255] mt-2"></div>
            </div>
            <p>ลักษณะทางกายวิภาค : {wood.anatomical_characteristics}</p>
          </div>
        </div>
      )}
      <div className="flex justify-end mt-6">
        <Link to={`/admin/manage_information_wood/${w_id}`} className="py-2 px-8 rounded-[10px] bg-[#61876E]">
          <p className="text-[20px] text-white">แก้ไขข้อมูล</p>
        </Link>
      </div>
    </div>
  );
};

export default InformationWoodDetail;
