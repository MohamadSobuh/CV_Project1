import { createContext, useState, useContext } from 'react';

const UserFlowContext = createContext();

export const UserFlowProvider = ({ children }) => {
  const [uploadedCV, setUploadedCV] = useState(null);
  const [targetField, setTargetField] = useState('');

  return (
    <UserFlowContext.Provider value={{
      uploadedCV, setUploadedCV,
      targetField, setTargetField
    }}>
      {children}
    </UserFlowContext.Provider>
  );
};

export const useUserFlow = () => useContext(UserFlowContext);