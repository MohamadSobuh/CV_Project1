import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Header from './components/header'
import UserProfile from './components/UserProfile'
import { useState, useEffect } from "react";
import Signup from './components/Signup';
import Signin from './components/Signin';
import Home from './components/Home';

export default function App() {
  const [language, setLanguage] = useState("en");
  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  return (
    <div>

      {/* <Signin/> */}
      {/* <Sidebar language={language} />*/}
      {/* <Header language={language} setLanguage={setLanguage} /> */}

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Signin />} />
        {/* <Route path='/' element={<UserDashboard />}></Route>  */}
        {/* <Route path='/profile' element={<UserProfile language={language} />}></Route> */}
        {/*<Route path="/upload" element={<UploadCV />} /> */}
        {/* <Route path='/history' element={<UserHistory />}></Route> */}
        {/* <Route path='/plan' element={<UserPlan />}></Route> */}
      </Routes>

    </div >
  )
}

