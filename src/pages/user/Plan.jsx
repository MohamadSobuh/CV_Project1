import React, { useState } from 'react';
import planEmpty from "../../images/planEmpty.png";
import translations from '../../locales/translations';
import EmptyPage from "../../components/ui/EmptyPage";
import { useNavigate } from "react-router-dom";
import style from "./Plan.module.css";
import TopicList from "./TopicList";
import TaskList from "./TaskList";

export default function Plan({ language }) {
    const [planData, setPlanData] = useState([
        {
            id: 1, title: 'HTML & CSS', difficulty: 'Easy',
            description: 'Explanation of the topic as a general idea 1',
            tasks: [
                { id: 101, title: 'Task#1 Name', status: 'completed' },
                { id: 102, title: 'Task#2 Name', status: 'completed' },
                { id: 103, title: 'Task#3 Name', status: 'completed' },
                { id: 104, title: 'Task#4 Name', status: 'pending' },

            ]
        },
        {
            id: 2, title: 'Java Script', difficulty: 'Medium',
            description: 'Explanation of the topic as a general idea 2',
            tasks: [
                { id: 201, title: 'Task#1 Name', status: 'completed' },
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
    const t = translations[language];
    const navigate = useNavigate();

    let totalAssignedTasks = 0;
    let totalCompletedTasks = 0;

    planData.forEach(topic => {
        if (topic.tasks) {
            totalAssignedTasks += topic.tasks.length;
            totalCompletedTasks += topic.tasks.filter(t => t.status === 'completed').length;
        }
    });

    const overallProgressPercent = totalAssignedTasks === 0 ? 0 : Math.round((totalCompletedTasks / totalAssignedTasks) * 100);

    const selectedTopic = planData.find(t => t.id === activeTopicId);

    return (
        <div className={language === 'ar' ? style.planContainerAr : style.planContainerEn}>
            {planData.length === 0 ? (
                <EmptyPage
                    icon={<img src={planEmpty} width="200" />}
                    title={t.planEmptyTitle}
                    message={t.planEmptyMessage}
                    btnText={t.upload}
                    onClick={() => navigate("/user/upload")}
                />
            ) : (
                <>
                    <h1 className={style.planTitle}>{t.planTitle || "Learning plan"}</h1>
                    <p className={style.planSubtitle}>Based on your analysis of the **** field</p>

                    <div className={style.overallProgressContainer}>
                        <div className={style.progressLabelRow}>
                            <span>Overall Progress</span>
                            <span>{totalCompletedTasks}/{totalAssignedTasks} tasks</span>
                        </div>
                        <div className={style.progressBarContainer}>
                            <div className={style.progressBarFill} style={{ width: `${overallProgressPercent}%` }} />
                        </div>
                        <div style={{ textAlign: "right", marginTop: "5px", color: "#1A83A8", fontWeight: "bold", fontSize: "0.8rem" }}>
                            {overallProgressPercent}%
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
                            onTaskClick={(task) => console.log('Task clicked:', task)}
                        />
                    </div>
                </>
            )}
        </div>
    );
}
