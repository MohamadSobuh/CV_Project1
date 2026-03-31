import { useState, useEffect } from 'react';
import style from "./AdminTables.module.css";
import Admin from "../../images/Admin.jpg";
import translations from '../../locales/translations';
import { FaTrash, FaUsers } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AdminInput from '../../components/ui/AdminInput';
import InputError from "../../components/ui/InputError";
import EmptyPage from "../../components/ui/EmptyPage";
import { signupSchema } from "../../utils/validationSchema";
export default function Users({ language }) {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const usersPerPage = 4;
    const [showDeleteModal, setShowDeleteModal] = useState(null);

    const t = translations[language];

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(signupSchema)
    });

    useEffect(() => {
        setUsers([
            { id: 1, image: Admin, firstName: "Isra", lastName: "Shtaiwi", email: "isra@gmail.com", learningPlan: "Frontend", Progress: "20%", CVnumbers: "1", joinDate: "7/11/2025" },
            { id: 2, image: Admin, firstName: "Besan", lastName: "Ashraf", email: "besan@gmail.com", learningPlan: "Backend", Progress: "100%", CVnumbers: "4", joinDate: "7/11/2025" },
            { id: 3, image: Admin, firstName: "mohammad", lastName: "Sobuh", email: "mohammad@gmail.com", learningPlan: "Fullstack", Progress: "80%", CVnumbers: "1", joinDate: "7/11/2025" },
            { id: 4, image: Admin, firstName: "Shahd", lastName: "Ibrahem", email: "shahd@gmail.com", learningPlan: "Frontend", Progress: "50%", CVnumbers: "3", joinDate: "7/11/2025" }
        ]);
    }, []);

    const handleDelete = () => {
        setUsers(users.filter(user => user.id !== showDeleteModal));
        setShowDeleteModal(null);
    };
    const totalPages = Math.ceil(users.length / usersPerPage);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const handleNext = () => setCurrentPage(prev => (
        prev < totalPages ? prev + 1 : prev
    ));
    const handlePrev = () => setCurrentPage(prev => (
        prev > 1 ? prev - 1 : prev
    ));

    const onSubmit = (data) => {
        setUsers(prev => [
            ...prev,
            {
                id: prev.length + 1,
                image: Admin,
                firstName: data.firstname,
                lastName: data.lastname,
                email: data.email,
                learningPlan: "----",
                Progress: "0%",
                CVnumbers: "0",
                joinDate: new Date().toLocaleDateString(),
                role: data.role
            }
        ]);
        reset();
        setShowModal(false);
    };

    return (
        <div className={language === 'ar' ? style.usersPageArabic : style.usersPage}>
            {users.length === 0 ? (
                <EmptyPage
                    icon={<FaUsers />}
                    title={t.emptyUsersTitle}
                    message={t.emptyUsersMessage}
                    btnText={t.addUser}
                    onClick={() => setShowModal(true)}
                />
            ) : (
                <>

                    <div className='row align-items-center justify-content-between mb-4'>
                        <div className='col-md-6'>
                            <h1>{t.title}</h1>
                            <p>{t.descriptionUsersPage}</p>
                        </div>
                        <div className={`col-md-6 ${language === 'ar' ? 'text-start' : 'text-end'}`}>
                            <button
                                className={language === 'ar' ? style.addUserbtnAr : style.addUserbtn}
                                onClick={() => setShowModal(true)}
                            >
                                <b>{t.addUser}</b>
                            </button>
                        </div>
                    </div>

                    <div className={style.ForUsers}>
                        <table className={style.usersTable}>
                            <thead>
                                <tr>
                                    <th>{t.user}</th>
                                    <th>{t.learningPlan}</th>
                                    <th>{t.progress}</th>
                                    <th>{t.cvs}</th>
                                    <th>{t.joinDate}</th>
                                    <th>{t.actions}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsers.map(user => (
                                    <tr key={user.id}>
                                        <td>
                                            <div className={style.userInfo}>
                                                <img src={user.image} alt="Profile" className={`${style.imgProfile} rounded-circle`} />
                                                <div className={style.userText}>
                                                    <b>{user.firstName} {user.lastName}</b>
                                                    <span>{user.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{user.learningPlan}</td>
                                        <td>
                                            <div className={style.progressContainer}>
                                                <div className={style.progressBar}>
                                                    <div className={style.progressFill} style={{ width: user.Progress }}></div>
                                                </div>
                                                <span>{user.Progress}</span>
                                            </div>
                                        </td>
                                        <td className={style.center}>{user.CVnumbers}</td>
                                        <td>{user.joinDate}</td>

                                        <td className={style.center}>
                                            <FaTrash
                                                className={style.actionIcon}
                                                onClick={() => setShowDeleteModal(user.id)}
                                                style={{ color: "#ff0000" }}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className={style.foot}>
                            <button className={style.btnOutline} onClick={handlePrev}>{t.prev}</button>
                            <button className={style.btnActive} style={{ background: "#1A83A8" }}>{currentPage}</button>
                            <button className={style.btnOutline} onClick={handleNext}>{t.next}</button>
                        </div>
                    </div>
                </>
            )}


            {showModal && (
                <div className={style.modalOverlay}>
                    <div className={style.modalContent}>
                        <h2 style={{ marginBottom: "20px", color: "#1A83A8" }}>{t.addForm}</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={style.formRow}>
                                <div style={{ flex: 1 }}>
                                    <label>{t.firstNameLabel}</label>
                                    <AdminInput
                                        type="text"
                                        name="firstname"
                                        placeholder={t.enterFirstName}
                                        registerProps={register("firstname")}
                                    />
                                    <InputError error={errors.firstname} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label>{t.lastNameLabel}</label>
                                    <AdminInput
                                        type="text"
                                        name="lastname"
                                        placeholder={t.enterLastName}
                                        registerProps={register("lastname")}
                                    />
                                    <InputError error={errors.lastname} />
                                </div>
                            </div>

                            <div style={{ marginBottom: "15px" }}>
                                <label>{t.emailLabel}</label>
                                <AdminInput
                                    type="email"
                                    name="email"
                                    placeholder={t.email}
                                    registerProps={register("email")}
                                />
                                <InputError error={errors.email} />
                            </div>

                            <div style={{ marginBottom: "15px" }}>
                                <label>{t.pass}</label>
                                <AdminInput
                                    type="password"
                                    name="password"
                                    placeholder={t.pass}
                                    registerProps={register("password")}
                                />
                                <InputError error={errors.password} />
                            </div>

                            <div style={{ marginBottom: "15px" }}>
                                <label>{t.role}</label>
                                <select
                                    {...register("role")}
                                    style={{
                                        borderRadius: "5px",
                                        backgroundColor: "#E6F7F9",
                                        color: "#1A83A8",
                                        padding: "10px",
                                        border: "1px solid #1A83A8",
                                        width: "100%",
                                    }}
                                >
                                    <option value="user">{t.user}</option>
                                    <option value="admin">{t.admin}</option>
                                </select>
                            </div>

                            <div className={style.modalButtons}>
                                <button type="button" className={style.btnOutline} onClick={() => setShowModal(false)}>
                                    {t.cancel}
                                </button>
                                <button type="submit" className={style.btnActive}>{t.save}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <div className={style.modalOverlay} onClick={() => setShowDeleteModal(null)} >
                    <div className={style.modalContent} onClick={(e) => e.stopPropagation()} >
                        <h2 className={style.modalTitle}>{t.confirm}</h2>
                        <p>{t.confirmDeleteDesc}</p>

                        <div className={style.modalButtons}>
                            <button className={style.btnOutline} onClick={() => setShowDeleteModal(null)}>
                                {t.confirmDeleteCancel}
                            </button>

                            <button className={style.btnActive} style={{ backgroundColor: "red", borderColor: "red" }}
                                onClick={() => {
                                    handleDelete(showDeleteModal);
                                    setShowDeleteModal(null);
                                }} >
                                {t.confirmDeleteBtn}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}