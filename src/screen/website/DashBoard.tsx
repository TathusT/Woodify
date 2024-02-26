import React, { useEffect, useState } from "react";
import { DatePicker, Select, Space } from 'antd';
import LineDate from '../../assets/line.svg'
import { Line, Column } from "@ant-design/plots";
import { GetToDay } from "../../tools/date";
import Loading from "../component/Loading";
import axios from "axios";
import path from "../../../path";
import moment from 'moment';
import dayjs from 'dayjs';
import selectIcon from "../../assets/select-icon.svg"
import arrowRightIcon from "../../assets/arrow-right.svg"
import calendarIcon from "../../assets/calendar-icon.svg"

const LineChart: any = Line
const ColumnChart: any = Column
const today = GetToDay();
const colors = ['#1890ff', '#2fc25b', '#facc14', '#223273', '#8543e0', '#13c2c2', '#722ed1', '#eb2f96', '#52c41a', '#fa8c16', '#1890ff', '#2fc25b', '#facc14'];

const RenderLine = ({ data }) => {
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

const RenderColumn = ({ data }) => {
  const config = {
    data,
    width: "100%",
    height: window.innerHeight / 2.2,
    xField: "wood_name",
    yField: "amount",
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
  const fromDateWithYear = `${today.slice(0,4)}-01-01`
  const [dataColumn, setDataColumn] = useState();
  const [dataLine, setDataLine] = useState();
  const [dateFrom, setDateFrom] = useState(fromDateWithYear);
  const [dateTo, setDateTo] = useState(today);
  const [pickerFrom, setPickerFrom] = useState();
  const [pickerTo, setPickerTo] = useState();
  const [classifyToday, setClassifyToday] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [classifyAll, setClassifyAll] = useState(0);
  const [classifyStatusWaitVerify, setClassifyStatusWaitVerify] = useState(0)
  const [userToday, setUserToday] = useState(0)
  
  const filterData = async () => {
    let filter = {};
    if (dateTo != '') {
      filter['create_at'] = filter['create_at'] || {};
      const dateToISO = new Date(dateTo + 'T16:59:59.999Z');
      dateToISO.setDate(dateToISO.getDate());
      filter['create_at']['lte'] = dateToISO;
    }
    if (dateFrom != '') {
      filter['create_at'] = filter['create_at'] || {};
      filter['create_at']['gte'] = new Date(dateFrom.replace(/-/g, '/'));
    }

    await axios.post(`${path}/dashboard_classify_column`, {
      filter: filter
    })
      .then((res) => {
        setDataColumn(res.data)
      })
      .catch((err) => {
        console.log(err);
      })

    await axios.post(`${path}/dashboard_classify_Line`, {
      filter: filter
    })
      .then((res) => {
        setDataLine(res.data)
      })
      .catch((err) => {
        console.log(err);
      })
    await setIsLoading(false)
  }

  const getData = async () => {
    await getClassifyToday()
    await getClassifyAll();
    await getClassifyWaitVerify();
    await getUserToday();
    setIsLoading(false);
  }

  useEffect(() => {
    filterData();
  }, [dateFrom, dateTo])

  const getClassifyToday = async () => {
    await axios.get(`${path}/get_classiy_today`)
      .then((res) => {
        setClassifyToday(res.data)

      })
      .catch((err) => {
        console.log(err);
      })
  }

  const getUserToday = async () => {
    await axios.get(`${path}/user_today`)
      .then((res) => {
        setUserToday(res.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const getClassifyAll = async () => {
    await axios.get(`${path}/classify_all`)
      .then((res) => {
        setClassifyAll(res.data)
      })
      .catch((err) => {
        console.log(err);
      })
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

  useEffect(() => {
    getData();
  }, [])

  const dateFromPicker = async (value) => {
    if (value != null) {
      const date = new Date(value);
      const formattedDate = moment(date).format('YYYY-MM-DD');
      setDateFrom(formattedDate);
    }
    else {
      setDateFrom('')
    }
    setPickerFrom(value);
    setIsLoading(true);
  }

  const dateToPicker = async (value) => {
    if (value != null) {
      const date = new Date(value);
      const formattedDate = moment(date).format('YYYY-MM-DD');
      setDateTo(formattedDate);
    }
    else {
      setDateTo('')
    }
    setPickerTo(value);
    setIsLoading(true);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <p className="text-[32px] font-bold mt-10">หน้าหลัก</p>
      {isLoading ? <div className="flex items-center justify-center flex-1 h-full"><Loading /></div> : (
        <div>
          <div className="flex justify-between items-center">
            <div className="w-[70%]">
              <div className="flex justify-between items-end">
                <p className="text-[20px] pb-2">จำนวนการตรวจสอบ</p>
                <div className="flex space-x-3 items-center py-4">
                  <div className="relative flex items-center">
                    <img className='absolute z-50 left-2' src={calendarIcon}></img>
                    <DatePicker className="font-semibold" style={{ width: 150 }} suffixIcon={<img src={selectIcon}></img>} value={pickerFrom} defaultValue={dayjs().startOf('year').startOf('month')} onChange={(value) => dateFromPicker(value)} placeholder="เลือกวันที่เริ่ม" format="DD-MM-YYYY" />
                  </div>
                  <img src={arrowRightIcon}></img>
                  <div className="relative flex items-center">
                    <img className='absolute z-50 left-2' src={calendarIcon}></img>
                    <DatePicker className="font-semibold" style={{ width: 150 }} suffixIcon={<img src={selectIcon}></img>} value={pickerTo} defaultValue={dayjs(new Date())} onChange={(value) => dateToPicker(value)} placeholder="เลือกวันที่สิ้นสุด" format="DD-MM-YYYY" />
                  </div>
                </div>
              </div>
              <div className="bg-white p-2 rounded-lg border-2 border-gray-200">
                {dataLine && <RenderLine data={dataLine} />}
              </div>
            </div>
            <div className="w-[25%] space-y-5">
              <div>
                <p className="text-[20px]">จำนวนการตรวจสอบในวันนี้</p>
                <div className={`rounded-lg border-2 border-gray-200 w-full h-16 bg-white flex items-center justify-center`}>
                  <p className="text-2xl">{classifyToday} การตรวจ</p>
                </div>
              </div>
              <div>
                <p className="text-[20px]">จำนวนการลงทะเบียนในวันนี้</p>
                <div className={`rounded-lg border-2 border-gray-200 w-full h-16 bg-white flex items-center justify-center`}>
                  <p className="text-2xl">{userToday} ครั้ง</p>
                </div>
              </div>
              <div>
                <p className="text-[20px]">จำนวนการตรวจทั้งหมด</p>
                <div className={`rounded-lg border-2 border-gray-200 w-full h-16 bg-white flex items-center justify-center`}>
                  <p className="text-2xl">{classifyAll} การตรวจ</p>
                </div>
              </div>
              <div>
                <p className="text-[20px]">จำนวนการตรวจที่รอการรับรอง</p>
                <div className={`rounded-lg border-2 border-gray-200 w-full h-16 bg-white flex items-center justify-center`}>
                  <p className="text-2xl">{classifyStatusWaitVerify} การตรวจ</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 space-y-1">
            <p className="text-[20px]">ประเภทไม้ที่ตรวจสอบ</p>
            <div className="bg-white p-2 rounded-lg border-2 border-gray-200">
              {dataColumn && (
                <RenderColumn data={dataColumn} />
              )}
            </div>
          </div>
          <div className="flex justify-center font-semibold my-3 text-[18px]">
            <p>© 2023 COPYRIGHT WOODIFY. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashBoard;
