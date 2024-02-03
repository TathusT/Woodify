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
  const [dataColumn, setDataColumn] = useState();
  const [dataLine, setDataLine] = useState();
  const [dateFrom, setDateFrom] = useState(today);
  const [dateTo, setDateTo] = useState(today);
  const [pickerFrom, setPickerFrom] = useState();
  const [pickerTo, setPickerTo] = useState();
  const [classifyToday, setClassifyToday] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [classifyAll, setClassifyAll] = useState(0);
  const [classifyStatusWaitVerify, setClassifyStatusWaitVerify] = useState(0)
  const [userToday, setUserToday] = useState(0)


  const getColumn = async (dateFromDB: string, dateToDB: string) => {
    await axios.get(`${path}/dashboard_classify_column/${dateFromDB}/${dateToDB}`)
      .then((res) => {
        setDataColumn(res.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }
  const getLine = async (dateFromDB: string, dateToDB: string) => {
    await axios.get(`${path}/dashboard_classify_Line/${dateFromDB}/${dateToDB}`)
      .then((res) => {
        setDataLine(res.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const getData = async (dateFromDB: string, dateToDB: string) => {
    await getColumn(dateFromDB, dateToDB)
    await getLine(dateFromDB, dateToDB)
    await getClassifyToday()
    await getClassifyAll();
    await getClassifyWaitVerify();
    await getUserToday();
    setIsLoading(false);
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
    getData(dateFrom, dateTo);
  }, [])

  const dateFromPicker = async (value) => {
    const date = new Date(value);
    const formattedDate = moment(date).format('YYYY-MM-DD');
    setDateFrom(formattedDate);
    setPickerFrom(value);
    if (formattedDate && dateTo) {
      getData(formattedDate, dateTo);
    }

    setIsLoading(true);
  }
  const dateToPicker = async (value) => {
    const date = new Date(value);
    const formattedDate = moment(date).format('YYYY-MM-DD');
    setDateTo(formattedDate);
    setPickerTo(value);
    if (dateFrom && formattedDate) {
      getData(dateFrom, formattedDate);
    }
    setIsLoading(true);
  }

  return (
    <div className="p-4 min-h-screen flex flex-col">
      <p className="text-4xl font-bold">หน้าหลัก</p>
      {isLoading ? <div className="flex items-center justify-center flex-1 h-full"><Loading /></div> : (
        <div>
          <div className="flex justify-between items-center">
            <div className="w-[70%]">
              <div className="flex justify-between items-center">
                <p className="text-2xl font-bold">จำนวนการตรวจสอบ</p>
                <div>
                  <div className="flex justify-between py-4">
                    <div className="bg-white rounded-lg" style={{ width: "45%" }}>
                      <DatePicker value={pickerFrom} defaultValue={dayjs(new Date())} onChange={(value) => dateFromPicker(value)} placeholder="เลือกวันที่เริ่ม" format="DD-MM-YYYY" style={{ width: "100%" }} />
                    </div>
                    <img style={{ width: "6%" }} src={LineDate} alt="" />
                    <div className="bg-white rounded-lg" style={{ width: "45%" }}>
                      <DatePicker value={pickerTo} defaultValue={dayjs(new Date())} onChange={(value) => dateToPicker(value)} placeholder="เลือกวันที่สิ้นสุด" format="DD-MM-YYYY" style={{ width: "100%" }} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-2 rounded-lg border-2 border-gray-200">
                {dataLine && <RenderLine data={dataLine} />}
              </div>
            </div>
            <div className="w-[25%] space-y-3">
              <div>
                <p>จำนวนการตรวจสอบในวันนี้</p>
                <div className={`rounded-lg border-2 border-gray-200 w-full h-20 bg-white flex items-center justify-center`}>
                  <p className="text-2xl font-bold">{classifyToday} การตรวจ</p>
                </div>
              </div>
              <div>
                <p>จำนวนการลงทะเบียนในวันนี้</p>
                <div className={`rounded-lg border-2 border-gray-200 w-full h-20 bg-white flex items-center justify-center`}>
                  <p className="text-2xl font-bold">{userToday} ครั้ง</p>
                </div>
              </div>
              <div>
                <p>จำนวนการตรวจทั้งหมด</p>
                <div className={`rounded-lg border-2 border-gray-200 w-full h-20 bg-white flex items-center justify-center`}>
                  <p className="text-2xl font-bold">{classifyAll} การตรวจ</p>
                </div>
              </div>
              <div>
                <p>จำนวนการตรวจที่รอการรับรอง</p>
                <div className={`rounded-lg border-2 border-gray-200 w-full h-20 bg-white flex items-center justify-center`}>
                  <p className="text-2xl font-bold">{classifyStatusWaitVerify} การตรวจ</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <p className="text-2xl font-bold">ประเภทไม้ที่ตรวจสอบ</p>
            <div className="bg-white p-2 rounded-lg border-2 border-gray-200">
              {dataColumn && (
                <RenderColumn data={dataColumn} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashBoard;
