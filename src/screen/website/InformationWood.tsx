import React, { useEffect, useState } from "react";
import { Select, Input, Modal } from "antd";
import garbage from "../../assets/garbage.svg";
import add from "../../assets/add.svg";
import search from "../../assets/search.svg";
import eye from "../../assets/open_eye_green.svg"
import closeEye from "../../assets/close_eye_red.svg"
import axios from "axios";
import path from "../../../path";
import { convertIsoToThaiDateTime, getImage } from "../../tools/tools";
import Loading from "../component/Loading";
const InformationWood: React.FC = () => {
  const [infoWood, setInfoWood] = useState<any>()
  const [isLoading, setIsLoading] = useState(true);
  const [checkDelete, setCheckDelete] = useState(false)
  const [modalDeleteManual, setmodalDeleteManual] = useState(false);
  const [checkTreeDelete, setCheckTreeDelete] = useState('');
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    axios.get(`${path}/wood`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    })
      .then((res) => {
        setInfoWood(res.data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  console.log(infoWood);
  

  return (
    <div className="w-full Kanit flex flex-col min-h-screen">
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
            <Input className="h-full w-[280px]" suffix={<img src={search} />} />
          </div>
          <div className="bg-[#3C6255] h-full flex justify-center space-x-1 items-center px-2 rounded-[8px] text-white cursor-pointer">
            <p>เพิ่มพันธุ์ไม้</p>
            <img src={add} alt="" />
          </div>
          {
            (checkDelete?
            <div onClick={() => setCheckDelete(!checkDelete)} className="bg-[#B0B0B0] h-full flex justify-center space-x-1 items-center px-12 rounded-[8px] text-white cursor-pointer">
              <p>ยกเลิก</p>
            </div>
            :
            <div onClick={() => setCheckDelete(!checkDelete)} className="bg-[#C95555] h-full flex justify-center space-x-1 items-center px-2 rounded-[8px] text-white cursor-pointer">
              <p>เลือกลบพันธุ์ไม้</p>
              <img src={garbage} alt="" />
            </div>
            )
          }
        </div>
      </div>
      {isLoading ? <div className="flex items-center justify-center flex-1 "><Loading /></div> : <div className="grid grid-cols-8 gap-9 my-10 ">
        {
          infoWood && infoWood.map((info, index) => {
            return (
              <div key={info.w_id} className="flex flex-col items-center col-span-2 space-y-3 box-shadow p-3 rounded-[10px] bg-white">
                <img src={getImage(info.wood_image[0]?.path)} className="w-full aspect-[1.73/1] rounded-[10px]" alt="" />
                <p className="text-[20px] font-semibold">{info.common_name}</p>
                <p className="text-left text-ellipsis line-clamp-2 text-[16px] font-medium">{info.place_of_origin}</p>
                <div className="flex space-x-2 text-[#3C6255] font-medium">
                  <p>อัพเดทล่าสุด</p>
                  <p>{convertIsoToThaiDateTime(info.update_at)}</p>
                  {
                    info.status ? (<img src={eye} alt="" />) : (<img src={closeEye} alt="" />)
                  }
                </div>
                {
                  (checkDelete?    
                  <button onClick={() => {
                    setmodalDeleteManual(true)
                    setCheckTreeDelete(info.common_name)
                  }
                  } className="w-full flex justify-center py-2 bg-[#C95555] roundedd-[8px] rounded-[5px] box-shadow">
                    <p className="text-white">ลบข้อมูล</p>
                  </button>
                  :
                  <button className="w-full flex justify-center py-2 bg-[#3C6255] roundedd-[8px] rounded-[5px] box-shadow">
                    <p className="text-white">ดูข้อมูล</p>
                  </button>
                  )
                }
              </div>
            )
          })
        }
      </div>}
      <Modal
        title={[
          <div className="text-center text-[24px] mt-4">
            <p>ลบข้อมูลต้น{checkTreeDelete}</p>
          </div>
        ]}
        className="Kanit"
        centered
        open={modalDeleteManual}
        width={550}
        onCancel={() => setmodalDeleteManual(false)}
        footer={[
          <div className="flex items-center justify-center space-x-2 font-semibold pt-3 mb-4">
            <div onClick={() => setmodalDeleteManual(false)} className="bg-[#3C6255] py-2 w-1/4 text-white cursor-pointer rounded-[10px] text-center">
              <p>ยืนยันการลบ</p>
            </div>
            <div onClick={() => setmodalDeleteManual(false)} className="bg-[#C1C1C1] py-2 w-1/4 cursor-pointer rounded-[10px] text-center">
              <p>ยกเลิก</p>
            </div>
          </div>
        ]}
      >
        <div className="flex justify-center my-10 space-x-3">
          <p className="text-lg font-semibold">คุณต้องการลบข้อมูล</p>
          <p className="text-lg font-semibold">ต้น{checkTreeDelete}</p>
          <p className="text-lg font-semibold">ใช่หรือไม่?</p>
        </div>
      </Modal>
    </div>
  );
};
export default InformationWood;