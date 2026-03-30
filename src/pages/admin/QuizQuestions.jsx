import React, { useState, useEffect } from 'react';
import style from "./Quiz.module.css";
import QuestionCard from "../../components/ui/QuestionCard";
import translations from '../../locales/translations';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { questionSchema } from "../../utils/validationSchema";
import InputError from "../../components/ui/InputError";
import AdminInput from "../../components/ui/AdminInput";
import AddQuestionsForm from "./AddQuestionsForm";

const QuizQuestions = ({ language = 'en' }) => {
    const [questions, setQuestions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const questionsPerPage = 4;
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(null);
    const [questionsFromDB, setQuestionsFromDB] = useState([]);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(questionSchema)
    });
    const handleEdit = (data) => {
        setQuestions(questions.map((q) => q.id === showEditModal.id ? data : q));
        setShowEditModal(null);
    };
    const handleDelete = () => {
        setQuestions(questions.filter((q) => q.id !== showDeleteModal));
        setShowDeleteModal(null);
    };

    const t = translations[language];
    useEffect(() => {
        setQuestions([
            {
                id: 1,
                type: "Placement Test",
                topic: "HTML & CSS Fundamentals",
                text: "أي خاصية CSS تستخدم لتغيير لون الخلفية؟",
                options: [
                    { text: "color", isCorrect: false },
                    { text: "bg-color", isCorrect: false },
                    { text: "background-color", isCorrect: true },
                    { text: "backdrop", isCorrect: false }
                ]
            },
            {
                id: 2,
                type: "Placement Test",
                topic: "JavaScript Essentials",
                text: "ما هي الطريقة الصحيحة لتعريف متغير لا يمكن تغيير قيمته لاحقاً؟",
                options: [
                    { text: "var", isCorrect: false },
                    { text: "let", isCorrect: false },
                    { text: "const", isCorrect: true },
                    { text: "static", isCorrect: false }
                ]
            },
            {
                id: 3,
                type: "Task Quiz",
                topic: "React Framework",
                text: "أي 'Hook' يستخدم لإدارة الحالة (State) في المكونات الوظيفية؟",
                options: [
                    { text: "useEffect", isCorrect: false },
                    { text: "useContext", isCorrect: false },
                    { text: "useState", isCorrect: true },
                    { text: "useReducer", isCorrect: false }
                ]
            },
            {
                id: 4,
                type: "Placement Test",
                topic: "Web Basics",
                text: "ماذا يرمز اختصار HTTP؟",
                options: [
                    { text: "HyperText Transfer Protocol", isCorrect: true },
                    { text: "High Tech Tool Protocol", isCorrect: false },
                    { text: "Hyperlink Text Test Process", isCorrect: false },
                    { text: "Home Transfer Text Program", isCorrect: false }
                ]
            },
            {
                id: 5,
                type: "Task Quiz",
                topic: "React Framework",
                text: "كيف نمرر البيانات من مكون أب (Parent) إلى مكون ابن (Child)؟",
                options: [
                    { text: "عن طريق الـ State", isCorrect: false },
                    { text: "عن طريق الـ Props", isCorrect: true },
                    { text: "عن طريق الـ Link", isCorrect: false },
                    { text: "لا يمكن تمرير البيانات", isCorrect: false }
                ]
            },
            {
                id: 6,
                type: "Task Quiz",
                topic: "JavaScript Essentials",
                text: "ما هي نتيجة ( '5' + 2 ) في لغة JavaScript؟",
                options: [
                    { text: "7", isCorrect: false },
                    { text: "52", isCorrect: true },
                    { text: "NaN", isCorrect: false },
                    { text: "Error", isCorrect: false }
                ]
            }
        ]);
    }, []);

    useEffect(() => {
        setQuestionsFromDB([
            { id: 1, name: "HTML & CSS Fundamentals" },
            { id: 2, name: "React Framework" },
            { id: 3, name: "JavaScript Essentials" }
        ]);
    }, []);

    const handleAdd = (data) => {
        setQuestions(prev => [
            {
                id: prev.length + 1,
                type: data.questionType,
                topic: data.associatedTask,
                text: data.questionText,
                options: [
                    { text: data.option1, isCorrect: data.correctAnswer === "option1" },
                    { text: data.option2, isCorrect: data.correctAnswer === "option2" },
                    { text: data.option3, isCorrect: data.correctAnswer === "option3" },
                    { text: data.option4, isCorrect: data.correctAnswer === "option4" }
                ]
            },
            ...prev
        ]);
        setShowAddModal(false);
    };

    const totalPages = Math.ceil(questions.length / questionsPerPage) || 1;
    const indexOfLast = currentPage * questionsPerPage;
    const indexOfFirst = indexOfLast - questionsPerPage;
    const currentQuestions = questions.slice(indexOfFirst, indexOfLast);

    const handleNext = () => currentPage < totalPages && setCurrentPage(prev => prev + 1);
    const handlePrev = () => currentPage > 1 && setCurrentPage(prev => prev - 1);

    return (
        <div className={language === 'ar' ? style.dashArabic : style.dash} dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <div className='row align-items-center justify-content-between mb-4'>
                <div className='col-md-6'>
                    <h1>{t.quizTitle || "Quiz Questions"}</h1>
                    <p>{t.quizSub || "Manage quiz questions"}</p>
                </div>
                <div className={`col-md-6 ${language === 'ar' ? 'text-start' : 'text-end'}`}>
                    <button onClick={() => setShowAddModal(true)} className={style.btnAdd}>
                        + {t.addQuestion || "Add Question"}
                    </button>
                </div>
            </div>

            {showAddModal && (
                <AddQuestionsForm t={t} handleAdd={handleAdd} questionsFromDB={questionsFromDB} onClose={() => setShowAddModal(false)} />
            )}
            {showEditModal && (
                <AddQuestionsForm t={t} formData={showEditModal} handleEdit={handleEdit} questionsFromDB={questionsFromDB} onClose={() => setShowEditModal(null)} />
            )}
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

            <div className='row'>
                {currentQuestions.length > 0 ? (
                    currentQuestions.map((q) => (
                        <div key={q.id} className='col-lg-6 mb-4'>
                            <QuestionCard question={q} language={language} onEditClick={(question) => setShowEditModal(question)} onDeleteClick={(id) => setShowDeleteModal(id)} t={t} />
                        </div>
                    ))
                ) : (
                    <p className="text-center mt-5">No questions added yet.</p>
                )}
            </div>

            {totalPages > 1 && (

                    <div className={style.foot}>
                        <button className={style.btnOutline} onClick={handlePrev}>{t.prev}</button>
                        <button className={style.btnActive} style={{ background: "#1A83A8" }}>{currentPage}</button>
                        <button className={style.btnOutline} onClick={handleNext}>{t.next}</button>
                    </div>
            )}
        </div>
    );
};

export default QuizQuestions;