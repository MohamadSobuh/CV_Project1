import React, { useEffect } from 'react';
import { FiBookOpen } from "react-icons/fi";
import { HiOutlineArrowLeft } from "react-icons/hi";
import styles from './AdminTaskContent.module.css';
import { useNavigate } from 'react-router-dom';
import { useAdminFlow } from '../../context/AdminFlowContext';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchemaForTasks } from "../../utils/validationSchema";
import AdminInput from '../../components/ui/AdminInput';
import InputError from "../../components/ui/InputError";
import translations from "../../locales/translations";

export default function AdminTaskContent({ language }) {
    const navigate = useNavigate();
    const { activeTask, topics } = useAdminFlow();
    const t = translations[language] || translations["en"];

    // embed youtube video
    const getEmbedUrl = (url) => {
        if (!url) return "";
        if (url.includes("watch?v=")) {
            return url.replace("watch?v=", "embed/");
        }
        if (url.includes("m.youtube.com")) {
            return url.replace("m.youtube.com/", "www.youtube.com/embed/");
        }
        return url;
    };

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(signupSchemaForTasks),
    });

    useEffect(() => {
        if (activeTask) {
            reset({
                task: activeTask.task,
                topic: activeTask.topic_id,
                content: activeTask.content,
                videoUrl: activeTask.video_url,
                imageUrl: activeTask.image_url,
            });
        } else {
            navigate('/admin/tasks');
        }
    }, [activeTask, reset, navigate]);

    const onSubmit = async (data) => {
        if (!activeTask) return;

        const payload = {
            title: data.task,
            topic_id: Number(data.topic),
            content: data.content,
            video_url: data.videoUrl,
            image_url: data.imageUrl,
        };

        try {
            const token = localStorage.getItem("accessToken");
            if (!token || token === "undefined") {
                alert("انتهت جلسة التسجيل، يرجى تسجيل الدخول مجدداً");
                return;
            }
            await axios.put(`http://127.0.0.1:8000/api/dashboard/tasks/${activeTask.id}/`, payload, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            alert("Task updated successfully!");
            navigate('/admin/tasks');
        } catch (err) {
            console.error("Error updating task:", err);
            alert("Failed to update task.");
        }
    };

    if (!activeTask) return <div className={styles.container}>Loading...</div>;

    const taskData = {
        lesson_number: "01",
        title: activeTask.task,
        description: activeTask.content,
        image_url: activeTask.image_url,
        video_url: activeTask.video_url,
    };
    console.log(taskData);

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

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.mainCard}>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', marginBottom: '30px' }}>
                        <div style={{ flex: '1 1 40%' }}>
                            <h3 className={styles.cardTitle}>{taskData.title}</h3>
                        </div>
                        <div style={{ flex: '1 1 50%' }}>
                            <label style={{ display: 'block', marginBottom: '8px', color: '#1A83A8', fontWeight: '500' }}>{t.editTaskName}</label>
                            <AdminInput type="text" name="task" placeholder={t.editTaskTitle} registerProps={register("task")} />
                            <InputError error={errors.task} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', marginBottom: '30px' }}>
                        <div style={{ flex: '1 1 40%' }}>
                            <p className={styles.cardDescription}>{taskData.description}</p>
                        </div>
                        <div style={{ flex: '1 1 50%' }}>
                            <label style={{ display: 'block', marginBottom: '8px', color: '#1A83A8', fontWeight: '500' }}>{t.editTaskContent}</label>
                            <textarea {...register("content")} rows={6} placeholder={t.editTaskContent} style={{ width: "100%", borderRadius: "8px", border: "1px solid #1A83A8", padding: "12px", backgroundColor: "#E6F7F9", color: "#1A83A8", outline: "none", boxSizing: "border-box", fontSize: "14px", fontFamily: "inherit", resize: "vertical" }} />
                            <InputError error={errors.content} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', marginBottom: '40px' }}>
                        <div style={{ flex: '1 1 40%' }}>
                            <p className={styles.cardDescription} style={{ marginBottom: 0 }}><strong>{t.topicSection}</strong><br />{t.selectTopic}</p>
                        </div>
                        <div style={{ flex: '1 1 50%' }}>
                            <label style={{ display: 'block', marginBottom: '8px', color: '#1A83A8', fontWeight: '500' }}>{t.topic}</label>
                            <select {...register("topic")} defaultValue="" style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #1A83A8", backgroundColor: "#E6F7F9", color: "#1A83A8", outline: "none", fontSize: "14px" }}>
                                <option value={activeTask.topic_id} disabled hidden>{activeTask.topic}</option>
                                {topics && topics.map((topic) => (
                                    <option key={topic.id} value={topic.id}>{topic.title}</option>
                                ))}
                            </select>
                            <InputError error={errors.topic} />
                        </div>
                    </div>

                    <div className={styles.mediaRow}>
                        <div className={styles.mediaBoxImage} style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', justifyContent: 'flex-start' }}>
                            {taskData.image_url && <img src={taskData.image_url} alt="Task" style={{ maxWidth: '100%', borderRadius: '8px' }} />}
                            <span className={styles.mediaTextImg}>Image support</span>

                            <div style={{ width: '100%', marginTop: 'auto' }}>
                                <label style={{ display: 'block', marginBottom: '8px', color: '#1A83A8', fontWeight: '500', textAlign: 'left' }}>Image URL</label>
                                <AdminInput type="url" name="imageUrl" placeholder="https://..." registerProps={register("imageUrl")} />
                                <InputError error={errors.imageUrl} />
                            </div>
                        </div>

                        <div className={styles.mediaBoxVideo} style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', justifyContent: 'flex-start' }}>
                            {taskData.video_url ? (
                                <iframe
                                    src={getEmbedUrl(taskData.video_url)}
                                    frameBorder="0"
                                    allowFullScreen
                                    title="Task Video"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    style={{ width: '100%', borderRadius: '8px' }}
                                ></iframe>
                            ) : null}
                            <span className={styles.mediaTextVid}>Video support</span>

                            <div style={{ width: '100%', marginTop: 'auto' }}>
                                <label style={{ display: 'block', marginBottom: '8px', color: '#1A83A8', fontWeight: '500', textAlign: 'left' }}>Video URL</label>
                                <AdminInput type="url" name="videoUrl" placeholder="https://..." registerProps={register("videoUrl")} />
                                <InputError error={errors.videoUrl} />
                            </div>
                        </div>
                    </div>

                </div>

                <div className={styles.footerNav} style={{ marginTop: '24px' }}>
                    <button type="button" className={styles.navButtonLeft} onClick={() => navigate('/admin/tasks')}>
                        <HiOutlineArrowLeft size={24} />
                        <span>{t.cancel}</span>
                    </button>
                    <button type="submit" style={{ backgroundColor: '#1A83A8', color: 'white', border: 'none', padding: '12px 32px', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', transition: 'background-color 0.3s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#07526B'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1A83A8'}>
                        <span>{t.saveChanges}</span>
                    </button>
                </div>
            </form>
        </div>
    );
}