import React, { useEffect, useState } from "react";
import { Select, Input, Modal } from "antd";
import add from "../../assets/add.svg";
import search from "../../assets/search.svg";
import Loading from "../component/Loading";
import sortIcon from "../../assets/sort-icon.svg"
import selectIcon from "../../assets/select-icon.svg"
import garbageIcon from "../../assets/garbage-red-icon.svg"
import eye from "../../assets/open_eye_green.svg"
import closeEye from "../../assets/close_eye_red.svg"
import axios from "axios";
import path from "../../../path";
import { convertIsoToThaiDateTime } from "../../tools/tools";

const Manual: React.FC = () => {
  const [modalDeleteManual, setmodalDeleteManual] = useState(false);
  const [dataManual, setDataManual] = useState<any>()
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  function clickModal() {
    setmodalDeleteManual(true)
  }

  const getManual = async () => {
    await axios(`${path}/all_manual`).then((res) => { setDataManual(res.data) }).catch((err) => console.log(err))
  }

  useEffect(() => {
    getManual();
  }, [])

  return (
    <div className="w-full Kanit flex flex-col min-h-screen">
      <div className="flex mt-10 justify-between">
        <p className="text-[24px] font-semibold">คู่มือใช้งานเบื้องต้น</p>
        <div className="flex items-center space-x-3">
          <p className="font-semibold">แสดง</p>
          <Select
            defaultValue="10 แถว"
            suffixIcon={<img src={selectIcon}></img>}
            className="h-full"
            style={{ width: 150 }}
            onChange={handleChange}
            options={[
              { value: "10 แถว", label: "10 แถว" },
              { value: "20 แถว", label: "20 แถว" },
              { value: "30 แถว", label: "30 แถว" },
            ]}
          />
          <Select
            defaultValue="อัพเดทล่าสุด"
            suffixIcon={<img src={sortIcon}></img>}
            className="h-full"
            style={{ width: 150 }}
            onChange={handleChange}
            options={[
              { value: "ทั้งหมด", label: "ทั้งหมด" },
              { value: "อัพเดทล่าสุด", label: "อัพเดทล่าสุด" },
            ]}
          />
          <Select
            defaultValue="สถานะทั้งหมด"
            suffixIcon={<img src={selectIcon}></img>}
            className="h-full"
            style={{ width: 150 }}
            onChange={handleChange}
            options={[
              { value: "สถานะแสดง", label: "สถานะแสดง" },
              { value: "สถานะไม่แสดง", label: "สถานะไม่แสดง" },
              { value: "สถานะทั้งหมด", label: "สถานะทั้งหมด" },
            ]}
          />
          <div className="h-full">
            <Input className="h-full w-[280px] font-semibold" suffix={<img src={search} />} />
          </div>
          <div className="bg-[#3C6255] h-full flex justify-center space-x-2 items-center px-3 rounded-[8px] text-white cursor-pointer">
            <p>เพื่มคู่มือ</p>
            <img src={add} alt="" />
          </div>
        </div>
      </div>
      <table className="table-auto w-full mt-8 border-spacing-y-4 border-separate">
        <thead>
          <tr className="w-full font-bold">
            <th className="pb-5" style={{ width: 100 }}>ลำดับ</th>
            <th className="pb-5" style={{ width: 300 }}>ชื่อคู่มือ</th>
            <th style={{ width: 550 }}></th>
            <th className="pb-5">สถานะ</th>
            <th className="pb-5">อัปเดดล่าสุด</th>
            <th className="pb-5">ลบคู่มือ</th>
          </tr>
        </thead>
        <tbody>
          {dataManual && dataManual.map((manual, index) => {
            return (
              <tr key={index} className="bg-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] rounded-[10px] font-semibold">
                <td className="py-6 rounded-l-[10px] text-center">{index + 1}</td>
                <td className="py-5 text-center">{manual.topic}</td>
                <td></td>
                <td className="py-5 text-center">
                  <div className="flex justify-center">
                    <img src={manual.status ? eye : closeEye} alt="" />
                  </div>
                </td>
                <td className="py-5 text-[#3C6255]">
                  <div className="flex justify-center items-center">
                    <p>{convertIsoToThaiDateTime(manual.update_at)}</p>
                  </div>
                </td>
                <td className="py-5 rounded-r-[10px] text-center">
                  <div onClick={() => clickModal()} className="flex justify-center">
                    <img className="cursor-pointer" src={garbageIcon} alt="" />
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {/* modal */}
      <Modal
        title={[
          <div className="text-center text-[24px] mt-4">
            <p>ลบข้อมูลคู่มือใช้งานเบื้องต้น</p>
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
        <div className="flex justify-center my-10">
          <p className="text-lg font-semibold">คุณต้องการลบข้อมูล การใช้งานระบบเบื้องต้น ใช่หรือไม่?</p>
        </div>
      </Modal>
    </div>
  );
};

export default Manual;
