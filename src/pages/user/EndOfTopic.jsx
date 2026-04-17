import style from "./EndOfPlan.module.css";
import { FaCheckCircle, FaMedal } from "react-icons/fa";
import translations from '../../locales/translations';
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function EndOfTopic({ language }) {
    const t = translations[language];
    const location = useLocation();
    const data = location.state;
    return (
        <div className={language === 'ar' ? style.endPlanAr : style.endPlanEn}>
            <div className={style.card}>
                <div className={style.trophy}>
                    <FaCheckCircle style={{ color: "#fff" }} />
                </div>
                <p className={style.completed}> <FaMedal /><b>{t.topicCompleted}</b></p>
                <div className={style.des}>
                    <p>{t.topicMessage1} <b>{data?.topicTitle || "Topic Name"}</b> </p>
                </div>

                <div className={style.stats}>
                    <div className={style.statBox}>
                        <b>{data
                            ? `${data.completedTasks}/${data.totalTasks}`
                            : "0/0"}</b>
                        <p>{t.tasksCompleted}</p>
                    </div>

                </div>
                <Link to="/user/plan" className={style.toDashOrPlan}>
                    <b>{t.backToPlan}</b>
                </Link>

            </div>
        </div>
    )
}
