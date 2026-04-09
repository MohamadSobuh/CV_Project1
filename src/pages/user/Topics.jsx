import React, { useState } from 'react';
import planEmpty from "../../images/planEmpty.png";
import translations from '../../locales/translations';
import EmptyPage from "../../components/ui/EmptyPage";
import { useNavigate } from "react-router-dom";
import style from "./Topics.module.css";

export default function Topics({ language }) {
    const [planData, setPlanData] = useState([]);
    const t = translations[language];
    const navigate = useNavigate();

    return (
        <div className={language === 'ar' ? style.topicsAr : style.topicsEn}>
            {planData.length === 0 ? (
                <EmptyPage
                    icon={<img src={planEmpty}  width="200" />}
                    title={t.planEmptyTitle}
                    message={t.planEmptyMessage}
                    btnText={t.upload}
                    onClick={() => navigate("/user/upload")}
                />
            ) : (
                <h1>Your Plan</h1>
            )}
        </div>
    );
}