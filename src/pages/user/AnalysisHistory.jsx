import React, { useState, useEffect } from 'react';
import style from "./AnalysisHistory.module.css";
import translations from '../../locales/translations';
import { FaFileAlt } from "react-icons/fa";
import { useUserFlow } from '../../context/UserFlowContext';
import { useNavigate } from "react-router-dom";

export default function AnalysisHistory({ language }) {
    const { history } = useUserFlow(); /*  هاد رح نستخدمها بس يكون الربط كلو شغال*/
    const [fakeHistory, setFakeHistory] = useState([]);
    const navigate = useNavigate();
    const t = translations[language];

    useEffect(() => {
        const fakeData = [
            {
                id: 1,
                field: "Front-end Development",
                fileName: "frontend_cv.pdf"
            },
            {
                id: 2,
                field: "Back-end Development",
                fileName: "backend_cv.docx"
            },
            {
                id: 3,
                field: "Full Stack",
                fileName: "fullstack_cv.pdf"
            },
        ];
        setFakeHistory(fakeData);
    }, []);

    return (
        <div className={language === 'ar' ? style.historyAr : style.historyEn}>
            <p className={style.journey}>YOUR JOURNEY</p>
            <h1><b>Analysis History</b></h1>
            <p>All your previous CV analyses in one place.</p>
            {fakeHistory.map((item) => (
                <div key={item.id} className={style.historyCard}>
                    <div className={style.left}>
                        <div className={style.cardIcon}>
                            <FaFileAlt className={style.iconForCard} />
                        </div>

                        <div>
                            <p className={style.feildTitle}>
                                <b>{item.field}</b>
                            </p>
                            <p className={style.cvFileName}>
                                {item.fileName}
                            </p>
                        </div>
                    </div>

                    <button className={style.viewFullAn}
                        onClick={() =>
                            navigate("/user/analysisReport", {
                                state: {
                                    mode: "history",
                                    score: 90 
                                }
                            })
                        }>
                        View Full Analysis
                    </button>
                </div>
            ))}
        </div>
    )
}
