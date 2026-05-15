import { useEffect, useState, useRef } from 'react'
import style from "./UploadCV.module.css";
import { useTranslation } from "react-i18next";
import FileUploadZone from "../../components/ui/FileUploadZone";
import UploadPageError from "../../components/ui/UploadPageError";
import { useUserFlow } from '../../context/UserFlowContext';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTimesCircle } from "react-icons/fa";

export default function UploadCV({ language }) {
    const [fields, setFields] = useState([]);
    const [selectedField, setSelectedField] = useState("");
    const [file, setFile] = useState();
    const [error, setError] = useState("");
    const { setHistory, setTargetField } = useUserFlow();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    useEffect(() => {
        const data = [
            { id: 1, name: "Front-end Development" },
            { id: 2, name: "Back-end Development" },
            { id: 3, name: "Full Stack" }
        ];

        setFields(data);
    }, []);
    const uploadCV = async () => {
        try {
            const payload = new FormData();
            payload.append("file", file);
            payload.append("field", selectedField);
            const token = localStorage.getItem("accessToken");
            const response = await axios.post("http://127.0.0.1:8000/api/user/upload-cv/", payload, { headers: { Authorization: `Token ${token}` } });
            console.log(response.data);
            alert("تم رفع السيرة الذاتية بنجاح");
        } catch (error) {
            console.log(error);
        }
    }

    const handleAnalysis = async () => {
        if (!file && !selectedField) {
            setError(t('errorBoth'));
            return;
        }

        if (!file) {
            setError(t('errorFile'));
            return;
        }

        if (!selectedField) {
            setError(t('errorField'));
            return;
        }

        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ];

        if (!allowedTypes.includes(file.type)) {
            setError(t('errorType'));
            return;
        }

        const maxSize = 5 * 1024 * 1024;

        if (file.size > maxSize) {
            setError(t('errorSize'));
            return;
        }

        setError("");
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("field", selectedField);

            const token = localStorage.getItem("accessToken");

            await axios.post(
                "http://127.0.0.1:8000/api/user/upload-cv/",
                formData,
                { headers: { Authorization: `Token ${token}` } }
            );

            navigate("/user/loading", {
                state: {
                    mode: "new",
                    file,
                    selectedField
                }
            });

        } catch (err) {
            console.log(err);
            setError("Upload failed");
        }
    };
    const { t, i18n } = useTranslation();
    const handleRemoveFile = () => {
        setFile(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className={style.uploadPage}>
            <div className={style.uploadCard}>
                <h4>{t('uploadCVtitle')}</h4>
                <p className={style.center}>{t('uploadCVdescription')}</p>

                <div className={style.uploadZoneWrapper}>
                    {file && (
                        <FaTimesCircle
                            className={style.removeFileIcon}
                            onClick={handleRemoveFile}
                        />
                    )}

                    <FileUploadZone
                        file={file}
                        setFile={setFile}
                        setError={setError}
                        t={t}
                        inputRef={fileInputRef}
                    />
                </div>

                <p><b>{t('chooseField')}</b></p>
                <select value={selectedField} onChange={(e) => setSelectedField(e.target.value)} className={style.selectField}>
                    <option value="" disabled hidden>{t('selectPlaceholder')}</option>
                    {fields.map(field => (
                        <option key={field.id} value={field.name}>
                            {field.name}
                        </option>
                    ))}
                </select>

                <UploadPageError error={error} />

                <button className={style.analysisBtn} onClick={handleAnalysis}>{t('analysisBtn')}</button>
            </div>
        </div >
    );
}
