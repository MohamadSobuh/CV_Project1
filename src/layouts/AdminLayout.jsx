import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
export default function AdminLayout({ language, setLanguage }) {
    return (
        <div>
            <AdminSidebar language={language} />
            <div>
                <AdminHeader language={language} setLanguage={setLanguage} />
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}