import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import style from "./Report.module.css";
import { FaCloudUploadAlt, FaBolt, FaCheckCircle } from "react-icons/fa";
export default function Report({ language }) {
    const { t, i18n } = useTranslation();
    const [priority, setPriority] = useState("");
    const [screenshot, setScreenshot] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState("");
    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);

        const file = e.dataTransfer.files[0];
        if (file) setScreenshot(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = () => {
        setDragActive(false);
    };
    return (
        <div className={language === 'ar' ? style.reportAr : style.report}>
            <div className={style.support}>{t("supportCenter")}</div>
            <h1><b>{t("reportsFeedback")}</b></h1>
            <p className={style.help}>{t("helpText")}</p>
            <div className={style.contentRow}>
                <div className={style.reportDetails}>
                    <h3><b>{t("reportDetails")}</b></h3>
                    <br />
                    <b>{t("reportPageTitle")}</b>
                    <br />
                    <input
                        type="text"
                        required
                        className={style.reportTitle}
                        placeholder={t("reportTitlePlaceholder")}
                    />                    <br />
                    <b>{t("priorityLevel")}</b>
                    <br />

                    <div className="row justify-content-center align-items-center text-center mt-3">
                        <button onClick={() => setPriority("low")} className={`${style.priorityLevelLow} col-md-3 ${priority === "low" ? style.active : ""}`}>
                            <div className={style.lowCircle}></div>{t("low")}
                        </button>

                        <button onClick={() => setPriority("medium")} className={`${style.priorityLevelMed} col-md-3 ${priority === "medium" ? style.active : ""}`}>
                            <div className={style.medCircle}></div>{t("mediumpriority")}
                        </button>

                        <button onClick={() => setPriority("high")} className={`${style.priorityLevelHigh} col-md-3 ${priority === "high" ? style.active : ""}`}>
                            <div className={style.highCircle}></div>{t("high")}
                        </button>
                    </div>

                    <b>{t("describeIssue")}</b>
                    <textarea
                        placeholder={t("descriptionPlaceholder")}
                        className={`form-control ${style.reportTextarea}`}
                        required
                    ></textarea>
                    <b>{t("uploadScreenshot")}</b>
                    <div
                        className={`${style.dropZone} ${dragActive ? style.activeDrop : ""}`}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                    >
                        {!screenshot ? (
                            <>
                                <FaCloudUploadAlt size={40} className={style.uploadIcon} />
                                <br />
                                <b>{t("dragDropText")}</b>
                                <p>{t("orClick")}</p>
                            </>
                        ) : (
                            <>
                                <FaCheckCircle className={style.successIcon} />
                                <br />
                                <b >{t("uploadSuccess")}</b>
                            </>
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            className={style.hiddenInput}
                            onChange={(e) => setScreenshot(e.target.files[0])}
                        />
                    </div>
                    {error && (
                        <div className={style.errorBox}>
                            {error}
                        </div>
                    )}
                    <button
                        className={style.submit}
                        onClick={() => {
                            if (!document.querySelector('input').value || !document.querySelector('textarea').value) {
                                setError(t("errorRequiredFields")); 
                                return;
                            }

                            setError("");
                        }}
                    >
                        {t("submitReport")}
                    </button>
                </div>
                <div className={style.sideColumn}>

                    <div className={style.tipsBox}>
                        <h3><b>{t("helpfulTips")}</b></h3>
                        <br />
                        <ul>
                            <li>{t("helpfulTip1")}</li>
                            <li>{t("helpfulTip2")}</li>
                            <li>{t("helpfulTip3")}</li>
                        </ul>

                    </div>

                    <div className={style.urgentBox}>
                        <h4> <FaBolt className={style.boltIcon} />  {t("urgentIssues")} </h4>
                        <p> {t("urgentText")}  </p>
                    </div>
                </div>

            </div>

        </div>
    )
}
