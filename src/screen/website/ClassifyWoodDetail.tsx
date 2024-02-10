import React, { useRef, useEffect, useState } from 'react';
import Wood from '../../assets/S12-3balau 2.png'
import selectIcon from "../../assets/select-icon.svg"
import { Select, Modal } from "antd";
import axios from 'axios';
import path from '../../../path';
import { useParams } from 'react-router-dom';
import { convertIsoToThaiDateTime, getImage } from '../../tools/tools';
import Loading from '../component/Loading';
import { io } from 'socket.io-client';

const ClassifyWoodDetail: React.FC = () => {
    const [modalCertification, setModalCertification] = useState(false);
    const [modalChange, setModalChange] = useState(false);
    const [checkModalCertification, setCheckModalCertification] = useState(false);
    const [valueBefore, setValueBefore] = useState<any>();
    const [valueAfter, setValueAfter] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    function clickModal(check) {
        setModalCertification(true)
        if (check == 'ผ่าน') {
            setCheckModalCertification(true)
        } else {
            setCheckModalCertification(false)
        }
    }
    const handleChange = (value, option) => {
        setModalChange(true)
        setValueAfter(value)
        console.log(value);

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
                console.log(res.data);

                setClassify(res.data)
                res.data.result.map((data: any, index: number) => {
                    makeData.push({ value: data.wood, label: `${index + 1}. ${data.wood} ${data.percentage}%` });
                });
                setChangeResult(makeData);
                setValueBefore(makeData[0])
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
    }, [isLoading]);

    const getData = async () => {
        await getClassifyWithId();
        await getNoteFromId();
        await setIsLoading(false)
    }

    useEffect(() => {
        getData();
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
        <div className='w-full Kanit flex flex-col min-h-screen'>
            {isLoading ? <div className="flex items-center justify-center flex-1 h-full"><Loading /></div> : classify && changeResult && (note || note == null) && (
                <div className="">
                    <p className="text-[32px] font-bold mt-10">การตรวจสอบไม้ ไอดี {classify.c_id}</p>
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
                                        <p className="text-lg font-semibold">{classify.creator.firstname} {classify.creator.lastname}</p>
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
                                    suffixIcon={<img src={selectIcon}></img>}
                                    className="h-full w-full"
                                    style={{ height: 40 }}
                                    onChange={handleChange}
                                    options={changeResult}
                                    value={valueBefore}
                                />
                                <div className="flex text-lg font-semibold space-x-4 items-center">
                                    <p>สถานะ:</p>
                                    <p>{classify.status_verify == "WAITING_FOR_VERIFICATION" ? "รอการรับรอง" : classify.status_verify == 'PASSED_CERTIFICATION' ? "ผ่านการรับรอง" : "ไม่ผ่านการรับรอง"}</p>
                                </div>
                                <div className="flex items-center space-x-2 text-lg font-semibold">
                                    <div onClick={() => clickModal('ผ่าน')} className="bg-[#61876E] text-white py-2 px-5 rounded-[10px]">
                                        <p>ผ่านการรับรอง</p>
                                    </div>
                                    <div onClick={() => clickModal('ไม่ผ่าน')} className="bg-[#FF5F5F] text-white py-2 px-5 rounded-[10px]">
                                        <p>ไม่ผ่านการรับรอง</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="text-xl text-[#5C5C5C] font-semibold mt-4">บันทึกของการตรวจสอบ</p>
                    <div className='w-full border border-1 border-[#61876E] rounded-[10px] h-[500px] bg-white mt-3 overflow-y-auto space-y-2 p-2'>
                        {note != null && note.map((value) => {
                            return (
                                <div key={value.n_id} className={`p-2 rounded-lg border ${classify.creator.u_id == value.create_by ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
                                    <p>{value.description}</p>
                                    <p className='text-right'>{convertIsoToThaiDateTime(value.create_at)}</p>
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
            {/* modal */}
            <Modal
                title={[
                    <div className="text-center text-[24px] mt-4">
                        <p>การรับรอง</p>
                    </div>
                ]}
                className="Kanit"
                centered
                open={modalCertification}
                width={1050}
                onCancel={() => setModalCertification(false)}
                footer={[
                    <div className="flex items-center justify-center space-x-2 font-semibold pt-3 mb-4">
                        <div onClick={() => {
                            setModalCertification(false)
                        }} className="bg-[#3C6255] py-2 w-1/6 text-white cursor-pointer rounded-[10px] text-center">
                            <p>ยืนยัน</p>
                        </div>
                        <div onClick={() => setModalCertification(false)} className="bg-[#C1C1C1] py-2 w-1/6 cursor-pointer rounded-[10px] text-center">
                            <p>ยกเลิก</p>
                        </div>
                    </div>
                ]}
            >
                <div className="flex items-center my-10 flex-col space-y-4">
                    <p className="text-lg font-semibold">คุณต้องการตั้งสถานะการตรวจสอบ</p>
                    <div className='flex space-x-3'>
                        <p className="text-lg font-semibold">เป็น</p>
                        {
                            (checkModalCertification ?
                                <p className='text-lg font-semibold text-[#61876E]'>ผ่านการรับรอง</p>
                                :
                                <p className='text-lg font-semibold text-[#FF0000]'>ไม่ผ่านการรับรอง</p>
                            )
                        }
                        <p className="text-lg font-semibold">ใช่หรือไม่?</p>
                    </div>
                    <div className='w-4/5'>
                        <p className='text-lg font-semibold'>บันทึกการรับรอง</p>
                        <textarea className='w-full border border-1 border-[#61876E] rounded-[15px] p-3 h-72 text-lg font-semibold max-h-80' name="" id=""></textarea>
                    </div>
                </div>
            </Modal>
            <Modal
                title={[
                    <div className="text-center text-[24px] mt-4">
                        <p>เปลี่ยนผลการตรวจสอบ</p>
                    </div>
                ]}
                className="Kanit"
                centered
                open={modalChange}
                width={550}
                onCancel={() => setModalChange(false)}
                footer={[
                    <div className="flex items-center justify-center space-x-2 font-semibold pt-3 mb-4">
                        <div onClick={() => {
                            setModalChange(false)
                            setValueBefore(valueAfter)
                        }} className="bg-[#3C6255] py-2 w-1/4 text-white cursor-pointer rounded-[10px] text-center">
                            <p>ยืนยัน</p>
                        </div>
                        <div onClick={() => setModalChange(false)} className="bg-[#C1C1C1] py-2 w-1/4 cursor-pointer rounded-[10px] text-center">
                            <p>ยกเลิก</p>
                        </div>
                    </div>
                ]}
            >
                <div className="flex items-center my-10 flex-col space-y-4">
                    <p className="text-lg font-semibold">คุณต้องการเปลี่ยนผลการตรวจสอบ</p>
                    <div className='flex space-x-3'>
                        <p className="text-lg font-semibold">จาก</p>
                        <p className="text-lg font-semibold">{valueBefore && (valueBefore.value || valueBefore)}</p>
                        <p className="text-lg font-semibold">เป็น</p>
                        <p className="text-lg font-semibold">{valueAfter}</p>
                        <p className="text-lg font-semibold">ใช่หรือไม่?</p>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ClassifyWoodDetail;
