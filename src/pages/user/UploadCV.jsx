import { useEffect, useState } from 'react'
import style from "./UploadCV.module.css";
import translations from '../../locales/translations';
import FileUploadZone from "../../components/ui/FileUploadZone";
import UploadPageError from "../../components/ui/UploadPageError";
import { useUserFlow } from '../../context/UserFlowContext';

export default function UploadCV({ language }) {
    const [fields, setFields] = useState([]);
    const [selectedField, setSelectedField] = useState("");
    const [file, setFile] = useState();
    const [error, setError] = useState("");

    const { setUploadedCV, setTargetField } = useUserFlow();

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
        setUploadedCV(file);
        setTargetField(selectedField);
    };

    const t = translations[language];

    return (
        <div className={style.uploadPage}>
            <div className={style.uploadCard}>
                <h4>{t.uploadCVtitle}</h4>
                <p className={style.center}>{t.uploadCVdescription}</p>

                <FileUploadZone
                    file={file}
                    setFile={setFile}
                    setError={setError}
                    t={t}
                />

                <p><b>{t.chooseField}</b></p>
                <select value={selectedField} onChange={(e) => setSelectedField(e.target.value)} className={style.selectField}>
                    <option value="" disabled hidden>{t.selectPlaceholder}</option>
                    {fields.map(field => (
                        <option key={field.id} value={field.id}>
                            {field.name}
                        </option>
                    ))}
                </select>

                <UploadPageError error={error} />

                <button className={style.analysisBtn} onClick={handleAnalysis}>{t.analysisBtn}</button>
            </div>
        </div >
    );
}
