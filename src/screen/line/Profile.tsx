import React, { useEffect, useState } from "react";
import ProfileBg from '../../assets/profile_bg.png'
import ProfileAvatar from '../../assets/profile.png'
import { Input } from 'antd';
import EditProfile from "../../assets/edit_profile.svg"
import Loading from "../component/Loading";
import axios from "axios";
import path from "../../../path";

interface UserIdProps {
    userId: string;
}

const Profile: React.FC<UserIdProps> = ({ userId }) => {
    const { innerWidth: width, innerHeight: height } = window;
    const [changePassword, setChangePassword] = useState(false);
    const [editProfile, setEditProfile] = useState(false);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const u_id = userId;

    const getUser = async () => {
        await axios.get(`${path}/user/${u_id}`)
        .then((res) => {
            const data = res.data
            setFirstname(data.firstname)
            setLastname(data.lastname)
            setEmail(data.email)
            setPhone(data.phone)
            setUsername(data.username)
            setIsLoading(false)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const getData = async () => {
        await getUser();
    }

    useEffect(() => {
        getData();
    },[])

    return (
        <div className="min-h-screen bg-[#EBEBEB] Kanit relative">
            {isLoading ? <div className="flex items-center justify-center flex-1 h-full"><Loading /></div> : (
                <div>
                    <div style={{
                        height: `${parseInt(Number(height / 2.5).toFixed(0))}px`,
                        borderBottomLeftRadius: "5rem",
                        borderBottomRightRadius: "5rem"
                    }} className="bg-[#9DB485] shadow-xl">
                        <div className="z-50"> {/* <-- เพิ่ม mt-[402px] เพื่อปรับการตำแหน่ง */}
                            <div className="flex justify-center pt-10 pb-5">
                                <img className="w-40 h-40" src={ProfileAvatar} alt="" />
                            </div>
                            <p className="text-center text-2xl text-white">{firstname} {lastname}</p>
                            <p className="text-center text-2xl text-white">{email}</p>

                        </div>
                    </div>
                    <div className="w-full mt-5 text-lg">
                        <div className="bg-[#FDFDFD] mx-6 rounded-xl shadow-lg">
                            <div className="flex justify-between px-4 border-b-2 py-2">
                                <p className="text-[#0D5D8A]">ชื่อผู้ใช้ :</p>
                                {editProfile ? <Input className="text-right w-3/4 text-[#BCBCBC] Kanit" value={username} /> : <p className="text-[#BCBCBC]">{username}</p>}
                            </div>
                            <div className="flex justify-between px-4 border-b-2 py-2">
                                <p className="text-[#0D5D8A]">ชื่อจริง :</p>
                                {editProfile ? <Input className="text-right w-3/4 text-[#BCBCBC] Kanit" value={firstname} /> : <p className="text-[#BCBCBC]">{firstname}</p>}
                            </div>
                            <div className="flex justify-between px-4 border-b-2 py-2">
                                <p className="text-[#0D5D8A]">นามสกุล :</p>
                                {editProfile ? <Input className="text-right w-3/4 text-[#BCBCBC] Kanit" value={lastname} /> : <p className="text-[#BCBCBC]">{lastname}</p>}
                            </div>
                            <div className="flex justify-between px-4 border-b-2 py-2">
                                <p className="text-[#0D5D8A]">อีเมล :</p>
                                {editProfile ? <Input className="text-right w-3/4 text-[#BCBCBC] Kanit" value={email} /> : <p className="text-[#BCBCBC]">{email}</p>}
                            </div>
                            <div className="flex justify-between px-4 border-b-2 py-2">
                                <p className="text-[#0D5D8A]">เบอร์โทรศัพท์ :</p>
                                {editProfile ? <Input className="text-right w-2/4 text-[#BCBCBC] Kanit" value={phone} /> : <p className="text-[#BCBCBC]">{phone}</p>}
                            </div>
                            {
                                !changePassword && (
                                    <div className="flex justify-between px-4 py-2">
                                        <p className="text-[#0D5D8A]">รหัสผ่าน :</p>
                                        <p {...(editProfile ? {} : { onClick: () => setChangePassword(true) })} className={`${editProfile ? 'text-[#BCBCBC]' : 'text-[#5879CF]'}`}>เปลี่ยนรหัสผ่าน</p>
                                    </div>
                                )
                            }
                            {
                                changePassword && (
                                    <div className="text-lg">
                                        <div className="flex justify-between px-4 border-b-2 py-2">
                                            <p className="text-[#0D5D8A]">รหัสผ่านใหม่ :</p>
                                            {/* <input className="text-right appearance-none focus:outline-none text-xl w-40" placeholder="*********" type="password" /> */}
                                            <Input className="text-right w-2/4 text-[#BCBCBC] Kanit" placeholder="*********" type="password" />
                                        </div>
                                        <div className="flex justify-between px-4 border-b-2 py-2">
                                            <p className="text-[#0D5D8A]">ยืนยันรหัสผ่าน :</p>
                                            {/* <input className="text-right appearance-none focus:outline-none text-xl w-40" placeholder="*********" type="password" /> */}
                                            <Input className="text-right w-2/4 text-[#BCBCBC] Kanit" placeholder="*********" type="password" />
                                        </div>
                                        <div className="py-2 flex justify-center items-center w-full px-4">
                                            <div className="w-full space-y-2">
                                                <button onClick={() => setChangePassword(false)} className="py-2 rounded-lg bg-[#FF6161] text-lg text-white px-4 w-full">ยกเลิก</button>
                                                <button onClick={() => setChangePassword(false)} className="flex items-center justify-center bg-[#61876E] py-2 text-white rounded-lg text-md px-4 w-full"><img className="pr-2" src={EditProfile} alt="" />เปลี่ยนรหัสผ่าน</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    {!changePassword && !editProfile && (
                        <div className="absolute bottom-10 flex justify-center w-full">
                            <div className="w-full px-6">
                                <button onClick={() => setEditProfile(true)} className="flex items-center justify-center bg-[#4075DC] py-2 text-white rounded-lg w-full text-xl"><img className="pr-2" src={EditProfile} alt="" />แก้ไขโปรไฟล์</button>
                            </div>
                        </div>
                    )}
                    {changePassword == false && editProfile && (
                        <div className="absolute bottom-10 flex justify-center w-full">
                            <div className="w-full flex justify-between items-center space-x-4 px-6">
                                <button onClick={() => setEditProfile(false)} className="py-2 rounded-lg bg-[#FF6161] text-lg text-white px-4 w-[47%]">ยกเลิก</button>
                                <button onClick={() => setEditProfile(false)} className="flex items-center justify-center bg-[#61876E] py-2 text-white rounded-lg text-md px-4 w-[47%]"><img className="pr-2" src={EditProfile} alt="" />บันทึก</button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Profile;
