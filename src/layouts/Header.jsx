
import style from "./Header.module.css";
import profileImg from "../images/profileImg.PNG";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Header({ user, language, setLanguage }) {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        document.documentElement.dir = (language || i18n.language) === 'ar' ? 'rtl' : 'ltr';
    }, [language, i18n.language]);
    const storedFirstName = localStorage.getItem("userFirstName") || "Israa";
    const storedLastName = localStorage.getItem("userLastName") || "Shtaiwi";


    const handleLanguageChange = (e) => {
        const newLang = e.target.value;
        i18n.changeLanguage(newLang);
        localStorage.setItem("language", newLang);
        if (setLanguage) {
            setLanguage(newLang);
        }
        console.log("Language changed to:", newLang);
    };

    return (
        <header className={`${style.header}`}>
            <div className={`${style.headerContent}`}>
                <select name='lang' className={`${style.selectLang}`} value={language || i18n.language || 'en'} onChange={handleLanguageChange}>
                    <option value="en">ENG</option>
                    <option value="ar">AR</option>
                </select>
                <Link to="profile">
                    <img src={user?.image} alt="Profile" className={`${style.imgProfile} rounded-circle`} />
                </Link>
                <h6>{storedFirstName} {storedLastName}</h6>
            </div>
        </header>
    )
}