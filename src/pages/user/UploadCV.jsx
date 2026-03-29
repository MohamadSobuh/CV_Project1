import { useEffect, useState, useRef } from 'react'
import style from "./UploadCV.module.css";
import { FaFileArrowUp } from "react-icons/fa6";
import translations from '../locales/translations';

export default function UploadCV({language}) {
    const [fields, setFields] = useState([]);
    const [selectedField, setSelectedField] = useState("");
    const [file, setFile] = useState();
    const [error, setError] = useState("");
    const fileInputRef = useRef();
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const uploadedFile = e.dataTransfer.files[0];
        if (uploadedFile) {
            setFile(uploadedFile);
            setError("");
        }
    };

    useEffect(() => {
        const data = [
            { id: 1, name: "Front-end Development" },
            { id: 2, name: "Back-end Development" },
            { id: 3, name: "Full Stack" }
        ];

        setFields(data);
    }, []);

    const handleAnalysis = () => {
        if (!file && !selectedField) {
            setError(t.errorBoth);
            return;
        }

        if (!file) {
            setError(t.errorFile);
            return;
        }

        if (!selectedField) {
            setError(t.errorField);
            return;
        }

        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ];

        if (!allowedTypes.includes(file.type)) {
            setError(t.errorType);
            return;
        }

        const maxSize = 5 * 1024 * 1024;

        if (file.size > maxSize) {
            setError(t.errorSize);
            return;
        }

        setError("");
    };

    const t = translations[language];

    return (
        <div className={style.uploadPage}>
            <div className={style.uploadCard}>
                <h4>{t.uploadCVtitle}</h4>
                <p className={style.center}>{t.uploadCVdescription}</p>

                <div
                    className={`${style.uploadSection} ${isDragging ? style.dragging : ""}`}
                    onClick={() => fileInputRef.current.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    {!file ? (
                        <>
                            <FaFileArrowUp className={style.uploadIcon} />
                            <p><b>{t.uploadText}</b></p>
                            <p>{t.uploadHint}</p>
                        </>
                    ) : (
                        <>
                            <FaFileArrowUp className={style.uploadIcon} />
                            <p className={style.fileName}><b>{file.name}</b></p>
                            <p className={style.successMsg}>{t.fileSelected}</p>
                        </>
                    )}

                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                            const uploadedFile = e.target.files[0];
                            if (uploadedFile) {
                                setFile(uploadedFile);
                                setError("");
                            }
                        }}
                    />
                </div>

                <p><b>{t.chooseField}</b></p>
                <select value={selectedField} onChange={(e) => setSelectedField(e.target.value)} className={style.selectField}>
                    <option value="" disabled hidden>{t.selectPlaceholder}</option>
                    {fields.map(field => (
                        <option key={field.id} value={field.id}>
                            {field.name}
                        </option>
                    ))}
                </select>

                {error && <div className={style.errorMsg}>{error}</div>}

                <button className={style.analysisBtn} onClick={handleAnalysis}>{t.analysisBtn}</button>
            </div>
        </div >
    );
}
