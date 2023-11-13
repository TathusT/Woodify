import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { DatePicker, Select, Space } from 'antd';
import Line from '../../assets/line.svg'
import Wood from '../../assets/S12-3balau 2.png'
import Unread from '../../assets/unread_message.svg'
import Read from '../../assets/read_message.svg'
import AllMessage from '../../assets/message.svg'
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const thaiMonths = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
];

interface HistoryItem {
    id: number;
    woodName: string;
    similar: string;
    updateAt: string;
    img: string;
    message: number
}

function formatDateToThai(dateString: string) {
    const parts = dateString.split(' ');
    const dateParts = parts[0].split('/');
    const day = dateParts[0];
    const month = thaiMonths[parseInt(dateParts[1], 10) - 1];
    const year = parseInt(dateParts[2], 10) + 543;

    return `${day} ${month} ${year} ${parts[1]}`;
}

const Notification: React.FC = () => {
    const navigate = useNavigate();
    const [historys, setHistorys] = useState<HistoryItem[]>([
        {
            id: 1,
            woodName: "ไม้ประดู่",
            similar: "99%",
            updateAt: formatDateToThai('17/10/2023 11:46:30'),
            img: Wood,
            message: 2
        },
        {
            id: 2,
            woodName: "ไม้ประดู่",
            similar: "99%",
            updateAt: formatDateToThai('17/10/2023 11:46:30'),
            img: Wood,
            message: 0
        },
        {
            id: 3,
            woodName: "ไม้ประดู่",
            similar: "99%",
            updateAt: formatDateToThai('17/10/2023 11:46:30'),
            img: Wood,
            message: 1
        },
        {
            id: 4,
            woodName: "ไม้ประดู่",
            similar: "99%",
            updateAt: formatDateToThai('17/10/2023 11:46:30'),
            img: Wood,
            message: 5
        },
        {
            id: 5,
            woodName: "ไม้ประดู่",
            similar: "99%",
            updateAt: formatDateToThai('17/10/2023 11:46:30'),
            img: Wood,
            message: 9
        },
        {
            id: 6,
            woodName: "ไม้ประดู่",
            similar: "99%",
            updateAt: formatDateToThai('17/10/2023 11:46:30'),
            img: Wood,
            message: 8
        },
        {
            id: 7,
            woodName: "ไม้ประดู่",
            similar: "99%",
            updateAt: formatDateToThai('17/10/2023 11:46:30'),
            img: Wood,
            message: 3
        },
        {
            id: 8,
            woodName: "ไม้ประดู่",
            similar: "99%",
            updateAt: formatDateToThai('17/10/2023 11:46:30'),
            img: Wood,
            message: 3
        },
    ])

    function RenderClassify() {
        return (
            <div>
                <div className="mx-6 flex justify-between items-center">
                    <Select
                        mode="multiple"
                        style={{ width: '48%' }}
                        placeholder="เลือกพันธุ์ไม้ที่ต้องการค้นหา"
                        optionLabelProp="label"
                    >
                        <Option value="padauk" label="ไม้ประดู่">
                            <Space>
                                ไม้ประดู่ (Pterocarpus macrocarpus Kurz.)
                            </Space>
                        </Option>
                        <Option value="deang" label="ไม้แดง">
                            <Space>
                                ไม้แดง (Xylia xylocarpa)
                            </Space>
                        </Option>
                        <Option value="teak" label="ไม้สัก">
                            <Space>
                                ไม้สัก (Tectona grandis L.f.)
                            </Space>
                        </Option>
                        <Option value="teng" label="ไม้เต็ง">
                            <Space>
                                ไม้เต็ง (Shorea obtusa Wall. ex Blume.)
                            </Space>
                        </Option>
                    </Select>
                    <Select
                        style={{ width: '48%' }}
                        defaultValue="allMessage"
                    >
                        <Option value="allMessage" label="ข้อความทั้งหมด">
                            <Space className="flex items-center">
                                <img src={AllMessage} alt="" />
                                <p className="text-xs">ข้อความทั้งหมด</p>
                            </Space>
                        </Option>
                        <Option value="readMessage" label="ข้อความที่อ่านแล้ว">
                            <Space className="flex items-center">
                                <img src={Read} alt="" />
                                <p className="text-xs">ข้อความที่อ่านแล้ว</p>
                            </Space>
                        </Option>
                        <Option value="notReadMessage" label="ข้อความที่ยังไม่อ่าน">
                            <Space className="flex items-center">
                                <img src={Unread} alt="" />
                                <p className="text-xs">ข้อความที่ยังไม่อ่าน</p>
                            </Space>
                        </Option>
                    </Select>
                </div>
                <div className="space-y-4 mt-4">
                    {
                        historys.map((history) => {
                            return (
                                <div key={history.id} className="relative mx-6 bg-white rounded-lg">
                                    <div onClick={() => {
                                        navigate('/line/classify_detail', { state: { role: true } });
                                    }} className={`grid grid-cols-4 gap-2 p-2 rounded-lg ${history.message > 0 ? 'bg-[#BCEBFF]' : ''}`}>
                                        <img className="w-full h-16 object-cover rounded-xl col-span-1" src={history.img} alt="" />
                                        <div className="col-span-3">
                                            <div className="flex justify-between items-center">
                                                <p className="text-md font-bold">ทธรรษ ธีรชูวิวัฒน์</p>
                                                {history.message > 0 ?
                                                    (<div className="flex items-center space-x-1">
                                                        <img src={Unread} alt="" />
                                                        <div className="rounded-full bg-[#3C6255] text-white text-xs w-5 h-5 flex items-center justify-center">
                                                            <p>{history.message}</p>
                                                        </div>
                                                    </div>)
                                                    :
                                                    (<div className="flex items-center space-x-1">
                                                        <img src={Read} alt="" />
                                                    </div>)}
                                            </div>
                                            <p className="text-sm font-bold">{history.woodName}</p>
                                            <div className="flex items-center justify-between">
                                                <p className="text-xs">ความคล้ายคลึง {history.similar}</p>
                                                <p className="text-right text-[#AA9F9F] text-xs">{history.updateAt}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }



    return (
        <div className="Kanit bg-[#CEDEBD] min-h-screen flex flex-col py-4">
            <div className="grid grid-cols-2 mx-6 shadow-lg rounded-lg overflow-hidden">
            </div>
            <div className="flex justify-between items-center mx-6">
                <div className="w-[45%] bg-white text-center rounded-md py-4">
                    <p>การตรวจสอบในวันนี้</p>
                    <p className="text-xl">20 การตรวจ</p>
                </div>
                <div className="w-[45%] bg-white text-center rounded-md py-4">
                    <p>แจ้งเตือนที่ยังไม่อ่าน</p>
                    <p className="text-xl">20 ข้อความ</p>
                </div>
            </div>
            <div className="flex justify-between mx-6 py-4">
                <div className="bg-white rounded-lg" style={{ width: "45%" }}>
                    <DatePicker placeholder="เลือกวันที่เริ่ม" format="DD-MM-YYYY" style={{ width: "100%" }} />
                </div>
                <img style={{ width: "6%" }} src={Line} alt="" />
                <div className="bg-white rounded-lg" style={{ width: "45%" }}>
                    <DatePicker placeholder="เลือกวันที่สิ้นสุด" format="DD-MM-YYYY" style={{ width: "100%" }} />
                </div>
            </div>
            <RenderClassify />
        </div>
    );
};

export default Notification;
