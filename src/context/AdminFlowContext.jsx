import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AdminFlowContext = createContext({
  topics: [],
  setTopics: () => { },
  fetchTopics: async () => { },
  loadingTopics: false,
});

export const AdminFlowProvider = ({ children }) => {
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

  return (
    <AdminFlowContext.Provider value={{
      topics, setTopics,
      fetchTopics, loadingTopics
    }}>
      {children}
    </AdminFlowContext.Provider>
  );
};

export const useAdminFlow = () => useContext(AdminFlowContext);
