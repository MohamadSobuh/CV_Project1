import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import style from "./AddTopics.module.css";
import translations from '../../locales/translations';
import TopicCard from "../../components/ui/TopicCard";
import AdminInput from "../../components/ui/AdminInput";
import InputError from "../../components/ui/InputError";
import { topicSchema } from "../../utils/validationSchema";
import AddTopicform from "./AddTopicform";
import EmptyPage from "../../components/ui/EmptyPage";
import { FaBookOpen } from 'react-icons/fa';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
const TopicsPage = ({ language = 'en' }) => {
    const t = translations[language];
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(null);

    const [topics, setTopics] = useState([]);
    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                if (!token || token === "undefined") {
                    alert("انتهت جلسة التسجيل، يرجى تسجيل الدخول مجدداً");
                    return;
                }
                const response = await axios.get("http://127.0.0.1:8000/api/dashboard/topics", {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });

                console.log(response.data);
                setTopics(response.data);
            } catch (err) {
                console.error("Error fetching topics:", err);
            }



        };
        fetchTopics();

    }, []);
    const handleAdd = async (newTopic) => {
        console.log(newTopic);
        const token = localStorage.getItem("accessToken");
        const payload = {
            title: newTopic.title,
            desc: newTopic.desc,
            difficulty: newTopic.difficulty.toLowerCase(),
            learning_plan: 5, ////////////////////////////////////////????//
            tasks_count: 0,
            order: 0
        }

        if (!token || token === "undefined") {
            alert("انتهت جلسة التسجيل، يرجى تسجيل الدخول مجدداً");
            return;
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/dashboard/topics/", payload, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });

            if (response.status === 201 || response.status === 200) {
                const savedTopic = {
                    ...response.data,
                    tasks: response.data.tasks || 0,
                    category: response.data.category
                };

                setTopics(prev => [savedTopic, ...prev]);
                setShowAddModal(false);
                alert("تمت إضافة الموضوع بنجاح");
            }
        } catch (error) {
            console.error("Error adding topic:", error.response?.data);
            alert("فشلت الإضافة: " + JSON.stringify(error.response?.data));
        }
    };
    const handleDelete = async () => {
        const token = localStorage.getItem("accessToken");

        if (!token || token === "undefined") {
            alert("انتهت جلسة التسجيل، يرجى تسجيل الدخول مجدداً");
            return;
        }
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/dashboard/topics/${showDeleteModal}/`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });

            if (response.status === 200 || response.status === 204) {
                setTopics(topics.filter(topic => topic.id !== showDeleteModal));
                setShowDeleteModal(null);
                alert("تم حذف الموضوع بنجاح");
            }
        } catch (error) {
            console.error("Error deleting topic:", error.response?.data);
            alert("فشل الحذف: " + JSON.stringify(error.response?.data));
        }
    }
    const handleEdit = async (data) => {
        const token = localStorage.getItem("accessToken");

        if (!token || token === "undefined") {
            alert("انتهت جلسة التسجيل، يرجى تسجيل الدخول مجدداً");
            return;
        }
        const validatedDifficulty = data.difficulty?.toLowerCase();

        const payload = {
            title: data.title,
            desc: data.desc,
            difficulty: validatedDifficulty,
            tasks: data.tasks,
            learning_plan: data.learning_plan || showEditModal.learning_plan
        };

        try {
            const response = await axios.patch(`http://127.0.0.1:8000/api/dashboard/topics/${showEditModal.id}/`, payload, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });

            if (response.status === 200) {
                const updatedTopic = {
                    ...response.data,
                    tasks: response.data.tasks || 0,
                    category: response.data.category || showEditModal.category
                };

                setTopics(prevTopics =>
                    prevTopics.map(t => t.id === showEditModal.id ? updatedTopic : t)
                );

                setShowEditModal(null);
                alert("تم تحديث الموضوع بنجاح");
            }
        } catch (error) {
            console.error("Error updating topic:", error.response?.data);
            alert("فشل التحديث: " + JSON.stringify(error.response?.data));
        }
    };


    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(topicSchema)
    });

    return (
        <div className={language === 'ar' ? style.dashArabic : style.dash} dir={language === 'ar' ? 'rtl' : 'ltr'}>
            {topics.length === 0 ? (
                <EmptyPage
                    icon={<FaBookOpen />}
                    title={t.emptyTopicsTitle}
                    message={t.emptyTopicsMessage}
                    btnText={t.addTopic}
                    onClick={() => setShowAddModal(true)}
                />
            ) : (
                <>
                    <div className='row align-items-center justify-content-between mb-4'>
                        <div className='col-md-6'>
                            <h1>{t.topicsTitle}</h1>
                            <p>{t.topicsSub}</p>
                        </div>
                        <div className={`col-md-6 ${language === 'ar' ? 'text-start' : 'text-end'}`}>
                            <button className={style.btnAdd} onClick={() => setShowAddModal(true)}>
                                + {t.addTopic}
                            </button>
                        </div>
                    </div>

                    <div className='row'>
                        {topics.map((topic) => (
                            <div key={topic.id} className='col-lg-4 col-md-6 mb-4'>
                                <TopicCard topic={topic}
                                    onEditClick={(topic) => setShowEditModal(topic)}
                                    onDeleteClick={(id) => setShowDeleteModal(id)}
                                    language={language}
                                    t={t} />

                            </div>
                        ))}
                    </div>
                </>
            )}


            {showAddModal && (
                <AddTopicform handleAdd={handleAdd} onClose={() => setShowAddModal(false)} t={t} />

            )}
            {showEditModal && <AddTopicform formData={showEditModal} onClose={() => setShowEditModal(null)} handleEdit={handleEdit} handleAdd={handleAdd} t={t} />}
            {showDeleteModal && (
                <div className={style.modalOverlay} onClick={() => setShowDeleteModal(null)}>
                    <div className={style.modalContent} onClick={e => e.stopPropagation()}>
                        <h2 className={style.modalTitle}>{t.confirm}</h2>
                        <p>{t.confirmDeleteDesc}</p>
                        <div className={style.modalButtons}>
                            <button className={style.btnOutline} onClick={() => setShowDeleteModal(null)}>{t.confirmDeleteCancel}</button>
                            <button className={style.btnActive} style={{ backgroundColor: 'red', borderColor: 'red' }} onClick={handleDelete}>{t.confirmDeleteBtn}</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default TopicsPage;