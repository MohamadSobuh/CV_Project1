import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import profileImg from '../images/profileImg.png';

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
  const [activeTask, setActiveTask] = useState(null);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Fetch user profile from API on mount and keep context in sync
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token || token === 'undefined') return;
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user/profile/', {
          headers: { Authorization: `Token ${token}` },
        });
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
    }}>
      {children}
    </UserFlowContext.Provider>
  );
};

export const useUserFlow = () => useContext(UserFlowContext);