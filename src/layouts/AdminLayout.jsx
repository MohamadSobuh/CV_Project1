import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import Header from "./Header";
export default function AdminLayout({ language, setLanguage }) {
    return (
        <div>
            <AdminSidebar language={language} />
            <div>
                <Header language={language} setLanguage={setLanguage} />
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}