import React from "react";
import { DatePicker, Select, Space } from 'antd';
import LineDate from '../../assets/line.svg'
import { Line, Column } from "@ant-design/plots";

const LineChart : any = Line
const ColumnChart : any = Column

const RenderLine = () => {
  const data = [
    {
      name: "ไม้ประดู่",
      month: "ม.ค",
      count: 1000,
    },
    {
      name: "ไม้ประดู่",
      month: "ก.พ",
      count: 1500,
    },
    {
      name: "ไม้ประดู่",
      month: "มี.ค",
      count: 2000,
    },
    {
      name: "ไม้ประดู่",
      month: "เม.ย",
      count: 2500,
    },
    {
      name: "ไม้ประดู่",
      month: "พ.ค",
      count: 2700,
    },
    {
      name: "ไม้ประดู่",
      month: "มิ.ย",
      count: 3000,
    },
    {
      name: "ไม้ประดู่",
      month: "ก.ค",
      count: 2600,
    },
    {
      name: "ไม้ประดู่",
      month: "ส.ค",
      count: 2200,
    },
    {
      name: "ไม้ประดู่",
      month: "ก.ย",
      count: 3000,
    },
    {
      name: "ไม้ประดู่",
      month: "ต.ค",
      count: 3800,
    },
    {
      name: "ไม้ประดู่",
      month: "พ.ย",
      count: 4000,
    },
    {
      name: "ไม้ประดู่",
      month: "ธ.ค",
      count: 4900,
    },
    {
      name: "ไม้สัก",
      month: "ม.ค",
      count: 1000,
    },
    {
      name: "ไม้สัก",
      month: "ก.พ",
      count: 1500,
    },
    {
      name: "ไม้สัก",
      month: "มี.ค",
      count: 2000,
    },
    {
      name: "ไม้สัก",
      month: "เม.ย",
      count: 2500,
    },
    {
      name: "ไม้สัก",
      month: "พ.ค",
      count: 2700,
    },
    {
      name: "ไม้สัก",
      month: "มิ.ย",
      count: 3000,
    },
    {
      name: "ไม้สัก",
      month: "ก.ค",
      count: 2600,
    },
    {
      name: "ไม้สัก",
      month: "ส.ค",
      count: 2200,
    },
    {
      name: "ไม้สัก",
      month: "ก.ย",
      count: 3000,
    },
    {
      name: "ไม้สัก",
      month: "ต.ค",
      count: 3800,
    },
    {
      name: "ไม้สัก",
      month: "พ.ย",
      count: 4000,
    },
    {
      name: "ไม้สัก",
      month: "ธ.ค",
      count: 4900,
    },
    {
      name: "ไม้อีเม่ง",
      month: "ม.ค",
      count: 7000,
    },
    {
      name: "ไม้อีเม่ง",
      month: "ก.พ",
      count: 9000,
    },
    {
      name: "ไม้อีเม่ง",
      month: "มี.ค",
      count: 11000,
    },
    {
      name: "ไม้อีเม่ง",
      month: "เม.ย",
      count: 10000,
    },
    {
      name: "ไม้อีเม่ง",
      month: "พ.ค",
      count: 12000,
    },
    {
      name: "ไม้อีเม่ง",
      month: "มิ.ย",
      count: 10000,
    },
    {
      name: "ไม้อีเม่ง",
      month: "ก.ค",
      count: 9000,
    },
    {
      name: "ไม้อีเม่ง",
      month: "ส.ค",
      count: 9400,
    },
    {
      name: "ไม้อีเม่ง",
      month: "ก.ย",
      count: 10000,
    },
    {
      name: "ไม้อีเม่ง",
      month: "ต.ค",
      count: 8000,
    },
    {
      name: "ไม้อีเม่ง",
      month: "พ.ย",
      count: 9000,
    },
    {
      name: "ไม้อีเม่ง",
      month: "ธ.ค",
      count: 8000,
    },
    {
      name: "ไม้พะยูง",
      month: "ม.ค",
      count: 5343,
    },
    {
      name: "ไม้พะยูง",
      month: "ก.พ",
      count: 4566,
    },
    {
      name: "ไม้พะยูง",
      month: "มี.ค",
      count: 5675,
    },
    {
      name: "ไม้พะยูง",
      month: "เม.ย",
      count: 6534,
    },
    {
      name: "ไม้พะยูง",
      month: "พ.ค",
      count: 5000,
    },
    {
      name: "ไม้พะยูง",
      month: "มิ.ย",
      count: 5600,
    },
    {
      name: "ไม้พะยูง",
      month: "ก.ค",
      count: 4900,
    },
    {
      name: "ไม้พะยูง",
      month: "ส.ค",
      count: 4890,
    },
    {
      name: "ไม้พะยูง",
      month: "ก.ย",
      count: 7856,
    },
    {
      name: "ไม้พะยูง",
      month: "ต.ค",
      count: 6000,
    },
    {
      name: "ไม้พะยูง",
      month: "พ.ย",
      count: 7000,
    },
    {
      name: "ไม้พะยูง",
      month: "ธ.ค",
      count: 8976,
    },
    {
      name: "ไม้เก็ดเขาควาย",
      month: "ม.ค",
      count: 1324,
    },
    {
      name: "ไม้เก็ดเขาควาย",
      month: "ก.พ",
      count: 1232,
    },
    {
      name: "ไม้เก็ดเขาควาย",
      month: "มี.ค",
      count: 2434,
    },
    {
      name: "ไม้เก็ดเขาควาย",
      month: "เม.ย",
      count: 2222,
    },
    {
      name: "ไม้เก็ดเขาควาย",
      month: "พ.ค",
      count: 3333,
    },
    {
      name: "ไม้เก็ดเขาควาย",
      month: "มิ.ย",
      count: 2666,
    },
    {
      name: "ไม้เก็ดเขาควาย",
      month: "ก.ค",
      count: 2111,
    },
    {
      name: "ไม้เก็ดเขาควาย",
      month: "ส.ค",
      count: 1876,
    },
    {
      name: "ไม้เก็ดเขาควาย",
      month: "ก.ย",
      count: 2131,
    },
    {
      name: "ไม้เก็ดเขาควาย",
      month: "ต.ค",
      count: 4433,
    },
    {
      name: "ไม้เก็ดเขาควาย",
      month: "พ.ย",
      count: 5234,
    },
    {
      name: "ไม้เก็ดเขาควาย",
      month: "ธ.ค",
      count: 3234,
    },
  ];
  const config = {
    data,
    width: "100%",
    xField: "month",
    yField: "count",
    seriesField: "name",
    yAxis: {
      label: {
        formatter: (v) => {
          return v;
        },
        style: {
          fontSize: 20,
        },
      },
    },
    xAxis: {
      label: {
        style: {
          fontSize: 20,
        },
      },
    },
    legend: {
      position: "top",
      itemName: {
        style: {
          fontSize: 20,
        },
      },
    },
    itemName: {
      style: {
        fontSize: 20,
      },
    },
    tooltip: {
      domStyles: {
        "g2-tooltip-title": {
          fontSize: 40,
        },
        "g2-tooltip-list-item": {
          fontSize: 40,
        },
      },
    },
    smooth: true,
    animation: {
      appear: {
        animation: "path-in",
        duration: 5000,
      },
    },
  };
  return (
    <div>
      <LineChart {...config} />
    </div>
  );
}

const RenderColumn = () => {
  const data = [
    {
      typeWood: "ไม้สัก",
      count: 8300,
    },
    {
      typeWood: "ไม้ยาง",
      count: 7000,
    },
    {
      typeWood: "ไม้ประดู่",
      count: 2000,
    },
    {
      typeWood: "ไม้ชิงชัน",
      count: 12000,
    },
    {
      typeWood: "ไม้เก็ดแดง",
      count: 9465,
    },
    {
      typeWood: "ไม้อีเม่ง",
      count: 3452,
    },
    {
      typeWood: "ไม้กระพี้",
      count: 2134,
    },
    {
      typeWood: "ไม้แดงจีน",
      count: 4567,
    },
    {
      typeWood: "ไม้เก็ดเขาควาย",
      count: 2345,
    },
    {
      typeWood: "ไม้อีเฒ่า",
      count: 6784,
    },
    {
      typeWood: "ไม้เก็ดดำ",
      count: 9678,
    },
    {
      typeWood: "ไม้หมากพลูตั๊กแตน",
      count: 5678,
    },
    {
      typeWood: "ไม้พะยูง",
      count: 5780,
    },
  ];
  const config = {
    data,
    width: "100%",
    height: window.innerHeight/2.2,
    xField: "typeWood",
    yField: "count",
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
        fontSize: 15,
      },
    },
    xAxis: {
      label: {
        formatter: (text) => truncateLabel(text, 5),
        autoHide: true,
        autoRotate: false,
        style: {
          fontSize: 15,
        },
      },
    },
    yAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
        style: {
          fontSize: 15,
        },
      },
    },
    meta: {
      typeWood: {
        alias: "",
      },
      count: {
        alias: "จำนวน",
      },
    },
  };

  function truncateLabel(str, maxLength) {
    if (str.length > maxLength + 5) {
      return str.substring(0, maxLength + 5) + "...";
    }
    return str;
  }

  return (
    <div>
      <ColumnChart {...config} />
    </div>
  );
}



const DashBoard: React.FC = () => {
  return (
    <div className="p-4">
      <p className="text-4xl font-bold">หน้าหลัก</p>
      <div className="flex justify-between items-center">
        <div className="w-[70%]">
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold">จำนวนการตรวจสอบ</p>
            <div>
              <div className="flex justify-between mx-6 py-4">
                <div className="bg-white rounded-lg" style={{ width: "45%" }}>
                  <DatePicker placeholder="เลือกวันที่เริ่ม" format="DD-MM-YYYY" style={{ width: "100%" }} />
                </div>
                <img style={{ width: "6%" }} src={LineDate} alt="" />
                <div className="bg-white rounded-lg" style={{ width: "45%" }}>
                  <DatePicker placeholder="เลือกวันที่สิ้นสุด" format="DD-MM-YYYY" style={{ width: "100%" }} />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-2 rounded-lg border-2 border-gray-200">
            <RenderLine />
          </div>
        </div>
        <div className="w-[25%] space-y-3">
          <div>
            <p>จำนวนการตรวจสอบในวันนี้</p>
            <div className={`rounded-lg border-2 border-gray-200 w-full h-20 bg-white flex items-center justify-center`}>
              <p className="text-2xl font-bold">452 การตรวจ</p>
            </div>
          </div>
          <div>
            <p>จำนวนการลงทะเบียนในวันนี้</p>
            <div className={`rounded-lg border-2 border-gray-200 w-full h-20 bg-white flex items-center justify-center`}>
              <p className="text-2xl font-bold">20 ครั้ง</p>
            </div>
          </div>
          <div>
            <p>จำนวนการตรวจทั้งหมด</p>
            <div className={`rounded-lg border-2 border-gray-200 w-full h-20 bg-white flex items-center justify-center`}>
              <p className="text-2xl font-bold">3440 การตรวจ</p>
            </div>
          </div>
          <div>
            <p>จำนวนการตรวจที่รอการรับรอง</p>
            <div className={`rounded-lg border-2 border-gray-200 w-full h-20 bg-white flex items-center justify-center`}>
              <p className="text-2xl font-bold">20 การตรวจ</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 space-y-4">
        <p className="text-2xl font-bold">ประเภทไม้ที่ตรวจสอบ</p>
        <div className="bg-white p-2 rounded-lg border-2 border-gray-200">
          <RenderColumn />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
