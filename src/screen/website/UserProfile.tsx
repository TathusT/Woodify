import React, { useRef, useEffect, useState } from 'react';
import arrowIcon from "../../assets/arrow-left-icon.svg"
import { Pie, measureTextWidth } from '@ant-design/plots';
import sortIcon from "../../assets/sort-icon.svg"
import selectIcon from "../../assets/select-icon.svg"
import search from "../../assets/search.svg";
import clockIcon from "../../assets/last-status-icon.svg"
import doorIcon from "../../assets/Logout-icon.svg"
import { Select, Input, Dropdown, MenuProps, Modal } from "antd";

const UserProfile: React.FC = () => {
    const [widthBox, setWidthBox] = useState(0)
    const divRef = useRef<HTMLDivElement>(null);
    const handleChange = (value: string) => {
      console.log(`selected ${value}`);
    };
    useEffect(() => {
        const handleResize = () => {
        if (divRef.current) {
            const divWidth = divRef.current.offsetWidth;
            setWidthBox(divWidth)
        }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);
    type DataType = Array<{
        typeWood: string;
        value: number;
        color: string
    }>;
    type DataStatusType = Array<{
        typeStatus: string;
        value: number;
        color: string
    }>;
    const [data, setData] = useState([
        {
            typeWood: "ไม้สัก",
            value: 8300,
            color: '#F7E987'
        },
        {
            typeWood: "ไม้ยาง",
            value: 7000,
            color: '#5B9A8B'
        },
        {
            typeWood: "ไม้ประดู่",
            value: 2000,
            color: '#445069'
        },
        {
            typeWood: "ไม้ชิงชัน",
            value: 12000,
            color: '#7B61FF'
        },
        {
            typeWood: "ไม้เก็ดแดง",
            value: 9465,
            color: '#DF8633'
        },
        {
            typeWood: "ไม้อีเม่ง",
            value: 3452,
            color: '#0B56F1'
        },
        {
            typeWood: "ไม้กระพี้",
            value: 2134,
            color: '#7E57C2'
        },
        {
            typeWood: "ไม้แดงจีน",
            value: 4567,
            color: '#26A69A'
        },
        {
            typeWood: "ไม้เก็ดเขาควาย",
            value: 2345,
            color: '#FF7043'
        },
        {
            typeWood: "ไม้อีเฒ่า",
            value: 6784,
            color: '#8E24AA'
        },
        {
            typeWood: "ไม้เก็ดดำ",
            value: 9678,
            color: '#7CB342'
        },
        {
            typeWood: "ไม้หมากพลูตั๊กแตน",
            value: 5678,
            color: '#0288D1'
        },
        {
            typeWood: "ไม้พะยูง",
            value: 5780,
            color: '#D81B60'
        },
    ]);
    const AllPie = () => {
        function renderStatistic(containerWidth, text, style) {
          const { width: textWidth, height: textHeight } = measureTextWidth(text, style);
          const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2
      
          let scale = 1;
      
          if (containerWidth < textWidth) {
            scale = Math.min(Math.sqrt(Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))), 1);
          }
      
          const textStyleStr = `width:${containerWidth}px;`;
          return `<div style="${textStyleStr};font-size:${scale}em;line-height:${scale < 1 ? 1 : 'inherit'};">${text}</div>`;
        }
      
        const [data, setData] = useState([
            {
                typeWood: "ไม้สัก",
                value: 8300,
                color: '#F7E987'
            },
            {
                typeWood: "ไม้ยาง",
                value: 7000,
                color: '#5B9A8B'
            },
            {
                typeWood: "ไม้ประดู่",
                value: 2000,
                color: '#445069'
            },
            {
                typeWood: "ไม้ชิงชัน",
                value: 12000,
                color: '#7B61FF'
            },
            {
                typeWood: "ไม้เก็ดแดง",
                value: 9465,
                color: '#DF8633'
            },
            {
                typeWood: "ไม้อีเม่ง",
                value: 3452,
                color: '#0B56F1'
            },
            {
                typeWood: "ไม้กระพี้",
                value: 2134,
                color: '#7E57C2'
            },
            {
                typeWood: "ไม้แดงจีน",
                value: 4567,
                color: '#26A69A'
            },
            {
                typeWood: "ไม้เก็ดเขาควาย",
                value: 2345,
                color: '#FF7043'
            },
            {
                typeWood: "ไม้อีเฒ่า",
                value: 6784,
                color: '#8E24AA'
            },
            {
                typeWood: "ไม้เก็ดดำ",
                value: 9678,
                color: '#7CB342'
            },
            {
                typeWood: "ไม้หมากพลูตั๊กแตน",
                value: 5678,
                color: '#0288D1'
            },
            {
                typeWood: "ไม้พะยูง",
                value: 5780,
                color: '#D81B60'
            },
        ]);
        const config = {
            legend:false,
          appendPadding: 10,
          data,
          angleField: 'value',
          colorField: 'typeWood',
          radius: 0.7,
          color: (d) => {
            const colorMapping = {
                ไม้สัก: "#F7E987",
                ไม้ยาง: "#5B9A8B",
                ไม้ประดู่: "#445069",
                ไม้ชิงชัน: "#7B61FF",
                ไม้เก็ดแดง: "#DF8633",
                ไม้อีเม่ง: "#0B56F1",
                ไม้กระพี้: "#7E57C2",
                ไม้แดงจีน: "#26A69A",
                ไม้เก็ดเขาควาย: "#FF7043",
                ไม้อีเฒ่า: "#8E24AA",
                ไม้เก็ดดำ: "#7CB342",
                ไม้หมากพลูตั๊กแตน: "#0288D1",
                ไม้พะยูง: "#D81B60",
            };
            return colorMapping[d.typeWood] || "#000000";
        },
          innerRadius: 0.75,
          meta: {
            value: {
              formatter: (v) => v,
            },
          },
          label: {
            type: 'inner',
            offset: '-50%',
            style: {
              textAlign: 'center',
            },
            autoRotate: false,
            content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
          },
          statistic: {
            title: {
              offsetY: -4,
              customHtml: (container, view, datum) => {
                const { width, height } = container.getBoundingClientRect();
                const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
                const text = datum ? datum.type : 'ทั้งหมด';
                return renderStatistic(d, text, {
                  fontSize: 28,
                });
              },
            },
            statistic: {
                title: false,
                content: {
                  style: {
                    whiteSpace: 'pre-wrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  },
                  content: 'AntV\nG2Plot',
                },
              },
          },
          interactions: [
            {
              type: 'element-active',
            },
          ],
        };
        return <Pie {...config} />;
      };
      const [dataStatus, setDataStatus] = useState([
        {
            typeStatus: "ผ่าน",
            value: 8300,
            color: '#3C6255'
        },
        {
            typeStatus: "ไม่ผ่าน",
            value: 7000,
            color: '#EB5050'
        },
        {
            typeStatus: "รอการรับรอง",
            value: 2000,
            color: '#E4AD6C'
        },
    ]);
      const StatusPie = () => {
        function renderStatistic(containerWidth, text, style) {
          const { width: textWidth, height: textHeight } = measureTextWidth(text, style);
          const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2
      
          let scale = 1;
      
          if (containerWidth < textWidth) {
            scale = Math.min(Math.sqrt(Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))), 1);
          }
      
          const textStyleStr = `width:${containerWidth}px;`;
          return `<div style="${textStyleStr};font-size:${scale}em;line-height:${scale < 1 ? 1 : 'inherit'};">${text}</div>`;
        }
      
        const [data, setData] = useState([
            {
                typeStatus: "ผ่าน",
                value: 8300,
                color: '#3C6255'
            },
            {
                typeStatus: "ไม่ผ่าน",
                value: 7000,
                color: '#EB5050'
            },
            {
                typeStatus: "รอการรับรอง",
                value: 2000,
                color: '#E4AD6C'
            },
        ]);
        const config = {
            legend:false,
          appendPadding: 10,
          height: widthBox-30,
          data,
          angleField: 'value',
          colorField: 'typeStatus',
          radius: 0.65,
          color: (d) => {
            const colorMapping = {
                ผ่าน: "#3C6255",
                ไม่ผ่าน: "#EB5050",
                รอการรับรอง: "#E4AD6C",
            };
            return colorMapping[d.typeStatus] || "#000000";
        },
          innerRadius: 0.8,
          meta: {
            value: {
              formatter: (v) => v,
            },
          },
          label: {
            type: 'inner',
            offset: '-50%',
            style: {
              textAlign: 'center',
            },
            autoRotate: false,
            content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
          },
          statistic: {
            title: {
              offsetY: -4,
              customHtml: (container, view, datum) => {
                const { width, height } = container.getBoundingClientRect();
                const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
                const text = datum ? datum.type : 'ทั้งหมด';
                return renderStatistic(d, text, {
                  fontSize: 28,
                });
              },
              style: {
                fontSize: 20,
                textAlign: "center",
            },
            },
            statistic: {
                title: false,
                content: {
                  style: {
                    whiteSpace: 'pre-wrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  },
                  content: 'AntV\nG2Plot',
                },
              },
          },
          interactions: [
            {
              type: 'element-active',
            },
          ],
        };
        return <Pie {...config} />;
      };
      function RenderValueGraph({ data }: { data: DataType }) {
        return (
            <div className="bg-white rounded-lg space-y-2 py-8 px-10 w-3/6">
                <div className="scrollable-content space-y-2 h-96">
                    {data && data.map((wood) => {
                        return (
                            <div key={wood.typeWood} className="flex justify-between items-center space-x-2 px-4 py-2 rounded-md font-semibold">
                                <div className="flex items-center space-x-6">
                                    <div className={`w-5 h-5 rounded-full`} style={{ backgroundColor: wood.color }}></div>
                                    <p>{wood.typeWood}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <p>{wood.value}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
    function RenderValueStatusGraph({ data }: { data: DataStatusType }) {
        return (
            <div className="bg-white rounded-lg space-y-2 py-8 px-10 w-3/6">
                <div className="scrollable-content space-y-2 h-36">
                    {data && data.map((status) => {
                        return (
                            <div key={status.typeStatus} className="flex justify-between items-center space-x-2 px-4 py-2 rounded-md font-semibold">
                                <div className="flex items-center space-x-6">
                                    <div className={`w-5 h-5 rounded-full`} style={{ backgroundColor: status.color }}></div>
                                    <p>{status.typeStatus}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <p>{status.value}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
  return (
    <div className="w-full Kanit flex flex-col min-h-screen">
      <div className="flex mt-10">
        <img src={arrowIcon} alt="" />
        <p className="text-[24px] font-semibold ml-6">บัญชีของ ธนวิชญ์ ลักษณะ</p>
      </div>
      <div className="grid grid-cols-15 gap-7 my-10">
        <div className="bg-white box-shadow rounded-[10px] px-6 pt-5 pb-9 col-span-7">
            <p className="font-semibold text-xl">ข้อมูลส่วนตัว</p>
            <div className="w-full flex flex-col items-center mt-3 space-y-5">
                <img className="rounded-full w-36 h-36" src="https://plus.unsplash.com/premium_photo-1668319915384-3cccf7689bef?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                <p className="font-semibold text-lg">ธนวิชญ์ ลักษณะ</p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-y-5 px-20 font-semibold text-lg">
                <p>ไลน์ไอดี</p>
                <p>Mind</p>
                <p>อีเมล</p>
                <p>63070077@it.kmitl.com</p>
                <p>ไอดีผู้ใช้</p>
                <p>usd4fsfw78fwh7yrqrjf7w</p>
            </div>
        </div>
        <div className="bg-white box-shadow rounded-[10px] col-span-8 w-full px-6 pt-5 relative">
            <p className="font-semibold text-xl absolute">กราฟการตรวจสอบทั้งหมด</p>
            <div className='flex justify-between space-x-1 items-center'>
                <div className='w-3/6'>
                    <AllPie/>
                </div>
                <RenderValueGraph data={data} />
            </div>
        </div>
        <div id="count" ref={divRef} className="bg-white box-shadow rounded-[10px] col-span-4 px-6 pt-5 relative" style={{height: widthBox}}>
            <p className="font-semibold text-xl absolute">การตรวจสอบในวันนี้</p>
            <div className='w-full h-full flex justify-center items-center'>
                <p className='text-4xl font-bold'>20 การตรวจ</p>
            </div>
        </div>
        <div className="bg-white box-shadow rounded-[10px] col-span-4 px-6 pt-5 relative" style={{height: widthBox}}>
            <p className="font-semibold text-xl absolute">บันทึกใหม่ที่รอการตรวจสอบ</p>
            <div className='w-full h-full flex justify-center items-center'>
                <p className='text-4xl font-bold'>20 บันทึก</p>
            </div>
        </div>
        <div className="bg-white box-shadow rounded-[10px] col-span-8 px-6 pt-5 relative">
            <p className="font-semibold text-xl absolute">กราฟแสดงสถานะการรับรอง</p>
            <div className='flex justify-between space-x-1 items-center'>
                <div className='w-3/6'>
                    <StatusPie />
                </div>
                <RenderValueStatusGraph data={dataStatus} />
            </div>
        </div>
      </div>
      <div className="flex mt-3 justify-end">
        <div className="flex items-center space-x-3">
          <p className="font-semibold">แสดง</p>
          <Select
            defaultValue="10 แถว"
            suffixIcon={<img src={selectIcon}></img>}
            className="h-full"
            style={{ width: 130 }}
            onChange={handleChange}
            options={[
              { value: "10 แถว", label: "10 แถว" },
              { value: "20 แถว", label: "20 แถว" },
              { value: "30 แถว", label: "30 แถว" },
            ]}
          />
          <Select
            defaultValue="ได้รับการรับรอง"
            suffixIcon={<img src={sortIcon}></img>}
            className="h-full"
            style={{ width: 130 }}
            onChange={handleChange}
            options={[
              { value: "ถูกบล็อก", label: "ถูกบล็อก" },
              { value: "ไม่ได้ใช้งาน", label: "ไม่ได้ใช้งาน" },
              { value: "ได้รับหารรับ", label: "ได้รับหารรับ" },
            ]}
          />
          <Select
            defaultValue="ไม้ทั้งหมด"
            suffixIcon={<img src={selectIcon}></img>}
            className="h-full"
            style={{ width: 130 }}
            onChange={handleChange}
            options={[
              { value: "ไม้สัก", label: "ไม้สัก" },
              { value: "ไม้ยาง", label: "ไม้ยาง" },
              { value: "ไม้ประดู่", label: "ไม้ประดู่" },
              { value: "ไม้ชิงชัน", label: "ไม้ชิงชัน" },
              { value: "ไม้เก็ดแดง", label: "ไม้เก็ดแดง" },
              { value: "ไม้อีเม่ง", label: "ไม้อีเม่ง" },
              { value: "ไม้กระพี้", label: "ไม้กระพี้" },
              { value: "ไม้จีนแดง", label: "ไม้จีนแดง" },
              { value: "ไม้เก็ดเขาควาย", label: "ไม้เก็ดเขาควาย" },
              { value: "ไม้อีเฒ่า", label: "ไม้อีเฒ่า" },
              { value: "ไม้เก็ดดำ", label: "ไม้เก็ดดำ" },
              { value: "ไม้หมากพลูตั๊กแตน", label: "ไม้หมากพลูตั๊กแตน" },
              { value: "ไม้พะยูง", label: "ไม้พะยูง" },
              { value: "ไม้ทั้งหมด", label: "ไม้ทั้งหมด" },
            ]}
          />
          <div className="h-full">
            <Input className="h-full w-[280px] font-semibold" suffix={<img src={search} />} />
          </div>
        </div>
      </div>
      <table className="table-auto w-full mt-8">
        <thead>
          <tr className="w-full font-bold">
            <th className="pb-5">ลำดับ</th>
            <th className="pb-5">รูปที่ตรวจ</th>
            <th className="pb-5">ผลการตรวจที่ได้</th>
            <th className="pb-5">ความคล้ายคลึง</th>
            <th className="pb-5">การรับรอง</th>
            <th className="pb-5">วัน-เวลาที่ตรวจ</th>
            <th className="pb-5 w-16"></th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] rounded-[10px] font-semibold">
            <td className="rounded-l-[10px] text-center pl-4">31545</td>
            <td className="py-1 flex justify-center items-center">
              <div className="w-14 h-14 bg-gray-300"></div>
            </td>
            <td className="py-5 text-center">ไม้ประดู่</td>
            <td className="py-5 text-center">98.8%</td>
            <td className="py-5 text-[#3C6255]">
              <div className="flex justify-center items-center">
                <img className="mr-3" src={clockIcon} alt="" />
                <p>
                ผ่าน
                </p>
              </div>
            </td>
            <td className="py-5 text-center">4/9/2566 12:08 น.</td>
            <td className="py-5 rounded-r-[10px]">
              <img src={doorIcon} alt="" />
            </td>
          </tr>
          <tr>
            <td className="py-2"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserProfile;
