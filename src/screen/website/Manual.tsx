import React, { useEffect, useState } from "react";
import { Select, Input, Modal, Pagination } from "antd";
import add from "../../assets/add.svg";
import search from "../../assets/search.svg";
import Loading from "../component/Loading";
import sortIcon from "../../assets/sort-icon.svg"
import selectIcon from "../../assets/select-icon.svg"
import garbageIcon from "../../assets/garbage-red-icon.svg"
import eye from "../../assets/open_eye_green.svg"
import closeEye from "../../assets/close_eye_red.svg"
import axios from "axios";
import path from "../../../path";
import { convertIsoToThaiDateTime } from "../../tools/tools";
import { Link, useNavigate } from "react-router-dom";

const Manual: React.FC = () => {
  const [modalDeleteManual, setmodalDeleteManual] = useState(false);
  const [dataManual, setDataManual] = useState<any>()
  const [isLoading, setIsLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectIdManual, setSelectIdManual] = useState('');
  const [checkManualDelete, setCheckManualDelete] = useState('');
  const [statusFilter, setStatusFilter] = useState('สถานะทั้งหมด')
  const [filterUpdate, setFilterUpdate] = useState('ทั้งหมด')
  const [search, setSearch] = useState('')
  const router = useNavigate();
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  function clickModal() {
    setmodalDeleteManual(true)
  }

  const handlePageChangePage = (page) => {
    setCurrentPage(page);
  };

  const deleteManual = async () => {
    const token = localStorage.getItem('access_token');
    await axios.post(`${path}/manual_delete`, {
      token: token,
      m_id: selectIdManual
    }).then((res) => {
      if (res.data.message == 'delete success') {
        filterData();
        setmodalDeleteManual(false)
      }
    }).catch((err) => console.log(err))
  }

  const filterData = async () => {
    let filter = {};
    let orderBy = {};
    if (statusFilter !== 'สถานะทั้งหมด') {
      filter['status'] = statusFilter === 'สถานะไม่แสดง' ? false : true;
    }
    if (filterUpdate !== 'ทั้งหมด') {
      orderBy['update_at'] = "desc";
    }
    if (search !== '') {
      filter['OR'] = [
        {
          topic: { contains: search }
        },
        {
          description: { contains: search }
        }
      ];
    }

    await axios.post(`${path}/all_manual_filter`, {
      currentPage: currentPage,
      pageSize: pageSize,
      filter: filter,
      orderBy
    })
      .then((res) => {
        setDataManual(res.data.data)
        setTotalPages(Math.ceil(res.data.total / pageSize));
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    filterData();
  }, [statusFilter, filterUpdate, search])

  return (
    <div className="w-full Kanit flex flex-col min-h-screen">
      {isLoading ? <div className="flex items-center justify-center flex-1 h-full"><Loading /></div> : (<div>
        <div className="flex mt-10 justify-between items-center">
          <p className="text-[32px] font-semibold">คู่มือใช้งานเบื้องต้น</p>
          <div className="flex items-center space-x-3 h-9">
            <p className="font-semibold">แสดง</p>
            <Select
              value={pageSize.toString()}
              suffixIcon={<img src={selectIcon}></img>}
              className="h-full"
              style={{ width: 150 }}
              onChange={(value) => setPageSize(parseInt(value))}
              options={[
                { value: "10", label: "10 แถว" },
                { value: "20", label: "20 แถว" },
                { value: "30", label: "30 แถว" },
              ]}
            />
            <Select
              value={filterUpdate}
              suffixIcon={<img src={sortIcon}></img>}
              className="h-full"
              style={{ width: 150 }}
              onChange={(value) => setFilterUpdate(value)}
              options={[
                { value: "ทั้งหมด", label: "ทั้งหมด" },
                { value: "อัพเดทล่าสุด", label: "อัพเดทล่าสุด" },
              ]}
            />
            <Select
              value={statusFilter}
              suffixIcon={<img src={selectIcon}></img>}
              className="h-full"
              style={{ width: 150 }}
              onChange={(value) => setStatusFilter(value)}
              options={[
                { value: "สถานะแสดง", label: "สถานะแสดง" },
                { value: "สถานะไม่แสดง", label: "สถานะไม่แสดง" },
                { value: "สถานะทั้งหมด", label: "สถานะทั้งหมด" },
              ]}
            />
            <div className="h-full">
              <Input onChange={(text) => setSearch(text.target.value)} className="h-full w-[280px] font-semibold" suffix={<img src={search} />} />
            </div>
            <Link to='/admin/manage_manual' className="bg-[#3C6255] h-full flex justify-center space-x-2 items-center px-3 rounded-[8px] text-white cursor-pointer">
              <p className="text-[18px]">เพื่มคู่มือ</p>
              <img src={add} alt="" />
            </Link>
          </div>
        </div>
        <table className="table-auto w-full mt-8 border-spacing-y-4 border-separate">
          <thead>
            <tr className="w-full font-bold">
              <th className="pb-5 font-medium" style={{ width: 100 }}>ลำดับ</th>
              <th className="pb-5 font-medium" style={{ width: 300 }}>ชื่อคู่มือ</th>
              <th style={{ width: 550 }}></th>
              <th className="pb-5 font-medium">สถานะ</th>
              <th className="pb-5 font-medium">อัปเดดล่าสุด</th>
              <th className="pb-5 font-medium">ลบคู่มือ</th>
            </tr>
          </thead>
          <tbody>
            {dataManual && dataManual.map((manual, index) => {
              return (
                <tr key={index} className="bg-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] rounded-[10px] font-semibold">
                  <td onClick={() => router(`/admin/manage_manual/${manual.m_id}`)} className="py-6 rounded-l-[10px] text-center">{index + 1}</td>
                  <td onClick={() => router(`/admin/manage_manual/${manual.m_id}`)} className="py-5 text-center">{manual.topic}</td>
                  <td onClick={() => router(`/admin/manage_manual/${manual.m_id}`)}></td>
                  <td onClick={() => router(`/admin/manage_manual/${manual.m_id}`)} className="py-5 text-center">
                    <div className="flex justify-center">
                      <img src={manual.status ? eye : closeEye} alt="" />
                    </div>
                  </td>
                  <td onClick={() => router(`/admin/manage_manual/${manual.m_id}`)} className="py-5 text-[#3C6255]">
                    <div className="flex justify-center items-center">
                      <p>{convertIsoToThaiDateTime(manual.update_at)}</p>
                    </div>
                  </td>
                  <td className="py-5 rounded-r-[10px] text-center">
                    <div onClick={() => {
                      setSelectIdManual(manual.m_id)
                      clickModal()
                    }} className="flex justify-center">
                      <img className="cursor-pointer" src={garbageIcon} alt="" />
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>)}
      {/* modal */}
      <Modal
        title={[
          <div className="text-center font-medium text-[24px] mt-4">
            <p>ลบข้อมูลคู่มือ{checkManualDelete}</p>
          </div>
        ]}
        className="Kanit"
        centered
        open={modalDeleteManual}
        width={550}
        onCancel={() => setmodalDeleteManual(false)}
        footer={[
          <div className="flex items-center justify-center space-x-2 font-semibold pt-3 mb-4">
            <div onClick={() => {
              deleteManual();
            }} className="bg-[#3C6255] py-2 w-1/4 text-white cursor-pointer rounded-[10px] text-center">
              <p>ยืนยันการลบ</p>
            </div>
            <div onClick={() => setmodalDeleteManual(false)} className="bg-[#C1C1C1] py-2 w-1/4 cursor-pointer rounded-[10px] text-center">
              <p>ยกเลิก</p>
            </div>
          </div>
        ]}
      >
        <div className="flex justify-center my-10">
          <p className="text-lg">คุณต้องการลบข้อมูล {checkManualDelete} ใช่หรือไม่?</p>
        </div>
      </Modal>
      <Pagination
        current={currentPage}
        total={totalPages * pageSize}
        pageSize={pageSize}
        onChange={handlePageChangePage}
        className='pt-1 pb-5'
      />
      <div className="flex justify-center font-semibold my-3 text-[18px] absolute bottom-0 right-[30%]">
        <p>© 2023 COPYRIGHT WOODIFY. ALL RIGHTS RESERVED.</p>
      </div>
    </div>
  );
};

export default Manual;
