import React, { useState } from 'react';
import style from "./UserProfile.module.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import profileImg from "../../images/profileImg.png";
import { useUserFlow } from '../../context/UserFlowContext';
import axios from "axios";


export default function UserProfile({ t, language }) {
    const navigate = useNavigate();
    const { user } = useUserFlow();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const profile = user || {};
    const handleDeleteAccount = async () => {
        const token = localStorage.getItem("accessToken");
        if (!token || token === "undefined") {
            alert("انتهت جلسة التسجيل، يرجى تسجيل الدخول مجدداً");
            navigate("/login");
            return;
        }
        if (window.confirm("Are you sure you want to delete your account?")) {
            await axios.delete("http://127.0.0.1:8000/api/user/profile/delete/", { headers: { Authorization: `Token ${token}` } });
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
            navigate("/login");
        }
    };
    if (!t) return <div className="text-center p-5">Loading...</div>;
    if (!user) return <div className="text-center p-5">Loading profile...</div>;
    return (
        <div className={language === 'ar' ? style.fullAr : style.fullEn}>
            <div className={style.bgGrid} />

            <div className={style.profile}>
                <div className={style.center}>
                    <img src={profile.image || profileImg} alt="Profile" className={`${style.imgProfile} rounded-circle`} />
                </div>

                <form>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label className={style.text}><b>{t('firstNameLabel')}</b></label>
                            <div className="form-control bg-light">{profile.firstname}</div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className={style.text}><b>{t('lastNameLabel')}</b></label>
                            <div className="form-control bg-light">{profile.lastname}</div>
                        </div>
                    </div>

                    <div className="form-group mt-3">
                        <label className={style.text}><b>{t('emailLabel')}</b></label>
                        <div className="form-control bg-light">{profile.email}</div>
                    </div>

                    <div className="form-group mt-3">
                        <label className={style.text}><b>{t('fieldLabel')}</b></label>
                        <div className="form-control bg-light">{profile.field}</div>
                    </div>
                </form>

                <Link to="edit" className="alert alert-info w-100 mt-4 p-2 d-flex align-items-center justify-content-center text-decoration-none">
                    <FaEdit className="me-2" /> <b>{t('edit')}</b>
                </Link>
                <hr className={style.hr} />
                <button
                    type="button"
                    className='alert alert-danger w-100 p-2 d-flex align-items-center justify-content-center'
                    onClick={() => setShowDeleteModal(true)}
                >
                    <FaTrash className="me-2" /> <b>{t('delete')}</b>
                </button>

                {showDeleteModal && (
                    <div className={style.modalOverlay}>
                        <div className={style.modalBox}>

                            <h3 className={style.modalTitle}>
                                {language === "ar" ? "تحذير!" : "Warning!"}
                            </h3>

                            <p className={style.modalText}>
                                {language === "ar"
                                    ? "هل أنت متأكد أنك تريد حذف الحساب؟"
                                    : "Are you sure you want to delete your account?"}
                            </p>

                            <div className={style.modalButtons}>

                                <button
                                    className={style.cancelBtn}
                                    onClick={() => setShowDeleteModal(false)}
                                >
                                    {language === "ar" ? "إلغاء" : "Cancel"}
                                </button>

                                <button
                                    className={style.deleteBtn}
                                    onClick={() => {
                                        console.log("Deleted");
                                        setShowDeleteModal(false);
                                    }}
                                >
                                    {language === "ar" ? "نعم، احذف" : "Yes, Delete"}
                                </button>

                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}