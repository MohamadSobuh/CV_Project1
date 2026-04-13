import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const UserFlowContext = createContext({
  uploadedCV: null,
  setUploadedCV: () => { },
  targetField: '',
  setTargetField: () => { },
});

export const UserFlowProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [history, setHistory] = useState([]);
  const [targetField, setTargetField] = useState('');
  const [analysisResult, setAnalysisResult] = useState({ DesCV: "", strengths: [{ skill: "", description: "" }], weaknesses: [{ skill: "", description: "" }], score: 0 });
  const [placementScore, setPlacementScore] = useState(0);
  const [topics, setTopics] = useState([])

  return (
    <UserFlowContext.Provider value={{
      userId, setUserId,
      history, setHistory,
      targetField, setTargetField,
      analysisResult, setAnalysisResult,
      placementScore, setPlacementScore,
      topics, setTopics,
    }}>
      {children}
    </UserFlowContext.Provider>
  );
};

export const useUserFlow = () => useContext(UserFlowContext);