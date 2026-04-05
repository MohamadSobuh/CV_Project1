import style from "./SidebarAdminUser.module.css";
import { Link } from "react-router-dom";
import { FaUpload, FaHistory, FaClipboardList, FaSignOutAlt, FaBars  , FaThLarge} from "react-icons/fa";
import logo from "./../images/logo.png";
import translations from "../locales/translations";
import { useState } from 'react';

export default function Sidebar({ language }) {
  const [open, setOpen] = useState(false);


  const t = translations[language];

  return (

    <>

      <button
        className={`${style.menuBtn} ${language === 'ar' ? style['menuBtn-rtl'] : ''}`}
        onClick={() => setOpen(!open)}
      >
        <FaBars />
      </button>
      <nav className={`${style.nav} ${language === "ar" ? style['nav-rtl'] : ''} ${open ? style.navOpen : ''}`}>
        <img src={logo} alt="logo" className={`${style.logo}`} />

        <Link className={`${style.links}`} to="/user/dashboard"> <FaThLarge className="m-3" />{t.dash}</Link>
        <Link className={`${style.links}`} to="/user/upload"> <FaUpload className="m-3" />{t.upload}</Link>
        <Link className={`${style.links}`} to="/user/analysisHistory"> <FaHistory className="m-3" />{t.history}</Link>
        <Link className={`${style.links}`} to="/plan"> <FaClipboardList className="m-3" />{t.plan}</Link>
        <div className={style.bottomLinks}>
          <div className={style.bottomLinks}>
            <Link className={`${style.links} ${style.logout}`} to="/">
              {t.logout}
              <FaSignOutAlt className="m-3" />
            </Link>
          </div>
        </div>
      </nav>

    </>
  );
}


