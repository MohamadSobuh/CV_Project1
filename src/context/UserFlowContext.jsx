import { createContext, useState, useContext, useEffect } from 'react';
import profileImg from '../images/profileImg.png';
import api from '../utils/axios';

const UserFlowContext = createContext({
  uploadedCV: null,
  setUploadedCV: () => { },
  targetField: '',
  setTargetField: () => { },
});

export const UserFlowProvider = ({ children }) => {
  const [userId, setUserId] = useState(() => localStorage.getItem("userId") || null);
  const [history, setHistory] = useState([]);
  const [targetField, setTargetField] = useState('');
  const [analysisResult, setAnalysisResult] = useState({ DesCV: "", strengths: [{ skill: "", description: "" }], weaknesses: [{ skill: "", description: "" }], score: 0 });
  const [placementScore, setPlacementScore] = useState(0);
  const [topics, setTopics] = useState([]);
  const [cvId, setCvId] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Fetch user profile from API on mount and keep context in sync
    const ensureAuth = () => {
        const token = localStorage.getItem("accessToken");
        if (!token || token === "undefined") {
            navigate("/login", {
                state: {
                    message: language === "ar" ? "انتهت جلسة التسجيل، يرجى تسجيل الدخول مجدداً" : "Session expired, please log in again",
                    type: "error"
                }
            });
            return false;
        }
        return true;
    };
  useEffect(() => {
    const fetchUser = async () => {
        if (!ensureAuth()) return;
      try {
        const response = await api.get('/userr/profile/');
        const data = response.data;
        // Normalise image: backend may return a URL or nothing
        if (!data.image) data.image = profileImg;
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
      } catch (err) {
        console.error('Failed to fetch user profile:', err);
      }
    };
    fetchUser();
  }, []);

  return (
    <UserFlowContext.Provider value={{
      userId, setUserId,
      user, setUser,
      history, setHistory,
      targetField, setTargetField,
      analysisResult, setAnalysisResult,
      placementScore, setPlacementScore,
      topics, setTopics,
      activeTask, setActiveTask,
      cvId, setCvId,
    }}>
      {children}
    </UserFlowContext.Provider>
  );
};

export const useUserFlow = () => useContext(UserFlowContext);