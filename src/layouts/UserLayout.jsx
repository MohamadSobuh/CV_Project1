import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function UserLayout({ user, language, setLanguage }) {
    const { pathname } = useLocation();
    const isQuizActive = pathname === "/user/initalAssQuiz" || pathname === "/user/quiz";

    return (
        <div>
            {!isQuizActive && <Sidebar language={language} />}
            <div>
                {!isQuizActive && (
                    <Header user={user} language={language} setLanguage={setLanguage} />
                )}
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
