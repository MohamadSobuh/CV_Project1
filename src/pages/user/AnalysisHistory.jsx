import React, { useState, useEffect } from 'react';
import style from "./AnalysisHistory.module.css";
import { useTranslation } from "react-i18next";

import { FaFileAlt, FaUsers } from "react-icons/fa"; import { useUserFlow } from '../../context/UserFlowContext';
import { useNavigate } from "react-router-dom";
import EmptyPage from "../../components/ui/EmptyPage";
import emptyHistory from "../../images/emptyHistory.png";
import axios from 'axios';



export default function AnalysisHistory({ language }) {
    const { history,setHistory, setCvId} = useUserFlow(); /*  هاد رح نستخدمها بس يكون الربط كلو شغال*/
    // const [fakeHistory, setFakeHistory] = useState([]);
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const token = localStorage.getItem("accessToken");


    const fetchHistory = async() => {
        if (!token) {
            console.error("No token found, redirecting to login...");
            navigate("/login"); 
            return;
        }
        try{
                const response = await axios.get("http://127.0.0.1:8000/api/user/analysis-history/", {
                    headers: { Authorization: `Token ${token}` },
                });
                setHistory(response.data);
                console.log(response.data);
            }
        catch (error) {
                console.log(error);
            }
        }

    useEffect(() => {
        fetchHistory();
        
    }, []);
    return (
        <div className={language === 'ar' ? style.historyAr : style.historyEn}>

            {history.length === 0 ? (
                <EmptyPage
                    icon={<img src={emptyHistory} width="200" height="150" />}
                    title={t('emptyHistoryTitle')}
                    message={t('emptyHistoryMessage')}
                    btnText={t('upload')}
                    onClick={() => navigate("/user/upload")}
                />
            ) : (<>

                <div className={style.historyHead}>
                                <div className={style.bgGrid} />
                    
                    <p className={style.journey}>{t('journey')}</p>
                    <h1><b>{t('analysisHistoryTitle')}</b></h1>
                    <p>{t('analysisHistoryDesc')}</p>
                </div>

                <div className={style.cards}>
                    {history.map((item) => (
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
                                onClick={() =>{
                                    setCvId(item.id),
                                    navigate("/user/analysisReport", {
                                        state: {
                                            mode: "history",
                                            score: item.score
                                        }
                                    })}}
                                >
                                {t('viewFullAnalysis')}
                            </button>
                        </div>
                    ))}
                </div>

            </>)}

        </div >
    )
}
