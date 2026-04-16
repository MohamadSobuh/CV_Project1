import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import style from "./UserDash.module.css";
import { FaLightbulb, FaFile, FaCloudUploadAlt, FaAngleRight } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import translations from '../../locales/translations';
import { useUserFlow } from '../../context/UserFlowContext';

export default function UserDash({ language }) {
    const [animatedProgress, setAnimatedProgress] = useState(0);
    const { user } = useUserFlow();
    let firstName = user?.first_name || localStorage.getItem("userFirstName") || "Israa";
    let lastName = user?.last_name || localStorage.getItem("userLastName") || "Shtaiwi";
    let learningPlan = "Front-end development"
    let Progress = "20%"
    let TotalCVs = "1"


    useEffect(() => {
        let current = 0;
        const target = 20;

        const interval = setInterval(() => {
            current += 1;
            setAnimatedProgress(current);

            if (current >= target) {
                clearInterval(interval);
            }
        }, 50);

    }, [user]);
    console.log(user);

    const t = translations[language];

    return (
        <div className={language === 'ar' ? style.userDashAr : style.userDash}>
            <div className={style.dashHeader}>
                <h1><b>{t.welcome}{firstName} {lastName}</b></h1>
                <p>{t.quickLook}</p>
            </div>

            <div className='row'>
                <div className={`${style.cardsUserDash} col-md-3`}>
                    <div className={style.cardHead}>
                        <h5><b>{t.over}</b></h5>
                        <FaFile className={style.headIcon} />
                    </div>
                    <div className={style.cardContent}>
                        <h5>{t.totalCVs}</h5>
                        <h5>{TotalCVs}</h5>
                    </div>
                </div>

                <div className={`${style.cardsUserDash} col-md-4 `}>
                    <div className={style.cardHead}>
                        <h5><b>{t.progressTitle}</b></h5>
                        <FaListCheck className={style.headIcon} />
                    </div>

                    <div className={style.cardContent}>
                        {learningPlan ? (
                            <>
                                <p>{t.currentPlan}</p>
                                <h5>{learningPlan}</h5>
                                <div className={style.progressBar}>
                                    <div className={style.progressFill} style={{ width: `${animatedProgress}%` }}></div>
                                </div>
                                <p> {Progress} {t.completed}</p>
                                <Link className={style.goLink}><b>{t.goToPlan}<FaAngleRight /> </b></Link>

                            </>) : (<>
                                <p>{t.noPlanYet}</p>

                            </>

                        )}
                    </div>
                </div>

                <div className={`${style.cardsUserDash} ${style.tips} col-md-4`}>
                    <div className={style.cardHead}>
                        <h5><b>{t.careerTips}</b></h5>
                        <FaLightbulb className={style.headIcon} />
                    </div>
                    <ul>
                        <li>{t.tip1}</li>
                        <li>{t.tip2}</li>
                        <li>{t.tip3}</li>
                    </ul>


                </div>

            </div>

            <div className={language === 'ar' ? style.forUploadPageAr : style.forUploadPageEn}>
                <div>
                    <h5>{t.improveSkills}</h5>
                    <p>{t.uploadDesc}</p>
                    <Link to="/user/upload">
                        <button className={style.btnToUploadPage}><b>{t.uploadNow}</b></button>

                    </Link>
                </div>
                <FaCloudUploadAlt className={style.uploadIcon} />
            </div>
        </div>
    )
}
