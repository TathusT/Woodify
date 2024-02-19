import React, { useRef, useEffect, useState } from 'react';
import arrowIcon from "../../assets/arrow-left-icon.svg"
import { Pie, measureTextWidth } from '@ant-design/plots';
import sortIcon from "../../assets/sort-icon.svg"
import selectIcon from "../../assets/select-icon.svg"
import search from "../../assets/search.svg";
import clockIcon from "../../assets/wait-for-verification.svg"
import passIcon from "../../assets/pass-verification.svg"
import notPassIcon from "../../assets/not-pass-verification.svg"
import doorIcon from "../../assets/Logout-icon.svg"
import calendarIcon from "../../assets/calendar-icon.svg"
import arrowRightIcon from "../../assets/arrow-right.svg"
import { Select, Input, DatePicker, Pagination } from "antd";
import Loading from '../component/Loading';
import type { DatePickerProps } from 'antd';
import axios from 'axios';
import path from '../../../path';
import { convertIsoToThaiDateTime, convertIsoToThaiDateTimeFullYear, getImage } from '../../tools/tools';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const PieChart: any = Pie;


const ClassifyWood: React.FC = () => {
  const [widthBox, setWidthBox] = useState(0)
  const [classify, setClassify] = useState<any>();
  const [classifyToday, setClassifyToday] = useState<any>(0);
  const [classifyStatusWaitVerify, setClassifyStatusWaitVerify] = useState(0)
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [allClassifyCount, getAllClassifyCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('การตรวจทั้งหมด')
  const [woodType, setWoodType] = useState<any>();
  const [filterWood, setFilterWood] = useState<any>('ไม้ทั้งหมด')
  const [pickerFrom, setPickerFrom] = useState();
  const [pickerTo, setPickerTo] = useState();
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [data, setData] = useState<any>();
  const [userId, setUserId] = useState();
  const divRef = useRef<HTMLDivElement>(null);
  const router = useNavigate();
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const handleChangeShowTableDataCount = (value: string) => {
    setPageSize(parseInt(value))
  };

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  const handlePageChangePage = (page) => {
    setCurrentPage(page);
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
  }, [isLoading]);


  const handleChangeStatus = (value: string) => {
    setStatusFilter(value)
  };

  const handleChangeWood = (value: string) => {
    setFilterWood(value)
  };

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

  const getUserId = async () => {
    try {
        const token = localStorage.getItem("access_token");
        const response = await axios.post(`${path}/user_with_token/`, {
            token: token,
        });
        setUserId(response.data.u_id);
    } catch (error) {
        console.log(error);
    }
}

  const getClassifyWaitVerify = async () => {
    await axios.get(`${path}/classify_wait_for_verify`)
      .then((res) => {
        setClassifyStatusWaitVerify(res.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const getClassifyToday = async () => {
    await axios.get(`${path}/get_classiy_today`)
      .then((res) => {
        setClassifyToday(res.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const getClassifyStatusCount = async () => {
    await axios.get(`${path}/get_classiy_status`)
      .then((res) => {
        let setDataStatus: any = []
        res.data.map((value) => {
          if (value.status_verify == "FAILED_CERTIFICATION") {
            setDataStatus.push({
              typeStatus: "ไม่ผ่าน",
              value: value._count.status_verify,
              color: '#EB5050'
            })
          }
          else if (value.status_verify == "PASSED_CERTIFICATION") {
            setDataStatus.push({
              typeStatus: "ผ่าน",
              value: value._count.status_verify,
              color: '#3C6255'
            })
          }
          else {
            setDataStatus.push({
              typeStatus: "รอการรับรอง",
              value: value._count.status_verify,
              color: '#E4AD6C'
            })
          }
        })
        setDataStatus.sort((a, b) => {
          const order = { "ผ่าน": 0, "ไม่ผ่าน": 1, "รอการรับรอง": 2 };
          return order[a.typeStatus] - order[b.typeStatus];
        });
        setData(setDataStatus);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const getData = async () => {
    await getClassifyToday();
    await getUserId();
    await getClassifyWaitVerify();
    setTimeout(async () => {
      await setIsLoading(false);
    }, 1000);
  }

  const filterData = async () => {
    let filter = {};
    if (statusFilter != 'การตรวจทั้งหมด') {
      filter['status_verify'] = (statusFilter)
    }
    if (filterWood != 'ไม้ทั้งหมด') {
      filter['select_result'] = filterWood.replace('ไม้', '')
    }
    if (dateTo != '') {
      filter['create_at'] = filter['create_at'] || {};
      filter['create_at']['lte'] = new Date(dateTo.replace(/-/g, '/'));
    }
    if (dateFrom != '') {
      filter['create_at'] = filter['create_at'] || {};
      filter['create_at']['gte'] = new Date(dateFrom.replace(/-/g, '/'));
    }

    await axios.post(`${path}/classify_user_id`, {
      currentPage: currentPage,
      pageSize: pageSize,
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

  useEffect(() => {
    getData();
    getClassifyStatusCount();
  }, [])
  
  type DataStatusType = Array<{
    typeStatus: string;
    value: number;
    color: string
  }>;
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
    return <PieChart {...config} />;
  };

  function RenderValueStatusGraph({ data }: { data: DataStatusType }) {
    return (
      <div className="bg-white rounded-lg space-y-2 py-8 px-10 w-3/6">
        <div className="scrollable-content space-y-2 h-36">
          {data && data.map((status) => {
            return (
              <div key={status.typeStatus} className="flex justify-between items-center space-x-2 px-4 py-2 rounded-md">
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
      {isLoading ? <div className="flex items-center justify-center flex-1 h-full"><Loading /></div> : (
        <div>
          <div className="grid grid-cols-15 gap-7 my-10">
            <div ref={divRef} className="bg-white box-shadow rounded-[10px] col-span-4 px-6 pt-5 relative" style={{ height: widthBox }}>
              <p className="text-xl absolute">การตรวจสอบในวันนี้</p>
              <div className='w-full h-full flex justify-center items-center'>
                <p className='text-4xl'>{classifyToday} การตรวจ</p>
              </div>
            </div>
            <div className="bg-white box-shadow rounded-[10px] col-span-4 px-6 pt-5 relative" style={{ height: widthBox }}>
              <p className="text-xl absolute">บันทึกใหม่ที่รอการตรวจสอบ</p>
              <div className='w-full h-full flex justify-center items-center'>
                <p className='text-4xl'>{classifyStatusWaitVerify} บันทึก</p>
              </div>
            </div>
            <div className="bg-white box-shadow rounded-[10px] col-span-8 px-6 pt-5 relative">
              <p className="text-xl absolute">กราฟแสดงสถานะการรับรอง</p>
              <div className='flex justify-between space-x-1 items-center'>
                <div className='w-3/6'>
                  {data && <StatusPie />}
                </div>
                <RenderValueStatusGraph data={data} />
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
                style={{ width: 150 }}
                onChange={handleChangeShowTableDataCount}
                options={[
                  { value: "10", label: "10 แถว" },
                  { value: "20", label: "20 แถว" },
                  { value: "30", label: "30 แถว" },
                ]}
              />
              <Select
                defaultValue="การตรวจทั้งหมด"
                suffixIcon={<img src={sortIcon}></img>}
                className="h-full"
                style={{ width: 170 }}
                onChange={handleChangeStatus}
                options={[
                  { value: "PASSED_CERTIFICATION", label: "ผ่าน" },
                  { value: "FAILED_CERTIFICATION", label: "ไม่ผ่าน" },
                  { value: "WAITING_FOR_VERIFICATION", label: "รอการรับรอง" },
                  { value: "การตรวจทั้งหมด", label: "การตรวจทั้งหมด" },
                ]}
              />
              <div className='relative flex items-center'>
                <img className='absolute z-50 left-2' src={calendarIcon}></img>
                <DatePicker style={{ width: 150 }} suffixIcon={<img src={selectIcon}></img>} value={pickerFrom} onChange={(value) => dateFromPicker(value)} />
              </div>
              <img src={arrowRightIcon}></img>
              <div className='relative flex items-center'>
                <img className='absolute z-50 left-2' src={calendarIcon}></img>
                <DatePicker style={{ width: 150 }} suffixIcon={<img src={selectIcon}></img>} value={pickerTo} onChange={(value) => dateToPicker(value)} />
              </div>
              <Select
                defaultValue="ไม้ทั้งหมด"
                suffixIcon={<img src={selectIcon}></img>}
                className="h-full"
                style={{ width: 170 }}
                onChange={handleChangeWood}
                options={[
                  {
                    value: "ไม้ทั้งหมด",
                    label: "ไม้ทั้งหมด"
                  },
                  {
                    value: "ไม้ยาง",
                    label: "ไม้ยาง"
                  },
                  {
                    value: "ไม้ตะเคียนราก",
                    label: "ไม้ตะเคียนราก"
                  },
                  {
                    value: "ไม้มะค่าโมง",
                    label: "ไม้มะค่าโมง"
                  },
                  {
                    value: "ไม้รัง",
                    label: "ไม้รัง"
                  },
                  {
                    value: "ไม้ยางพารา",
                    label: "ไม้ยางพารา"
                  },
                  {
                    value: "ไม้เต็ง",
                    label: "ไม้เต็ง"
                  },
                  {
                    value: "ไม้พะยูง",
                    label: "ไม้พะยูง"
                  },
                  {
                    value: "ไม้แดง",
                    label: "ไม้แดง"
                  },
                  {
                    value: "ไม้ตะเคียนทอง",
                    label: "ไม้ตะเคียนทอง"
                  },
                  {
                    value: "ไม้สัก",
                    label: "ไม้สัก"
                  },
                  {
                    value: "ไม้ชุมแพรก",
                    label: "ไม้ชุมแพรก"
                  },
                  {
                    value: "ไม้แอ๊ก",
                    label: "ไม้แอ๊ก"
                  },
                  {
                    value: "ไม้พะยอม",
                    label: "ไม้พะยอม"
                  },
                  {
                    value: "ไม้balau",
                    label: "ไม้balau"
                  }
                ]}
              />
            </div>
          </div>
          <table className="table-auto w-full mt-8 border-spacing-y-4 border-separate">
            <thead>
              <tr className="w-full">
                {/* <th className="pb-5">ลำดับ</th> */}
                <th className="pb-5 font-medium">รูปที่ตรวจ</th>
                <th className="pb-5 font-medium">ผลการตรวจที่ได้</th>
                <th className="pb-5 font-medium">ความคล้ายคลึง</th>
                <th className="pb-5 font-medium">การรับรอง</th>
                <th className="pb-5 font-medium">ผู้ส่งการตรวจ</th>
                <th className="pb-5 font-medium">วัน-เวลาที่ตรวจ</th>
                <th className="pb-5 font-medium w-16"></th>
              </tr>
            </thead>
            <tbody>
              {classify && classify.map((data, index) => {
                console.log(data.creator.u_id);
                
                return (
                  <tr key={data.c_id} onClick={() => router(`/admin/classify_wood_detail/${data.c_id}`)} className="bg-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] rounded-[10px]">
                    {/* <td className="rounded-l-[10px] text-center">{data.c_id}</td> */}
                    <td className="py-3 flex justify-center items-center">
                      {data.image && <div className="w-14 h-14 bg-center bg-cover" style={{backgroundImage: `url(${getImage(data.image)})`}}></div>}
                    </td>
                    <td className="py-5 text-center">{data?.select_result}</td>
                    <td className="py-5 text-center">{data?.result[0]?.percentage}%</td>
                    <td className="py-5">
                      <div className="flex justify-center items-center">
                        <img className="mr-3" src={data.status_verify == 'WAITING_FOR_VERIFICATION' ? clockIcon : data?.status_verify == 'PASSED_CERTIFICATION' ? passIcon : notPassIcon} alt="" />
                        <p>
                          {data.status_verify == 'WAITING_FOR_VERIFICATION' ? "รอการรับรอง" : data?.status_verify == 'PASSED_CERTIFICATION' ? "ผ่าน" : "ไม่ผ่าน"}
                        </p>
                      </div>
                    </td>
                    <td className="py-5 text-center">{data.creator.firstname} {data.creator.lastname}</td>
                    <td className="py-5 text-center">{convertIsoToThaiDateTimeFullYear(data?.create_at)}</td>
                    <td className="py-5 rounded-r-[10px] relative">
                      <img src={doorIcon} alt="" />
                      <div style={{top: -9, right: -9}} className='absolute flex justify-center items-center bg-[#3C6255] text-white w-5 h-5 rounded-full'>{data.notes.filter((value) => (value.create_by != userId && value.read_status == false)).length}</div>
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
        </div>
      )}
    </div>
  );
};

export default ClassifyWood;
