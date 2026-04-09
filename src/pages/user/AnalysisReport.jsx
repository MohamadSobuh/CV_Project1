import { useEffect, useState } from 'react'
import style from "./AnalysisReport.module.css";
import translations from '../../locales/translations';
import CircularScore from '../../components/ui/CircularScore';
import { useUserFlow } from '../../context/UserFlowContext';
import { FaCheckCircle, FaExclamationCircle, FaLightbulb } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

export default function AnalysisReport({ language }) {
const { analysisResult, setAnalysisResult, targetField, placementScore } = useUserFlow();    const { state } = useLocation();
    const isNew = state?.mode === "new";
    const score = state?.score;
    const navigate = useNavigate();


    useEffect(() => {
        const result = {
            DesCV: "Your CV demonstrates strong technical foundation with excellent JavaScript skills. A few strategic additions could push it to the top tier. ",
            strengths: [
                { skill: "HTML", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ." },
                { skill: "CSS", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ." },
                { skill: "Skill Name", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ." },
            ],
            weaknesses: [
                { skill: "Java Script", description: "Needs improvement in type safety and generics." },
                { skill: "React", description: "Lacks experience with unit testing frameworks." },
                { skill: "Skill Name", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ." },
            ],
            score: 60
        };
        setAnalysisResult(result);
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

    const t = translations[language];

    return (
        <div className={language === 'ar' ? style.reportAr : style.reportEn}>

            <div className={`row ${style.headReport}`}>
                <h1 className={style.reportTitle}><b>{t.reportTitle}</b></h1>
                <p className={style.feildStyle}>Feild : <b>{targetField || "Not specified"}</b></p>
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

                    <div className={style.strengths}>
                        <div className={style.strengtWeakhHeader}>
                            <FaCheckCircle className={style.headIcons} />
                            <h3>{t.strengths}</h3>
                        </div>

                        {analysisResult.strengths.map((item) => (
                            <div className={style.strengthStyle}>
                                <b>{item.skill}</b>
                                <p>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className=' col-md-6'>
                    <div className={style.weaknesses}>
                        <div className={style.strengtWeakhHeader}>
                            <FaExclamationCircle className={style.headIcons} />
                            <h3>{t.weaknesses}</h3>
                        </div>

                        {analysisResult.weaknesses.map((item) => (
                            <div className={style.weakStyle}>
                                <b>{item.skill}</b>
                                <p>{item.description}</p>
                            </div>
                        ))}

                    </div>
                </div>
            </div>

            <div className={style.startAssessQuiz}>
                <FaLightbulb className={style.iconForStartAssessment} />
                {isNew ? <>
                    <h2>{t.readyToValidate}</h2>
                    <p>{t.TakeAdaptiveQuiz}</p>
                </>
                    : <> <h2>{t.readyToValidateF}</h2>
                        <p>{t.TakeAdaptiveQuizF}</p></>}

                <button className={style.startAssessment} onClick={() => isNew && navigate('/user/quiz', {
                    state: {
                        weaknesses: analysisResult.weaknesses
                    }
                })} disabled={!isNew} >

                    {isNew
                        ? t.startQuiz
                        : `Your Quiz Score: ${placementScore || 0}%`}
                </button>
            </div>
        </div>
    )
}

