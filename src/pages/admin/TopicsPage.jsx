import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import style from "./AddTopics.module.css";
import { useTranslation } from "react-i18next";

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
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Notification from '../../components/ui/Notification';
import api from '../../utils/axios';

const TopicsPage = ({ language = 'en' }) => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(null);
    const [filterInput, setFilterInput] = useState('');
    const [topicsFilter, setTopicsFilter] = useState([]);
    const [message, setMessage] = useState({ show: false, text: "", type: "success" });

    const showMessage = (text, type) => {
        setMessage({ show: true, text, type });
        setTimeout(() => setMessage({ show: false, text: "", type: "success" }), 3000);
    }


    const [topics, setTopics] = useState([]);
    const ensureAuth = () => {
        const token = localStorage.getItem("accessToken");
        const role = localStorage.getItem("userRole");
        if (!token || token === "undefined" || role !== "admin") {
            showMessage(language === 'ar' ? "انتهت جلسة التسجيل، يرجى تسجيل الدخول مجدداً" : "Session expired, please log in again", "error");
            navigate("/login");
            return false;
        }
        return true;
    };
 
    useEffect(() => {
        if (location.state?.message) {
            showMessage(location.state.message, location.state.type);
        }
    }, [location.state]);
 
    useEffect(() => {
        const fetchTopics = async () => {
            if (!ensureAuth()) return;
            try {
                const response = await api.get("/dashboard/topics");
                console.log(response.data,"data");
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
        console.log(payload,"payload");

        if (!ensureAuth()) return;
        
        try {
            const response = await api.post("/dashboard/topics/",payload);
            console.log(response,"response");

            if (response.status === 201 || response.status === 200) {
                const savedTopic = {
                    ...response.data,
                    tasks: response.data.tasks || 0,
                    category: response.data.category
                };

                setTopics(prev => [savedTopic, ...prev]);
                setShowAddModal(false);
                showMessage(language === 'ar' ? "تمت إضافة الموضوع بنجاح" : "Topic added successfully", "success");
            }
        } catch (error) {
            console.error("Error adding topic:", error.response?.data);
            showMessage("فشلت الإضافة: " + JSON.stringify(error.response?.data), "error");
        }
    };
    const handleDelete = async () => {
        if (!ensureAuth()) return;
        try {
            const response = await api.delete(`/dashboard/topics/${showDeleteModal}/`);

            if (response.status === 200 || response.status === 204) {
                setTopics(topics.filter(topic => topic.id !== showDeleteModal));
                setShowDeleteModal(null);
                showMessage(language === 'ar' ? "تم حذف الموضوع بنجاح" : "Topic deleted successfully", "success");
            }
        } catch (error) {
            setShowDeleteModal(null);
            console.error("Error deleting topic:", error.response?.data);
            showMessage(language === 'ar' ? "فشل الحذف" : "Failed to delete topic", "error");
        }
    }
    const handleEdit = async (data) => {
        if (!ensureAuth()) return;
        const validatedDifficulty = data.difficulty?.toLowerCase();
        const payload = {
            title: data.title,
            desc: data.desc,
            difficulty: validatedDifficulty,
            tasks: data.tasks,
            learning_plan: data.learning_plan || showEditModal.learning_plan
        };
        // console.log(payload);

        try {
            const response = await api.patch(`/dashboard/topics/${showEditModal.id}/`, payload);

            if (response.status === 200) {
                const updatedTopic = {
                    ...response.data,
                    tasks: response.data.tasks || 0,
                    category: response.data.category || showEditModal.category
                };

                setTopics(prevTopics =>
                    prevTopics.map(topic => topic.id === showEditModal.id ? updatedTopic : topic)
                );

                setShowEditModal(null);
                showMessage(language === 'ar' ? "تم تحديث الموضوع بنجاح" : "Topic updated successfully", "success");
            }
        } catch (error) {
            setShowEditModal(null);
            console.error("Error updating topic:", error.response?.data);
            showMessage(language === 'ar' ? "فشل التحديث" : "Failed to update topic", "error");
        }
    };
    const handleFilter = () => {
        const filtered = topics.filter(topic =>
            topic.title.toLowerCase().includes(filterInput.toLowerCase())
        );
        setTopicsFilter(filtered);
    };
    useEffect(() => {
        handleFilter();
    }, [filterInput, topics]);


    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(topicSchema)
    });

    return (
        <div className={language === 'ar' ? style.dashArabic : style.dash} dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <Notification
                show={message.show}
                text={message.text}
                type={message.type}
            />
            {topics.length === 0 ? (
                <EmptyPage
                    icon={<FaBookOpen />}
                    title={t('emptyTopicsTitle')}
                    message={t('emptyTopicsMessage')}
                    btnText={t('addTopic')}
                    onClick={() => setShowAddModal(true)}
                />
            ) : (
                <>
                    <div className='row align-items-center justify-content-between mb-4'>
                        <div className={style.bgGrid} />

                        <div className='col-md-6'>
                            <h1><b>{t('topicsTitle')}</b></h1>
                            <p>{t('topicsSub')}</p>
                        </div>
                        <div className={`col-md-6 ${language === 'ar' ? 'text-start' : 'text-end'}`}>
                            <button className={style.btnAdd} onClick={() => setShowAddModal(true)}>
                                + {t('addTopic')}
                            </button>
                        </div>

                        <div className="col-md-6">
                            <br />
                            <div className={style.searchContainer}>
                                <FaSearch className={style.searchIcon} />
                                <input
                                    type="text"
                                    className={style.searchInput}
                                    placeholder={t('search')}
                                    value={filterInput}
                                    onChange={(e) => setFilterInput(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        {topicsFilter.map((topic) => (
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
                        <h2 className={style.modalTitle}>{t('confirm')}</h2>
                        <p>{t('confirmDeleteDesc')}</p>
                        <div className={style.modalButtons}>
                            <button className={style.btnOutline} onClick={() => setShowDeleteModal(null)}>{t('confirmDeleteCancel')}</button>
                            <button className={style.btnActive} style={{ backgroundColor: 'red', borderColor: 'red' }} onClick={handleDelete}>{t('confirmDeleteBtn')}</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default TopicsPage;