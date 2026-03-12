import style from "./Header.module.css";
import profileImg from "./../images/profileImg.PNG";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

export default function Header({ language, setLanguage }) {
    const [user, setUser] = useState({ firstname: "", lastname: "", image: [] });
    useEffect(() => {
        setUser({
            firstname: "Israa",
            lastname: "Shtaiwi",
            image: [profileImg]
        });
    }, []);

    return (
        <header className={`${style.header}`}>
            <div className={`${style.headerContent}`}>
                <select name='lang' className={`${style.selectLang}`} value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option value="en">ENG</option>
                    <option value="ar">AR</option>
                </select>
                <Link to="/profile">
                    <img src={profileImg} alt="Profile" className={`${style.imgProfile} rounded-circle`} />
                </Link>
                <h6>{user.firstname} {user.lastname}</h6>
            </div>
        </header>
    )
}
