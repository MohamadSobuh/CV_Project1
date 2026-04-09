import style from "./TaskAssQuiz.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import CircularScore from '../../components/ui/CircularScore';
import { useUserFlow } from '../../context/UserFlowContext';
import translations from '../../locales/translations';

export default function QuizResult({ language }) {
        const t = translations[language];

    const navigate = useNavigate();
    const { state } = useLocation();
    const { placementScore } = useUserFlow();
    const score = placementScore;
    return (
        <div className={style.quizResultEn}>
            <CircularScore score={score} />

            <div className={style.card}>
                <div className={style.emoji}>📚</div>
                <h2 className={style.title}><b>{t.quizResultTitle}</b></h2>
                <p className={style.description}> {t.descriptionQuizResult}</p>
            </div>

            <div className={style.buttons}>
                <button className={style.planBtn} onClick={() => navigate('/user/plan')}>
                    <b>{t.viewPlan}</b>
                </button>
                <button className={style.dashBtn} onClick={() => navigate('/user/dashboard')}>
                    {t.dash}
                </button>
            </div>
        </div>
    );
}