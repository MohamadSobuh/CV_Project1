import React, { useState } from 'react';
import style from "./Settings.module.css";
import SettingsCard from "../../components/ui/SettingsCard"; // خروج مستويين فقط
import { FaGlobe, FaLock, FaSave } from "react-icons/fa";
import translations from "../../locales/translations"; // خروج مستويين فقط
const Settings = ({ language = 'en' }) => {
    const t = translations[language];

    const [siteSettings, setSiteSettings] = useState({
        siteName: "CVision",
        defaultLanguage: "en"
    });

    const [securitySettings, setSecuritySettings] = useState({
        sessionTimeout: 30,
        twoFactorAuth: false
    });

    const handleSiteChange = (e) => {
        const { name, value } = e.target;
        setSiteSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleSecurityChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSecuritySettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSave = () => {
        console.log("Saving Settings:", { ...siteSettings, ...securitySettings });
        // هنا يمكنك إضافة كود Axios لإرسال البيانات للـ Backend (Django)
        alert(language === 'ar' ? "تم حفظ الإعدادات بنجاح!" : "Settings saved successfully!");
    };

    return (
        <div className={language === 'ar' ? style.settingsPageAr : style.settingsPage} dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <div className="row align-items-center mb-4">
                <div className='col-md-6'>
                    <h1 className="fw-bold" style={{ color: '#082F43' }}>{t.settingsTitle || "Settings"}</h1>
                    <p style={{ color: '#546e7a' }}>{t.settingsSub || "Configure system settings"}</p>
                </div>
                <div className={`col-md-6 ${language === 'ar' ? 'text-start' : 'text-end'}`}>
                    <button className={style.btnAdd} onClick={handleSave}>
                        <FaSave className="me-2" /> {t.saveSettings || "Save Changes"}
                    </button>
                </div>
            </div>

            <div className="row g-4">
                <div className="col-lg-6">
                    <SettingsCard
                        title={t.generalSettings || "General Settings"}
                        subTitle={t.generalSettingsSub || "Basic configuration options"}
                        icon={FaGlobe}
                    >
                        <div className="mb-3">
                            <label className={style.label}>{t.siteNameLabel || "Site Name"}</label>
                            <input
                                type="text"
                                name="siteName"
                                className={`form-control ${style.inputField}`}
                                value={siteSettings.siteName}
                                onChange={handleSiteChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className={style.label}>{t.defaultLanguageLabel || "Default Language"}</label>
                            <select
                                name="defaultLanguage"
                                className={`form-select ${style.inputField}`}
                                value={siteSettings.defaultLanguage}
                                onChange={handleSiteChange}
                            >
                                <option value="en">English</option>
                                <option value="ar">العربية</option>
                            </select>
                        </div>
                    </SettingsCard>
                </div>

                <div className="col-lg-6">
                    <SettingsCard
                        title={t.securitySettings || "Security"}
                        subTitle={t.securitySettingsSub || "Security and access settings"}
                        icon={FaLock}
                    >
                        <div className="mb-3">
                            <label className={style.label}>{t.sessionTimeoutLabel || "Session Timeout (minutes)"}</label>
                            <input
                                type="number"
                                name="sessionTimeout"
                                className={`form-control ${style.inputField}`}
                                value={securitySettings.sessionTimeout}
                                onChange={handleSecurityChange}
                            />
                        </div>

                        <div className={`d-flex align-items-center justify-content-between ${style.toggleSection}`}>
                            <div>
                                <h6 className="mb-0 fw-bold" style={{ fontSize: '0.9rem', color: '#082F43' }}>
                                    {t.twoFactorAuth || "Two-Factor Authentication"}
                                </h6>
                                <small style={{ fontSize: '0.75rem', color: '#546e7a' }}>
                                    {t.twoFactorDesc || "Require 2FA for admin accounts"}
                                </small>
                            </div>
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    name="twoFactorAuth"
                                    checked={securitySettings.twoFactorAuth}
                                    onChange={handleSecurityChange}
                                    style={{ cursor: 'pointer', borderColor: '#CFE9EC' }}
                                />
                            </div>
                        </div>
                    </SettingsCard>
                </div>
            </div>
        </div>
    );
};

export default Settings;