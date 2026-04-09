import React, { useState, useEffect } from 'react';
import style from "./AnalysisHistory.module.css";
import translations from '../../locales/translations';
import { FaFileAlt, FaUsers } from "react-icons/fa"; import { useUserFlow } from '../../context/UserFlowContext';
import { useNavigate } from "react-router-dom";
import EmptyPage from "../../components/ui/EmptyPage";
import emptyHistory from "../../images/emptyHistory.png";

export default function AnalysisHistory({ language }) {
    const { history } = useUserFlow(); /*  هاد رح نستخدمها بس يكون الربط كلو شغال*/
    const [fakeHistory, setFakeHistory] = useState([]);
    const navigate = useNavigate();
    const t = translations[language];

    useEffect(() => {
        setFakeHistory([
            { id: 1, field: "Front-end Development", fileName: "frontend_cv.pdf" },
            { id: 2, field: "Back-end Development", fileName: "backend_cv.docx" },
            { id: 3, field: "Full Stack", fileName: "fullstack_cv.pdf" },
        ]);
    }, []);
    return (
        <div className={language === 'ar' ? style.historyAr : style.historyEn}>

            {fakeHistory.length === 0 ? (
                <EmptyPage
                    icon={<img src={emptyHistory} width="200" height="150" />}
                    title={t.emptyHistoryTitle}
                    message={t.emptyHistoryMessage}
                    btnText={t.upload}
                    onClick={() => navigate("/user/upload")}
                />
            ) : (<>

                <div className={style.historyHead}>
                    <p className={style.journey}>{t.journey}</p>
                    <h1><b>{t.analysisHistoryTitle}</b></h1>
                    <p>{t.analysisHistoryDesc}</p>
                </div>

                <div className={style.cards}>
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
                                {t.viewFullAnalysis}
                            </button>
                        </div>
                    ))}
                </div>

            </>)}

        </div >
    )
}
