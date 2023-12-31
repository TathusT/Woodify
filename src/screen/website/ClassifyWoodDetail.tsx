import React from "react";
import Wood from '../../assets/S12-3balau 2.png'

const ClassifyWoodDetail: React.FC = () => {
    return (
        <div className="p-6">
            <p className="text-4xl font-bold">การตรวจสอบไม้ ไอดี 3145</p>
            <div className="pt-6 flex space-x-4">
                <div className="w-3/5">
                    <p>ข้อมูลการตรวจสอบ</p>
                    <div className="bg-white rounded-lg border boder-2 border-gray-300 p-4 mt-3">
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <img src={Wood} alt="" />
                            </div>
                            <div>
                                <div className="flex items-center space-x-6">
                                    <div className="bg-[#3C6255] rounded-full w-4 h-4"></div>
                                    <p>ผลการตรวจสอบ:</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-2/5">
                    <p>การรับรอง</p>
                    <div className="bg-white rounded-lg border boder-2 border-gray-300 p-4 mt-3">
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassifyWoodDetail;
