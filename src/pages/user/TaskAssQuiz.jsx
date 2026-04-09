import React, { useState } from 'react'
import style from "./TaskAssQuiz.module.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserFlow } from '../../context/UserFlowContext';
import translations from '../../locales/translations';

export default function TaskAssQuiz({ language }) {
    const navigate = useNavigate();
    const t = translations[language];

    const questions = [
        {
            id: 1,
            question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit .?",
            correctAnswer: "B",
            options: [
                { id: "A", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ." },
                { id: "B", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ." },
                { id: "C", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ." },
                { id: "D", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ." }
            ],
            mark: 10,
            skill: "JavaScript"
        },
        {
            id: 2,
            question: "Which hook is used to manage state?",
            correctAnswer: "B",
            options: [
                { id: "A", text: "useEffect" },
                { id: "B", text: "useState" },
                { id: "C", text: "useMemo" },
                { id: "D", text: "useRef" }
            ],
            mark: 10,
            skill: "JavaScript"
        },
        {
            id: 3,
            question: "Which hook is used to manage state?",
            correctAnswer: "B",
            options: [
                { id: "A", text: "useEffect" },
                { id: "B", text: "useState" },
                { id: "C", text: "useMemo" },
                { id: "D", text: "useRef" }
            ]
            , mark: 10,
            skill: "JavaScript"
        },
        {
            id: 4,
            question: "Which hook is used to manage state?",
            correctAnswer: "B",
            options: [
                { id: "A", text: "useEffect" },
                { id: "B", text: "useState" },
                { id: "C", text: "useMemo" },
                { id: "D", text: "useRef" }
            ],
            mark: 10,
            skill: "JavaScript"
        },
        {
            id: 5,
            question: "Which hook is used to manage state?",
            correctAnswer: "B",
            options: [
                { id: "A", text: "useEffect" },
                { id: "B", text: "useState" },
                { id: "C", text: "useMemo" },
                { id: "D", text: "useRef" }
            ],
            mark: 10,
            skill: "JavaScript"
        }
    ];

    /* رح نستخدم هدول بالربط بدل الاسئلة الفيك 
    const { state } = useLocation();
    const weaknesses = state?.weaknesses || [];
    const [question, setQuestions] = useState([]);
    useEffect(() => {
    
        fetchQuestions(weaknesses).then(setQuestions);
    }, []);
 */

    const weaknesses = [...new Set(questions.map(q => q.skill))];
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState({});

    const answeredCount = Object.keys(answers).length;
    const progress = (answeredCount / questions.length) * 100;

    const currentQuestion = questions[current];

    const handleSelect = (optionId) => {
        setAnswers({
            ...answers,
            [currentQuestion.id]: optionId
        });
    };

    const next = () => {
        if (current < questions.length - 1) {
            setCurrent(current + 1);
        }
    };

    const prev = () => {
        if (current > 0) {
            setCurrent(current - 1);
        }
    };

    const { setPlacementScore } = useUserFlow();

    function handleFinish() {
        let totalMarks = 0;
        let earnedMarks = 0;

        questions.forEach(question => {
            totalMarks += question.mark;

            if (answers[question.id] === question.correctAnswer) {
                earnedMarks += question.mark;
            }
        });

        const percentage = (earnedMarks / totalMarks) * 100;
        setPlacementScore(percentage);
        navigate('/user/quizResult', {
            state: {
                score: percentage,
            }
        });
    }

    return (
        <div className={language === 'ar' ? style.taskAssQuizAr : style.taskAssQuiz} >
            <h1><b>{t.titleQuizPage}</b></h1>

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
                        <button className={style.prev} onClick={prev}> <FaArrowLeft /> {t.prev} </button>
                        <button className={style.next} onClick={next}>{t.next} <FaArrowRight /> </button>
                    </div>
                </div>

                <div className={`col-md-3 ${style.qCard}`}>
                    <p><b>{t.questionsCard}</b></p>
                    {questions.map((q, index) => (
                        <div
                            key={q.id}
                            className={`
            ${style.qItem}
            ${index === current ? style.active : ""}
            ${answers[q.id] ? style.answeredQ : ""}
        `}
                            onClick={() => setCurrent(index)}
                        >
                            {index + 1}
                        </div>
                    ))}
                    <br />

                    <p className={style.progressText}>
                        {answeredCount} / {questions.length} {t.answeredLabel}
                    </p>
                    <div className={style.progressContainer}>
                        <div className={style.progressBar} style={{ width: `${progress}%` }}></div>
                    </div>
                    <hr style={{ color: "#4E6A54" }} />
                    <div className={style.item}>
                        <div className={style.current}></div>
                        <p>{t.current}</p>
                    </div>

                    <div className={style.item}>
                        <div className={style.answered}></div>
                        <p>{t.answered}</p>
                    </div>

                    <div className={style.item}>
                        <div className={style.notAnswered}></div>
                        <p>{t.notAnswered}</p>
                    </div>

                    <div className={style.submitContainer} onClick={handleFinish}>
                        <button className={style.submit} > {t.finish} </button>
                    </div>
                </div>
            </div>
        </div>
    );
}