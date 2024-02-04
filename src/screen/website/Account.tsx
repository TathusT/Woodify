import React, { useEffect, useState } from "react";
import { Select, Input, Dropdown, MenuProps, Modal } from "antd";
import add from "../../assets/add.svg";
import search from "../../assets/search.svg";
import axios from "axios";
import path from "../../../path";
import { convertIsoToThaiDateTime } from "../../tools/tools";
import Loading from "../component/Loading";
import sortIcon from "../../assets/sort-icon.svg"
import selectIcon from "../../assets/select-icon.svg"
import dotIcon from "../../assets/dropdowndot-icon.svg"
import clockIcon from "../../assets/last-status-icon.svg"
import blockIcon from "../../assets/block-icon.svg"
import changeRoleIcon from "../../assets/change-role-icon.svg"
import garbageIcon from "../../assets/garbage-red-icon.svg"
const Account: React.FC = () => {
  const [infoWood, setInfoWood] = useState<any>()
  const [isLoading, setIsLoading] = useState(true);
  const [modalAddUser, setmodalAddUser] = useState(false);
  const [titleModal, setTitleModal] = useState("")
  const [confirmButton, setConfirmButton] = useState("")
  const [users, setUsers] = useState<any>();
  const [selectUser, setSelectUser] = useState<any>();
  const [selectRole, setSelectRole] = useState('')
  const [email, setEmail] = useState('');
  const handleChange = (value: string) => {
    setSelectRole(value);
  };

  const getUser = async () => {
    await axios.get(`${path}/user`).then((res) => { setUsers(res.data) }).catch((err) => console.log(err))
  }

  const sendMailToExpert = async () => {
    await axios.post(`${path}/send_email`, {
      email : email
    })
    .then((res) => {
      if(res.data.message == 'email is taken'){
        alert('email is taken')
      }
      setEmail('')
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const updateRole = async () => {
    await axios.put(`${path}/update_role`, {
      u_id: selectUser.u_id,
      role: selectRole
    }).then((res) => {
      if (res.data.message == "update role success") {
        getUser();
      }
    })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    getUser();
  }, [])
  console.log(users);

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a onClick={() => clickModal("บล็อกบัญชี")} className="flex items-center Kanit font-semibold space-x-2" rel="noopener noreferrer">
          <img width={20} src={blockIcon} alt="" />
          <p>
            บล็อกบัญชี
          </p>
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a onClick={() => clickModal("เปลี่ยนบทบาท")} className="flex items-center Kanit font-semibold space-x-2" rel="noopener noreferrer">
          <img width={20} src={changeRoleIcon} alt="" />
          <p>
            เปลี่ยนบทบาท
          </p>
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a onClick={() => clickModal("ลบบัญชี")} className="flex items-center Kanit font-semibold space-x-2" rel="noopener noreferrer">
          <img width={20} src={garbageIcon} alt="" />
          <p>
            ลบบัญชี
          </p>
        </a>
      ),
    },
  ];
  function clickModal(title) {
    setmodalAddUser(true)
    setTitleModal(title)
    if (title == 'สร้างบัญชี') {
      setConfirmButton("ยืนยันการส่ง")
    } else if (title == 'บล็อกบัญชี') {
      setConfirmButton("ยืนยันการบล็อก")
    } else if (title == 'เปลี่ยนบทบาท') {
      setConfirmButton("ยืนยันการเปลี่ยน")
    } else {
      setConfirmButton("ยืนยันการลบ")
    }
  }
  return (
    <div className="w-full Kanit flex flex-col min-h-screen">
      <div className="flex mt-10 justify-between">
        <p className="text-[24px] font-semibold">บัญชี</p>
        <div className="flex items-center space-x-3">
          <p className="font-semibold">แสดง</p>
          <Select
            defaultValue="10 แถว"
            suffixIcon={<img src={selectIcon}></img>}
            className="h-full"
            style={{ width: 130 }}
            onChange={handleChange}
            options={[
              { value: "10 แถว", label: "10 แถว" },
              { value: "20 แถว", label: "20 แถว" },
              { value: "30 แถว", label: "30 แถว" },
            ]}
          />
          <Select
            defaultValue="ใช้งานล่าสุด"
            suffixIcon={<img src={sortIcon}></img>}
            className="h-full"
            style={{ width: 130 }}
            onChange={handleChange}
            options={[
              { value: "ถูกบล็อก", label: "ถูกบล็อก" },
              { value: "ไม่ได้ใช้งาน", label: "ไม่ได้ใช้งาน" },
              { value: "ใช้งานล่าสุด", label: "ใช้งานล่าสุด" },
            ]}
          />
          <Select
            defaultValue="ผู้ใช้ทั้งหมด"
            suffixIcon={<img src={selectIcon}></img>}
            className="h-full"
            style={{ width: 130 }}
            onChange={handleChange}
            options={[
              { value: "ผู้เชี่ยวชาญ", label: "ผู้เชี่ยวชาญ" },
              { value: "ผู้ใช้ทั่วไป", label: "ผู้ใช้ทั่วไป" },
              { value: "ผู้ใช้ทั้งหมด", label: "ผู้ใช้ทั้งหมด" },
            ]}
          />
          <div className="h-full">
            <Input className="h-full w-[280px] font-semibold" suffix={<img src={search} />} />
          </div>
          <div onClick={() => clickModal("สร้างบัญชี")} className="bg-[#3C6255] h-full flex justify-center space-x-2 items-center px-3 rounded-[8px] text-white cursor-pointer">
            <p>สร้างบัญชี</p>
            <img src={add} alt="" />
          </div>
        </div>
      </div>
      <table className="table-auto w-full mt-8 border-spacing-y-4 border-separate">
        <thead>
          <tr className="w-full font-bold">
            <th className="pb-5 w-6"></th>
            <th className="pb-5">ไอดีผู้ใช้งาน</th>
            <th className="pb-5">ชื่อ-นามสกุล</th>
            <th className="pb-5">บทบาท</th>
            <th className="pb-5">อีเมล</th>
            <th className="pb-5">สถานะ</th>
            <th className="pb-5">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map((user, index) => {
            return (
              <tr key={index} className="bg-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] rounded-[10px] font-semibold">
                <td className="rounded-l-[10px] text-center pl-4">
                  <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
                    {user.image && (
                      <img src={user.image} alt="" />
                    )}
                  </div>
                </td>
                <td className="py-5 text-center">{user.u_id}</td>
                <td className="py-5 text-center">{user.firstname} {user.lastname}</td>
                <td className="py-5 text-center">{user.role}</td>
                <td className="py-5 text-center">{user.email ? user.email : "-"}</td>
                <td className="py-5 text-[#3C6255]">
                  <div className="flex justify-center items-center">
                    <img className="mr-3" src={clockIcon} alt="" />
                    <p>
                      ใช้งาน 10 นาทีที่แล้ว
                    </p>
                  </div>
                </td>
                <td className="py-5 rounded-r-[10px] text-center">
                  <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']} arrow>
                    <img onClick={(e) => {
                      e.preventDefault()
                      setSelectUser(user);
                      setSelectRole(user.role)
                    }} className="mx-auto" src={dotIcon} alt="" />
                  </Dropdown>
                </td>
              </tr>
            )
          })}
          <tr>
            <td className="py-2"></td>
          </tr>
        </tbody>
      </table>
      {/* modal */}
      <Modal
        title={[
          <div className="text-center text-xl">
            <p>{titleModal}</p>
          </div>
        ]}
        className="Kanit"
        centered
        open={modalAddUser}
        width={350}
        onCancel={() => setmodalAddUser(false)}
        footer={[
          <div className="flex items-center space-x-2 font-semibold pt-3">
            <div onClick={() => {
              setmodalAddUser(false)
              if (confirmButton == "ยืนยันการเปลี่ยน") {
                updateRole();
              }
              if (confirmButton == "ยืนยันการส่ง") {
                sendMailToExpert();
              }
            }} className="bg-[#3C6255] py-2 w-1/2 text-white cursor-pointer rounded-[10px] text-center">
              <p>{confirmButton}</p>
            </div>
            <div onClick={() => {
              setmodalAddUser(false)
              setEmail('')
            }} className="bg-[#C1C1C1] py-2 w-1/2 cursor-pointer rounded-[10px] text-center">
              <p>ยกเลิก</p>
            </div>
          </div>
        ]}
      >
        {confirmButton == 'ยืนยันการบล็อก' || confirmButton == 'ยืนยันการเปลี่ยน' || confirmButton == 'ยืนยันการลบ' ?
          (
            <div className="flex flex-col items-center space-y-3 font-semibold">
              <img className="rounded-full w-32 h-32" src={`${selectUser.image}`} alt="" />
              <p>{selectUser.firstname} {selectUser.lastname}</p>
              {confirmButton == 'ยืนยันการบล็อก' ? (<p>คุณต้องการบล็อกบัญชีผู้ใช้นี้ใช่หรือไม่?</p>) : ('')}
              {confirmButton == 'ยืนยันการเปลี่ยน' ? (<p>คุณต้องการเปลี่ยนบทบาทผู้ใช้นี้เป็น</p>) : ('')}
              {confirmButton == 'ยืนยันการลบ' ? (<p>คุณต้องการลบบัญชีผู้ใช้นี้ใช่หรือไม่?</p>) : ('')}
              {confirmButton == 'ยืนยันการเปลี่ยน' ?
                (
                  <Select
                    value={selectRole}
                    suffixIcon={<img src={selectIcon}></img>}
                    className="h-full w-full"
                    onChange={handleChange}
                    options={[
                      { value: "EXPERT", label: "ผู้เชี่ยวชาญ" },
                      { value: "USER", label: "ผู้ใช้ทั่วไป" }
                    ]}
                  />
                ) : ('')}
            </div>
          )
          :
          (
            <div className="pt-3">
              <p className="mb-1 font-semibold text-base">อีเมลผู้เชี่ยวชาญ</p>
              <input value={email} onChange={(text) => { setEmail(text.target.value) }} className="rounded-[5px] font-semibold border-[1px] w-full text-base border-[#61876E] p-1 focus-visible:border-[#445f4e]"></input>
            </div>
          )
        }
      </Modal>
    </div>
  );
};

export default Account;
