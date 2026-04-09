import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const UserFlowContext = createContext({
  uploadedCV: null,
  setUploadedCV: () => { },
  targetField: '',
  setTargetField: () => { },
  topics: [],
  setTopics: () => { },
  fetchTopics: async () => { },
  loadingTopics: false,
});

export const UserFlowProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [history, setHistory] = useState([]);
  const [targetField, setTargetField] = useState('');

  const [topics, setTopics] = useState([]);
  const [loadingTopics, setLoadingTopics] = useState(false);

  const fetchTopics = async () => {
    setLoadingTopics(true);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get("http://127.0.0.1:8000/api/dashboard/topics/", {
        headers: token && token !== "undefined" ? { Authorization: `Token ${token}` } : {}
      });
      setTopics(response.data);
    } catch (err) {
      console.error("Error fetching topics:", err);
    } finally {
      setLoadingTopics(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);
  const [analysisResult, setAnalysisResult] = useState({ DesCV: "", strengths: [{ skill: "", description: "" }], weaknesses: [{ skill: "", description: "" }], score: 0 });
  const [placementScore, setPlacementScore] = useState(0);

  return (
    <UserFlowContext.Provider value={{
      userId, setUserId,
      history, setHistory,
      targetField, setTargetField,
      analysisResult, setAnalysisResult,
      placementScore, setPlacementScore,
      topics, setTopics,
      fetchTopics, loadingTopics
    }}>
      {children}
    </UserFlowContext.Provider>
  );
};

export const useUserFlow = () => useContext(UserFlowContext);