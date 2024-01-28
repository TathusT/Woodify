import React, { useEffect, useRef, useState } from "react";
import Dot from '../../assets/classify_dot.svg'
import StatusWait from '../../assets/wait_for_classify.svg'
import Send from '../../assets/send.svg'
import Wood from '../../assets/S12-3balau 2.png'
import { Button, Modal, Select, Space, Input, message } from 'antd';
import foreignCountry from '../../json/foreignCountry.json'
import thailandCountry from '../../json/thailandCountry.json'
import { useLocation, useParams } from "react-router-dom";
import { getImage, convertIsoToThaiDateTime } from "../../tools/tools";
import path from "../../../path";
import { io } from "socket.io-client";
import axios from "axios";

const { Option } = Select;
const { TextArea } = Input;
const similarColor = [
    "text-green-500",
    "text-yellow-500",
    "text-red-500"
]

const optionsDate: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
};


const ClassidyDetail: React.FC = () => {
    const [menuFocus, setMenuFocus] = useState('ข้อมูลการตรวจสอบ');
    const [woodImage, setWoodImage] = useState();
    const [classify, setClassify] = useState<any>();
    const [user, setUser] = useState<any>();
    const [note, setNote] = useState<any>();
    const [userId, setUserId] = useState('');
    const { classifyId } = useParams();
    const [changeResult, setChangeResult] = useState<any>();
    const [position, setPosition] = useState<string | null>(null);
    console.log(note);

    const getClassify = async () => {
        await axios.get(`${path}/classify/${classifyId}`)
            .then((res) => {
                setClassify(res.data)
                setPosition(res.data.location)
                setWoodImage(res.data.image)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const fetchUsername = async (userId: string) => {
        try {
            const response = await axios.get(`${path}/user/${userId}`);
            return response.data[0].firstname; // สมมติว่ามี property ชื่อ username ในข้อมูลผู้ใช้
        } catch (error) {
            console.error(`Error fetching username for user ID ${userId}:`, error);
            return 'Unknown User'; // หากไม่สามารถดึงข้อมูลได้
        }
    };

    const getNoteFromId = async () => {
        await axios.get(`${path}/note/${classifyId}`)
            .then((res) => {
                setNote(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        axios.post(`${path}/authentication_user`, {}, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then((res) => {
            setUserId(res.data.id)
            axios.get(`${path}/user/${res.data.id}`)
                .then((response) => {
                    setUser(response.data)

                })
        });
        getClassify();
        getNoteFromId();
    }, [])

    useEffect(() => {
        if (classify) {
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


    function RenderClassifyInformation({ state }) {
        const [open, setOpen] = useState(false);
        const [placeFound, setPlaceFound] = useState("incounty")
        const [thailand, setThailand] = useState<any>("")
        const [foreign, setForeign] = useState("")

        function selectPosition(event: string) {
            setPlaceFound(event)
        }
        const onChangeThai = (value: string) => {
            setThailand(value)
        };
        const onChangeFor = (value: string) => {
            setForeign(value)
        };

        const updateClassify = async (positionRaw) => {
            await axios.put(`${path}/classify`, {
                c_id: classifyId,
                location: positionRaw
            }).then((res) => {
                console.log(res.data);
            }).catch((err) => {
                console.log(err);
            })
        }

        const filterOption = (input: string, option?: { label: string; value: string }) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

        return (
            <div className="mx-6 mb-6 shadow border rounded p-4 space-y-4">
                {classify ? (<div>
                    <div className="flex items-center"><img className="pr-2" src={Dot} alt="" />ชื่อพันธ์ุไม้ : {classify.result[0].wood}</div>
                    <div className="grid grid-cols-2 items-start gap-4">
                        <p className="flex items-center "><img className="pr-2" src={Dot} alt="" />ผลการตรวจสอบ :</p>
                        <div>
                            {classify.result.slice(0, 3).map((value, index) => {
                                return (
                                    <div key={index} className="grid grid-cols-6">
                                        <p className="col-span-1">{index + 1}.</p>
                                        <p className="col-span-3">ไม้{value.wood}</p>
                                        <p className={`col-span-2 text-center font-bold ${similarColor[index]}`}>{value.percentage}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <img className="pr-2" src={Dot} alt="" />
                        สถานะ :
                        <img className="pr-1" src={StatusWait} alt="" />
                        {(() => {
                            switch (classify.status_verify) {
                                case "WAITING_FOR_VERIFICATION":
                                    return <p>รอการรับรอง</p>;
                                case "PASSED_CERTIFICATION":
                                    return <p>ผ่านการรับรอง</p>;
                                case "FAILED_CERTIFICATION":
                                    return <p>ไม่ผ่านการรับรอง</p>;
                                default:
                                    return null;
                            }
                        })()}
                    </div>
                    <p className="flex items-center"><img className="pr-2" src={Dot} alt="" />วันที่ตรวจสอบ : {convertIsoToThaiDateTime(classify.create_at)}</p>
                    <div className="flex items-center space-x-2">
                        <img className="pr-2" src={Dot} alt="" />
                        สถานที่พบ :
                        {state.role == "EXPERT" && position == null ? "ยังไม่มีข้อมูลสถานที่พบ" : position ? (
                            <p>{position}</p>
                        ) : (
                            <Button className="bg-[#61876E] text-white focus:none hover:none" onClick={() => setOpen(true)}>
                                เพิ่มสถานที่
                            </Button>
                        )}
                        <Modal
                            className="text-center Kanit"
                            centered
                            open={open}
                            footer={[
                                <div key={"parent"} className="flex justify-between">
                                    <Button className="w-[45%] h-10 bg-[#C1C1C1] text-white" key="back" onClick={() => setOpen(false)}>
                                        ยกเลิก
                                    </Button>
                                    <Button className="w-[45%] h-10 bg-[#3C6255] text-white" key="submit"
                                        onClick={() => {
                                            if (placeFound == "incounty") {
                                                setPosition(`จังหวัด${thailand}`)
                                                updateClassify(`จังหวัด${thailand}`)
                                            }
                                            else {
                                                setPosition(`ประเทศ${foreign}`)
                                                updateClassify(`จังหวัด${thailand}`)
                                            }
                                            setOpen(false)
                                        }}>
                                        บันทึก
                                    </Button>
                                </div>
                            ]}
                        >
                            <p className="text-center text-2xl font-bold">เพิ่มสถานที่พบไม้</p>
                            <p>ตำแหน่งที่พบ</p>
                            <Select
                                defaultValue="incounty"
                                className="w-full Kanit"
                                onChange={selectPosition}
                                options={[
                                    { value: 'incounty', label: 'ภายในประเทศ' },
                                    { value: 'foreign', label: 'ต่างประเทศ' },
                                ]}
                            />
                            {placeFound == "incounty" ?
                                (<div className="mt-2">
                                    <p>จังหวัดที่พบ</p>
                                    <Select
                                        showSearch
                                        value={thailand}
                                        className="w-full Kanit"
                                        placeholder="Select a person"
                                        optionFilterProp="children"
                                        onChange={onChangeThai}
                                        filterOption={filterOption}
                                        options={thailandCountry}
                                    />
                                </div>) :
                                (<div className="mt-2">
                                    <p>ประเทศที่พบ</p>
                                    <Select
                                        showSearch
                                        value={foreign}
                                        className="w-full Kanit"
                                        placeholder="Select a person"
                                        optionFilterProp="children"
                                        onChange={onChangeFor}
                                        filterOption={filterOption}
                                        options={foreignCountry}
                                    />
                                </div>
                                )}
                        </Modal>
                    </div>
                </div>) : ""}
            </div>
        )
    }


    function RenderVerify() {
        const [openModalResult, setOpenModalResult] = useState(false)
        const [selectWood, setSelectWood] = useState('ไม้ประดู่')
        const [confirmWood, setConfirmWood] = useState('')
        const [textAreaConfirm, setTextAreaConfirm] = useState('')
        const [modalVerify, setModalVerify] = useState(false)
        const [status, setStatus] = useState(true)
        function ChangeResult(value) {
            setOpenModalResult(true)
            setConfirmWood(value)
        }
        const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setTextAreaConfirm(e.target.value)
        };
        return (
            <div className="mx-6 mb-4 shadow border rounded py-4 space-y-4 px-8">
                <p className="text-center">เลือกเปลี่ยนผล</p>
                <Select
                    style={{ width: '100%' }}
                    defaultValue={'ไม้ประดู่'}
                    value={selectWood}
                    onChange={(value) => ChangeResult(value)}
                >
                    <Option value="ไม้ประดู่" label="ไม้ประดู่">
                        <Space>
                            <div className="rounded-full w-5 h-5 border border-black flex items-center justify-center">1</div> ไม้ประดู่ 98%
                        </Space>
                    </Option>
                    <Option value="ไม้แดง" label="ไม้แดง">
                        <Space>
                            <div className="rounded-full w-5 h-5 border border-black flex items-center justify-center">2</div> ไม้แดง 60%
                        </Space>
                    </Option>
                    <Option value="ไม้สัก" label="ไม้สัก">
                        <Space>
                            <div className="rounded-full w-5 h-5 border border-black flex items-center justify-center">3</div> ไม้สัก 50%
                        </Space>
                    </Option>
                    <Option value="ไม้เต็ง" label="ไม้เต็ง">
                        <Space>
                            <div className="rounded-full w-5 h-5 border border-black flex items-center justify-center">4</div> ไม้เต็ง 47%
                        </Space>
                    </Option>
                    <Option value="ไม้ชุมแพรก" label="ไม้ชุมแพรก">
                        <Space>
                            <div className="rounded-full w-5 h-5 border border-black flex items-center justify-center">5</div> ไม้ชุมแพรก 42%
                        </Space>
                    </Option>
                    <Option value="ไม้ตะเคียนทอง" label="ไม้ตะเคียนทอง">
                        <Space>
                            <div className="rounded-full w-5 h-5 border border-black flex items-center justify-center">6</div> ไม้ตะเคียนทอง 36%
                        </Space>
                    </Option>
                    <Option value="ไม้ตะเคียนราก" label="ไม้ตะเคียนราก">
                        <Space>
                            <div className="rounded-full w-5 h-5 border border-black flex items-center justify-center">7</div> ไม้ตะเคียนราก 32%
                        </Space>
                    </Option>
                    <Option value="ไม้พะยอม" label="ไม้พะยอม">
                        <Space>
                            <div className="rounded-full w-5 h-5 border border-black flex items-center justify-center">8</div> ไม้พะยอม 29%
                        </Space>
                    </Option>
                    <Option value="ไม้มะค่าโมง" label="ไม้มะค่าโมง">
                        <Space>
                            <div className="rounded-full w-5 h-5 border border-black flex items-center justify-center">9</div> ไม้มะค่าโมง 22%
                        </Space>
                    </Option>
                    <Option value="ไม้ยางพารา" label="ไม้ยางพารา">
                        <Space>
                            <div className="rounded-full w-5 h-5 border border-black flex items-center justify-center">10</div> ไม้ยางพารา 19%
                        </Space>
                    </Option>
                    <Option value="ไม้แอ๊ก" label="ไม้แอ๊ก">
                        <Space>
                            <div className="rounded-full w-5 h-5 border border-black flex items-center justify-center">11</div> ไม้แอ๊ก 14%
                        </Space>
                    </Option>
                    <Option value="Rosewood" label="ไม้พะยูง">
                        <Space>
                            <div className="rounded-full w-5 h-5 border border-black flex items-center justify-center">12</div> ไม้พะยูง 9%
                        </Space>
                    </Option>
                    <Option value="ไม้รัง" label="ไม้รัง">
                        <Space>
                            <div className="rounded-full w-5 h-5 border border-black flex items-center justify-center">13</div> ไม้รัง 7%
                        </Space>
                    </Option>
                </Select>
                <div className="flex items-center justify-between">
                    <button onClick={() => {
                        setStatus(true)
                        setModalVerify(true)
                    }} className="bg-[#61876E] px-4 py-2 rounded-lg text-white text-sm text-center w-[48%]">ผ่านการรับรอง</button>
                    <button onClick={() => {
                        setStatus(false)
                        setModalVerify(true)
                    }} className="bg-[#FF5F5F] px-4 py-2 rounded-lg text-white text-sm text-center w-[48%]">ไม่ผ่านการรับรอง</button>
                </div>
                <Modal
                    className="text-center Kanit"
                    centered
                    open={openModalResult}
                    footer={[
                        <div key={"parent"} className="flex justify-between">
                            <Button className="w-[45%] h-10 bg-[#3C6255] text-white" key="submit"
                                onClick={() => {
                                    setOpenModalResult(false)
                                    setSelectWood(confirmWood)
                                    setConfirmWood('')
                                }}>
                                ยืนยัน
                            </Button>
                            <Button className="w-[45%] h-10 bg-[#C1C1C1] text-white" key="back" onClick={() => {
                                setOpenModalResult(false)
                            }}>
                                ยกเลิก
                            </Button>
                        </div>
                    ]}
                >
                    <p className="text-center text-2xl font-bold">เปลี่ยนผลการตรวจสอบ</p>
                    <div className="p-4">
                        <p className="text-lg">คุณต้องการเปลี่ยนผลการตรวจสอบ
                            จาก <span className="text-red-500">{selectWood}</span> เป็น <span className="text-green-500">{confirmWood}</span> ใช่หรือไม่?</p>
                    </div>
                </Modal>


                <Modal
                    className="text-center Kanit"
                    centered
                    open={modalVerify}
                    footer={[
                        <div key={"parent"} className="flex justify-between">
                            <Button className="w-[45%] h-10 bg-[#3C6255] text-white" key="submit"
                                onClick={() => {
                                    setModalVerify(false)
                                    setTextAreaConfirm('')
                                }}>
                                ยืนยัน
                            </Button>
                            <Button className="w-[45%] h-10 bg-[#C1C1C1] text-white" key="back" onClick={() => {
                                setModalVerify(false)
                                setTextAreaConfirm('')
                            }}>
                                ยกเลิก
                            </Button>
                        </div>
                    ]}
                >
                    <p className="text-center text-2xl font-bold">การรับรอง</p>
                    <div className="p-4">
                        <p className="text-lg">คุณต้องการตั้งสถานะการตรวจสอบ
                            เป็น {status ? <span className="text-green-500">ผ่านการรับรอง</span> : <span className="text-red-500">ไม่ผ่านการรับรอง</span>} ใช่หรือไม่?</p>
                    </div>
                    <div className="pb-5">
                        <p>บันทึกการรับรอง</p>
                        <TextArea
                            showCount
                            value={textAreaConfirm}
                            maxLength={300}
                            onChange={onChange}
                            // placeholder=""
                            style={{ height: 120, resize: 'none' }}
                        />
                    </div>
                </Modal>
            </div>
        )
    }


    function RenderNote() {
        const containerRef = useRef<HTMLDivElement | null>(null);

        useEffect(() => {
            // ทำ Auto-scroll ไปที่ล่างสุด
            if (containerRef.current) {
                // ทำ Auto-scroll ไปที่ล่างสุด
                containerRef.current.scrollTop = containerRef.current.scrollHeight;
            }
        }, [note]);
        return (
            <div className="flex flex-col mx-6 pb-4">
                <div ref={containerRef} className="overflow-y-auto space-y-2 h-[19.5rem]">
                    {note && note.map((data) => {
                        return (
                            <div key={data.n_id} className={`${data.creator.u_id == userId ? 'bg-[#2B57CA] text-white ' : 'bg-[#EAEAEA]'} rounded p-2`}>
                                <p className={`text-sm ${data.creator.u_id == userId ? '' : 'text-right'}`}>{data.description}</p>
                                <p className={`text-xs ${data.creator.u_id == userId ? 'text-[#DCDCDC] text-right' : "text-[#AA9F9F]"}`}>บันทึกเมื่อ {convertIsoToThaiDateTime(data.create_at)}</p>
                                <p className={`text-xs ${data.creator.u_id == userId ? 'text-[#DCDCDC] text-right' : "text-[#AA9F9F]"}`}>เขียนโดย {data.creator.firstname}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    function RenderInputSend() {
        const [message, setMessage] = useState<string>('');

        const addNote = async () => {
            const token = localStorage.getItem('access_token');
            await axios.post(`${path}/note`, {
                token: token,
                description: message,
                c_id: classifyId,
                sessionId: classify.session_id_note_room
            }).then((res) => {
                // getNoteFromId();
                setMessage('');
            })
                .catch((err) => {
                    console.log(err);
                })
        }

        return (
            <div className="mx-6 bg-[#EAEAEA] p-1 rounded-lg mb-4 relative mt-auto">
                <input value={message} onChange={(text) => setMessage(text.target.value)} className="py-1 px-2 rounded-lg w-full" type="text" placeholder="พิมพ์ข้อความ..." />
                <button onClick={() => addNote()} className="absolute z-50 right-2"><img className="w-8 h-8" src={Send} alt="" /></button>
            </div>
        )
    }



    return (
        <div className="Kanit flex flex-col min-h-screen">
            <div className="flex justify-center">
                {woodImage && <img className="w-full h-96 object-cover p-8 rounded-xl" src={getImage(woodImage)} alt="" />}
            </div>
            <div className="grid grid-cols-2 mx-6 shadow-lg rounded overflow-hidden mb-4">
                <div onClick={() => {
                    setMenuFocus('ข้อมูลการตรวจสอบ')
                }} className={`${menuFocus == 'ข้อมูลการตรวจสอบ' ? 'bg-[#3C6255] text-white' : 'bg-[#ECECEC]'} py-2`}>
                    <p className="text-center">ข้อมูลการตรวจสอบ</p>
                </div>
                <div onClick={() => {
                    setMenuFocus('บันทึก');
                }} className={`${menuFocus == 'บันทึก' ? 'bg-[#3C6255] text-white' : 'bg-[#ECECEC]'} py-2`}>
                    <p className="text-center">บันทึก</p>
                </div>
            </div>
            {user && user.role == "EXPERT" && menuFocus == 'ข้อมูลการตรวจสอบ'
                ? <RenderVerify />
                : ""}
            {user && menuFocus == 'ข้อมูลการตรวจสอบ'
                ? <RenderClassifyInformation state={user} />
                : <div className="flex-grow flex flex-col"><RenderNote /><RenderInputSend /></div>}
        </div>
    );
};

export default ClassidyDetail;
