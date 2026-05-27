import { useEffect, useState } from 'react'
import style from "./AnalysisReport.module.css";
import { useTranslation } from "react-i18next";

import CircularScore from '../../components/ui/CircularScore';
import { useUserFlow } from '../../context/UserFlowContext';
import { FaCheckCircle, FaExclamationCircle, FaLightbulb } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function AnalysisReport({ language }) {
    const { analysisResult, setAnalysisResult, targetField, placementScore ,cvId} = useUserFlow();
    const { state } = useLocation();
    const isNew = state?.mode === "new";
    const score = state?.score;
    const navigate = useNavigate();
    const token = localStorage.getItem("accessToken");
    console.log("cvId",cvId);
    
    const fetchAnalysisResult = async() => {
        if(!token){
            console.error("No token found");
            return;
        }
        try{
            const response = await axios.get(`http://127.0.0.1:8000/api/user/analysis-report/${cvId}/`, {
                headers: { Authorization: `Token ${token}` },
            });
            setAnalysisResult(response.data);
            console.log(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        fetchAnalysisResult();
    }, []);

    function getScoreDes(score) {
        if (score < 50) return "Needs Improvement";
        if (score < 80) return "Good CV";
        return "Excellent CV!";
    }

    function getColor(score) {
        if (score < 50) return "#f4a0a0";
        if (score < 80) return "#ffbb3e";
        return "#84f4a8";
    }

    const { t, i18n } = useTranslation();


    const strengthsList = analysisResult?.strengths || [];
    const weaknessesList = analysisResult?.weaknesses || [];
    return (
        <div className={language === 'ar' ? style.reportAr : style.reportEn}>
            <div className={style.bgGrid} />

            <p className={style.feildStyle}>Feild : <b>{targetField || "NOT SPECIFIED"}</b></p>

            <h1 className={style.reportTitle}><b>{t('reportTitle')}</b></h1>
            <div className={`row ${style.headReport}`}>

                <div className='col-md-3'>
                    <CircularScore score={analysisResult.score} />
                </div>
                <div className={`col-md-8 ${style.headReportText}`}>
                    <h2 style={{ "--score-color": getColor(analysisResult.score) }} className={language === 'ar' ? style.ScoreTextEn : style.ScoreText}>{getScoreDes(analysisResult.score)}</h2>
                    <p className={language === 'ar' ? style.decCVEn : style.decCV}>{analysisResult.DesCV}</p>
                </div>
            </div>

            <div className='row'>

                <div className=' col-md-6'>
                    <div className={style.bgGrid} />

                    <div className={style.strengths}>
                        <div className={style.strengtWeakhHeader}>
                            <FaCheckCircle className={style.headIcons} />
                            <h3>{t('strengths')}</h3>
                        </div>

                        {strengthsList.map((item) => (
                            <div className={style.strengthStyle}>
                               <b>{typeof item === 'object' ? (item.skill || item.title || "Skill") : item}</b>
                                <p>{typeof item === 'object' ? item.description : ''}</p>
                                {/* <p>{item.description}</p> */}
                            </div>
                        ))}
                    </div>
                </div>

                <div className=' col-md-6'>
                    <div className={style.weaknesses}>
                        <div className={style.strengtWeakhHeader}>
                            <FaExclamationCircle className={style.headIcons} />
                            <h3>{t('weaknesses')}</h3>
                        </div>

                        {weaknessesList.map((item) => (
                            <div className={style.weakStyle}>
                               <b>{typeof item === 'object' ? (item.skill || item.title || "Skill") : item}</b>
                                <p>{typeof item === 'object' ? item.description : ''}</p>
                                {/* <p>{item.description}</p> */}
                            </div>
                        ))}

                    </div>
                </div>
            </div>

            <div className={style.startAssessQuiz}>
                <FaLightbulb className={style.iconForStartAssessment} />
                {isNew ? <>
                    <h2>{t('readyToValidate')}</h2>
                    <p>{t('TakeAdaptiveQuiz')}</p>
                </>
                    : <> <h2>{t('readyToValidateF')}</h2>
                        <p>{t('TakeAdaptiveQuizF')}</p></>}

                <button className={style.startAssessment} onClick={() => isNew && navigate('/user/quiz', {
                    state: {
                        weaknesses: analysisResult.weaknesses,
                        mode: "assessment"
                    }
                })} disabled={!isNew} >

                    {isNew
                        ? t('startQuiz')
                        : `Your Quiz Score: ${placementScore || 0}%`}
                </button>
            </div>
        </div>
    )
}

