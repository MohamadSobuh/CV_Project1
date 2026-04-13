import React from 'react';
import style from "./UserProfile.module.css";
import { FaSave, FaTimes } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export default function EditProfile({ formData, t, user, handelChange, handelSave }) {
    const navigate = useNavigate();

    const onSave = () => {
        handelSave();
        console.log(formData);
        navigate('/user/profile');
    };

    if (!formData || !t) return <div className="text-center p-5">Loading...</div>;

    return (
        <div className={style.full}>
            <div className={style.profile}>
                <div className={style.center}>
                    <img src={user?.image} alt="Profile" className={`${style.imgProfile} rounded-circle`} />
                    <p className={style.text}>{t.description}</p>
                </div>

                <form onSubmit={(e) => e.preventDefault()}>
                    <div className='row'>
                        <div className='form-group col-md-6'>
                            <label className={style.text}><b>{t.firstNameLabel}</b></label>
                            <input type="text" name='firstname' className='form-control' value={formData.firstname} onChange={handelChange} />
                        </div>
                        <div className='form-group col-md-6'>
                            <label className={style.text}><b>{t.lastNameLabel}</b></label>
                            <input type="text" name='lastname' className='form-control' value={formData.lastname} onChange={handelChange} />
                        </div>
                    </div>

                    <div className='form-group mt-3'>
                        <label className={style.text}><b>{t.emailLabel}</b></label>
                        <input type="email" name='email' className='form-control' value={formData.email} onChange={handelChange} />
                    </div>

                    <div className='form-group mt-3'>
                        <label className={style.text}><b>{t.fieldLabel}</b></label>
                        <select name='field' className='form-control' value={formData.field} onChange={handelChange}>
                            <option value="Artificial Intelligence">Artificial Intelligence</option>
                            <option value="Software Engineering">Software Engineering</option>
                            <option value="Data Science">Data Science</option>
                        </select>
                    </div>

                    <div className='form-group mt-3'>
                        <label className={style.text}><b>{t.passwordLabel}</b></label>
                        <input type="password" name='password' className='form-control' placeholder="********" onChange={handelChange} />
                    </div>

                    <div className="d-flex gap-2 mt-4 p-2">
                        <button type="button" className="alert alert-danger w-50" onClick={onSave}>
                            <b>{t.save}</b>
                        </button>
                        <button type='button' className="alert alert-success w-50" onClick={() => navigate(-1)}>
                            <b>{t.cancel}</b>
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}