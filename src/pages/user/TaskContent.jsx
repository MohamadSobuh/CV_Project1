import React from 'react';
import { FiBookOpen, FiImage } from "react-icons/fi";
import { FaPlayCircle } from "react-icons/fa";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";
import styles from './TaskContent.module.css';
import { useNavigate } from 'react-router-dom';
import { useUserFlow } from '../../context/UserFlowContext';
import { useEffect, useState } from 'react';
import htmlFund from '../../components/media/tasks/html_fund.png';
import { useTranslation } from "react-i18next";
import api from "../../utils/axios";

export default function TaskContent({ language }) {
    const navigate = useNavigate();
    const { activeTask } = useUserFlow();
    const { t, i18n } = useTranslation();
    const [taskData, setTaskData] = useState(null);
    console.log("activeTask", activeTask)

    const testData = {
        "lesson_number": "01",
        "title": "HTML Fundamentals",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        "image_url": htmlFund,
        "video_url": "https://www.youtube.com/embed/ok-plXXHlWw",
        "quiz_id": 5,
        "is_completed": true
    };
    const token = localStorage.getItem("accessToken");


    const ensureAuth = () => {
        const token = localStorage.getItem("accessToken");
        if (!token || token === "undefined") {
            navigate("/login", {
                state: {
                    message: language === "ar" ? "انتهت جلسة التسجيل، يرجى تسجيل الدخول مجدداً" : "Session expired, please log in again",
                    type: "error"
                }
            });
            return false;
        }
        return true;
    };
    

    useEffect(() => {
        if (!ensureAuth()) return;
        const fetchTaskData = async () => {
            try {
                const response = await api.get(`/userr/task-content/${32}/`);
                setTaskData(response.data);
                console.log("taskData", taskData)
            } catch (error) {
                    console.error('Error fetching task data:', error);
                }
            };
        fetchTaskData();
    }, [activeTask]);

    if (!activeTask || !taskData) return <div>Loading...</div>;

    return (
        <div className={language === 'ar' ? styles.taskAr : styles.taskEn}>
            <div className={styles.bgGrid} />

            <div className={styles.banner}>
                <div className={styles.bannerIconWrapper}>
                    <FiBookOpen size={42} className={styles.bookIcon} />
                </div>
                <div className={styles.bannerText}>
                    <span className={styles.lessonSub}>Lesson {taskData.lesson_number}</span>
                    <h2 className={styles.lessonTitle}>{taskData.title}</h2>
                </div>
            </div>

            <div className={styles.mainCard}>
                <h3 className={styles.cardTitle}>{taskData.title}</h3>
                <p className={styles.cardDescription}>{taskData.description}</p>

                <div className={styles.mediaRow}>
                    <div className={styles.mediaBoxImage}>
                        {taskData.image_url && <img src={taskData.image_url} alt="Task" className={styles.img} />}
                    </div>

                    <div className={styles.mediaBoxVideo}>
                        <iframe
                            src={taskData.video_url}
                            frameBorder="0"
                            allowFullScreen
                            title="Task Video"
                            referrerPolicy="strict-origin-when-cross-origin"
                            className={styles.videoFrame}
                        ></iframe>
                    </div>
                </div>
            </div>

            <div className={styles.footerNav}>
                <button className={styles.navButtonLeft} onClick={() => navigate('/user/plan')}>
                    {language === 'ar'
                        ? <HiOutlineArrowRight size={24} />
                        : <HiOutlineArrowLeft size={24} />
                    }
                    <span>{t('backToPlan')}</span>
                </button>
                <button className={styles.navButtonRight} onClick={() => navigate('/user/quiz', {
                    state: {
                        mode: "task"
                    }
                })}>
                    <span>{t('goToQuiz')}</span>
                    {language === 'ar'
                        ? <HiOutlineArrowLeft size={24} />
                        : <HiOutlineArrowRight size={24} />
                    }
                </button>
            </div>
        </div>
    );
}