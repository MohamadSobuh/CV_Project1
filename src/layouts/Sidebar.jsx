import style from "./SidebarAdminUser.module.css";
import { Link } from "react-router-dom";
import { FaUpload, FaHistory, FaClipboardList, FaSignOutAlt } from "react-icons/fa";
import logo from "./../images/logo.png";
import translations from "../locales/translations";

export default function Sidebar({ language }) {


  const t = translations[language];

  return (
    <nav className={`${style.nav} ${language === "ar" ? style['nav-rtl'] : ''} ${open ? style.navOpen : ''}`}>
      <Link to="/user/dashboard" className="style.center">
        <img src={logo} alt="logo" className={`${style.logo}`} />
      </Link>
      <Link className={`${style.links}`} to="/user/upload"> <FaUpload className="m-3" />{t.upload}</Link>
      <Link className={`${style.links}`} to="/history"> <FaHistory className="m-3" />{t.history}</Link>
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
  );
}


