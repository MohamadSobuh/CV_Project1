import React, { useState, useEffect } from 'react';
import style from "./AdminDash.module.css";
import { FaUsers, FaListUl, FaQuestionCircle } from "react-icons/fa";
import translations from '../../locales/translations';
export default function AdminDash({ language }) {
  const [totalusers, setTotalUsers] = useState(0);
  const [totaltasks, setTotalTasks] = useState(0);
  const [questions, setQuestions] = useState(0);
  const [lastUsers, setLastUsers] = useState([]);


  useEffect(() => {
    const fetchStats = async () => {
      try {

        setTotalUsers(1167);
        setTotalTasks(274);
        setQuestions(2740);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };



    fetchStats();
  }, []);


  useEffect(() => {
    const fetchLatestUsers = async () => {
      try {

        setLastUsers([
          { id: 1, firstName: "Isra", lastName: "Shtaiwi", email: "isra@gmail.com", learningPlan: "Frontend" },
          { id: 2, firstName: "Besan", lastName: "Ashraf", email: "besan@gmail.com", learningPlan: "Backend" },
          { id: 3, firstName: "mohammad", lastName: "Sobuh", email: "mohammad@gmail.com", learningPlan: "Fullstack" }
        ]);

      } catch (err) {
        console.error("Error fetching latest users:", err);
      }
    };

    fetchLatestUsers();
  }, []);

  const t = translations[language];

  return (
    <div className={language === 'ar' ? style.dashArabic : style.dash}>
      <h1>{t.dash}</h1>
      <p>{t.overview}</p>
      <br />
      <div className='row'>
        <div className={`${style.card} col-md-3`}>
          <div>
            <p>{t.totalUsers}</p>
            <b>{totalusers}</b>
          </div>
          <FaUsers className={style.iconStats} style={{ color: "#F1416F", background: "#fce1e6" }} />
        </div>

        <div className={`${style.card} col-md-3`}>
          <div>
            <p>{t.totalTasks}</p>
            <b>{totaltasks}</b>
          </div>
          <FaListUl className={style.iconStats} style={{ color: "#3FB48D", background: "#ccf3e3" }} />
        </div>

        <div className={`${style.card} col-md-3`}>
          <div>
            <p>{t.quizQuestions}</p>
            <b>{questions}</b>
          </div>
          <FaQuestionCircle className={style.iconStats} style={{ color: "#F76D2F", background: "#FEE9DA" }} />
        </div>
      </div>

      <div className={style.lastUsers}>
        <h3>{t.latestUsers}</h3>
        <table className={`${style.tableLastUsers}`}>
          <thead>
            <tr>
              <th>{t.name}</th>
              <th>{t.email}</th>
              <th>{t.learningPlan}</th>
            </tr>
          </thead>

          <tbody>
            {lastUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  <span className={style.planName}>{user.learningPlan}</span>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  )
}








