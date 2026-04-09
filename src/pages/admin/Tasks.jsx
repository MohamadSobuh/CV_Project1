import { useState, useEffect } from "react";
import style from "./AdminTables.module.css";
import translations from "../../locales/translations";
import { FaTrash, FaFileAlt, FaQuestionCircle, FaVideo, FaImage, FaEdit, FaEye, FaTasks } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import AdminInput from '../../components/ui/AdminInput';
import InputError from "../../components/ui/InputError";
import * as yup from "yup";
import { signupSchemaForTasks } from "../../utils/validationSchema";
import EmptyPage from "../../components/ui/EmptyPage";
import axios from 'axios';
import { useUserFlow } from '../../context/UserFlowContext';


export default function Tasks({ language }) {

    const [tasks, setTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const tasksPerPage = 4;
    const [showDeleteModal, setShowDeleteModal] = useState(null);
    const { topics, fetchTopics, loadingTopics } = useUserFlow();


    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(signupSchemaForTasks)
    });


    const t = translations[language];

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                if (!token || token === "undefined") {
                    alert("انتهت جلسة التسجيل، يرجى تسجيل الدخول مجدداً");
                    return;
                }
                const response = await axios.get("http://127.0.0.1:8000/api/dashboard/tasks", {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });

                console.log(response.data);
                setTasks(response.data);
            } catch (err) {
                console.error("Error fetching topics:", err);
            }

        };
        fetchTasks();
        fetchTopics();
    }, []);


    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token || token === "undefined") {
                alert("انتهت جلسة التسجيل، يرجى تسجيل الدخول مجدداً");
                return;
            }
            const response = await axios.delete(`http://127.0.0.1:8000/api/dashboard/tasks/${showDeleteModal}/`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            console.log(response.data);
            setTasks(tasks.filter(task => task.id !== showDeleteModal));
            setShowDeleteModal(null);
        } catch (err) {
            console.error("Error deleting task:", err);
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

    const onSubmit = async (data) => {
        console.log(data);
        const payload = {
            title: data.task,
            topic_id: Number(data.topic),
            content: data.content,
            video_url: data.videoUrl,
            image_url: data.imageUrl,
        };
        console.log("Payload to be sent:", payload);
        try {
            const token = localStorage.getItem("accessToken");
            if (!token || token === "undefined") {
                alert("انتهت جلسة التسجيل، يرجى تسجيل الدخول مجدداً");
                return;
            }
            const response = await axios.post("http://127.0.0.1:8000/api/dashboard/tasks/", payload, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });

            console.log(response.data);
            setTasks(prev => [...prev, response.data]);
            reset();
            setShowModal(false);
        }
        catch (err) {
            console.error("تفاصيل الخطأ من السيرفر:", err.response?.data);

            console.error("Error adding task:", err);
        }

    };

    return (
        <div className={language === "ar" ? style.TasksPageArabic : style.TasksPage}>
            {tasks.length === 0 ? (
                <EmptyPage
                    icon={<FaTasks />}
                    title={t.emptyTasksTitle}
                    message={t.emptyTasksMessage}
                    btnText={t.addTaskbtn}
                    onClick={() => setShowModal(true)}
                />
            ) : (
                <>
                    <div className='row align-items-center justify-content-between mb-4'>
                        <div className='col-md-6'>
                            <h1>{t.titleTaskPage}</h1>
                            <p>{t.descriptionTaskPage}</p>
                        </div>
                        <div className={`col-md-6 ${language === 'ar' ? 'text-start' : 'text-end'}`}>
                            <button
                                className={language === 'ar' ? style.addTaskbtnAr : style.addTaskbtn}
                                onClick={() => setShowModal(true)}
                            >
                                <b>{t.addTaskbtn}</b>
                            </button>
                        </div>
                    </div>

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
                                                <p>{task.title || task.task}</p>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={style.topicBadge}>{task.topic}</span>
                                        </td>
                                        <td>
                                            <div className={style.resources}>
                                                {task.resources?.includes("quiz") && <div className={style.iconCircleHelp}><FaQuestionCircle /></div>}
                                                {task.resources?.includes("video") && <div className={style.iconCircleVideo}><FaVideo /></div>}
                                                {task.resources?.includes("image") && <div className={style.iconCircleImage}><FaImage /></div>}
                                            </div>
                                        </td>
                                        <td>
                                            <FaEye className={style.actionIcon} onClick={() => handleView(task.id)} style={{ color: "#1A83A8" }} />
                                            <FaEdit className={style.actionIcon} onClick={() => handleEdit(task.id)} style={{ color: "#1A83A8" }} />
                                            <FaTrash className={style.actionIcon} onClick={() => setShowDeleteModal(task.id)} style={{ color: "red" }} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className={style.foot}>
                            <button className={style.btnOutline} onClick={handlePrev}>{t.prev}</button>
                            <button className={style.btnActive} style={{ background: "#1A83A8" }}>{currentPage}</button>
                            <button className={style.btnOutline} onClick={handleNext}>{t.next}</button>
                        </div>
                    </div>
                </>
            )}

            {showDeleteModal && (
                <div className={style.modalOverlay} onClick={() => setShowDeleteModal(null)}>
                    <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h2 className={style.modalTitle}>{t.confirm}</h2>
                        <p>{t.confirmDeleteDesc}</p>
                        <div className={style.modalButtons}>
                            <button className={style.btnOutline} onClick={() => setShowDeleteModal(null)}>{t.confirmDeleteCancel}</button>
                            <button className={style.btnActive} style={{ backgroundColor: "red", borderColor: "red" }} onClick={() => handleDelete(showDeleteModal)}>
                                {t.confirmDeleteBtn}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showModal && (
                <div className={style.modalOverlay}>
                    <div className={style.modalContent}>
                        {loadingTopics ? (
                            <div className={style.loading}>
                                <FaSpinner className={style.spinner} />
                            </div>
                        ) : (
                            <>
                                <h2 style={{ marginBottom: "20px", color: "#1A83A8" }}>{t.addTask}</h2>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div style={{ marginBottom: "15px" }}>
                                        <label>{t.taskNameLabel}</label>
                                        <AdminInput type="text" name="task" placeholder={t.enterTaskName} registerProps={register("task")} />
                                        <InputError error={errors.task} />
                                    </div>

                                    <div style={{ marginBottom: "15px" }}>
                                        <label>{t.topicLabel}</label>
                                        <select {...register("topic")} defaultValue="" className={style.customSelect} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #1A83A8", backgroundColor: "#E6F7F9", color: "#1A83A8" }}>
                                            <option value="" disabled hidden>{t.selTopic}</option>
                                            {topics.map((topic) => (
                                                <option key={topic.id} value={topic.id}>{topic.title}</option>
                                            ))}
                                        </select>
                                        <InputError error={errors.topic} />
                                    </div>

                                    <div style={{ marginBottom: "15px" }}>
                                        <label>{t.contentLabel}</label>
                                        <textarea {...register("content")} rows={3} placeholder={t.contentDes} style={{ width: "100%", borderRadius: "5px", border: "1px solid #1A83A8", padding: "10px", backgroundColor: "#E6F7F9", color: "#1A83A8" }} />
                                        <InputError error={errors.content} />
                                    </div>

                                    <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
                                        <div style={{ flex: 1 }}>
                                            <label>{t.videoUrlLabel}</label>
                                            <AdminInput type="url" name="videoUrl" placeholder="https://..." registerProps={register("videoUrl")} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <label>{t.imageUrlLabel}</label>
                                            <AdminInput type="url" name="imageUrl" placeholder="https://..." registerProps={register("imageUrl")} />
                                        </div>
                                    </div>

                                    <div className={style.modalButtons}>
                                        <button type="button" className={style.btnOutline} onClick={() => setShowModal(false)}>{t.cancel}</button>
                                        <button type="submit" className={style.btnActive}>{t.save}</button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
