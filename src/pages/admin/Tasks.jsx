import { useState, useEffect } from "react";
import style from "./AdminTables.module.css";
import translations from "../../locales/translations";
import { FaTrash, FaFileAlt, FaQuestionCircle, FaVideo, FaImage, FaEdit, FaEye } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import AdminInput from '../../components/ui/AdminInput';
import InputError from "../../components/ui/InputError";
import * as yup from "yup";
import { signupSchemaForTasks } from "../../utils/validationSchema";
export default function Tasks({ language }) {

    const [tasks, setTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const tasksPerPage = 4;
    const [topicsFromDB, setTopicsFromDB] = useState([]);


    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(signupSchemaForTasks)
    });

    useEffect(() => {
        setTopicsFromDB(["HTML & CSS Fundamentals", "React Framework", "JavaScript Essentials"]);
    }, []);

    const t = translations[language];

    useEffect(() => {
        setTasks([
            { id: 1, task: "Introduction to HTML", topic: "HTML & CSS Fundamentals", resources: ["quiz", "video", "image"] },
            { id: 2, task: "CSS Selectors", topic: "HTML & CSS Fundamentals", resources: ["quiz", "video"] },
            { id: 3, task: "React Components", topic: "React Framework", resources: ["quiz", "video", "image"] },
            { id: 4, task: "Functions and Scope", topic: "JavaScript Essentials", resources: ["quiz", "image"] }
        ]);
    }, []);

    const handleDelete = (id) => {
        if (window.confirm(t.deleteConfirm)) {

        }
    };

    const totalPages = Math.ceil(tasks.length / tasksPerPage);

    const handleNext = () => setCurrentPage(prev => (
        prev < totalPages ? prev + 1 : prev
    ));

    const handlePrev = () => setCurrentPage(prev => (
        prev > 1 ? prev - 1 : prev
    ));

    const indexOfLast = currentPage * tasksPerPage;
    const indexOfFirst = indexOfLast - tasksPerPage;
    const currentTasks = tasks.slice(indexOfFirst, indexOfLast);

    const onSubmit = (data) => {
        setTasks(prev => [
            ...prev,
            {
                id: prev.length + 1,
                task: data.taskName,
                topic: data.topic,
                resources: data.resources || []
            }
        ]);
        reset();
        setShowModal(false);
    };

    return (
        <div className={language === "ar" ? style.TasksPageArabic : style.TasksPage}>
            <h1>{t.titleTaskPage}</h1>
            <p>{t.descriptionTaskPage}</p>

            <button
                className={language === 'ar' ? style.addTaskbtnAr : style.addTaskbtn}
                onClick={() => setShowModal(true)}
            >
                <b>{t.addTaskbtn}</b>
            </button>

            {showModal && (
                <div className={style.modalOverlay}>
                    <div className={style.modalContent}>
                        <h2 style={{ marginBottom: "20px", color: "#1A83A8" }}>{t.addTask}</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>


                            <div style={{ marginBottom: "15px" }}>
                                <label style={{ display: "block", marginBottom: "5px", color: "#1A83A8" }}>{t.taskNameLabel}</label>
                                <AdminInput
                                    type="text"
                                    name="taskName"
                                    placeholder={t.enterTaskName}
                                    registerProps={register("taskName")}
                                />
                                <InputError error={errors.taskName} />
                            </div>

                            <div style={{ marginBottom: "15px" }}>
                                <label style={{ display: "block", marginBottom: "5px", color: "#1A83A8" }}>{t.topicLabel}</label>
                                <select
                                    {...register("topic")}
                                    style={{
                                        borderRadius: "5px",
                                        backgroundColor: "#E6F7F9",
                                        color: "#1A83A8",
                                        padding: "10px",
                                        border: "1px solid #1A83A8",
                                        width: "100%",
                                        fontSize: "12px"
                                    }}
                                >
                                    <option value="">{t.selTopic}</option>
                                    {topicsFromDB.map((topic, index) => (
                                        <option key={index} value={topic}>{topic}</option>
                                    ))}
                                </select>
                                <InputError error={errors.topic} />
                            </div>

                            <div style={{ marginBottom: "15px" }}>
                                <label style={{ display: "block", marginBottom: "5px", color: "#1A83A8" }}>{t.contentLabel}</label>
                                <textarea
                                    {...register("content")}
                                    rows={3}
                                    placeholder={t.contentDes}
                                    style={{
                                        width: "100%",
                                        borderRadius: "5px",
                                        border: "1px solid #1A83A8",
                                        padding: "10px",
                                        backgroundColor: "#E6F7F9",
                                        color: "#1A83A8",
                                        fontSize: "12px"
                                    }}
                                />
                                <InputError error={errors.content} />
                            </div>

                            <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: "block", marginBottom: "5px", color: "#1A83A8" }}>{t.videoUrlLabel}</label>
                                    <AdminInput
                                        type="url"
                                        name="videoUrl"
                                        placeholder="https://..."
                                        registerProps={register("videoUrl")}
                                    />
                                    <InputError error={errors.videoUrl} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: "block", marginBottom: "5px", color: "#1A83A8" }}>{t.imageUrlLabel}</label>
                                    <AdminInput
                                        type="url"
                                        name="imageUrl"
                                        placeholder="https://..."
                                        registerProps={register("imageUrl")}
                                    />
                                    <InputError error={errors.imageUrl} />
                                </div>
                            </div>

                            <div className={style.modalButtons}>
                                <button type="button" className={style.btnOutline} onClick={() => setShowModal(false)}>{t.cancel}</button>
                                <button type="submit" className={style.btnActive}>{t.save}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className={style.ForTasks}>
                <table className={style.tasksTable}>
                    <thead>
                        <tr>
                            <th>{t.taskNameLabel}</th>
                            <th>{t.topicLabel}</th>
                            <th>{t.res}</th>
                            <th>{t.actions}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentTasks.map(task => (
                            <tr key={task.id}>
                                <td>
                                    <div className={style.taskInfo}>
                                        <FaFileAlt className={style.fileIcon} />
                                        <p>{task.task}</p>
                                    </div>
                                </td>
                                <td>
                                    <span className={style.topicBadge}>{task.topic}</span>
                                </td>
                                <td>
                                    <div className={style.resources}>
                                        {task.resources.includes("quiz") && <div className={style.iconCircleHelp}><FaQuestionCircle /></div>}
                                        {task.resources.includes("video") && <div className={style.iconCircleVideo}><FaVideo /></div>}
                                        {task.resources.includes("image") && <div className={style.iconCircleImage}><FaImage /></div>}
                                    </div>
                                </td>
                                <td>
                                    <FaEye
                                        className={style.actionIcon}
                                        onClick={() => handleView(task.id)}
                                        style={{ color: "#1A83A8" }}
                                    />
                                    <FaEdit
                                        className={style.actionIcon}
                                        onClick={() => handleEdit(task.id)}
                                        style={{ color: "#1A83A8" }}
                                    />
                                    <FaTrash
                                        className={style.actionIcon}
                                        onClick={() => handleDelete(task.id)}
                                        style={{ color: "red" }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className={language === "ar" ? style.footAr : style.foot}>
                    {/* <button className={style.btnOutline} onClick={handlePrev}>{t.prev}</button>
                    <button className={style.btnActive}>{currentPage}</button>
                    <button className={style.btnOutline} onClick={handleNext}>{t.next}</button> */}
                    <div className={style.pagination}>
                        <button className={style.pageBtn} onClick={handlePrev} disabled={currentPage === 1}>
                            {t.prev}
                        </button>
                        <span className="mx-3 align-self-center"> {currentPage} / {totalPages} </span>
                        <button className={style.pageBtn} onClick={handleNext} disabled={currentPage === totalPages}>
                            {t.next}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
