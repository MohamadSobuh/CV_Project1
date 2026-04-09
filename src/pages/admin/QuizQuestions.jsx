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
import EmptyPage from "../../components/ui/EmptyPage";
import { FaQuestionCircle } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QuizQuestions = ({ language = 'en' }) => {
    const [questions, setQuestions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const questionsPerPage = 4;
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(null);
    const [tasksFromDB, setTasksFromDB] = useState([]);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(questionSchema)
    });
    const handleEdit = async (data) => {
        console.log(data, "data before update");
        try {
            const token = localStorage.getItem("accessToken");
            if (!token || token === "undefined") {
                navigate("/login");
                return;
            }
            const response = await axios.put(`http://127.0.0.1:8000/api/dashboard/questions/${showEditModal.id}/`, data, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            console.log(response.data, "response");
            setQuestions(prevQuestions =>
                prevQuestions.map((q) =>
                    q.id === showEditModal.id ? response.data : q
                )
            );
            setShowEditModal(null);
        } catch (error) {
            console.error("Error updating question:", error.response?.data || error);
        }
    };
    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token || token === "undefined") {
                navigate("/login");
                return;
            }
            const response = await axios.delete(`http://127.0.0.1:8000/api/dashboard/questions/${showDeleteModal}/`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setQuestions(questions.filter((q) => q.id !== showDeleteModal));
            setShowDeleteModal(null);
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    };

    const t = translations[language];
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                if (!token || token === "undefined") {
                    navigate("/login");
                    return;
                }
                const response = await axios.get("http://127.0.0.1:8000/api/dashboard/questions/", {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });
                setQuestions(response.data);
                console.log(response.data, "questions");
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };
        fetchQuestions();

    }, []);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                if (!token || token === "undefined") {
                    navigate("/login");
                    return;
                }
                const response = await axios.get("http://127.0.0.1:8000/api/dashboard/tasks/", {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });
                setTasksFromDB(response.data);
                console.log(response.data, "tasks");
            } catch (err) {
                console.error("Error fetching tasks:", err);
            }
        };
        console.log(tasksFromDB);
        fetchTasks();
    }, []);

    const handleAdd = async (data) => {
        console.log(data);
        console.log(data.task, "task");

        const optionsArray = [
            { text: data.options[0].text, is_Correct: data.options[0].isCorrect },
            { text: data.options[1].text, is_Correct: data.options[1].isCorrect },
            { text: data.options[2].text, is_Correct: data.options[2].isCorrect },
            { text: data.options[3].text, is_Correct: data.options[3].isCorrect }
        ];
        console.log(optionsArray, "optionsArray");

        const correctIndex = optionsArray.findIndex(opt => opt.is_Correct);
        const correctLetter = ["A", "B", "C", "D"][correctIndex] || "A";

        const getServerType = (type) => {
            if (type === "Task Quiz") return "task_quiz";
            if (type === "Placement Test") return "placement";
            return type;
        };

        const payload = {
            question_type: getServerType(data.type),
            question_text: data.text,
            task: data.task || null,
            correct_answer: correctLetter,
            order: 1,
            options: optionsArray
        };
        console.log(payload, "payload");
        try {
            const token = localStorage.getItem("accessToken");
            if (!token || token === "undefined") {
                navigate("/login");
                return;
            }
            const response = await axios.post("http://127.0.0.1:8000/api/dashboard/questions/", payload, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });

            setQuestions(prev => [response.data, ...prev]);
            console.log(response.data, "questions");
        } catch (error) {
            console.error("Server Validation Error:", error.response?.data);
        }


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
            {questions.length === 0 ? (
                <EmptyPage
                    icon={<FaQuestionCircle />}
                    title={t.emptyQuestionsTitle}
                    message={t.emptyQuestionsMessage}
                    btnText={t.addQuestion}
                    onClick={() => setShowAddModal(true)}
                />
            ) : (
                <>
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

                    <div className='row'>
                        {currentQuestions.map((q) => (
                            <div key={q.id} className='col-lg-6 mb-4'>
                                <QuestionCard
                                    question={q}
                                    language={language}
                                    onEditClick={(question) => setShowEditModal(question)}
                                    onDeleteClick={(id) => setShowDeleteModal(id)}
                                    t={t}
                                />
                            </div>
                        ))}
                    </div>
                </>
            )}

            {showAddModal && (
                <AddQuestionsForm t={t} handleAdd={handleAdd} tasksFromDB={tasksFromDB} onClose={() => setShowAddModal(false)} />
            )}
            {showEditModal && (
                <AddQuestionsForm t={t} formData={showEditModal} handleEdit={handleEdit} tasksFromDB={tasksFromDB} onClose={() => setShowEditModal(null)} />
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