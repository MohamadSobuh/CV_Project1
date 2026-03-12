import style from "./Sidebar.module.css";
import { Link } from "react-router-dom";
import { FaUpload, FaHistory, FaClipboardList, FaSignOutAlt } from "react-icons/fa";
import logo from "./../images/logo.png";
import { useEffect } from "react";
import translations from "../locales/translations";

export default function Sidebar({ language }) {


  const t = translations[language];

  return (
    <nav className={`${style.nav} ${language === "ar" ? style['nav-rtl'] : ''}`}>
      <Link to="/" className="style.center">
        <img src={logo} alt="logo" className={`${style.logo}`} />
      </Link>
      <Link className={`${style.links}`} to="/upload"> <FaUpload className="m-3" />{t.upload}</Link>
      <Link className={`${style.links}`} to="/history"> <FaHistory className="m-3" />{t.history}</Link>
      <Link className={`${style.links}`} to="/plan"> <FaClipboardList className="m-3" />{t.plan}</Link>
      <Link className={`${style.links} ${style.logout}`} to="/home"> {t.logout}<FaSignOutAlt className="m-3" /> </Link>
    </nav>
  );
}


