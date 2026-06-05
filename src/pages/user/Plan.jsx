import React, { useState, useEffect } from 'react';
import planEmpty from "../../images/planEmpty.png";
import { useTranslation } from "react-i18next";

import EmptyPage from "../../components/ui/EmptyPage";
import { useNavigate } from "react-router-dom";
import style from "./Plan.module.css";
import TopicList from "./TopicList";
import TaskList from "./TaskList";
import { useUserFlow } from '../../context/UserFlowContext';
import axios from "axios";


export default function Plan({ language }) {
    const [planData, setPlanData] = useState([
        {
         id: 1, title: 'HTML & CSS', difficulty: 'Easy',
            description: 'Explanation of the topic as a general idea 1',
            tasks: [
                { id: 101, title: 'Task#1 Name', status: 'completed', quizScore: 80 },
                { id: 102, title: 'Task#2 Name', status: 'completed', quizScore: 90 },
                { id: 103, title: 'Task#3 Name', status: 'completed', quizScore: 100 },
                { id: 104, title: 'Task#4 Name', status: 'pending' },

            ]
        },
        {
            id: 2, title: 'Java Script', difficulty: 'Medium',
            description: 'Explanation of the topic as a general idea 2',
            tasks: [
                { id: 201, title: 'Task#1 Name', status: 'completed', quizScore: 100 },
                { id: 202, title: 'Task#2 Name', status: 'pending' },
            ]
        },
        {
            id: 3, title: 'React js', difficulty: 'Hard',
            description: 'Explanation of the topic as a general idea 3',
            tasks: [
                { id: 301, title: 'Task#1 Name', status: 'pending' },
                { id: 302, title: 'Task#2 Name', status: 'pending' },
            ]
        },
    ]);

    const [activeTopicId, setActiveTopicId] = useState(1);
    const { setActiveTask } = useUserFlow()
    const { t, i18n } = useTranslation();
    const { user } = useUserFlow();

    const navigate = useNavigate();

    const ensureAuth = () => {
        const token = localStorage.getItem("accessToken");
        const role = localStorage.getItem("userRole");
        if (!token || token === "undefined" || role !== "user") {
            navigate("/login", {
                state: {
                    message: language === "ar" ? "انتهت جلسة التسجيل، يرجى تسجيل الدخول مجدداً" : "Session expired, please log in again",
                    type: "error"
                }
            });
            return false;
        }
        return true;
    }

    useEffect(() => {
        ensureAuth();
    }, []);
    
//     const fetchPlan = async() => {
//         if (!token) {
//             console.error("No token found, redirecting to login...");
//             navigate("/login"); 
//             return;
//         }
//         try{
//                 const response = await axios.get("http://127.0.0.1:8000/api/userr/learning-plan/", {
//                     headers: { Authorization: `Token ${token}` },
//                 });
//                 setPlanData(response.data);
//                 console.log(response.data);
//             }
//         catch (error) {
//                 console.log(error);
//             }
//         }
//         useEffect(() => {
//     fetchPlan();
// }, []);

    let totalAssignedTasks = 0;
    let totalCompletedTasks = 0;

    planData.forEach(topic => {
        if (topic.tasks) {
            totalAssignedTasks += topic.tasks.length;
            totalCompletedTasks += topic.tasks.filter(task => task.status === 'completed').length;
        }
    });

    const overallProgressPercent = totalAssignedTasks === 0 ? 0 : Math.round((totalCompletedTasks / totalAssignedTasks) * 100);

    const selectedTopic = planData.find(topic => topic.id === activeTopicId);

    const handleTaskClick = (task) => {
        setActiveTask(task)
        navigate("/user/task")
    }

    let totalQuizScore = 0;
    let totalQuizzes = 0;

    planData.forEach(topic => {
        topic.tasks.forEach(task => {
            if (task.quizScore !== undefined) {
                totalQuizScore += task.quizScore;
                totalQuizzes++;
            }
        });
    });

    const averageScore = totalQuizzes === 0 ? 0 : Math.round(totalQuizScore / totalQuizzes);

    const planStats = {
        totalTasks: totalAssignedTasks,
        completedTasks: totalCompletedTasks,
        score: averageScore
    };

    useEffect(() => {
        if (overallProgressPercent === 100) {
            navigate("/user/endPlan", {
                state: {
                    stats: planStats
                }
            });
        }
    }, [overallProgressPercent]);

    return (
        <div className={language === 'ar' ? style.planContainerAr : style.planContainerEn}>
            {planData.length === 0 ? (
                <EmptyPage
                    icon={<img src={planEmpty} width="200" />}
                    title={t('planEmptyTitle')}
                    message={t('planEmptyMessage')}
                    btnText={t('upload')}
                    onClick={() => navigate("/user/upload")}
                />
            ) : (
                <>
                    <div className={style.bgGrid} />

                    <div className={style.planHead}><b>Isra</b> {t("planTitle")}</div>

                    <div className={style.headerRow}>
                        <div className={style.headerLeft}>
                            <h1 className={style.planTitle}><b>{t('planTitle') || "Learning plan"}</b></h1>
                            <p className={style.planSubtitle}>{t('planSubtitle')} </p>
                        </div>

                        <div className={style.headerRight}>
                            <div className={style.overallProgressContainer}>
                                <div className={style.progressLabelRow}>
                                    <span>{t('overallProgress')}</span>
                                    <span>  {totalCompletedTasks}/{totalAssignedTasks} {t('tasks')} </span>
                                </div>

                                <div className={style.progressBarContainer}>
                                    <div className={style.progressBarFill} style={{ width: `${overallProgressPercent}%` }} />
                                </div>

                                <div className={style.progressPercent}>{overallProgressPercent}% </div>
                            </div>
                        </div>
                    </div>

                    <div className={style.mainContent}>
                        <TopicList
                            planData={planData}
                            activeTopicId={activeTopicId}
                            onTopicClick={(topic) => setActiveTopicId(topic.id)}
                        />
                        <TaskList
                            activeTopic={selectedTopic}
                            onTaskClick={handleTaskClick}
                            language={language}

                        />
                    </div>


                </>
            )}

        </div>
    );
}
