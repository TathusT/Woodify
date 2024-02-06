import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { DatePicker, Pagination, Select, Space } from 'antd';
import Line from '../../assets/line.svg'
import Wood from '../../assets/S12-3balau 2.png'
import Bin from '../../assets/bin.svg'
import Bin_Button from '../../assets/bin_button.svg'
import Eye from '../../assets/eye.svg'
import CloseEye from '../../assets/close_eye.svg'
import { Pie } from "@ant-design/plots";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import path from "../../../path";
import Loading from "../component/Loading";
import { convertIsoToThaiDateTime, convertIsoToThaiDateTimeFullYear } from "../../tools/tools";
import moment from "moment";
const { Option } = Select;

const thaiMonths = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
];

const Pies: any = Pie;

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
        content: ({ percent }: { percent: any; }) => string;
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

interface UserIdProps {
    userId: string;
}

const HistoryClassify: React.FC<UserIdProps> = ({ userId }) => {
    const navigate = useNavigate();
    const [menuFocus, setMenuFocus] = useState('ประวัติการตรวจสอบ');
    const [data, setData] = useState<any>();
    const [backup, setBackup] = useState<any>();
    const [filter, setFilter] = useState<string[]>([]);
    const [isDelete, setIsDelete] = useState(false);
    const [focusHistoryDelete, setFocusHistoryDelete] = useState<HistoryItem>();
    const [focusIndexDelete, setFocusIndexDelete] = useState<number>(0)
    const [selectFilter, setSelectFilter] = useState<any>([])
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [statusFilter, setStatusFilter] = useState('การตรวจทั้งหมด')
    const [classify, setClassify] = useState<any>();
    const [woodType, setWoodType] = useState<any>();
    const [pickerFrom, setPickerFrom] = useState();
    const [pickerTo, setPickerTo] = useState();
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const u_id = userId;

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

    const onChangeWood = async (value) => {
        setSelectFilter(value)
    }

    function FilterDataClassify(wood: string) {
        let newFilter: string[];
        if (filter.includes(wood)) {
            newFilter = filter.filter(item => item !== wood);
        } else {
            newFilter = [...filter, wood];
        }
        setFilter(newFilter);

        const filteredData = backup.filter(item => !newFilter.includes(item.typeWood));
        setData(filteredData);
        // setConfig(prevConfig => ({
        //     ...prevConfig,
        //     data: filteredData
        // }));
    }

    function RenderClassify() {
        return (
            <div>
                <div className="mx-6">
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        value={selectFilter}
                        onChange={onChangeWood}
                        placeholder="เลือกพันธุ์ไม้ที่ต้องการค้นหา"
                        optionLabelProp="label"
                    >
                        <Option value="ไม้ประดู่" label="ไม้ประดู่">
                            <Space>
                                ไม้ประดู่ (Pterocarpus macrocarpus Kurz.)
                            </Space>
                        </Option>
                        <Option value="ไม้แดง" label="ไม้แดง">
                            <Space>
                                ไม้แดง (Xylia xylocarpa)
                            </Space>
                        </Option>
                        <Option value="ไม้สัก" label="ไม้สัก">
                            <Space>
                                ไม้สัก (Tectona grandis L.f.)
                            </Space>
                        </Option>
                        <Option value="ไม้เต็ง" label="ไม้เต็ง">
                            <Space>
                                ไม้เต็ง (Shorea obtusa Wall. ex Blume.)
                            </Space>
                        </Option>
                        <Option value="ไม้ตะเคียนทอง" label="ไม้ตะเคียนทอง">
                            <Space>
                                ไม้ตะเคียนทอง (Hopea odorata Roxb.)
                            </Space>
                        </Option>
                        <Option value="ไม้ตะเคียนราก" label="ไม้ตะเคียนราก">
                            <Space>
                                ไม้ตะเคียนราก (Hopea pierrei Hance)
                            </Space>
                        </Option>
                        <Option value="ไม้พะยอม" label="ไม้พะยอม">
                            <Space>
                                ไม้พะยอม (Shorea roxburghii G. Don)
                            </Space>
                        </Option>
                        <Option value="ไม้มะค่าโมง" label="ไม้มะค่าโมง">
                            <Space>
                                ไม้มะค่าโมง (Afzelia xylocarpa (Kurz) Craib)
                            </Space>
                        </Option>
                        <Option value="ไม้พะยูง" label="ไม้พะยูง">
                            <Space>
                                ไม้พะยูง (Dalbergia cochinchinensis Pierre)
                            </Space>
                        </Option>
                        <Option value="ไม้ยางพารา" label="ไม้ยางพารา">
                            <Space>
                                ไม้ยางพารา (Hevea brasiliensis (Kunth) Mull. Arg.)
                            </Space>
                        </Option>
                        <Option value="ไม้รัง" label="ไม้รัง">
                            <Space>
                                ไม้รัง (Shorea siamensis Miq.)
                            </Space>
                        </Option>
                        <Option value="ไม้แอ๊ก" label="ไม้แอ๊ก">
                            <Space>
                                ไม้แอ๊ก (Shorea glauca King)
                            </Space>
                        </Option>
                        <Option value="ไม้ชุมแพรก" label="ไม้ชุมแพรก">
                            <Space>
                                ไม้ชุมแพรก (Heritiera javanica (Blume) Kosterm.)
                            </Space>
                        </Option>
                    </Select>
                </div>
                <div className="space-y-4 mt-4">
                    {
                        classify && classify.map((history, index) => {
                            return (
                                <div key={history.c_id} className="relative mx-6 bg-white p-2 rounded-lg">
                                    <button onClick={() => {
                                        setIsDelete(true);
                                        setFocusHistoryDelete(history)
                                        setFocusIndexDelete(index)
                                    }} className="w-6 absolute right-1 top-1">
                                        <img src={Bin} alt="" />
                                    </button>
                                    <div onClick={() => {
                                        navigate('/line/classify_detail');
                                    }} className="grid grid-cols-3">
                                        <div className="w-20 h-20 bg-gray-300">
                                            {history.image && <img className="w-20 h-20 object-cover rounded-xl col-span-1" src={history.img} alt="" />}
                                        </div>
                                        <div className="col-span-2">
                                            <p className="text-xl font-bold">ไม้{history.select_result}</p>
                                            <p className="text-lg">ความคล้ายคลึง :  {history.result[0]?.percentage}%</p>
                                            <p className="text-right text-[#AA9F9F]">{convertIsoToThaiDateTimeFullYear(history.create_at)}</p>
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

    function RenderGraph() {
        const [config, setConfig] = useState({
            appendPadding: 10,
            data,
            angleField: "value",
            colorField: "typeWood",
            height: 200,
            color: (d) => {
                const valueColor = data.filter((value) => {
                    if (value.typeWood == d.typeWood) {
                        return value.color
                    }
                })
                return valueColor[0].color || "#000000";
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
        return (
            <div className="mx-6 space-y-4 pb-4">
                <div className="m-0 bg-white rounded-lg">
                    <Pies style={{ margin: 0, padding: 0 }} {...config} />
                </div>
            </div>
        )
    }

    function RenderValueGraph() {
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
            <button onClick={() => FilterDataClassify(wood)}>
                {isVisible
                    ? <img src={Eye} alt="open_eye" />
                    : <img src={CloseEye} alt="close_eye" />
                }
            </button>
        );
    }

    const handlePageChangePage = (page) => {
        setCurrentPage(page);
    };

    const filterData = async () => {
        let filter = {};
        let filterGraph = {};
        if (statusFilter != 'การตรวจทั้งหมด') {
            filter['status_verify'] = (statusFilter)
        }
        if (selectFilter.length != 0) {
            const prepareFilter = selectFilter.map((value) => value.replace('ไม้', ''))
            filter['select_result'] = {
                in: prepareFilter
            }
        }
        if (dateTo != '') {
            filter['create_at'] = filter['create_at'] || {};
            filter['create_at']['lte'] = new Date(dateTo.replace(/-/g, '/'));
            filterGraph['create_at'] = filterGraph['create_at'] || {};
            filterGraph['create_at']['lte'] = new Date(dateTo.replace(/-/g, '/'));
        }
        if (dateFrom != '') {
            filterGraph['create_at'] = filterGraph['create_at'] || {};
            filterGraph['create_at']['gte'] = new Date(dateFrom.replace(/-/g, '/'));
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

        await axios.post(`${path}/classify_donut_with_userid_query`, {
            u_id: u_id,
            filter: filterGraph
        })
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
                setBackup(prepareData)
            })
            .catch((err) => {
                console.log(err);
            })
            setIsLoading(false)
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

    useEffect(() => {
        filterData();
        setIsLoading(true)
    }, [pageSize, currentPage, dateFrom, dateTo, selectFilter])

    return (
        <div className="Kanit bg-[#CEDEBD] min-h-screen flex flex-col">
            {isDelete && (
                <div>
                    <div className="w-screen h-screen fixed bg-black opacity-50 z-40"></div>
                    <div className="z-50 fixed w-11/12 p-5 bg-white rounded-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 space-y-4">
                        <p className="text-center text-2xl">ลบประวัติการตรวจสอบ</p>
                        <img src={focusHistoryDelete?.img} alt="" />
                        <p className="text-center text-xl">คุณต้องการลบ ไม้ประดู่ ใช่หรือไม่</p>
                        <div className="grid grid-cols-2 gap-4">
                            <button onClick={() => {
                                // deleteClassify(focusIndexDelete)
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
            {isLoading ? <div className="flex items-center justify-center flex-1 h-full"><Loading /></div> : (
                <div>
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
                            <DatePicker value={pickerFrom} onChange={(value) => dateFromPicker(value)} placeholder="เลือกวันที่เริ่ม" format="DD-MM-YYYY" style={{ width: "100%" }} />
                        </div>
                        <img style={{ width: "6%" }} src={Line} alt="" />
                        <div className="bg-white rounded-lg" style={{ width: "45%" }}>
                            <DatePicker value={pickerTo} onChange={(value) => dateToPicker(value)} placeholder="เลือกวันที่สิ้นสุด" format="DD-MM-YYYY" style={{ width: "100%" }} />
                        </div>
                    </div>
                    {
                        menuFocus == 'ประวัติการตรวจสอบ' ? <RenderClassify /> : <div>
                            <RenderGraph />
                            <RenderValueGraph />
                        </div>
                    }
                    <div className="px-4 pt-4">
                        {menuFocus == 'ประวัติการตรวจสอบ' && (
                            <Pagination
                                current={currentPage}
                                total={totalPages * pageSize}
                                pageSize={pageSize}
                                onChange={handlePageChangePage}
                                className='pt-1 pb-5'
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default HistoryClassify;
