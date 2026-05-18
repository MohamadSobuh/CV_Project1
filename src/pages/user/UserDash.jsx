import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import style from "./UserDash.module.css";
import { FaLightbulb, FaFile, FaCloudUploadAlt, FaAngleRight } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { useUserFlow } from '../../context/UserFlowContext';
import axios from "axios";


export default function UserDash({ language, user }) {
    const [animatedProgress, setAnimatedProgress] = useState(0);
    //const { user } = useUserFlow();
    const [userDash, setUserDash] = useState({
        TotalCVs: 0,
        total_learning_hours: 2.5,
        learningPlan: [
            {
                id: 13,
                name: "JavaScript Basics",
                progress: 25
            }
        ]
    });


    ///مع هذا التعديل بقدر احذف ال userFirstName وال userLastName من local storage
    let firstName = user.firstname || "Israa";
    let lastName = user.lastname || "Shtaiwi";
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

    }, [userDash.learningPlan]);
    console.log(user);

    const { t, i18n } = useTranslation();

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token || token === "undefined") {
                return;
            }
            const response = await axios.get("http://127.0.0.1:8000/api/user/dashboard/", { headers: { Authorization: `Token ${token}` } });
            console.log(response.data);
            setUserDash(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchUserData();
    }, []);


    return (
        <div className={language === 'ar' ? style.userDashAr : style.userDash}>
            <div className={style.dashHeader}>
                <h1><b>{t('welcome')}{firstName}</b></h1>
                <p>{t('quickLook')}</p>
            </div>

            <div className='row'>
                <div className={`${style.cardsUserDash} col-md-3`}>
                    <div className={style.cardHead}>
                        <h5><b>{t('over')}</b></h5>
                        <FaFile className={style.headIcon} />
                    </div>
                    <div className={style.cardContent}>
                        <h5>{t('totalCVs')}</h5>
                        <h5>{userDash.TotalCVs}</h5>
                    </div>
                </div>

                <div className={`${style.cardsUserDash} col-md-4 `}>
                    <div className={style.cardHead}>
                        <h5><b>{t('progressTitle')}</b></h5>
                        <FaListCheck className={style.headIcon} />
                    </div>

                    <div className={style.cardContent}>
                        {learningPlan ? (
                            <>
                                <p>{t('currentPlan')}</p>
                                <h5>{learningPlan}</h5>
                                <div className={style.progressBar}>
                                    <div className={style.progressFill} style={{ width: `${animatedProgress}%` }}></div>
                                </div>
                                <p> {Progress} {t('completed')}</p>
                                <Link className={style.goLink} to="/user/plan"><b>{t('goToPlan')}<FaAngleRight /> </b></Link>

                            </>) : (<>
                                <p>{t('noPlanYet')}</p>

                            </>

                        )}
                    </div>
                </div>

                <div className={`${style.cardsUserDash} ${style.tips} col-md-4`}>
                    <div className={style.cardHead}>
                        <h5><b>{t('careerTips')}</b></h5>
                        <FaLightbulb className={style.headIcon} />
                    </div>
                    <ul>
                        <li>{t('tip1')}</li>
                        <li>{t('tip2')}</li>
                        <li>{t('tip3')}</li>
                    </ul>


                </div>

            </div>

            <div className={language === 'ar' ? style.forUploadPageAr : style.forUploadPageEn}>
                <div>
                    <h5>{t('improveSkills')}</h5>
                    <p>{t('uploadDesc')}</p>
                    <Link to="/user/upload">
                        <button className={style.btnToUploadPage}><b>{t('uploadNow')}</b></button>

                    </Link>
                </div>
                <FaCloudUploadAlt className={style.uploadIcon} />
            </div>
        </div>
    )
}
