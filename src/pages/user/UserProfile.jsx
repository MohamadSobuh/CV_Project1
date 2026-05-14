import React, { useState } from 'react';
import style from "./UserProfile.module.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function UserProfile({ user, t, language }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
  
    if (!user || !t) return <div className="text-center p-5">Loading...</div>;
    return (
        <div className={language === 'ar' ? style.fullAr : style.fullEn}>
            <div className={style.profile}>
                <div className={style.center}>
                    <img src={user.image} alt="Profile" className={`${style.imgProfile} rounded-circle`} />
                </div>

                <form>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label className={style.text}><b>{t('firstNameLabel')}</b></label>
                            <div className="form-control bg-light">{user.firstname}</div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className={style.text}><b>{t('lastNameLabel')}</b></label>
                            <div className="form-control bg-light">{user.lastname}</div>
                        </div>
                    </div>

                    <div className="form-group mt-3">
                        <label className={style.text}><b>{t('emailLabel')}</b></label>
                        <div className="form-control bg-light">{user.email}</div>
                    </div>

                    <div className="form-group mt-3">
                        <label className={style.text}><b>{t('fieldLabel')}</b></label>
                        <div className="form-control bg-light">{user.field}</div>
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