import React, { useEffect, useState } from "react";
import LogoWoodify from "../../assets/logo_woodify.svg";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import liff from "@line/liff";
import axios from "axios";
import path from "../../../path";
import { useNavigate } from "react-router-dom";

const ManualLine: React.FC = () => {
    const [body, setBody] = useState("");
    const [manualTitle, setManualTitle] = useState("");
    const { id } = useParams();
    useEffect(() => {
        axios.get(`${path}/manual/${id}`)
            .then((res) => {
                const data = res.data[0]
                setBody(data.description)
                setManualTitle(data.topic)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    return (
        <div className="p-6">
            <p className="text-center font-bold text-2xl pb-6">{manualTitle}</p>
            <div>
                <div dangerouslySetInnerHTML={{ __html: body }} />
            </div>
        </div>
    )
};

export default ManualLine;
