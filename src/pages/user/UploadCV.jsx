import { useEffect, useState, useRef } from 'react'
import style from "./UploadCV.module.css";
import { useTranslation } from "react-i18next";
import FileUploadZone from "../../components/ui/FileUploadZone";
import UploadPageError from "../../components/ui/UploadPageError";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTimesCircle } from "react-icons/fa";
import { useUserFlow } from "../../context/UserFlowContext";

export default function UploadCV({ language }) {
    const { t } = useTranslation();
    const [fields, setFields] = useState([]);
    const [selectedField, setSelectedField] = useState("");
    const [file, setFile] = useState();
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { setCvId } = useUserFlow();
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

    const handleAnalysis = async () => {
        // --- Validation ---
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

        // --- Upload ---
        setError("");
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("field", selectedField);

            const token = localStorage.getItem("accessToken");

            const response = await axios.post(
                "http://127.0.0.1:8000/api/userr/upload-cv/",
                formData,
                { headers: { Authorization: `Token ${token}` } }
            );
            setCvId(response.data.cv_id);

            // Pass only serializable data through router state.
            // AnalysisHistory will fetch fresh data from the API on its own mount,
            // so there is no need to manually update the history context here.
            navigate("/user/loading", {
                state: {
                    mode: "new",
                    fileName: file.name,
                    selectedField
                }
            });

        } catch (err) {
            console.error(err);
            setError(t('uploadFailed') || "Upload failed");
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemoveFile = () => {
        setFile(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className={style.uploadPage}>
            <div className={style.bgGrid} />

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

                <button
                    className={style.analysisBtn}
                    onClick={handleAnalysis}
                    disabled={isLoading}
                >
                    {isLoading ? t('uploading') || "Uploading..." : t('analysisBtn')}
                </button>
            </div>
        </div >
    );
}
