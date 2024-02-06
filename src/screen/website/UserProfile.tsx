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
import Loading from '../component/Loading';
import moment from 'moment';
import dayjs from 'dayjs';
import { Select, Input, DatePicker, Pagination } from "antd";
import type { DatePickerProps } from 'antd';
import axios from 'axios';
import path from '../../../path';
import { useParams } from 'react-router-dom';
import { convertIsoToThaiDateTime, convertIsoToThaiDateTimeFullYear, getImage } from '../../tools/tools';

const PieChart: any = Pie

const UserProfile: React.FC = () => {
  const [widthBox, setWidthBox] = useState(0)
  const [user, setUser] = useState<any>()
  const [isLoading, setIsLoading] = useState(true);
  const [classifyUserTodayCount, setClassifyUserTodayCount] = useState(0);
  const [classifyUserWaitVerify, setClassifyUserWaitVerify] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [statusFilter, setStatusFilter] = useState('การตรวจทั้งหมด')
  const [classify, setClassify] = useState<any>();
  const [woodType, setWoodType] = useState<any>();
  const [filterWood, setFilterWood] = useState<any>('ไม้ทั้งหมด')
  const [pickerFrom, setPickerFrom] = useState();
  const [pickerTo, setPickerTo] = useState();
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const { u_id } = useParams();
  const divRef = useRef<HTMLDivElement>(null);
  const color = [
    "#F7E987",
    "#5B9A8B",
    "#445069",
    "#7B61FF",
    "#DF8633",
    "#0B56F1",
    "#7E57C2",
    "#26A69A",
    "#FF7043",
    "#8E24AA",
    "#7CB342",
    "#0288D1",
    "#D81B60",
    "#A21B60",
  ]
  const [data, setData] = useState();
  const [dataStatus, setDataStatus] = useState<any>();

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

  const handlePageChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const handleChangeStatus = (value: string) => {
    setStatusFilter(value)
  };

  const handleChangeWood = (value: string) => {
    setFilterWood(value)
  };

  const handleChangePageSize = (value: string) => {
    setPageSize(parseInt(value))
  };

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  const getUserById = async () => {
    await axios.get(`${path}/user/${u_id}`)
      .then((res) => {
        setUser(res.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }
  

  const dateFromPicker = async (value) => {
    const date = new Date(value);
    const formattedDate = moment(date).format('YYYY-MM-DD');
    setDateFrom(formattedDate);
    setPickerFrom(value);
  }
  const dateToPicker = async (value) => {
    const date = new Date(value);
    const formattedDate = moment(date).format('YYYY-MM-DD');
    setDateTo(formattedDate);
    setPickerTo(value);
  }

  const getClassifyTodayWithId = async () => {
    await axios.get(`${path}/classify_today_with_user_id/${u_id}`)
      .then((res) => {
        setClassifyUserTodayCount(res.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const filterData = async () => {
    let filter = {};
    if (statusFilter != 'การตรวจทั้งหมด') {
      filter['status_verify'] = (statusFilter)
    }
    if (filterWood != 'ไม้ทั้งหมด') {
      filter['select_result'] = filterWood.replace('ไม้', '')
    }
    if(dateTo != ''){
      filter['create_at'] = filter['create_at'] || {};
      filter['create_at']['lte'] = new Date(dateTo.replace(/-/g, '/'));
    }
    if(dateFrom != ''){
      filter['create_at'] = filter['create_at'] || {};
      filter['create_at']['gte'] = new Date(dateFrom.replace(/-/g, '/'));
    }

    await axios.post(`${path}/classify_user_id`, {
      currentPage: currentPage,
      pageSize: pageSize,
      u_id: u_id,
      filter: filter
    })
      .then((res) => {
        setClassify(res.data.data)
        setTotalPages(Math.ceil(res.data.total / pageSize));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    filterData();
  }, [filterWood, statusFilter, pageSize, currentPage, dateFrom, dateTo])
  
  const getClassifyDonutChart = async () => {
    await axios.get(`${path}/classify_donut_with_userid/${u_id}`)
      .then((res) => {
        let prepareData: any = []
        let prepareWoodType: any = []
        res.data.forEach((wood: any, index: number) => {
          prepareData.push({
            typeWood: `ไม้${wood.wood_name}`,
            value: parseInt(wood.amount),
            color: color[index]
          })
        });
        prepareWoodType.push({ value: `ไม้ทั้งหมด`, label: `ไม้ทั้งหมด` })
        res.data.forEach(element => {
          prepareWoodType.push({ value: `ไม้${element.wood_name}`, label: `ไม้${element.wood_name}` })
        })
        setWoodType(prepareWoodType)
        setData(prepareData)
      })
      .catch((err) => {
        console.log(err);
      })
  }


  const getClassifyStatusDonutChart = async () => {
    await axios.get(`${path}/classify_status_donut_with_userid/${u_id}`)
      .then((res) => {
        let prepareData: any = []
        res.data.forEach((classifyStatus: any) => {
          prepareData.push({
            typeStatus: classifyStatus.status,
            value: parseInt(classifyStatus.amount),
            color: classifyStatus.status == 'ผ่าน' ? '#3C6255' : classifyStatus.status == 'ไม่ผ่าน' ? '#EB5050' : '#E4AD6C'
          })
        });
        prepareData.sort((a, b) => {
          const order = { "ผ่าน": 0, "ไม่ผ่าน": 1, "รอการรับรอง": 2 };
          return order[a.typeStatus] - order[b.typeStatus];
        });
        setDataStatus(prepareData)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const getClassifyWaitVerifyWithUserId = async () => {
    await axios.get(`${path}/classify_wait_for_verify/${u_id}`)
      .then((res) => {
        setClassifyUserWaitVerify(res.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const getData = async () => {
    await getUserById();
    await getClassifyTodayWithId();
    await getClassifyWaitVerifyWithUserId();
    await getClassifyDonutChart();
    await getClassifyStatusDonutChart();
    await setIsLoading(false);
  }

  useEffect(() => {
    getData();
  }, [])

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
  }, [isLoading]);

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
    const config = {
      legend: false,
      appendPadding: 10,
      data,
      angleField: 'value',
      colorField: 'color',
      radius: 0.7,
      color: (d) => {
        return d.color || "#000000";
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
    return <PieChart {...config} />;
  };

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

    const data = dataStatus

    const config = {
      legend: false,
      appendPadding: 10,
      height: widthBox - 30,
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
      innerRadius: 0.65,
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
    return <PieChart {...config} />;
  };

  function RenderValueGraph({ data }: { data: any }) {
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
      {isLoading ? <div className="flex items-center justify-center flex-1 h-full"><Loading /></div> : (<div>
        <div className="flex mt-10">
          <img src={arrowIcon} alt="" />
          <p className="text-[24px] font-semibold ml-6">บัญชีของ {user.firstname} {user.lastname}</p>
        </div>
        <div className="grid grid-cols-15 gap-7 my-10">
          <div className="bg-white box-shadow rounded-[10px] px-6 pt-5 pb-9 col-span-7">
            <p className="font-semibold text-xl">ข้อมูลส่วนตัว</p>
            <div className="w-full flex flex-col items-center mt-3 space-y-5">
              <img className="rounded-full w-36 h-36" src={user.image} alt="" />
              <p className="font-semibold text-lg">{user.firstname} {user.lastname}</p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-y-5 px-20 font-semibold text-lg">
              <p>ไลน์ไอดี</p>
              <p>{user.line_id}</p>
              <p>อีเมล</p>
              <p>{user.email}</p>
              <p>ไอดีผู้ใช้</p>
              <p>{user.u_id}</p>
            </div>
          </div>
          <div className="bg-white box-shadow rounded-[10px] col-span-8 w-full px-6 pt-5 relative">
            <p className="font-semibold text-xl absolute">กราฟการตรวจสอบทั้งหมด</p>
            <div className='flex justify-between space-x-1 items-center'>
              <div className='w-3/6'>
                <AllPie />
              </div>
              <RenderValueGraph data={data} />
            </div>
          </div>
          <div id="count" ref={divRef} className="bg-white box-shadow rounded-[10px] col-span-4 px-6 pt-5 relative" style={{ height: widthBox }}>
            <p className="font-semibold text-xl absolute">การตรวจสอบในวันนี้</p>
            <div className='w-full h-full flex justify-center items-center'>
              <p className='text-4xl font-bold'>{classifyUserTodayCount} การตรวจ</p>
            </div>
          </div>
          <div className="bg-white box-shadow rounded-[10px] col-span-4 px-6 pt-5 relative" style={{ height: widthBox }}>
            <p className="font-semibold text-xl absolute">บันทึกใหม่ที่รอการตรวจสอบ</p>
            <div className='w-full h-full flex justify-center items-center'>
              <p className='text-4xl font-bold'>{classifyUserWaitVerify} บันทึก</p>
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
              onChange={handleChangePageSize}
              options={[
                { value: "10", label: "10 แถว" },
                { value: "20", label: "20 แถว" },
                { value: "30", label: "30 แถว" },
              ]}
            />
            <Select
              defaultValue={statusFilter}
              suffixIcon={<img src={sortIcon}></img>}
              className="h-full"
              style={{ width: 130 }}
              onChange={handleChangeStatus}
              options={[
                { value: "PASSED_CERTIFICATION", label: "ผ่านการรับรอง" },
                { value: "FAILED_CERTIFICATION", label: "ไม่ผ่านการรับรอง" },
                { value: "WAITING_FOR_VERIFICATION", label: "รอการรับรอง" },
                { value: "การตรวจทั้งหมด", label: "การตรวจทั้งหมด" },
              ]}
            />
            <div className='relative flex items-center'>
              <img className='absolute z-50 left-2' src={calendarIcon}></img>
              <DatePicker value={pickerFrom} onChange={(value) => dateFromPicker(value)} style={{ width: 150 }} suffixIcon={<img src={selectIcon}></img>} />
            </div>
            <img src={arrowRightIcon}></img>
            <div className='relative flex items-center'>
              <img className='absolute z-50 left-2' src={calendarIcon}></img>
              <DatePicker value={pickerTo} onChange={(value) => dateToPicker(value)} style={{ width: 150 }} suffixIcon={<img src={selectIcon}></img>} />
            </div>
            <Select
              defaultValue={filterWood}
              suffixIcon={<img src={selectIcon}></img>}
              className="h-full"
              style={{ width: 130 }}
              onChange={handleChangeWood}
              options={woodType}
            />
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
            {classify && classify.map((c: any, index: number) => {
              return (
                <tr key={c.c_id} className="bg-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] rounded-[10px] font-semibold">
                  <td className="rounded-l-[10px] text-center">{(index + 1) + ((currentPage - 1) * 10)}</td>
                  <td className="py-3 flex justify-center items-center">
                    <div className="w-14 h-14 bg-gray-300">
                      {c.image && <img src={getImage(c.image)} alt="" />}
                    </div>
                  </td>
                  <td className="py-5 text-center">ไม้{c.select_result}</td>
                  <td className="py-5 text-center">{c.result[0]?.percentage}</td>
                  <td className="py-5 text-[#3C6255]">
                    <div className="flex justify-center items-center">
                      <img className="mr-3" src={clockIcon} alt="" />
                      <p>
                        {c.status_verify == 'WAITING_FOR_VERIFICATION' ? 'รอการรับรอง' : c.status_verify == 'FAILED_CERTIFICATION' ? 'ไม่ผ่าน' : 'ผ่าน'}
                      </p>
                    </div>
                  </td>
                  <td className="py-5 text-center">{convertIsoToThaiDateTimeFullYear(c.create_at)}</td>
                  <td className="py-5 rounded-r-[10px]">
                    <img src={doorIcon} alt="" />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <Pagination
          current={currentPage}
          total={totalPages * pageSize}
          pageSize={pageSize}
          onChange={handlePageChangePage}
          className='pt-1 pb-5'
        />
      </div>)}
    </div>
  );
};

export default UserProfile;
