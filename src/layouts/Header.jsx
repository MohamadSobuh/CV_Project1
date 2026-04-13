
import style from "./Header.module.css";
import profileImg from "../images/profileImg.PNG";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
export default function Header({ language, setLanguage }) {
    const [user, setUser] = useState({ firstname: "", lastname: "", image: "" });
    useEffect(() => {
        const storedFirstName = localStorage.getItem("userFirstName");
        const storedLastName = localStorage.getItem("userLastName");
        setUser({
            firstname: storedFirstName || "Israa",
            lastname: storedLastName || "Shtaiwi",
            image: profileImg
        });
    }, []);

    return (
        <header className={`${style.header}`}>
            <div className={`${style.headerContent}`}>
                <select name='lang' className={`${style.selectLang}`} value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option value="en">ENG</option>
                    <option value="ar">AR</option>
                </select>
                <Link to="profile">
                    <img src={user.image} alt="Profile" className={`${style.imgProfile} rounded-circle`} />
                </Link>
                <h6>{user.firstname} {user.lastname}</h6>
            </div>
        </header>
    )
}