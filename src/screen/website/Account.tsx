import React, { useEffect, useState } from "react";
import { Select, Input, Dropdown, MenuProps, Modal, Pagination } from "antd";
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
import checkMarkIcon from "../../assets/check-mark-icon.svg"
import { useNavigate } from "react-router-dom";
const Account: React.FC = () => {
  const [infoWood, setInfoWood] = useState<any>()
  const [isLoading, setIsLoading] = useState(true);
  const [modalAddUser, setmodalAddUser] = useState(false);
  const [titleModal, setTitleModal] = useState("")
  const [confirmButton, setConfirmButton] = useState("")
  const [users, setUsers] = useState<any>();
  const [selectUser, setSelectUser] = useState<any>();
  const [selectRoleUpdate, setSelectRoleUpdate] = useState('')
  const [selectRole, setSelectRole] = useState('ผู้ใช้ทั้งหมด')
  const [selectStatus, setSelectStatus] = useState('ทั้งหมด')
  const [selectSearch, setSelectSearch] = useState('')
  const [email, setEmail] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handlePageChangePage = (page) => {
    setCurrentPage(page);
  };
  const handleChangeRole = (value: string) => {
    setSelectRole(value);
  };
  const handleChangeRoleUpdate = (value: string) => {
    setSelectRoleUpdate(value);
  };

  const handleChangeStatus = (value: string) => {
    setSelectStatus(value);
  };
  const router = useNavigate();

  const getUser = async () => {
    await axios.get(`${path}/user`).then((res) => { setUsers(res.data) }).catch((err) => console.log(err))
    await setIsLoading(false)
  }

  const sendMailToExpert = async () => {
    const token = localStorage.getItem('access_token')
    await axios.post(`${path}/send_email`, {
      email: email,
      token: token
    })
      .then((res) => {
        if (res.data.message == 'email is expert') {
          alert('email is expert')
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
      role: selectRoleUpdate
    }).then((res) => {
      if (res.data.message == "update role success") {
        getUser();
      }
    })
      .catch((err) => {
        console.log(err);
      })
  }

  const deleteUser = async () => {
    axios.post(`${path}/delete_user`, {
      u_id: selectUser.u_id
    })
      .then((res) => {
        if (res.data.message == 'delete success') {
          getUser();
        }
      })
  }

  const banUser = async () => {
    axios.post(`${path}/ban_user`, {
      u_id: selectUser.u_id
    })
      .then((res) => {
        if (res.data.message == 'ban success') {
          getUser();
        }
      })
  }

  const activeUser = async () => {
    axios.post(`${path}/active_user`, {
      u_id: selectUser.u_id
    })
      .then((res) => {
        if (res.data.message == 'active success') {
          getUser();
        }
      })
  }

  const filterData = async () => {
    let filter = {};
    if (selectRole !== 'ผู้ใช้ทั้งหมด') {
      filter['role'] = selectRole == "ผู้เชี่ยวชาญ" ? "EXPERT" : "USER"
    }
    if (selectStatus !== 'ทั้งหมด') {
      filter['status'] = selectStatus == 'ถูกบล็อก' ? "BAN" : selectStatus == "ถูกลบ" ? "DELETE" : "ACTIVE"
    }
    if (selectSearch !== '') {
      filter['OR'] = [
        {
          firstname: { contains: selectSearch }
        },
        {
          lastname: { contains: selectSearch }
        },
        {
          email: { contains: selectSearch }
        }
      ];
    }

    await axios.post(`${path}/all_users_filter`, {
      currentPage: currentPage,
      pageSize: pageSize,
      filter: filter,
    })
      .then((res) => {
        setUsers(res.data.data)
        setTotalPages(Math.ceil(res.data.total / pageSize));
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    filterData();
  }, [selectRole, selectStatus, selectSearch])
  console.log(users);

  const RenderMenu = ({user}) => {
    const items: MenuProps['items'] = [
      {
        key: '1',
        label: (
          <a onClick={() => clickModal(user.status == 'BAN' ? 'ปลดบล็อก' : 'บล็อกบัญชี')} className="flex items-center Kanit space-x-2" rel="noopener noreferrer">
            <img width={20} src={user.status == 'BAN' ? checkMarkIcon : blockIcon} alt="" />
            <p>
              {user.status == 'BAN' ? 'ปลดบล็อก' : 'บล็อกบัญชี'}
            </p>
          </a>
        ),
      },
      {
        key: '2',
        label: (
          <a onClick={() => clickModal("เปลี่ยนบทบาท")} className="flex items-center Kanit space-x-2" rel="noopener noreferrer">
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
          <a onClick={() => clickModal(user.status == 'DELETE' ? 'ปลดบล็อก' : 'ลบบัญชี')} className="flex items-center Kanit space-x-2" rel="noopener noreferrer">
            <img width={20} src={user.status == 'DELETE' ? checkMarkIcon : garbageIcon} alt="" />
            <p>
              {user.status == 'DELETE' ? 'ปลดบล็อก' : 'ลบบัญชี'}
            </p>
          </a>
        ),
      }
    ];
    return (
      <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']} arrow>
        <img onClick={(e) => {
          e.preventDefault()
          setSelectUser(user);
          setSelectRoleUpdate(user.role)
        }} className="mx-auto" src={dotIcon} alt="" />
      </Dropdown>
    )
  }

  function clickModal(title) {
    setmodalAddUser(true)
    setTitleModal(title)
    if (title == 'สร้างบัญชี') {
      setConfirmButton("ยืนยันการส่ง")
    } else if (title == 'บล็อกบัญชี') {
      setConfirmButton("ยืนยันการบล็อก")
    } else if (title == 'เปลี่ยนบทบาท') {
      setConfirmButton("ยืนยันการเปลี่ยน")
    } else if (title == "ลบบัญชี") {
      setConfirmButton("ยืนยันการลบ")
    } else {
      setConfirmButton("ยืนยันการปลดบล็อก")
    }
  }
  return (
    <div className="w-full Kanit flex flex-col min-h-screen">
      {isLoading ? <div className="flex items-center justify-center flex-1 h-full"><Loading /></div> : (<div>
        <div className="flex mt-10 justify-between items-center">
          <p className="text-[32px] font-semibold">บัญชี</p>
          <div className="flex items-center space-x-3 h-9">
            <p className="text-[16px]">แสดง</p>
            <Select
              defaultValue="10 แถว"
              suffixIcon={<img src={selectIcon}></img>}
              className="h-full"
              style={{ width: 130 }}
              onChange={(value) => setPageSize(parseInt(value))}
              options={[
                { value: "10", label: "10 แถว" },
                { value: "20", label: "20 แถว" },
                { value: "30", label: "30 แถว" },
              ]}
            />
            <Select
              value={selectStatus}
              suffixIcon={<img src={sortIcon}></img>}
              className="h-full"
              style={{ width: 130 }}
              onChange={handleChangeStatus}
              options={[
                { value: "ถูกบล็อก", label: "ถูกบล็อก" },
                { value: "ถูกลบ", label: "ถูกลบ" },
                { value: "กำลังใช้งาน", label: "กำลังใช้งาน" },
                { value: "ทั้งหมด", label: "ทั้งหมด" },
              ]}
            />
            <Select
              value={selectRole}
              suffixIcon={<img src={selectIcon}></img>}
              className="h-full"
              style={{ width: 130 }}
              onChange={handleChangeRole}
              options={[
                { value: "ผู้เชี่ยวชาญ", label: "ผู้เชี่ยวชาญ" },
                { value: "ผู้ใช้ทั่วไป", label: "ผู้ใช้ทั่วไป" },
                { value: "ผู้ใช้ทั้งหมด", label: "ผู้ใช้ทั้งหมด" },
              ]}
            />
            <div className="h-full">
              <Input onChange={(text) => setSelectSearch(text.target.value)} className="h-full w-[280px]" suffix={<img src={search} />} />
            </div>
            <div onClick={() => clickModal("สร้างบัญชี")} className="bg-[#3C6255] h-full flex justify-center space-x-2 items-center px-3 rounded-[8px] text-white cursor-pointer">
              <p>สร้างบัญชี</p>
              <img src={add} alt="" />
            </div>
          </div>
        </div>
        <table className="table-auto w-full mt-8 border-spacing-y-4 border-separate">
          <thead>
            <tr className="w-full">
              <th className="pb-5 w-6"></th>
              <th className="pb-5 font-medium">ไอดีผู้ใช้งาน</th>
              <th className="pb-5 font-medium">ชื่อ-นามสกุล</th>
              <th className="pb-5 font-medium">บทบาท</th>
              <th className="pb-5 font-medium">อีเมล</th>
              <th className="pb-5 font-medium">สถานะ</th>
              <th className="pb-5 font-medium">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {users && users.map((user, index) => {
              return (
                <tr key={index} className="bg-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] rounded-[10px]">
                  <td onClick={() => router(`/admin/user_profile/${user.u_id}`)} className="rounded-l-[10px] text-center pl-4">
                    <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
                      {user.image && (
                        <img src={user.image} alt="" />
                      )}
                    </div>
                  </td>
                  <td onClick={() => router(`/admin/user_profile/${user.u_id}`)} className="py-5 text-center">{user.u_id}</td>
                  <td onClick={() => router(`/admin/user_profile/${user.u_id}`)} className="py-5 text-center">{user.firstname} {user.lastname}</td>
                  <td onClick={() => router(`/admin/user_profile/${user.u_id}`)} className="py-5 text-center">{user.role == 'USER' ? "ผู้ใช้งานทั่วไป" : "ผู้เชี่ยวชาญ"}</td>
                  <td onClick={() => router(`/admin/user_profile/${user.u_id}`)} className="py-5 text-center">{user.email ? user.email : "-"}</td>
                  <td onClick={() => router(`/admin/user_profile/${user.u_id}`)} className="py-5 text-black">
                    <div className="flex justify-center items-center">
                      <img className="mr-2" src={user.status == 'ACTIVE' ? checkMarkIcon : user.status == 'BAN' ? blockIcon : garbageIcon} alt="" />
                      <p>
                      {user.status == 'ACTIVE' ? "กำลังใช้งาน" : user.status == 'BAN' ? "ถูกบล็อก" : "ถูกลบ"}
                      </p>
                    </div>
                  </td>
                  <td className="py-5 rounded-r-[10px] text-center">
                    <RenderMenu user={user}/>
                  </td>
                </tr>
              )
            })}
            <tr>
              <td className="py-2"></td>
            </tr>
          </tbody>
        </table>
      </div>)}
      {/* modal */}
      <Modal
        title={[
          <div className="text-center font-medium text-xl">
            <p>{titleModal}</p>
          </div>
        ]}
        className="Kanit"
        centered
        open={modalAddUser}
        width={350}
        onCancel={() => setmodalAddUser(false)}
        footer={[
          <div className="flex items-center space-x-2 pt-3">
            <div onClick={() => {
              setmodalAddUser(false)
              if (confirmButton == "ยืนยันการเปลี่ยน") {
                updateRole();
              }
              if (confirmButton == "ยืนยันการส่ง") {
                sendMailToExpert();
              }
              if (confirmButton == 'ยืนยันการลบ') {
                deleteUser();
              }
              if (confirmButton == 'ยืนยันการบล็อก') {
                banUser();
              }
              if (confirmButton == 'ยืนยันการปลดบล็อก') {
                activeUser();
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
        {confirmButton == 'ยืนยันการบล็อก' || confirmButton == 'ยืนยันการเปลี่ยน' || confirmButton == 'ยืนยันการลบ' || confirmButton == 'ยืนยันการปลดบล็อก' ?
          (
            <div className="flex flex-col items-center space-y-3">
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
                    onChange={handleChangeRoleUpdate}
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
              <p className="mb-1 text-base">อีเมลผู้เชี่ยวชาญ</p>
              <input value={email} onChange={(text) => { setEmail(text.target.value) }} className="rounded-[5px] font-semibold border-[1px] w-full text-base border-[#61876E] p-1 focus-visible:border-[#445f4e]"></input>
            </div>
          )
        }
      </Modal>
      <Pagination
        current={currentPage}
        total={totalPages * pageSize}
        pageSize={pageSize}
        onChange={handlePageChangePage}
        className='pt-1 pb-7'
      />
      <div className="flex justify-center font-semibold my-3 text-[18px] absolute bottom-0 right-[30%]">
        <p>© 2024 COPYRIGHT WOODIFY. ALL RIGHTS RESERVED.</p>
      </div>
    </div>
  );
};

export default Account;
