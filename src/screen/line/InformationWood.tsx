import React, { useEffect, useState } from "react";
import LogoWoodify from "../../assets/logo_woodify.svg";
import { Link } from "react-router-dom";
import liff from "@line/liff";
import axios from "axios";
import path from "../../../path";
import { useNavigate } from "react-router-dom";
import { convertIsoToThaiDateTime, getImage } from "../../tools/tools";
import Loading from "../component/Loading";
import coverTree from "../../assets/cover-pic-ประดู่.png"

const InformationWood: React.FC = () => {
  const [wood, setWood] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const router = useNavigate();

  const getWoodData = async () => {
    await axios.get(`${path}/wood`)
      .then((res) => {
        setWood(res.data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    getWoodData()
  }, [])

  return (
    <div className="Kanit bg-[#CEDEBD] min-h-screen flex flex-col p-5">
      {isLoading ? <div className="flex items-center justify-center flex-1 h-full"><Loading /></div> : (
        <div className="grid grid-cols-2 gap-5">
          {wood && wood.map((data) => {
            return (
              <div className="flex flex-col items-center col-span-2 space-y-3 box-shadow p-3 rounded-[10px] bg-white">
                <img src={getImage(data.wood_image[0].path)} className="w-full aspect-[1.73/1] object-cover rounded-[10px]" alt="" />
                <p className="text-[20px] font-semibold">{data.common_name}</p>
                <p className="text-left text-ellipsis line-clamp-3 text-[16px] font-medium">{data.place_of_origin}</p>
                <button onClick={() => router(`/line/wood_detail/${data.w_id}`)} className="w-full flex justify-center py-2 bg-[#3C6255] roundedd-[8px] rounded-[5px] box-shadow">
                  <p className="text-white">รายละเอียด</p>
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  );
};

export default InformationWood;
