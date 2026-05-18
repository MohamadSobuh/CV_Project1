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
import { useTranslation } from "react-i18next";

import Home from './components/Home';
import UserProfile from './pages/user/UserProfile';
import { useState, useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import UploadCV from './pages/user/UploadCV';
import UserDash from './pages/user/UserDash';
import SessionTimeout from './components/SessionTimeout';

import { UserFlowProvider } from './context/UserFlowContext';
import { AdminFlowProvider } from './context/AdminFlowContext';
import AnalysisReport from './pages/user/AnalysisReport';
import AnalysisHistory from './pages/user/AnalysisHistory';
import TaskAssQuiz from './pages/user/TaskAssQuiz';
import QuizResult from './pages/user/QuizResult';
import Plan from './pages/user/Plan';
import Hero from './components/Hero';
import TaskContent from './pages/user/TaskContent';
import TaskItem from './pages/user/TaskItem';
import AdminTaskContent from './pages/admin/AdminTaskContent';
import EndOfPlan from './pages/user/EndOfPlan';
import EndOfTopic from './pages/user/EndOfTopic';
import ViewTaskContent from './pages/admin/ViewTaskContent';
import Report from './pages/user/Report';
import EditAdminProfile from './pages/admin/EditAdminProfile';
import AdminProfile from './pages/admin/AdminProfile';
import LoadingPage from './pages/user/loadingPage';


export default function App() {
  const [language, setLanguage] = useState(() => localStorage.getItem("language") || "en");
  const { t, i18n } = useTranslation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));


  useEffect(() => {
    i18n.changeLanguage(language);
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language, i18n]);
  return (
    <AdminFlowProvider>
      <UserFlowProvider>

        <div>
          {/* <AdminSidebar language={language} /> */}
          {/* <Signin/> */}
          {/* <Sidebar language={language} />*/}
          {/* <Header language={language} setLanguage={setLanguage} /> */}
          <SessionTimeout />

          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Home language={language} setLanguage={setLanguage} />} />
            <Route path="/login" element={<Signin />} />
            <Route path='/user' element={<UserLayout user={user} language={language} setLanguage={setLanguage} />}>
              <Route path='profile' element={
                <UserProfile t={t} language={language} />
              } />

              <Route path='profile/edit' element={
                <EditProfile
                  t={t}
                  language={language}
                />
              } />

              <Route path='dashboard' element={<UserDash user={user} language={language} />}></Route>
              <Route path='upload' element={<UploadCV language={language} />} />
              <Route path='analysisHistory' element={<AnalysisHistory language={language} />} />
              <Route path='loading' element={<LoadingPage language={language} />} />

              <Route path='analysisReport' element={<AnalysisReport language={language} />} />
              <Route path='quiz' element={<TaskAssQuiz language={language} />} />
              <Route path='quizResult' element={<QuizResult language={language} />} />
              <Route path='plan' element={<Plan language={language} />} />
              <Route path='task' element={<TaskContent language={language} />} />
              <Route path='endPlan' element={<EndOfPlan language={language} />} />
              <Route path='endTopic' element={<EndOfTopic language={language} />} />
              <Route path='report' element={<Report language={language} />} />




            </Route>

            <Route path='/admin' element={<AdminLayout user={user} language={language} setLanguage={setLanguage} />}>
              <Route path='dashboard' element={<AdminDash user={user} language={language} />} />
              <Route path='users' element={<Users language={language} />} />
              <Route path='tasks' element={<Tasks language={language} />} />
              <Route path='editTask' element={<AdminTaskContent language={language} />} />
              <Route path="topics" element={<TopicsPage language={language} />} >
              </Route>
              <Route path="quiz" element={<QuizQuestions language={language} />} />
              <Route path="settings" element={<Settings language={language} />} />
              <Route path='viewTaskContent' element={<ViewTaskContent language={language} />} />
              <Route path='profile' element={
                <AdminProfile t={t} language={language} />
              } />

              <Route path='profile/edit' element={
                <EditAdminProfile
                  t={t}
                  language={language}
                />
              } />
            </Route>
          </Routes>

        </div >
      </UserFlowProvider>
    </AdminFlowProvider>

  )
}