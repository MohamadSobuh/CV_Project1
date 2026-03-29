import style from "./AdminSidebar.module.css";
import { Link } from "react-router-dom";
import { FaThLarge, FaUsers, FaBookOpen, FaListUl, FaQuestionCircle, FaCog, FaSignOutAlt, FaBars } from "react-icons/fa";
import Admin from "../images/Admin.jpg";
import translations from "../locales/translations";
import { useState, useEffect } from 'react';
export default function AdminSidebar({ language }) {

    const [userImg, setUserImg] = useState({ image: "" });
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setUserImg({
            image: Admin
        });
    }, []);

    const t = translations[language];

    return (
        <>
            <button
                className={`${style.menuBtn} ${language === 'ar' ? style['menuBtn-rtl'] : ''}`}
                onClick={() => setOpen(!open)}
            >
                <FaBars />
            </button>

            <nav className={`${style.nav} ${language === 'ar' ? style['nav-rtl'] : ''} ${open ? style.navOpen : ''}`}
            >

                <Link to="/" className="style.center">
                    <img src={userImg.image} alt="adminImg" className={`${style.adimnImg} rounded-circle`} />
                </Link>

                <Link className={style.links} to="/admin/dashboard">
                    <FaThLarge className="m-3" />{t.dash}
                </Link>

                <Link className={style.links} to="/admin/users">
                    <FaUsers className="m-3" />{t.user}
                </Link>

                <Link className={style.links} to="/admin/topics">
                    <FaBookOpen className="m-3" />{t.topic}
                </Link>

                <Link className={style.links} to="/admin/tasks">
                    <FaListUl className="m-3" />{t.task}
                </Link>

                <Link className={style.links} to="/admin/quiz">
                    <FaQuestionCircle className="m-3" />{t.quiz}
                </Link>

                <div className={style.bottomLinks}>
                    <hr />

                    <Link className={style.links} to="/admin/settings">
                        <FaCog className="m-3" />{t.setting}
                    </Link>

                    <Link className={`${style.links} ${style.logout}`} to="/">
                        {t.logout}<FaSignOutAlt className="m-3" />
                    </Link>
                </div>

            </nav>
        </>
    );
}
