import React, { useState } from "react";
import ProfileBg from '../../assets/profile_bg.png'
import ProfileAvatar from '../../assets/profile.png'
import EditProfile from "../../assets/edit_profile.svg"

const Profile: React.FC = () => {
    const { innerWidth: width, innerHeight: height } = window;
    const [changePassword, setChangePassword] = useState(false);
    const [editProfile, setEditProfile] = useState(false);
    return (
        <div className="min-h-screen bg-[#BCBCBC] Kanit relative">
            <div style={{ height: `${parseInt(Number(height / 2.5).toFixed(0))}px`, borderBottomLeftRadius: "5rem", borderBottomRightRadius: "5rem" }} className="bg-[#9DB485]">
                <div>
                    <div className="flex justify-center pt-20 pb-5">
                        <img className="w-40 h-40" src={ProfileAvatar} alt="" />
                    </div>
                    <p className="text-center text-2xl text-white">ทธรรษ ธีรชูวิวัฒน์</p>
                    <p className="text-center text-2xl text-white">tathuswork@gmail.com</p>
                </div>
            </div>
            <div className="w-full mt-5">
                <div className="bg-[#FDFDFD] mx-6 rounded-xl shadow-lg">
                    <div className="flex justify-between px-4 border-b-2 py-2">
                        <p className="text-[#0D5D8A] text-2xl">ชื่อผู้ใช้ :</p>
                        <p className="text-[#BCBCBC] text-2xl">tathus</p>
                    </div>
                    <div className="flex justify-between px-4 border-b-2 py-2">
                        <p className="text-[#0D5D8A] text-2xl">ชื่อจริง :</p>
                        <p className="text-[#BCBCBC] text-2xl">ทธรรษ</p>
                    </div>
                    <div className="flex justify-between px-4 border-b-2 py-2">
                        <p className="text-[#0D5D8A] text-2xl">นามสกุล :</p>
                        <p className="text-[#BCBCBC] text-2xl">ธีรชูวิวัฒน์</p>
                    </div>
                    <div className="flex justify-between px-4 border-b-2 py-2">
                        <p className="text-[#0D5D8A] text-2xl">อีเมล :</p>
                        <p className="text-[#BCBCBC] text-2xl">tathuswork@gmail.com</p>
                    </div>
                    {
                        !changePassword && (
                            <div className="flex justify-between px-4 py-2">
                                <p className="text-[#0D5D8A] text-2xl">รหัสผ่าน :</p>
                                <p {...(editProfile ? {} : { onClick: () => setChangePassword(true) })} className={`${editProfile ? 'text-[#BCBCBC]' : 'text-[#5879CF]'} text-2xl`}>เปลี่ยนรหัสผ่าน</p>
                            </div>
                        )
                    }
                    {
                        changePassword && (
                            <div>
                                <div className="flex justify-between px-4 border-b-2 py-2">
                                    <p className="text-[#0D5D8A] text-2xl">รหัสผ่านใหม่ :</p>
                                    <input className="text-right appearance-none focus:outline-none text-xl w-40" placeholder="*********" type="password" />
                                </div>
                                <div className="flex justify-between px-4 border-b-2 py-2">
                                    <p className="text-[#0D5D8A] text-2xl">ยืนยันรหัสผ่าน :</p>
                                    <input className="text-right appearance-none focus:outline-none text-xl w-40" placeholder="*********" type="password" />
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
            { changePassword == false && editProfile && (
                <div className="absolute bottom-10 flex justify-center w-full">
                    <div className="w-full flex justify-between items-center space-x-4 px-6">
                        <button onClick={() => setEditProfile(false)} className="py-2 rounded-lg bg-[#FF6161] text-lg text-white px-4 w-[47%]">ยกเลิก</button>
                        <button onClick={() => setEditProfile(false)} className="flex items-center justify-center bg-[#61876E] py-2 text-white rounded-lg text-md px-4 w-[47%]"><img className="pr-2" src={EditProfile} alt="" />บันทึก</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
