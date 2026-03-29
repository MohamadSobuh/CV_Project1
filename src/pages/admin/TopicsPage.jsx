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
import { Outlet } from 'react-router-dom';
const TopicsPage = ({ language = 'en' }) => {
    const t = translations[language];
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(null);

    const [topics, setTopics] = useState([
        { id: 1, title: "HTML & CSS Fundamentals", desc: "Learn the basics of web structure and styling", tasks: 8, category: "Front-end Development" },
        { id: 2, title: "JavaScript Essentials", desc: "Core concepts of JavaScript programming", tasks: 12, category: "Front-end Development" },
        { id: 3, title: "React Framework", desc: "Building modern web applications with React", tasks: 15, category: "Front-end Development" },
        { id: 4, title: "React Framework", desc: "Building modern web applications with React", tasks: 15, category: "Front-end Development" },
        { id: 5, title: "React Framework", desc: "Building modern web applications with React", tasks: 15, category: "Front-end Development" },
        { id: 6, title: "React Framework", desc: "Building modern web applications with React", tasks: 15, category: "Front-end Development" },
        { id: 7, title: "React Framework", desc: "Building modern web applications with React", tasks: 15, category: "Front-end Development" },
        { id: 8, title: "React Framework", desc: "Building modern web applications with React", tasks: 15, category: "Front-end Development" },
        { id: 9, title: "React Framework", desc: "Building modern web applications with React", tasks: 15, category: "Front-end Development" },
        { id: 10, title: "React Framework", desc: "Building modern web applications with React", tasks: 15, category: "Front-end Development" },
        { id: 11, title: "React Framework", desc: "Building modern web applications with React", tasks: 15, category: "Front-end Development" },
        { id: 12, title: "React Framework", desc: "Building modern web applications with React", tasks: 15, category: "Front-end Development" },
    ]);
    const handleAdd = (newTopic) => {
        newTopic = { ...newTopic, id: Date.now(), tasks: 5 };
        setTopics([newTopic, ...topics]);
        setShowAddModal(false);
    }
    const handleDelete = () => {
        setTopics(topics.filter(topic => topic.id !== showDeleteModal));
        setShowDeleteModal(null);
    }
    const handleEdit = (data) => {
        setTopics(topics.map(t => t.id === showEditModal.id ? { ...t, ...data } : t));
        setShowEditModal(null);
    };

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(topicSchema)
    });

    return (
        <div className={language === 'ar' ? style.dashArabic : style.dash} dir={language === 'ar' ? 'rtl' : 'ltr'}>

            <div className='row align-items-center justify-content-between mb-4'>
                <div className='col-md-6'>
                    <h1 className={style.quizTitle}>{t.topicsTitle}</h1>
                    <p className={style.quizSub}>{t.topicsSub}</p>
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