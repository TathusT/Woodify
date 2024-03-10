import React, { useEffect, useState } from "react";
import ProfileBg from '../../assets/profile_bg.png'
import ProfileAvatar from '../../assets/profile.png'
import { Input } from 'antd';
import EditProfile from "../../assets/edit_profile.svg"
import Loading from "../component/Loading";
import axios from "axios";
import path from "../../../path";
import { closeLiff } from "../../tools/liff";

interface UserIdProps {
    userId: string;
}

const Profile: React.FC<UserIdProps> = ({ userId }) => {
    const { innerWidth: width, innerHeight: height } = window;
    const [editProfile, setEditProfile] = useState(false);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [user, setUser] = useState<any>();
    const [isLoading, setIsLoading] = useState(true);
    const [userImg, setUserimg] = useState('')
    const u_id = userId;

    const getUser = async () => {
        await axios.get(`${path}/user/${u_id}`)
            .then((res) => {
                const data = res.data
                setFirstname(data.firstname)
                setLastname(data.lastname)
                setEmail(data.email)
                setPhone(data.phone)
                setUserimg(data.image)
                setUser(data)
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const getData = async () => {
        await getUser();
    }

    const updateProfile = async () =>{
        let data = {};
        if(user.firstname != firstname){
            data['firstname'] = firstname
        }
        if(user.lastname != lastname){
            data['lastname'] = lastname
        }
        if(user.email != email){
            data['email'] = email
        }
        if(user.phone != phone){
            data['phone'] = phone
        }
        await axios.post(`${path}/update_profile`, {
            data : data,
            u_id : u_id
        })
        .then((res) => {
            if(res.data == 'email is taken'){
                alert('อีเมลถูกใช้งานแล้ว')
                setEmail(user.email)
            }
            else if (res.data == 'phone is taken'){
                alert('เบอร์โทรศัพท์ถูกใช้งานแล้ว')
                setPhone(user.phone)
            }
            else{
                alert('updateSuccess')
                getUser();
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const logout = async () => {
        const token = localStorage.getItem('access_token')
        await axios.post(`${path}/line/logout`, {
            token: token
        })
            .then((res) => {
                console.log(res.data);
                localStorage.removeItem('access_token')
                closeLiff();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className="min-h-screen bg-[#EBEBEB] flex flex-col flex-grow Kanit relative">
            {isLoading ? <div className="flex items-center justify-center flex-1 h-full"><Loading /></div> : (
                <div>
                    <div className="absolute top-5 right-0">
                        <div className="px-6">
                            <button onClick={() => logout()} className="flex items-center justify-center bg-red-300 px-4 py-2 text-white rounded-lg w-full text-sm">ออกจากระบบ</button>
                        </div>
                    </div>
                    <div style={{
                        height: `${parseInt(Number(height / 2.5).toFixed(0))}px`,
                        borderBottomLeftRadius: "5rem",
                        borderBottomRightRadius: "5rem"
                    }} className="bg-[#9DB485] shadow-xl">
                        <div className="z-50"> {/* <-- เพิ่ม mt-[402px] เพื่อปรับการตำแหน่ง */}
                            <div className="flex justify-center pt-10 pb-5">
                                <img className="w-40 h-40 rounded-full" src={userImg} alt="" />
                            </div>
                            <p className="text-center text-2xl text-white">{user.firstname} {user.lastname}</p>
                            <p className="text-center text-2xl text-white">{user.email}</p>

                        </div>
                    </div>
                    <div className="w-full mt-5 text-lg">
                        <div className="bg-[#FDFDFD] mx-6 rounded-xl shadow-lg">
                            <div className="flex justify-between px-4 border-b-2 py-2">
                                <p className="text-[#0D5D8A]">ชื่อจริง :</p>
                                {editProfile ? <Input onChange={(text) => setFirstname(text.target.value)} className="text-right w-3/4 text-[#BCBCBC] Kanit" value={firstname} /> : <p className="text-[#BCBCBC]">{firstname}</p>}
                            </div>
                            <div className="flex justify-between px-4 border-b-2 py-2">
                                <p className="text-[#0D5D8A]">นามสกุล :</p>
                                {editProfile ? <Input onChange={(text) => setLastname(text.target.value)} className="text-right w-3/4 text-[#BCBCBC] Kanit" value={lastname} /> : <p className="text-[#BCBCBC]">{lastname}</p>}
                            </div>
                            <div className="flex justify-between px-4 border-b-2 py-2">
                                <p className="text-[#0D5D8A]">อีเมล :</p>
                                {editProfile ? <Input onChange={(text) => setEmail(text.target.value)} className="text-right w-3/4 text-[#BCBCBC] Kanit" value={email} /> : <p className="text-[#BCBCBC]">{email}</p>}
                            </div>
                            <div className="flex justify-between px-4 border-b-2 py-2">
                                <p className="text-[#0D5D8A]">เบอร์โทรศัพท์ :</p>
                                {editProfile ? <Input onChange={(text) => setPhone(text.target.value)} className="text-right w-2/4 text-[#BCBCBC] Kanit" value={phone} /> : <p className="text-[#BCBCBC]">{phone}</p>}
                            </div>
                        </div>
                    </div>
                    {!editProfile && (
                        <div className="absolute bottom-10 flex justify-center w-full">
                            <div className="w-full px-6">
                                <button onClick={() => setEditProfile(true)} className="flex items-center justify-center bg-[#4075DC] py-2 text-white rounded-lg w-full text-xl"><img className="pr-2" src={EditProfile} alt="" />แก้ไขโปรไฟล์</button>
                            </div>
                        </div>
                    )}
                    {editProfile && (
                        <div className="absolute bottom-10 flex justify-center w-full">
                            <div className="w-full flex justify-between items-center space-x-4 px-6">
                                <button onClick={() => setEditProfile(false)} className="py-2 rounded-lg bg-[#FF6161] text-lg text-white px-4 w-[47%]">ยกเลิก</button>
                                <button onClick={() => {
                                    setEditProfile(false)
                                    updateProfile();
                                }} className="flex items-center justify-center bg-[#61876E] py-2 text-white rounded-lg text-md px-4 w-[47%]"><img className="pr-2" src={EditProfile} alt="" />บันทึก</button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Profile;
