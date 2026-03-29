import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function UserLayout({ language, setLanguage }) {
    return (
        <div>
            <Sidebar language={language} />
            <div>
                <Header language={language} setLanguage={setLanguage} />
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}