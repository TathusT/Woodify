import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { DatePicker, Select, Space } from 'antd';
import Line from '../../assets/line.svg'
import Wood from '../../assets/S12-3balau 2.png'
import Bin from '../../assets/bin.svg'
import Bin_Button from '../../assets/bin_button.svg'
import Eye from '../../assets/eye.svg'
import CloseEye from '../../assets/close_eye.svg'
import { Pie } from "@ant-design/plots";
const { Option } = Select;

const thaiMonths = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
];

const Pies : any = Pie;

interface HistoryItem {
    id: number;
    woodName: string;
    similar: string;
    updateAt: string;
    img: string;
}

type ConfigType = {
    appendPadding: number;
    data: Array<{ typeWood: string; value: number; color: string }>;
    angleField: string;
    colorField: string;
    height: number;
    color: (d: { typeWood: string }) => string;
    radius: number;
    label: {
        type: string;
        offset: string;
        content: ({ percent } : { percent: any; }) => string;
        style: {
            fontSize: number;
            textAlign: string;
        };
    };
    legend: boolean;
    interactions: Array<{ type: string }>;
};

type DataType = Array<{ 
    typeWood: string; 
    value: number; 
    color: string 
}>;

function formatDateToThai(dateString: string) {
    const parts = dateString.split(' ');
    const dateParts = parts[0].split('/');
    const day = dateParts[0];
    const month = thaiMonths[parseInt(dateParts[1], 10) - 1];
    const year = parseInt(dateParts[2], 10) + 543;

    return `${day} ${month} ${year} ${parts[1]}`;
}

const HistoryClassify: React.FC = () => {
    const [menuFocus, setMenuFocus] = useState('ประวัติการตรวจสอบ');
    const [backup, setBackUp] = useState([
        {
            typeWood: "ไม้สัก",
            value: 8300,
            color: '#D32F2F'
        },
        {
            typeWood: "ไม้ยาง",
            value: 7000,
            color: '#7B1FA2'
        },
        {
            typeWood: "ไม้ประดู่",
            value: 2000,
            color: '#1976D2'
        },
        {
            typeWood: "ไม้ชิงชัน",
            value: 12000,
            color: '#388E3C'
        },
        {
            typeWood: "ไม้เก็ดแดง",
            value: 9465,
            color: '#FBC02D'
        },
        {
            typeWood: "ไม้อีเม่ง",
            value: 3452,
            color: '#8D6E63'
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
    const [data, setData] = useState([
        {
            typeWood: "ไม้สัก",
            value: 8300,
            color: '#D32F2F'
        },
        {
            typeWood: "ไม้ยาง",
            value: 7000,
            color: '#7B1FA2'
        },
        {
            typeWood: "ไม้ประดู่",
            value: 2000,
            color: '#1976D2'
        },
        {
            typeWood: "ไม้ชิงชัน",
            value: 12000,
            color: '#388E3C'
        },
        {
            typeWood: "ไม้เก็ดแดง",
            value: 9465,
            color: '#FBC02D'
        },
        {
            typeWood: "ไม้อีเม่ง",
            value: 3452,
            color: '#8D6E63'
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
    const [filter, setFilter] = useState<string[]>([]);
    const [config, setConfig] = useState({
        appendPadding: 10,
        data,
        angleField: "value",
        colorField: "typeWood",
        height: 200,
        color: (d) => {
            const colorMapping = {
                ไม้สัก: "#D32F2F",
                ไม้ยาง: "#7B1FA2",
                ไม้ประดู่: "#1976D2",
                ไม้ชิงชัน: "#388E3C",
                ไม้เก็ดแดง: "#FBC02D",
                ไม้อีเม่ง: "#8D6E63",
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
        radius: 0.9,
        label: {
            type: "inner",
            offset: "-30%",
            content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
            style: {
                fontSize: 10,
                textAlign: "center",
            },
        },
        legend: false,
        interactions: [
            {
                type: "element-active",
            },
        ],
    });
    const [historys, setHistorys] = useState<HistoryItem[]>([
        {
            id: 1,
            woodName: "ไม้ประดู่",
            similar: "99%",
            updateAt: formatDateToThai('17/10/2023 11:46:30'),
            img: Wood
        },
        {
            id: 2,
            woodName: "ไม้ประดู่",
            similar: "99%",
            updateAt: formatDateToThai('17/10/2023 11:46:30'),
            img: Wood
        },
        {
            id: 3,
            woodName: "ไม้ประดู่",
            similar: "99%",
            updateAt: formatDateToThai('17/10/2023 11:46:30'),
            img: Wood
        },
        {
            id: 4,
            woodName: "ไม้ประดู่",
            similar: "99%",
            updateAt: formatDateToThai('17/10/2023 11:46:30'),
            img: Wood
        },
        {
            id: 5,
            woodName: "ไม้ประดู่",
            similar: "99%",
            updateAt: formatDateToThai('17/10/2023 11:46:30'),
            img: Wood
        },
        {
            id: 6,
            woodName: "ไม้ประดู่",
            similar: "99%",
            updateAt: formatDateToThai('17/10/2023 11:46:30'),
            img: Wood
        },
        {
            id: 7,
            woodName: "ไม้ประดู่",
            similar: "99%",
            updateAt: formatDateToThai('17/10/2023 11:46:30'),
            img: Wood
        },
        {
            id: 8,
            woodName: "ไม้ประดู่",
            similar: "99%",
            updateAt: formatDateToThai('17/10/2023 11:46:30'),
            img: Wood
        },
    ])
    const [isDelete, setIsDelete] = useState(false);
    const [focusHistoryDelete, setFocusHistoryDelete] = useState<HistoryItem>();
    const [focusIndexDelete, setFocusIndexDelete] = useState<number>(0)

    function RenderClassify() {
        return (
            <div>
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
                        historys.map((history, index) => {
                            return (
                                <div key={history.id} className="grid grid-cols-3 mx-6 bg-white p-2 rounded-lg">
                                    <img className="w-20 h-20 object-cover rounded-xl col-span-1" src={history.img} alt="" />
                                    <div className="col-span-2 relative">
                                        <button onClick={() => {
                                            setIsDelete(true);
                                            setFocusHistoryDelete(history)
                                            setFocusIndexDelete(index)
                                        }} className="w-6 absolute right-0">
                                            <img src={Bin} alt="" />
                                        </button>
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
        )
    }

    function deleteClassify(index : number){
            let newHistorys = historys.filter((_, idx) => idx !== index);
            setHistorys(newHistorys);
            setIsDelete(false);
        
    }

    function RenderGraph({ config } : {config : ConfigType}) {
        return (
            <div className="mx-6 space-y-4 pb-4">
                <div className="m-0 bg-white rounded-lg">
                    <Pies style={{ margin: 0, padding: 0 }} {...config} />
                </div>
            </div>
        )
    }

    function RenderValueGraph({ data } : {data : DataType}) {
        return (
            <div className="bg-white rounded-lg space-y-2 mx-6">
                <p className="text-center text-xl pt-2">จำนวนของแต่ละพันธุ์ไม้ที่ตรวจสอบ</p>
                <div className="px-2 space-y-2 pb-2">
                    {data && data.map((wood) => {
                        return (
                            <div key={wood.typeWood} className="bg-[#EFEFEF] flex justify-between items-center space-x-2 px-4 py-2 rounded-md">
                                <div className="flex items-center space-x-2">
                                    <div className={`w-5 h-5 rounded-sm`} style={{ backgroundColor: wood.color }}></div>
                                    <p>{wood.typeWood}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <p>{wood.value}</p>
                                    <RenderEye wood={wood.typeWood} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    function RenderEye({ wood }: { wood: string }) {
        const isVisible = !filter.includes(wood);

        return (
            <button onClick={() => FilterData(wood)}>
                {isVisible
                    ? <img src={Eye} alt="open_eye" />
                    : <img src={CloseEye} alt="close_eye" />
                }
            </button>
        );
    }

    function FilterData(wood: string) {
        let newFilter: string[];
        if (filter.includes(wood)) {
            newFilter = filter.filter(item => item !== wood);
        } else {
            newFilter = [...filter, wood];
        }
        setFilter(newFilter);

        const filteredData = backup.filter(item => !newFilter.includes(item.typeWood));
        setData(filteredData);
        setConfig(prevConfig => ({
            ...prevConfig,
            data: filteredData
        }));
    }


    return (
        <div className="Kanit bg-[#CEDEBD] min-h-screen flex flex-col">
            {isDelete && (
                <div>
                    <div className="w-screen h-screen absolute bg-black opacity-50 z-40"></div>
                    <div className="z-50 absolute w-11/12 p-5 bg-white rounded-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 space-y-4">
                        <p className="text-center text-2xl">ลบประวัติการตรวจสอบ</p>
                        <img src={focusHistoryDelete?.img} alt="" />
                        <p className="text-center text-xl">คุณต้องการลบ ไม้ประดู่ ใช่หรือไม่</p>
                        <div className="grid grid-cols-2 gap-4">
                            <button onClick={() =>{
                                deleteClassify(focusIndexDelete)
                            }} className="px-4 py-2 bg-[#FF6161] text-white flex item-center space-x-2 rounded-lg">
                                <img src={Bin_Button} alt="" />
                                ยืนยันการลบ
                            </button>
                            <button onClick={() => {
                                setIsDelete(false);
                            }} className="px-4 py-2 bg-[#C1C1C1] text-white rounded-lg">ยกเลิก</button>
                        </div>
                    </div>
                </div>
            )}
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
                <div className="bg-white rounded-lg" style={{ width: "45%" }}>
                    <DatePicker placeholder="เลือกวันที่เริ่ม" format="DD-MM-YYYY" style={{ width: "100%" }} />
                </div>
                <img style={{ width: "6%" }} src={Line} alt="" />
                <div className="bg-white rounded-lg" style={{ width: "45%" }}>
                    <DatePicker placeholder="เลือกวันที่สิ้นสุด" format="DD-MM-YYYY" style={{ width: "100%" }} />
                </div>
            </div>
            {
                menuFocus == 'ประวัติการตรวจสอบ' ? <RenderClassify /> : <div>
                    <RenderGraph config={config} />
                    <RenderValueGraph data={backup} />
                </div>
            }
        </div>
    );
};

export default HistoryClassify;
