import AdminLayout from './layouts/AdminLayout';
import UserLayout from './layouts/UserLayout';
import AdminSidebar from './layouts/AdminSidebar';
import Sidebar from './layouts/Sidebar';
import Header from './layouts/Header';

import Signin from './pages/auth/Signin';
import Signup from './pages/auth/Signup';

import AdminDash from './pages/admin/AdminDash';
import Users from './pages/admin/Users';
import Tasks from './pages/admin/Tasks';
import TopicsPage from './pages/admin/TopicsPage';
import QuizQuestions from './pages/admin/QuizQuestions';
import Settings from './pages/admin/Settings';
import EditProfile from './pages/user/EditProfile';
import ProfileContainer from './pages/user/ProfileContainer';
import translations from './locales/translations';
import profileImg from "./images/profileImg.png";
import Home from './components/Home';
import UserProfile from './pages/user/UserProfile';
import { useState, useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import UploadCV from './pages/user/UploadCV';
import UserDash from './pages/user/UserDash';

import { UserFlowProvider } from './context/UserFlowContext';
import AnalysisReport from './pages/user/AnalysisReport';
import AnalysisHistory from './pages/user/AnalysisHistory';
import TaskAssQuiz from './pages/user/TaskAssQuiz';
import QuizResult from './pages/user/QuizResult';
import Topics from './pages/user/Topics';
import Hero from './components/Hero';

export default function App() {
  const [language, setLanguage] = useState("en");
  const [user, setUser] = useState(null);
  const t = translations[language];
  useEffect(() => {

    setUser({
      firstname: "Israa",
      lastname: "Shtaiwi",
      email: "isrash@gmail.com",
      field: "Artificial Intelligence",
      image: profileImg
    });
  }, []);

  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  return (
    <UserFlowProvider>

      <div>
        {/* <AdminSidebar language={language} /> */}
        {/* <Signin/> */}
        {/* <Sidebar language={language} />*/}
        {/* <Header language={language} setLanguage={setLanguage} /> */}


        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home language={language} setLanguage={setLanguage} />} />
          <Route path="/login" element={<Signin />} />
          <Route path='/user' element={<UserLayout language={language} setLanguage={setLanguage} />}>
            <Route path='profile' element={
              <ProfileContainer>
                <UserProfile user={user} t={t} language={language}/>
              </ProfileContainer>
            } />

            <Route path='profile/edit' element={
              <ProfileContainer user={user} setUser={setUser}>
                {(profileProps) => (
                  <EditProfile
                    user={user}
                    t={t}
                    formData={profileProps.formData}
                    handelChange={profileProps.handelChange}
                    handelSave={profileProps.handelSave}
                  />
                )}
              </ProfileContainer>
            } />

            <Route path='dashboard' element={<UserDash language={language} />}></Route>
            <Route path='upload' element={<UploadCV language={language} />} />
            <Route path='analysisHistory' element={<AnalysisHistory language={language} />} />
            <Route path='analysisReport' element={<AnalysisReport language={language} />} />
            <Route path='quiz' element={<TaskAssQuiz language={language} />} />
            <Route path='quizResult' element={<QuizResult language={language} />} />
            <Route path='plan' element={<Topics language={language} />} />


          </Route>

          <Route path='/admin' element={<AdminLayout language={language} setLanguage={setLanguage} />}>
            <Route path='dashboard' element={<AdminDash language={language} />} /> {/* ستفتح عند طلب /admin مباشرة */}
            <Route path='users' element={<Users language={language} />} />
            <Route path='tasks' element={<Tasks language={language} />} />
            <Route path="topics" element={<TopicsPage language={language} />} >
            </Route>
            <Route path="quiz" element={<QuizQuestions language={language} />} />
            <Route path="settings" element={<Settings language={language} />} />
          </Route>
        </Routes>

      </div >
    </UserFlowProvider>

  )
}
