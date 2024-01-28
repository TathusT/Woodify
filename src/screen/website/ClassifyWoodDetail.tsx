import React, { useRef, useEffect, useState } from 'react';
import Wood from '../../assets/S12-3balau 2.png'
import selectIcon from "../../assets/select-icon.svg"
import { Select } from "antd";
import axios from 'axios';
import path from '../../../path';
import { useParams } from 'react-router-dom';
import { convertIsoToThaiDateTime, getImage } from '../../tools/tools';
import { io } from 'socket.io-client';

const ClassifyWoodDetail: React.FC = () => {
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };
    const [heightBox, setHeightBox] = useState(0)
    const divRef = useRef<HTMLDivElement>(null);
    const [note, setNote] = useState<any>()
    const [message, setMessage] = useState<string>('')
    const [classify, setClassify] = useState<any>()
    const [changeResult, setChangeResult] = useState<any>();
    const { c_id } = useParams();
    const similarColor = [
        "text-green-500",
        "text-yellow-500",
        "text-red-500"
    ]

    const addNote = async () => {
        const token = localStorage.getItem('access_token');
        await axios.post(`${path}/note`, {
            token: token,
            description: message,
            c_id: c_id,
            sessionId: classify.session_id_note_room
        }).then((res) => {
            // getNoteFromId();
            setMessage('');
        })
            .catch((err) => {
                console.log(err);
            })
    }

    const getNoteFromId = async () => {
        await axios.get(`${path}/note/${c_id}`)
            .then((res) => {
                setNote(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const getClassifyWithId = async () => {
        await axios.get(`${path}/classify/${c_id}`)
            .then((res) => {
                let makeData: any = [];
                setClassify(res.data)
                res.data.result.map((data: any, index: number) => {
                    makeData.push({ value: data.wood, label: `${index + 1}. ${data.wood} ${data.percentage}%` });
                });
                setChangeResult(makeData);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        const handleResize = () => {
            if (divRef.current) {
                const divHeight = divRef.current.offsetHeight;
                setHeightBox(divHeight)
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        getClassifyWithId();
        getNoteFromId();
    }, [])

    useEffect(() => {
        if (classify) {
            console.log(1);
            
            const socket = io(path, {
                reconnectionAttempts: 3,
                timeout: 10000,
                transports: ["websocket"],
                query: {
                    sessionId: classify.session_id_note_room
                }
            });
            socket.connect()
            socket.on('connect', () => {
                console.log('connect it');
            });

            socket.on('received_message', (data) => {
                console.log('Receive Message OK', data);
                if (data) {
                    setNote(prevNote => [...prevNote, data]);
                }
            });

            return () => {
                socket.disconnect();
            };
        }
    }, [classify])
    return (
        <div>
            {classify && changeResult && (note || note == null) && (
                <div className="w-full Kanit flex flex-col min-h-screen">
                    <p className="text-[32px] font-bold mt-10">การตรวจสอบไม้ ไอดี 3145</p>
                    <div className="pt-6 flex space-x-4">
                        <div className=" w-8/12">
                            <p className="text-xl text-[#5C5C5C] font-semibold">ข้อมูลการตรวจสอบ</p>
                            <div className="box-shadow bg-white rounded-[10px] p-5 mt-2 flex" style={{ height: heightBox }}>
                                <div className="w-3/12 flex items-center justify-center">
                                    <img style={{ height: heightBox - 50 }} src={getImage(classify.image)} alt="" />
                                </div>
                                <div className="grid grid-cols-9 w-5/12 ml-20 gap-3 gap-x-7">
                                    <div className="col-span-5">
                                        <div className="flex items-center space-x-4">
                                            <div className="bg-[#3C6255] rounded-full w-5 h-5"></div>
                                            <p className="text-lg font-semibold">ผลการตรวจสอบ:</p>
                                        </div>
                                    </div>
                                    <div className="col-span-4">
                                        <div className="flex flex-col space-y-4 text-lg font-semibold">
                                            {classify.result.slice(0, 3).map((value: any, index: number) => (
                                                <div className="flex justify-between" key={index}>
                                                    <p>{index + 1}. {value.wood}</p>
                                                    <p className={`${similarColor[index]}`}>{value.percentage}%</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="col-span-5">
                                        <div className="flex items-center space-x-4">
                                            <div className="bg-[#3C6255] rounded-full w-5 h-5"></div>
                                            <p className="text-lg font-semibold">วัน-เวลาที่ทำการตรวจ:</p>
                                        </div>
                                    </div>
                                    <div className="col-span-4">
                                        <p className="text-lg font-semibold">{convertIsoToThaiDateTime(classify.create_at)}</p>
                                    </div>
                                    <div className="col-span-5">
                                        <div className="flex items-center space-x-4">
                                            <div className="bg-[#3C6255] rounded-full w-5 h-5"></div>
                                            <p className="text-lg font-semibold">ผู้ส่งการตรวจ:</p>
                                        </div>
                                    </div>
                                    <div className="col-span-4">
                                        <p className="text-lg font-semibold">ธนวิชญ์ ลักษณะ</p>
                                    </div>
                                    <div className="col-span-5">
                                        <div className="flex items-center space-x-4">
                                            <div className="bg-[#3C6255] rounded-full w-5 h-5"></div>
                                            <p className="text-lg font-semibold">สถานที่พบ:</p>
                                        </div>
                                    </div>
                                    <div className="col-span-4">
                                        <p className="text-lg font-semibold">กรุงเทพมหานคร</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-4/12">
                            <p className="text-xl text-[#5C5C5C] font-semibold">การรับรอง</p>
                            <div ref={divRef} className="bg-white rounded-[10px] box-shadow py-7 px-12 mt-2 flex flex-col items-center space-y-9">
                                <p className="text-lg font-semibold">เลือกเปลี่ยนผล </p>
                                <Select
                                    defaultValue="ประดู่"
                                    suffixIcon={<img src={selectIcon}></img>}
                                    className="h-full w-full"
                                    style={{ height: 40 }}
                                    onChange={handleChange}
                                    options={changeResult}
                                />
                                <div className="flex text-lg font-semibold space-x-4 items-center">
                                    <p>สถานะ:</p>
                                    <p>รอตรวจสอบ</p>
                                </div>
                                <div className="flex items-center space-x-2 text-lg font-semibold">
                                    <div className="bg-[#61876E] text-white py-2 px-5 rounded-[10px]">
                                        <p>ผ่านการรับรอง</p>
                                    </div>
                                    <div className="bg-[#FF5F5F] text-white py-2 px-5 rounded-[10px]">
                                        <p>ไม่ผ่านการรับรอง</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="text-xl text-[#5C5C5C] font-semibold mt-4">บันทึกของการตรวจสอบ</p>
                    <div className='w-full border border-1 border-[#61876E] rounded-[10px] h-[500px] bg-white mt-3 overflow-y-auto space-y-2'>
                        {note != null && note.map((value) => {
                            return (
                                <div key={value.n_id} className='p-2 rounded-lg border bg-blue-500 text-white'>
                                    <p>{value.description}</p>
                                </div>
                            )
                        })}
                    </div>
                    <div className='flex mt-4 space-x-4 mb-6'>
                        <input onChange={(msg) => {
                            setMessage(msg.target.value)
                        }} value={message} className='p-3 border border-1 border-[#61876E] rounded-[10px] w-full' type="text" />
                        <div onClick={() => {
                            addNote()
                        }} className='bg-[#61876E] flex justify-center items-center py-2 px-6 rounded-[10px] cursor-pointer'>
                            <p className='text-lg font-semibold text-white'>โพสต์</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClassifyWoodDetail;
