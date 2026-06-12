import React, { useState ,useEffect} from 'react'
import style from "./TaskAssQuiz.module.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserFlow } from '../../context/UserFlowContext';
import { useTranslation } from "react-i18next";
import api from "../../utils/axios";


export default function InitalAssQuiz({ language }) {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const { user } = useUserFlow();



    const { state } = useLocation();
    const weaknesses = state?.weaknesses || [];
    const [question, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log(weaknesses);
    
    const ensureAuth = () => {
        const token = localStorage.getItem("accessToken");
        if (!token || token === "undefined") {
            navigate("/login", {
                state: {
                    message: language === "ar" ? "انتهت جلسة التسجيل، يرجى تسجيل الدخول مجدداً" : "Session expired, please log in again",
                    type: "error"
                }
            });
            return false;
        }
        return true;
    };
    const fetchQuestions = async (weaknesses) => {
        if (!ensureAuth()) return [];
        try {
            const response = await api.post('/userr/quiz/start-weakness/', { 
                weakness_skills: weaknesses
             });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching questions:', error);
            return [];
        }
    };
    useEffect(() => {
        fetchQuestions(weaknesses).then((data) => {
            setQuestions(data || []);
            setLoading(false);
        });
    }, []);

    

    
 
    // const weaknesses = [...new Set(questions.map(q => q.skill))];
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const totalQuestionsCount = question.questions?.length || 0;

    const answeredCount = Object.keys(answers).length;
    const progress = (answeredCount / question.questions?.length) * 100;

    const currentQuestion = question.questions?.[current];
    console.log(currentQuestion);

    const handleSelect = (optionId) => {
        setAnswers({
            ...answers,
            [currentQuestion.id]: optionId
        });
    };
    useEffect(() => {
        console.log(current);
        console.log(answers);
    }, [current,answers]);

    const next = () => {
        if (current < question.questions.length - 1) {
            setCurrent(current + 1);
        }
    };

    const prev = () => {
        if (current > 0) {
            setCurrent(current - 1);
        }
    };

    const { setPlacementScore } = useUserFlow();

    //هون في تعديلات عشان في mark
    async function handleFinish() {
        if (isSubmitting || totalQuestionsCount === 0) return;
        if (!ensureAuth()) return;

        try {
            setIsSubmitting(true);

            // 🔥 تحويل كائن الإجابات {52: 'B'} إلى مصفوفة كائنات المتوقعة في الباكيند
            const formattedAnswers = Object.entries(answers).map(([qId, selectedOpt]) => ({
                question_id: parseInt(qId, 10), // التأكد من إرسال الـ ID كرقم وليس نص
                selected_answer: selectedOpt
            }));

            // إرسال طلب حفظ الإجابات وتصحيح الاختبار للباكيند
            const response = await api.post('/userr/quiz/submit-weakness/', {
                question_ids: question.question_ids || [],
                weakness_skills: weaknesses,
                answers: formattedAnswers // البيانات المعدلة هنا جاهزة تماماً 🚀
            });

            const resultData = response.data;

            // تحديث الـ Context بنسبة النجاح القادمة من السيرفر
            if (resultData.score_percentage !== undefined) {
                setPlacementScore(resultData.score_percentage);
            }
            console.log(resultData.score_percentage);
            console.log(resultData.passed);
            console.log(resultData.skills_results);

            // التوجيه لصفحة النتيجة مع تمرير كافة التفاصيل العائدة من السيرفر
            navigate('/user/quizResult', {
                state: {
                    score: resultData.score_percentage,
                    passed: resultData.passed,
                    skillsResults: resultData.skills_results,
                    mode: "initial"
                }
            });

        } catch (error) {
            console.error('Error submitting quiz answers:', error);
            alert(language === 'ar' ? 'حدث خطأ أثناء إرسال إجابات الاختبار.' : 'An error occurred while submitting the quiz.');
        } finally {
            setIsSubmitting(false);
        }
    }
    if (loading) {
        return (
            <div className={language === 'ar' ? style.taskAssQuizAr : style.taskAssQuiz}>
                <div className={style.bgGrid} />
                <p style={{ textAlign: 'center', marginTop: '4rem', color: '#4E6A54', fontSize: '1.2rem' }}>Loading questions...</p>
            </div>
        );
    }

    if (!question || question.questions.length === 0) {
        return (
            <div className={language === 'ar' ? style.taskAssQuizAr : style.taskAssQuiz}>
                <div className={style.bgGrid} />
                <p style={{ textAlign: 'center', marginTop: '4rem', color: '#4E6A54', fontSize: '1.2rem' }}>No questions available.</p>
            </div>
        );
    }

    return (
        <div className={language === 'ar' ? style.taskAssQuizAr : style.taskAssQuiz} >
            <div className={style.bgGrid} />

            <h1>
                <b>
                    {t('titleQuizPage')}
                </b>
            </h1>

            <div className="row">
                <div className={`col-md-8 ${style.qA}`}>
                    <h5>{currentQuestion.question}</h5>
                    {currentQuestion.options.map((opt) => (
                        <label key={opt.id} className={style.option}>
                            <input
                                type="radio"
                                name={`question-${currentQuestion.id}`}
                                value={opt.id}
                                checked={answers[currentQuestion.id] === opt.id}
                                onChange={() => handleSelect(opt.id)}
                            />
                            <span className={style.newRadio}></span>
                            <span className={style.text}>{opt.text}</span>
                        </label>
                    ))}

                    <div className={style.btn}>
                        <button className={style.prev} onClick={prev}> <FaArrowLeft /> {t('prev')} </button>
                        <button className={style.next} onClick={next}>{t('next')} <FaArrowRight /> </button>
                    </div>
                </div>

                <div className={`col-md-3 ${style.qCard}`}>
                    <p><b>{t('questionsCard')}</b></p>
                    {question.questions?.map((q, index) => {
            const isCurrent = index === current;
            const isAnswered = !!answers[q.id];

            // تحديد الكلاس المناسب بناءً على حالة السؤال الحالية لمنع التضارب
            let itemClass = style.qItem;
            if (isCurrent && isAnswered) {
                itemClass += ` ${style.activeAndAnswered}`;
            } else if (isCurrent) {
                itemClass += ` ${style.active}`;
            } else if (isAnswered) {
                itemClass += ` ${style.answeredQ}`;
            }

            return (
                <div
                    key={q.id}
                    className={itemClass}
                    onClick={() => setCurrent(index)}
                >
                    {index + 1}
                </div>
            );
        })}
                    <br />

                    <p className={style.progressText}>
                        {answeredCount} / {question.questions?.length} {t('answeredLabel')}
                    </p>
                    <div className={style.progressContainer}>
                        <div className={style.progressBar} style={{ width: `${progress}%` }}></div>
                    </div>
                    <hr style={{ color: "#4E6A54" }} />
                    <div className={style.item}>
                        <div className={style.current}></div>
                        <p>{t('current')}</p>
                    </div>

                    <div className={style.item}>
                        <div className={style.answered}></div>
                        <p>{t('answered')}</p>
                    </div>

                    <div className={style.item}>
                        <div className={style.notAnswered}></div>
                        <p>{t('notAnswered')}</p>
                    </div>

                    <div className={style.submitContainer} onClick={handleFinish}>
                        <button className={style.submit} > {t('finish')} </button>
                    </div>
                </div>
            </div>
        </div>
    );
}