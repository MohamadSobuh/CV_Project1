import React from 'react';
import { FiBookOpen, FiImage } from "react-icons/fi";
import { FaPlayCircle } from "react-icons/fa";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";
import styles from './TaskContent.module.css';
import { useNavigate } from 'react-router-dom';
import { useUserFlow } from '../../context/UserFlowContext';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function TaskContent({ language }) {
    const navigate = useNavigate();
    const { activeTask } = useUserFlow();
    const [taskData, setTaskData] = useState(null);

    const testData = {
        "lesson_number": "01",
        "title": "HTML Fundamentals",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        "image_url": "/media/tasks/html_fund.png",
        "video_url": "https://www.youtube.com/embed/ok-plXXHlWw",
        "next_quiz_id": 5,
        "is_completed": true
    };

    useEffect(() => {
        const fetchTaskData = async () => {
            try {
                setTaskData(testData);
            } catch (error) {
                console.error('Error fetching task data:', error);
            }
        };
        fetchTaskData();
    }, [activeTask]);

    if (!activeTask || !taskData) return <div>Loading...</div>;

    return (
        <div className={styles.container}>
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
                        {taskData.image_url && <img src={taskData.image_url} alt="Task" />}
                        <span className={styles.mediaTextImg}>Image support</span>
                    </div>

                    <div className={styles.mediaBoxVideo}>
                        <iframe
                            src={taskData.video_url}
                            frameBorder="0"
                            allowFullScreen
                            title="Task Video"
                            referrerPolicy="strict-origin-when-cross-origin"
                        ></iframe>
                        <span className={styles.mediaTextVid}>Video support</span>
                    </div>
                </div>
            </div>

            <div className={styles.footerNav}>
                <button className={styles.navButtonLeft} onClick={() => navigate('/user/plan')}>
                    <HiOutlineArrowLeft size={24} />
                    <span>Back to Plan</span>
                </button>
                <button className={styles.navButtonRight} onClick={() => navigate('/user/quiz')}>
                    <span>Go to Quiz</span>
                    <HiOutlineArrowRight size={24} />
                </button>
            </div>
        </div>
    );
}