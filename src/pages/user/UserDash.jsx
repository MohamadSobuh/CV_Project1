import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import style from "./UserDash.module.css";
import { FaLightbulb, FaFile, FaCloudUploadAlt, FaAngleRight } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import translations from '../../locales/translations';

export default function UserDash({ language }) {
    const [userInfo, setUserInfo] = useState({})
    useEffect(() => {
        setUserInfo({
            firstName: "Isra",
            lastName: "Shtaiwi",
            learningPlan: "Front-end development",
            Progress: "20%",
            TotalCVs: "1"
        });
    }, []);

    const t = translations[language];

    return (
        <div className={language === 'ar' ? style.userDashAr : style.userDash}>
            <h3><b>{t.welcome}{userInfo.firstName} {userInfo.lastName}</b></h3>
            <p>{t.quickLook}</p>
            <div className='row'>
                <div className={`${style.cardsUserDash} col-md-3`}>
                    <div className={style.cardHead}>
                        <h5><b>{t.over}</b></h5>
                        <FaFile className={style.headIcon} />
                    </div>
                    <div className={style.cardContent}>
                        <h5>{t.totalCVs}</h5>
                        <h5>{userInfo.TotalCVs}</h5>
                    </div>
                </div>

                <div className={`${style.cardsUserDash} col-md-4 `}>
                    <div className={style.cardHead}>
                        <h5><b>{t.progressTitle}</b></h5>
                        <FaListCheck className={style.headIcon} />
                    </div>

                    <div className={style.cardContent}>
                        {userInfo.learningPlan ? (
                            <>
                                <p>{t.currentPlan}</p>
                                <h5>{userInfo.learningPlan}</h5>
                                <div className={style.progressBar}>
                                    <div className={style.progressFill} style={{ width: userInfo.Progress }}></div>
                                </div>
                                <p> {userInfo.Progress} {t.completed}</p>
                                <Link className={style.goLink}><b>{t.goToPlan}<FaAngleRight /> </b></Link>

                            </>) : (<>
                                <p>{t.noPlanYet}</p>
                           
                            </>

                        )}
                    </div>
                </div>

                <div className={`${style.cardsUserDash} col-md-4`}>
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
