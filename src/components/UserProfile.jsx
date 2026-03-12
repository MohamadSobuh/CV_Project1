import React, { useEffect, useState } from 'react'
import profileImg from "./../images/profileImg.PNG";
import style from "./UserProfile.module.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import translations from '../locales/translations';

export default function UserProfile({ language }) {
    const [user, setUser] = useState({ firstname: "", lastname: "", email: "", field: "", image: "" });
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({})
    useEffect(() => {
        setUser({
            firstname: "Israa",
            lastname: "Shtaiwi",
            email: "isrash@gmail.com",
            field: "Artificial Intelligence",
            image: profileImg
        });
    }, []);



    const t = translations[language];

    const handelEditButton = () => {
        setIsEditing(true)
        setFormData(user)

    }
    const handelChange = (e) => {
        console.log(e)
        setFormData({ ...formData, [e.target.name]: e.target.value })

    }
    const handelSave = () => {
        setUser(formData)
        setIsEditing(false)

    }


    return (

        <div className={`${style.full}`}>
            <div className={style.profile}>
                <div className={`${style.center}`}>
                    <img src={user.image} alt="Profile" className={`${style.imgProfile} rounded-circle `} />
                    {isEditing ? (
                        <p className={style.text}>{t.description}</p>
                    ) : <></>}
                </div>



                {!isEditing ? (
                    <>
                        <form>
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <label className={style.text}>
                                        <b>{t.firstNameLabel}</b>
                                    </label>
                                    <div className="form-control bg-light">
                                        {user.firstname}
                                    </div>
                                </div>

                                <div className="form-group col-md-6">
                                    <label className={style.text}>
                                        <b>{t.lastNameLabel}</b>
                                    </label>
                                    <div className="form-control bg-light">
                                        {user.lastname}
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className={style.text}>
                                    <b>{t.emailLabel}</b>
                                </label>
                                <div className="form-control bg-light">
                                    {user.email}
                                </div>
                            </div>

                            <div className="form-group">
                                <label className={style.text}>
                                    <b>{t.fieldLabel}</b>
                                </label>
                                <div className="form-control bg-light">
                                    {user.field}
                                </div>
                            </div>
                        </form>
                        <button
                            type='button'
                            className="alert alert-info w-100 mt-4 p-2"
                            onClick={handelEditButton}
                        >
                            <FaEdit className="me-3" />
                            <b>{t.edit}</b>
                        </button>
                        <hr className={`${style.hr}`} />
                        <button className='alert alert-danger w-100 p-2' > <FaTrash className="me-3" /> <b>{t.delete}</b></button>
                    </>
                ) : (
                    <form method='POST'>
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

                        <div className='form-group'>
                            <label className={style.text}><b>{t.emailLabel}</b></label>
                            <input type="email" name='email' className='form-control' value={formData.email} onChange={handelChange} />
                        </div>

                        <div className='form-group'>
                            <label className={style.text}><b>{t.fieldLabel}</b></label>
                            <select name='field' className='form-control' value={formData.field} onChange={handelChange}>
                                <option value={user.field}>{user.field}</option>
                            </select>
                        </div>

                        <div className='form-group'>
                            <label className={style.text}><b>{t.passwordLabel}</b></label>
                            <input type="password" name='password' className='form-control' onChange={handelChange} />
                        </div>
                        <div className="d-flex gap-2 mt-4 p-2">
                            <button
                                className="btn btn-success w-50"
                                onClick={handelSave}
                            >
                                <b>{t.save}</b>
                            </button>

                            <button
                                type='button'
                                className="btn btn-secondary w-50"
                                onClick={() => setIsEditing(false)}
                            >
                                <b>{t.cancel}</b>
                            </button>


                        </div>
                        <hr className={`${style.hr}`} />

                    </form>

                )}




            </div>
        </div>
    )
}

