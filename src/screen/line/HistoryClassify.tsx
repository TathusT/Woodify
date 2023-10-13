import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DatePicker, Select, Space } from 'antd';
import Line from '../../assets/line.svg'
import Wood from '../../assets/S12-3balau 2.png'
import Bin from '../../assets/bin.svg'
const { Option } = Select;


const thaiMonths = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
];

const historys = [
    {
        woodName: "ไม้ประดู่",
        similar: "99%",
        updateAt: formatDateToThai('17/10/2023 11:46:30'),
        img: Wood
    },
    {
        woodName: "ไม้ประดู่",
        similar: "99%",
        updateAt: formatDateToThai('17/10/2023 11:46:30'),
        img: Wood
    },
    {
        woodName: "ไม้ประดู่",
        similar: "99%",
        updateAt: formatDateToThai('17/10/2023 11:46:30'),
        img: Wood
    },
    {
        woodName: "ไม้ประดู่",
        similar: "99%",
        updateAt: formatDateToThai('17/10/2023 11:46:30'),
        img: Wood
    },
    {
        woodName: "ไม้ประดู่",
        similar: "99%",
        updateAt: formatDateToThai('17/10/2023 11:46:30'),
        img: Wood
    },
    {
        woodName: "ไม้ประดู่",
        similar: "99%",
        updateAt: formatDateToThai('17/10/2023 11:46:30'),
        img: Wood
    },
    {
        woodName: "ไม้ประดู่",
        similar: "99%",
        updateAt: formatDateToThai('17/10/2023 11:46:30'),
        img: Wood
    },
    {
        woodName: "ไม้ประดู่",
        similar: "99%",
        updateAt: formatDateToThai('17/10/2023 11:46:30'),
        img: Wood
    },
]

function formatDateToThai(dateString: string) {
    const parts = dateString.split(' ');
    const dateParts = parts[0].split('/');
    const day = dateParts[0];
    const month = thaiMonths[parseInt(dateParts[1], 10) - 1];
    console.log(month);

    const year = parseInt(dateParts[2], 10) + 543; // Convert to Buddhist Era

    return `${day} ${month} ${year} ${parts[1]}`;
}

const HistoryClassify: React.FC = () => {
    const [menuFocus, setMenuFocus] = useState('ประวัติการตรวจสอบ');
    return (
        <div className="Kanit bg-[#CEDEBD] min-h-screen flex flex-col">
            <p className="text-center py-4 text-2xl">ประวัติการใช้งาน</p>
            <div className="grid grid-cols-2 mx-6 shadow-lg rounded-lg overflow-hidden">
                <div onClick={() => {
                    setMenuFocus('ประวัติการตรวจสอบ')
                }} className={`${menuFocus == 'ประวัติการตรวจสอบ' ? 'bg-[#3C6255] text-white' : 'bg-[#ECECEC]'} py-2`}>
                    <p className="text-center">ประวัติการตรวจสอบ</p>
                </div>
                <div onClick={() => {
                    setMenuFocus('แสดงแผนภูมิวงกลม');
                }} className={`${menuFocus == 'แสดงแผนภูมิวงกลม' ? 'bg-[#3C6255] text-white' : 'bg-[#ECECEC]'} py-2`}>
                    <p className="text-center">แสดงแผนภูมิวงกลม</p>
                </div>
            </div>
            <div className="flex justify-between mx-6 py-4">
                <div className="bg-white rounded-lg" style={{width : "45%"}}>
                    <DatePicker placeholder="เลือกวันที่เริ่ม" format="DD-MM-YYYY" style={{width : "100%"}} />
                </div>
                <img style={{width : "6%"}} src={Line} alt="" />
                <div className="bg-white rounded-lg" style={{width : "45%"}}>
                    <DatePicker placeholder="เลือกวันที่สิ้นสุด" format="DD-MM-YYYY" style={{width : "100%"}} />
                </div>
            </div>
            <div className="mx-6">
                <Select
                    mode="multiple"
                    style={{ width: '100%' }}
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
            </div>
            <div className="space-y-4 mt-4">
                {
                    historys.map((history) => {
                        return (
                            <div className="grid grid-cols-3 mx-6 bg-white p-2 rounded-lg">
                                <img className="w-20 h-20 object-cover rounded-xl col-span-1" src={history.img} alt="" />
                                <div className="col-span-2 relative">
                                    <img className="w-6 absolute right-0" src={Bin} alt="" />
                                    <p className="text-xl font-bold">{history.woodName}</p>
                                    <p className="text-lg">ความคล้ายคลึง {history.similar}</p>
                                    <p className="text-right text-[#AA9F9F]">{history.updateAt}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default HistoryClassify;
