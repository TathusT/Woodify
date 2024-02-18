import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Dot from '../../assets/classify_dot.svg'
import ArrowBack from '../../assets/arrow_back.svg'
import { getImage } from "../../tools/tools";
import { Select } from "antd";
import axios from "axios";
import path from "../../../path";
import Loading from "../component/Loading";


const WoodDetail: React.FC = () => {
    const [openAllImage, setOpenAllImage] = useState(false)
    const { woodId } = useParams();
    const [wood, setWood] = useState<any>();
    const [column, setColumn] = useState(2);
    const [isLoading, setIsLoading] = useState(true);

    const getWoodInfo = async () => {
        await axios.get(`${path}/wood/${woodId}`)
            .then((res) => {
                setWood(res.data[0])
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        getWoodInfo();
    }, [])
    console.log(wood);
    
    return (
        <div className="min-h-screen Kanit relative flex flex-col flex-grow">
            {isLoading ? <div className="flex items-center justify-center flex-1 h-full"><Loading /></div> : (
                <div>
                    {wood && !openAllImage && (<div>
                        <img className="w-full h-60 object-cover" src={getImage(wood.wood_image[0]?.path)} alt="" />
                        <div className="flex justify-center mt-5">
                            <button onClick={() => setOpenAllImage(true)} className="px-8 py-2 bg-[#3C6255] text-white rounded-lg">ดูรูปทั้งหมด</button>
                        </div>
                        <div className="mt-5 mx-6 mb-4">
                            <div className="text-sm flex justify-between items-center text-[#BCBCBC]">
                                <p>อัปเดตล่าสุดเมื่อ 17 ตุลาคม 2566</p>
                                <p>โดย ทธรรษ ธีรชูวิวัฒน์ </p>
                            </div>
                            <div className="mt-1 custom-dashed p-4 rounded-xl space-y-4">
                                <p className="text-2xl">{wood.common_name}</p>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <img src={Dot} alt="" />
                                        <p>ชื่อสามัญ : {wood.common_name}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <img src={Dot} alt="" />
                                        <p>ชื่อการค้า-ชื่ออังกฤษ : {wood.eng_name.join(", ")}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <img src={Dot} alt="" />
                                        <p>ชื่อพฤษศาสตร์ : {wood.botanical_name}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <img src={Dot} alt="" />
                                        <p>วงศ์ : {wood.pedigree}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <img src={Dot} alt="" />
                                        <p>ถิ่นกำเนิด : {wood.place_of_origin}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <img src={Dot} alt="" />
                                        <p>ลักษณะเนื้อไม้ : {wood.wood_characteristics}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <img src={Dot} alt="" className="self-start pt-1" />
                                        <div>
                                            <p>ลักษณะทางกายวิภาค : เห็นได้ด้วยแว่นขยาย 10-15 เท่า (handlens)</p>
                                            <p>{wood.anatomical_characteristics}</p>
                                        </div>
                                    </div>
                                    {wood.other && (
                                        <div className="flex items-center space-x-2">
                                            <img src={Dot} alt="" />
                                            <p>อื่นๆ : </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>)}
                    {openAllImage && wood && (
                        <div className="p-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <button onClick={() => {
                                        setOpenAllImage(false)
                                    }}><img src={ArrowBack} alt="" /></button>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <p className="text-xl font-bold">แสดง</p>
                                    <Select
                                        defaultValue="2"
                                        style={{ width: 120 }}
                                        onChange={(value) => {
                                            setColumn(parseInt(value))
                                        }}
                                        options={[
                                            { value: '1', label: '1 คอลัมน์' },
                                            { value: '2', label: '2 คอลัมน์' },
                                            { value: '3', label: '3 คอลัมน์' },
                                        ]}
                                    />
                                </div>
                            </div>
                            <div className={`grid grid-cols-${column} gap-2 pt-4`}>
                                {wood &&
                                    wood.wood_image.map((img, index) => {
                                        return <img onClick={() => setOpenAllImage(false)} className="rounded-lg" key={index} src={getImage(img.path)} alt="" />
                                    })
                                }
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default WoodDetail;
