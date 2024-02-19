import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { Modal } from "antd";
import garbage from "../../assets/garbage.svg";
import picNoUpload from "../../assets/pic-no-upload.svg"
import addPicWhite from "../../assets/add-pic-white.svg"
import axios from "axios";
import path from "../../../path";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getImage } from "../../tools/tools";
import Loading from "../component/Loading";


const ManageInformationWood: React.FC = () => {
    const [modalConfirmSave, setModalConfirmSave] = useState(false);
    const [modalCancel, setModalCancel] = useState(false);
    const [status, setStatus] = useState(true)
    const [images, setImages] = useState<string[]>([]);
    const [commonName, setCommonName] = useState('');
    const [engName, setEngName] = useState('');
    const [botanicalName, setBotanicalName] = useState('');
    const [pedigree, setPedigree] = useState('');
    const [placeOfOrigin, setPlaceOfOrigin] = useState('');
    const [woodCharacteristics, setWoodCharacteristics] = useState('');
    const [anatomicalCharacteristics, setAnatomicalCharacteristics] = useState('');
    const [deleteImage, setDeleteImage] = useState<any>([]);
    const { w_id }: any = useParams();
    const router = useNavigate();
    const [isLoading, setIsLoading] = useState(w_id ? true : false)
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (w_id) {
            axios.get(`${path}/wood/${w_id}`)
                .then((res) => {
                    const data = res.data[0]
                    setCommonName(data.common_name);
                    setEngName(data.eng_name)
                    setBotanicalName(data.botanical_name)
                    setPedigree(data.pedigree)
                    setPlaceOfOrigin(data.place_of_origin)
                    setWoodCharacteristics(data.wood_characteristics)
                    setAnatomicalCharacteristics(data.anatomical_characteristics)
                    setImages(data.wood_image)
                    setStatus(data.status)
                    setIsLoading(false)
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [])

    const updateWood = async () => {
        // setIsLoading(true)
        let eng_name: any;
        let common_name: any;
        if (!Array.isArray(engName)) {
            eng_name = engName.split(',');
        }
        else {
            eng_name = engName
        }

        if (!Array.isArray(commonName)) {
            common_name = engName.split(',');
        }
        else {
            common_name = commonName;
        }
        const token = localStorage.getItem('access_token');
        await axios.put(`${path}/wood_update`, {
            common_name: common_name,
            eng_name: eng_name,
            botanical_name: botanicalName,
            pedigree: pedigree,
            place_of_origin: placeOfOrigin,
            wood_characteristics: woodCharacteristics,
            anatomical_characteristics: anatomicalCharacteristics,
            status: status,
            other: '',
            id: w_id,
            token: token
        }).then(async (res) => {
            if (res.data.message == "update success") {
                if(deleteImage.length != 0){
                    await axios.post(`${path}/image_wood_delete`, {
                        id : w_id,
                        delete_image : deleteImage
                    })
                    .then((res) => {
                        console.log(res.data);
                        
                    }).catch((err) => {
                        console.log(err);
                    })
                }
                const files : any = fileInputRef.current?.files;
                if (files?.length != 0) {
                    console.log('test');
                    
                    const formData = new FormData();
                    for (let i = 0; i < files.length; i++) {
                        const file = files[i];
                        formData.append('files', file);
                    }
                    
                    formData.append('id', w_id)
                    formData.append('image_delete', JSON.stringify(deleteImage))
                    await axios.put(`${path}/wood_image`, formData)
                        .then((res) => {
                            
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }
                router(`/admin/information_wood_detail/${w_id}`);
                
            }
        })
            .catch((err) => {
                console.log(err);
            })
    }

    const createWood = async () => {
        let eng_name: any;
        let common_name: any;
        if (!Array.isArray(engName)) {
            eng_name = engName.split(',');
        }
        else {
            eng_name = engName
        }

        if (!Array.isArray(commonName)) {
            common_name = engName.split(',');
        }
        else {
            common_name = commonName;
        }
        const token = localStorage.getItem('access_token');
        await axios.post(`${path}/wood`, {
            common_name: common_name,
            eng_name: eng_name,
            botanical_name: botanicalName,
            pedigree: pedigree,
            place_of_origin: placeOfOrigin,
            wood_characteristics: woodCharacteristics,
            anatomical_characteristics: anatomicalCharacteristics,
            status: status,
            other: '',
            token: token
        }).then(async (res) => {
            if (res.data.message == "create success") {
                const files = fileInputRef.current?.files;
                const w_id_create = res.data.data.w_id;
                if (files) {
                    const formData = new FormData();
                    for (let i = 0; i < files.length; i++) {
                        const file = files[i];
                        formData.append('files', file);
                    }
                    formData.append('id', w_id_create)
                    await axios.put(`${path}/wood_image`, formData)
                        .then((res) => {
                            router(`/admin/information_wood_detail/${w_id_create}`);
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }
            }
        })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleImageUploa = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImages((prevImages) => [...prevImages, event.target?.result as string]);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newImages: string[] = [];

            // Process each selected file
            for (let i = 0; i < files.length; i++) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    if (event.target) {
                        newImages.push(event.target.result as string);
                        // If all images are processed, update the state
                        if (i === files.length - 1) {
                            setImages((prevImages) => [...prevImages, ...newImages]);
                        }
                    }
                };
                reader.readAsDataURL(files[i]);
            }
        }
    };

    const handleDeleteImage = (index: number) => {
        setImages((prevImages) => {
            const updatedImages = [...prevImages];
            const imageDelete: any = updatedImages.splice(index, 1);
            if (imageDelete[0]?.path) {
                setDeleteImage([...deleteImage, imageDelete[0].path]);
            }
            return updatedImages;
        });
    };


    const handleUploadImage = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    return (
        <div className="w-full Kanit flex flex-col min-h-screen">
            {isLoading ? <div className="flex items-center justify-center flex-1 h-full"><Loading /></div> : (
                <div>
                    <div className="flex mt-10">
                        <p className="text-[32px] font-semibold ml-6">{w_id ? "แก้ไขข้อมูลต้นไม้" : "เพิ่มข้อมูลต้นไม้"}</p>
                    </div>
                    <div className="flex flex-col space-y-7 mt-5">
                        <div className="grid grid-cols-6 gap-5">
                            <div className="col-span-3 space-y-1">
                                <p className="text-[20px]">ชื่อสามัญ</p>
                                <input value={commonName} onChange={(value) => setCommonName(value.target.value)} className="w-full text-[18px] p-2 rounded-[15px] border border-1 border-[#61876E]" type="text" />
                            </div>
                            <div className="col-span-3 space-y-1">
                                <div className="flex space-x-5 items-center">
                                    <p className="text-[20px]">ชื่อการค้า-ชื่ออังกฤษ</p>
                                    <p className="text-[20px] text-[#C0C0C0]">รูปแบบการเขียน : ชื่อที่1, ชื่อที่2 </p>
                                </div>
                                <input value={engName} onChange={(value) => setEngName(value.target.value)} className="w-full text-[18px] p-2 rounded-[15px] border border-1 border-[#61876E]" type="text" />
                            </div>
                        </div>
                        <div className="grid grid-cols-6 gap-5">
                            <div className="col-span-3 space-y-1">
                                <p className="text-[20px]">ชื่อพฤษศาสตร์</p>
                                <input value={botanicalName} onChange={(value) => setBotanicalName(value.target.value)} className="w-full text-[18px] p-2 rounded-[15px] border border-1 border-[#61876E]" type="text" />
                            </div>
                            <div className="col-span-3 space-y-1">
                                <p className="text-[20px]">วงศ์</p>
                                <input value={pedigree} onChange={(value) => setPedigree(value.target.value)} className="w-full text-[18px] p-2 rounded-[15px] border border-1 border-[#61876E]" type="text" />
                            </div>
                        </div>
                        <div className="col-span-3 space-y-1">
                            <p className="text-[20px]">ถิ่นกำเนิด</p>
                            <input value={placeOfOrigin} onChange={(value) => setPlaceOfOrigin(value.target.value)} className="w-full text-[18px] p-2 rounded-[15px] border border-1 border-[#61876E]" type="text" />
                        </div>
                        <div className="col-span-3 space-y-1">
                            <p className="text-[20px]">ลักษณะเนื้อไม้</p>
                            <input value={woodCharacteristics} onChange={(value) => setWoodCharacteristics(value.target.value)} className="w-full text-[18px] p-2 rounded-[15px] border border-1 border-[#61876E]" type="text" />
                        </div>
                        <div className="col-span-3 space-y-1">
                            <p className="text-[20px]">ลักษณะทางกายวิภาค</p>
                            <textarea value={anatomicalCharacteristics} onChange={(value) => setAnatomicalCharacteristics(value.target.value)} className="w-full text-[18px] p-2 rounded-[15px] border border-1 border-[#61876E]" />
                        </div>
                    </div>
                    <div className="flex items-center justify-center py-6">
                        <label className={`min-w-96 min-h-60 border border-2 border-dashed border-gray-300 bg-white flex items-center justify-center gap-6 p-7 ${images.length > 3 ? 'grid grid-cols-12' : ''}`}>
                            {images.length != 0 ? (
                                images.map((image: any, index) => {
                                    const splitImage = image?.path ? getImage(image.path) : image
                                    return (
                                        <div className="col-span-3" key={index} style={{ marginBottom: '10px' }}>
                                            <div className="rounded-[10px] bg-cover aspect-[1.73/1] relative bg-center" style={{ backgroundImage: `url(${splitImage})`, height: 190 }}>
                                                <div className="absolute w-7 h-7 bg-[#FF5F5F] rounded-full flex justify-center items-center cursor-pointer" style={{ right: -13, top: -13 }} onClick={() => handleDeleteImage(index)}>
                                                    <img width={18} src={garbage} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            ) :
                                (
                                    <div className="flex flex-col justify-center items-center">
                                        <img src={picNoUpload} alt="" />
                                        <span className="text-[#C0C0C0]">ยังไม่มีรูปภาพที่อัปโหลด</span>
                                    </div>
                                )
                            }
                        </label>
                        <input
                            ref={fileInputRef}
                            type="file"
                            id="imageUpload"
                            className="hidden"
                            autoComplete="off"
                            onChange={handleImageUpload}
                            multiple
                        />
                    </div>
                    <div className="flex items-center justify-center pb-6">
                        <div className="space-y-8">
                            <div className="flex justify-center text-[18px] space-x-2">
                                <p>จำนวนรูป: </p>
                                <p>{images.length}/30</p>
                            </div>
                            <div className="flex justify-center">
                                <button onClick={() => handleUploadImage()} disabled={images.length >= 30} className={`py-2 px-3 text-xl rounded-xl text-white flex justify-center items-center space-x-2 ${images.length >= 30 ? 'bg-[#C1C1C1]' : 'bg-[#61876E]'}`}>
                                    <p>เพิ่มรูปภาพ</p>
                                    <img src={addPicWhite} alt="" />
                                </button>
                            </div>
                            <div className="flex space-x-4">
                                <p className="text-xl text-center">สถานะการแสดงผล : </p>
                                <div className="flex items-center space-x-3 text-xl">
                                    <input onClick={() => setStatus(true)} checked={status} type="radio" name="display" />
                                    <p>แสดง</p>
                                </div>
                                <div className="flex items-center space-x-3 text-xl">
                                    <input onClick={() => setStatus(false)} checked={!status} type="radio" name="display" />
                                    <p>ไม่แสดง</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-center space-x-8">
                                <button onClick={() => {
                                    setModalConfirmSave(true)
                                    router('/admin/information_wood')
                                }} className="bg-[#61876E] w-40 py-3 text-xl rounded-xl text-white">บันทึก</button>
                                <button onClick={() => setModalCancel(true)} className="bg-[#C1C1C1] w-40 py-3 text-xl rounded-xl">ยกเลิก</button>
                            </div>
                        </div>
                    </div>
                    <p className='text-center text-xl font-semibold pb-3'>© 2023 COPYRIGHT 2023 WOODIFY. ALL RIGHTS RESERVED.</p>
                    {/* modal */}
                    <Modal
                        title={[
                        <div className="text-center text-[24px] mt-4">
                            <p>ยืนยันการบันทึกข้อมูล</p>
                        </div>
                        ]}
                        className="Kanit"
                        centered
                        open={modalConfirmSave}
                        width={550}
                        onCancel={() => setModalConfirmSave(false)}
                        footer={[
                        <div className="flex items-center justify-center space-x-2 pt-3 mb-4">
                            <div onClick={() => 
                                {
                                    setModalConfirmSave(false)
                                    w_id ? updateWood() : createWood()
                                }} className="bg-[#3C6255] py-2 w-1/4 text-white cursor-pointer rounded-[10px] text-center">
                            <p>ยืนยันการบันทึก</p>
                            </div>
                            <div onClick={() => setModalConfirmSave(false)} className="bg-[#C1C1C1] py-2 w-1/4 cursor-pointer rounded-[10px] text-center">
                            <p>ยกเลิก</p>
                            </div>
                        </div>
                        ]}
                    >
                        <div className="flex justify-center my-10">
                        <p className="text-lg">คุณต้องการบันทึกข้อมูลนี้ ใช่หรือไม่?</p>
                        </div>
                    </Modal>
                    {/* modal */}
                    <Modal
                        title={[
                        <div className="text-center text-[24px] mt-4">
                            <p>ยืนยันการยกเลิกการบันทึกข้อมูล</p>
                        </div>
                        ]}
                        className="Kanit"
                        centered
                        open={modalCancel}
                        width={550}
                        onCancel={() => setModalCancel(false)}
                        footer={[
                        <div className="flex items-center justify-center space-x-2 pt-3 mb-4">
                            <Link to={w_id?`/admin/information_wood_detail/${w_id}`:`/admin/information_wood`} className="bg-[#3C6255] py-2 w-1/4 text-white cursor-pointer rounded-[10px] text-center">
                                <p>ยกเลิกการบันทึก</p>
                            </Link>
                            <div onClick={() => setModalCancel(false)} className="bg-[#C1C1C1] py-2 w-1/4 cursor-pointer rounded-[10px] text-center">
                                <p>ยกเลิก</p>
                            </div>
                        </div>
                        ]}
                    >
                        <div className="flex justify-center my-10">
                        <p className="text-lg">คุณต้องการยกเลิกการบันทึกข้อมูลนี้ ใช่หรือไม่?</p>
                        </div>
                    </Modal>
                </div>
            )}
        </div>
    );
};

export default ManageInformationWood;
