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
import api from '../../utils/axios';


export default function Plan({ language }) {
    const [planData, setPlanData] = useState([
        
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

    const fetchTaskQuiz = async (taskId) => {
        if (!ensureAuth()) {
            return;
        }
        try {
            const response = await api.get(`/userr/task-quiz/${taskId}/`);
            return response.data;
        } catch (error) {
            console.error("Error fetching task quiz:", error);
            return null;
        }
    };

    const fetchPlan = async() => {

        if (!ensureAuth()) {
            return;
        }
        try{
                const response = await api.get("/userr/personal-plan/");
                setPlanData(response.data.planData);
                console.log(response.data);
            }
        catch (error) {
                console.log(error);
            }
        }
        useEffect(() => {
    fetchPlan();
}, []);

    

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
