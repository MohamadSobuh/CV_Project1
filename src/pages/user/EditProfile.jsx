import React, { useEffect } from 'react';
import style from "./UserProfile.module.css";
import { FaSave, FaTimes } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import profileImg from "../../images/profileImg.png";
import { useUserFlow } from '../../context/UserFlowContext';
import axios from 'axios';
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../components/ui/Input";
import InputError from "../../components/ui/InputError";
import { editProfileSchema } from "../../utils/validationSchema";
import { useForm } from "react-hook-form";
import { useState } from 'react';

export default function EditProfile({ t, language }) {
    const { user, setUser } = useUserFlow();
    const navigate = useNavigate();

    const { register, handleSubmit, reset, setError, formState: { errors } } = useForm({
        resolver: yupResolver(editProfileSchema),
        defaultValues: {
            firstname: user?.firstname || "",
            lastname: user?.lastname || "",
            email: user?.email || "",
            field: user?.field || "Artificial Intelligence",
            password: ""
        }
    });
    const [image, setImage] = useState(user?.image || "");
    const fileInputRef = React.useRef(null);

    useEffect(() => {
        if (user) {
            reset({
                firstname: user.firstname || "",
                lastname: user.lastname || "",
                email: user.email || "",
                field: user.field || "Artificial Intelligence",
                password: ""
            });
        }
    }, [user, reset]);
    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);

            setFormData({ ...formData, image: file });
        }
    };

    const handlePasswordStrength = (e) => {
        const val = e.target.value;
        let strength = 0;

        if (/[A-Z]/.test(val)) strength++;
        if (/[a-z]/.test(val)) strength++;
        if (/\d/.test(val)) strength++;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(val)) strength++;
        if (val.length >= 8) strength++;

        if (val.length === 0) {
            e.target.style.border = "";
        } else if (strength <= 2) {
            e.target.style.border = "2px solid #ff0000";
        } else if (strength === 3 || strength === 4) {
            e.target.style.border = "2px solid #ff8c00";
        } else if (strength === 5) {
            e.target.style.border = "2px solid #07c937";
        }
    };

    const updateProfile = async (data) => {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token || token === "undefined") {
                alert("انتهت جلسة التسجيل، يرجى تسجيل الدخول مجدداً");
                navigate("/login");
                return;
            }

            const payload = { ...data };
            if (!payload.password) {
                delete payload.password;
            }
            else {

                const response = await axios.post(
                    "http://127.0.0.1:8000/api/user/profile/change-password/",
                    payload.password,
                    { headers: { Authorization: `Token ${token}` } }
                );
                console.log(response, "response change password");
            }

            const response = await axios.put(
                "http://127.0.0.1:8000/api/user/profile/update/",
                payload,
                { headers: { Authorization: `Token ${token}` } }
            );

            const updated = { ...response.data, image: response.data.image || profileImg };
            setUser(updated);
            localStorage.setItem("userFirstName", updated.firstname);
            localStorage.setItem("userLastName", updated.lastname);
            localStorage.setItem("userEmail", updated.email);

            alert("Profile updated successfully");
            navigate('/user/profile');
        } catch (err) {
            console.error("Error updating profile:", err);
            if (err.response && err.response.data) {
                const serverErrors = err.response.data;
                Object.keys(serverErrors).forEach((field) => {
                    setError(field, {
                        type: "server",
                        message: serverErrors[field][0]
                    });
                });
            } else {
                alert("Failed to update profile. Please try again.");
            }
        }
    };

    if (!user || !t) return <div className="text-center p-5">Loading...</div>;

    return (
        <div className={language === 'ar' ? style.fullAr : style.fullEn}>
            <div className={style.bgGrid} />

            <div className={style.profile}>
                <div className={style.center}>
                    <img
                        src={image}
                        alt="Profile"
                        className={`${style.imgProfile} rounded-circle`}
                        onClick={handleImageClick}
                        style={{ cursor: "pointer" }}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                    />
                    <p className={style.text}>{t('description')}</p>
                </div>

                <form onSubmit={handleSubmit(updateProfile)}>
                    <div className='row'>
                        <div className='form-group col-md-6 mb-3'>
                            <label className={style.text}><b>{t('firstNameLabel')}</b></label>
                            <Input
                                type="text"
                                name='firstname'
                                register={register}
                            />
                            {errors.firstname && <InputError error={errors.firstname} />}
                        </div>
                        <div className='form-group col-md-6 mb-3'>
                            <label className={style.text}><b>{t('lastNameLabel')}</b></label>
                            <Input
                                type="text"
                                name='lastname'
                                register={register}
                            />
                            {errors.lastname && <InputError error={errors.lastname} />}
                        </div>
                    </div>

                    <div className='form-group mb-3'>
                        <label className={style.text}><b>{t('emailLabel')}</b></label>
                        <Input
                            type="email"
                            name='email'
                            register={register}
                        />
                        {errors.email && <InputError error={errors.email} />}
                    </div>

                    <div className='form-group mb-3'>
                        <label className={style.text}><b>{t('fieldLabel')}</b></label>
                        <select {...register('field')} className='form-control'>
                            <option value="Artificial Intelligence">Artificial Intelligence</option>
                            <option value="Software Engineering">Software Engineering</option>
                            <option value="Data Science">Data Science</option>
                        </select>
                        {errors.field && <InputError error={errors.field} />}
                    </div>

                    <div className='form-group mb-3'>
                        <label className={style.text}><b>{t('passwordLabel')}</b></label>
                        <Input
                            type="password"
                            name='password'
                            placeholder={t('passwordPlaceholder')}
                            register={register}
                            onChange={handlePasswordStrength}
                        />
                        {errors.password && <InputError error={errors.password} />}
                    </div>

                    <div className="d-flex gap-2 mt-4 p-2">
                        <button type="submit" className="alert alert-danger w-50">
                            <b>{t('save')}</b>
                        </button>
                        <button type='button' className="alert alert-success w-50" onClick={() => navigate(-1)}>
                            <b>{t('cancel')}</b>
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}