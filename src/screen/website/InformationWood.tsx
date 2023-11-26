import React, { useEffect, useState } from "react";
import { Select, Input} from "antd";
import garbage from "../../assets/garbage.svg";
import add from "../../assets/add.svg";
import search from "../../assets/search.svg";
import eye from "../../assets/open_eye_green.svg"
import closeEye from "../../assets/close_eye_red.svg"
import axios from "axios";
import path from "../../../path";
import { convertIsoToThaiDateTime } from "../../tools/tools";
const InformationWood: React.FC = () => {
  const [infoWood, setInfoWood] = useState<any>()
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  useEffect(() =>{
    axios.get(`${path}/wood`)
    .then((res) =>{
      console.log(res.data);
      
      setInfoWood(res.data)
    })
    .catch((err) =>{
      console.log(err);
    })
  }, [])

  return (
    <div className="w-full Kanit">
      <div className="flex mt-10 justify-between">
        <p className="text-[24px] font-semibold">จัดการข้อมูลไม้แต่ละพันธุ์</p>
        <div className="flex items-center space-x-3">
          <Select
            defaultValue="ทั้งหมด"
            className="h-full"
            style={{ width: 130 }}
            onChange={handleChange}
            options={[
              { value: "สถานะแสดง", label: "สถานะแสดง" },
              { value: "สถานะไม่แสดง", label: "สถานะไม่แสดง" },
              { value: "อัพเดทล่าสุด", label: "อัพเดทล่าสุด" },
              { value: "ทั้งหมด", label: "ทั้งหมด" },
            ]}
          />
          <div className="h-full">
            <Input className="h-full w-[280px]" suffix={<img src={search} />}/>
          </div>
          <div className="bg-[#3C6255] h-full flex justify-center space-x-1 items-center px-2 rounded-[8px] text-white cursor-pointer">
            <p>เพิ่มพันธุ์ไม้</p>
            <img src={add} alt="" />
          </div>
          <div className="bg-[#C95555] h-full flex justify-center space-x-1 items-center px-2 rounded-[8px] text-white cursor-pointer">
            <p>เลือกลบพันธุ์ไม้</p>
            <img src={garbage} alt="" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-8 gap-9 my-10 ">
        {
          infoWood && infoWood.map((info, index) => {
            return(
              <div key={info.w_id} className="flex flex-col items-center col-span-2 space-y-3 box-shadow p-3 rounded-[10px] bg-white">
                  <img src={info.image} className="w-full aspect-[1.73/1] rounded-[10px]" alt="" />
                  <p className="text-[20px] font-semibold">{info.common_name}</p>
                  <p className="text-left text-ellipsis line-clamp-3 text-[16px] font-medium">{info.place_of_origin}</p>
                  <div className="flex space-x-2 text-[#3C6255] font-medium">
                    <p>อัพเดทล่าสุด</p>
                    <p>{convertIsoToThaiDateTime(info.update_at)}</p>
                    {
                      info.status ? (<img src={eye} alt="" />) : (<img src={closeEye} alt="" />)
                    }
                  </div>
                  <button className="w-full flex justify-center py-2 bg-[#3C6255] roundedd-[8px] rounded-[5px] box-shadow">
                    <p className="text-white">ดูข้อมูล</p>
                  </button>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};
export default InformationWood;