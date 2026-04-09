import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from "./Settings.module.css";
import SettingsCard from "../../components/ui/SettingsCard";
import { FaGlobe, FaLock, FaSave } from "react-icons/fa";
import translations from "../../locales/translations";
const Settings = ({ language = 'en' }) => {
    const t = translations[language];
    const navigate = useNavigate();

    const [siteSettings, setSiteSettings] = useState({
        siteName: "CVision",
        defaultLanguage: "en"
    });

    const [securitySettings, setSecuritySettings] = useState({
        sessionTimeout: 30,
        twoFactorAuth: false
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            const token = localStorage.getItem("accessToken");
            if (!token || token === "undefined") {
                navigate("/login");
                return;
            }
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/dashboard/settings/", {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });
                console.log(response.data, "response");

                if (response.data) {
                    setSiteSettings(prev => ({
                        ...prev,
                        siteName: response.data.siteName || response.data.site_name || prev.siteName,
                        defaultLanguage: response.data.defaultLanguage || response.data.default_language || prev.defaultLanguage
                    }));

                    setSecuritySettings(prev => ({
                        ...prev,
                        sessionTimeout: response.data.sessionTimeout || response.data.session_timeout || prev.sessionTimeout,
                        twoFactorAuth: response.data.twoFactorAuth !== undefined ? response.data.twoFactorAuth : (response.data.two_factor_auth !== undefined ? response.data.two_factor_auth : prev.twoFactorAuth)
                    }));
                }
            } catch (error) {
                console.error("Error fetching settings:", error.response?.data || error);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, [navigate]);

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

    const handleSave = async () => {
        const token = localStorage.getItem("accessToken");
        if (!token || token === "undefined") {
            navigate("/login");
            return;
        }
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/dashboard/settings/", { ...siteSettings, ...securitySettings }, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            console.log(response.data, "response");
        } catch (error) {
            console.error("Error updating settings:", error.response?.data || error);
        }
        console.log("Saving Settings:", { ...siteSettings, ...securitySettings });
        alert(language === 'ar' ? "تم حفظ الإعدادات بنجاح!" : "Settings saved successfully!");
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                <div className="spinner-border" style={{ color: '#082F43' }} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className={language === 'ar' ? style.settingsPageAr : style.settingsPage} dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <div className="row align-items-center mb-4">
                <div className='col-md-6'>
                    <h1 className="fw-bold" style={{ color: '#082F43' }}>{t.settingsTitle}</h1>
                    <p style={{ color: '#546e7a' }}>{t.settingsSub}</p>
                </div>
                <div className={`col-md-6 ${language === 'ar' ? 'text-start' : 'text-end'}`}>
                    <button className={style.btnAdd} onClick={handleSave}>
                        <FaSave className="me-2" /> {t.saveSettings}
                    </button>
                </div>
            </div>

            <div className="row g-4">
                <div className="col-lg-6">
                    <SettingsCard
                        title={t.generalSettings}
                        subTitle={t.generalSettingsSub}
                        icon={FaGlobe}
                    >
                        <div className="mb-3">
                            <label className={style.label}>{t.siteNameLabel}</label>
                            <input
                                type="text"
                                name="siteName"
                                className={`form-control ${style.inputField}`}
                                value={siteSettings.siteName}
                                onChange={handleSiteChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className={style.label}>{t.defaultLanguageLabel}</label>
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
                        title={t.securitySettings}
                        subTitle={t.securitySettingsSub}
                        icon={FaLock}
                    >
                        <div className="mb-3">
                            <label className={style.label}>{t.sessionTimeoutLabel}</label>
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
                                    {t.twoFactorAuth}
                                </h6>
                                <small style={{ fontSize: '0.75rem', color: '#546e7a' }}>
                                    {t.twoFactorDesc}
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