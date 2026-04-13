import React from 'react';
import { FaCheckCircle, FaCheck } from 'react-icons/fa';
import style from './Plan.module.css';

export default function TaskItem({ task, index, onTaskClick }) {
    if (task.status === 'completed') {
        return (
            <div className={style.taskItemCompleted}>
                <FaCheckCircle style={{ color: "#2db366", fontSize: "2rem" }} />
                <div className={style.completedTaskInfo}>
                    <span className={style.completedTaskTitle}>{task.title}</span>
                    <span className={style.completedSubtext}>
                        <FaCheck size={10} /> Completed
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className={style.taskItemPending}>
            <div className={style.pendingTaskLeft}>
                <div className={style.pendingNumberBadge}>{index + 1}</div>
                <span className={style.pendingTaskTitle}>{task.title}</span>
            </div>
            <button className={style.startBtn} onClick={() => onTaskClick && onTaskClick(task)}>
                Start Learn
            </button>
        </div>
    );
}
