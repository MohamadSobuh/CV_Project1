import style from "./SidebarAdminUser.module.css";
import { NavLink, Link } from "react-router-dom";
import { FaThLarge, FaUsers, FaBookOpen, FaListUl, FaQuestionCircle, FaCog, FaSignOutAlt, FaBars , FaTimes} from "react-icons/fa";
import Admin from "../images/Admin.jpg";
import { useTranslation } from "react-i18next";

import { useState, useEffect } from 'react';
export default function AdminSidebar({ language }) {

    const [userImg, setUserImg] = useState({ image: "" });
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setUserImg({
            image: Admin
        });
    }, []);

    const { t, i18n } = useTranslation();


    return (
        <>
            <button
                className={`${style.menuBtn} ${language === 'ar' ? style['menuBtn-rtl'] : ''}`}
                onClick={() => setOpen(!open)}
            >
                {open ? <FaTimes /> : <FaBars />}
            </button>

            <nav className={`${style.nav} ${language === 'ar' ? style['nav-rtl'] : ''} ${open ? style.navOpen : ''}`}
            >

                <Link to="/" className="style.center">
                    <img src={userImg.image} alt="adminImg" className={`${style.adimnImg} rounded-circle`} />
                </Link>

                <NavLink className={({ isActive }) => `${style.links} ${isActive ? style.activeLink : ''}`} to="/admin/dashboard">
                    <FaThLarge className="m-3" />{t('dash')}
                </NavLink>

                <NavLink className={({ isActive }) => `${style.links} ${isActive ? style.activeLink : ''}`} to="/admin/users">
                    <FaUsers className="m-3" />{t('user')}
                </NavLink>

                <NavLink className={({ isActive }) => `${style.links} ${isActive ? style.activeLink : ''}`} to="/admin/topics">
                    <FaBookOpen className="m-3" />{t('topic')}
                </NavLink>

                <NavLink className={({ isActive }) => `${style.links} ${isActive ? style.activeLink : ''}`} to="/admin/tasks">
                    <FaListUl className="m-3" />{t('task')}
                </NavLink>

                <NavLink className={({ isActive }) => `${style.links} ${isActive ? style.activeLink : ''}`} to="/admin/quiz">
                    <FaQuestionCircle className="m-3" />{t('quiz')}
                </NavLink>

                <div className={style.bottomLinks}>
                    <hr />

                    <NavLink className={({ isActive }) => `${style.links} ${isActive ? style.activeLink : ''}`} to="/admin/settings">
                        <FaCog className="m-3" />{t('setting')}
                    </NavLink>

                    <Link className={`${style.links} ${style.logout}`} to="/">
                        {t('logout')}<FaSignOutAlt className="m-3" />
                    </Link>
                </div>

            </nav>
        </>
    );
}
