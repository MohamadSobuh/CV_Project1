import { createContext, useState, useContext } from 'react';

const UserFlowContext = createContext();

export const UserFlowProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [history, setHistory] = useState([]);
  const [targetField, setTargetField] = useState('');
  const [analysisResult, setAnalysisResult] = useState({DesCV : "", strengths: [{ skill: "", description: "" }], weaknesses: [{ skill: "", description: "" }], score: 0 });
  const [placementScore, setPlacementScore] = useState(0);

  return (
    <UserFlowContext.Provider value={{
      userId,setUserId,
      history, setHistory,
      targetField, setTargetField,
      analysisResult,setAnalysisResult,
      placementScore,setPlacementScore
    }}>
      {children}
    </UserFlowContext.Provider>
  );
};

export const useUserFlow = () => useContext(UserFlowContext);