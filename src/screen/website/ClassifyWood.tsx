import React, { useRef, useEffect, useState } from 'react';
import arrowIcon from "../../assets/arrow-left-icon.svg"
import { Pie, measureTextWidth } from '@ant-design/plots';
import sortIcon from "../../assets/sort-icon.svg"
import selectIcon from "../../assets/select-icon.svg"
import search from "../../assets/search.svg";
import clockIcon from "../../assets/last-status-icon.svg"
import doorIcon from "../../assets/Logout-icon.svg"
import calendarIcon from "../../assets/calendar-icon.svg"
import arrowRightIcon from "../../assets/arrow-right.svg"
import { Select, Input, DatePicker } from "antd";
import type { DatePickerProps } from 'antd';

const ClassifyWood: React.FC = () => {
  const [widthBox, setWidthBox] = useState(0)
    const divRef = useRef<HTMLDivElement>(null);
    const handleChange = (value: string) => {
      console.log(`selected ${value}`);
    };
    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
      console.log(date, dateString);
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
    type DataStatusType = Array<{
        typeStatus: string;
        value: number;
        color: string
    }>;
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
      <p className="text-[32px] font-semibold mt-10">ตรวจสอบพันธุ์ไม้</p>
      <div className="grid grid-cols-15 gap-7 my-10">
        <div ref={divRef} className="bg-white box-shadow rounded-[10px] col-span-4 px-6 pt-5 relative" style={{height: widthBox}}>
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
            defaultValue="การตรวจทั้งหมด"
            suffixIcon={<img src={sortIcon}></img>}
            className="h-full"
            style={{ width: 130 }}
            onChange={handleChange}
            options={[
              { value: "ผ่านการรับรอง", label: "ผ่านการรับรอง" },
              { value: "ไม่ผ่านการรับรอง", label: "ไม่ผ่านการรับรอง" },
              { value: "การตรวจทั้งหมด", label: "การตรวจทั้งหมด" },
            ]}
          />
          <div className='relative flex items-center'>
            <img className='absolute z-50 left-2' src={calendarIcon}></img>
            <DatePicker style={{ width: 150 }} suffixIcon={<img src={selectIcon}></img>} onChange={onChange} />
          </div>
          <img src={arrowRightIcon}></img>
          <div className='relative flex items-center'>
            <img className='absolute z-50 left-2' src={calendarIcon}></img>
            <DatePicker style={{ width: 150 }} suffixIcon={<img src={selectIcon}></img>} onChange={onChange} />
          </div>
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
      <table className="table-auto w-full mt-8 border-spacing-y-4 border-separate">
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
            <td className="rounded-l-[10px] text-center">31545</td>
            <td className="py-3 flex justify-center items-center">
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
          <tr className="bg-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] rounded-[10px] font-semibold">
            <td className="rounded-l-[10px] text-center">31545</td>
            <td className="py-3 flex justify-center items-center">
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
        </tbody>
      </table>
    </div>
  );
};

export default ClassifyWood;
