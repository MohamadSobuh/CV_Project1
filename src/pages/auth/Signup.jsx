import darklogo from "../../images/darklogo.png";
import style from "./Sign.module.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../components/ui/Input";
import InputError from "../../components/ui/InputError";
import { signupSchema } from "../../utils/validationSchema";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import translations from "../../locales/translations";
export default function Signup() {
    const location = useLocation();
    const language = location.state?.language || "en";
    const t = translations[language];

    const inputs = [
        {
            name: "first_name",
            type: "text",
            label: t.firstNameLabel,
            id: "firstname",
            col: "col-md-6"
        },
        {
            name: "last_name",
            type: "text",
            label: t.lastNameLabel,
            id: "lastname",
            col: "col-md-6"
        },
        {
            name: "email",
            type: "email",
            label:t.email,
            id: "emailInput",
            col: "col-md-12"
        },
        {
            name: "password",
            type: "password",
            label: t.password,
            id: "passwordInput",
            col: "col-md-12"
        }
    ];
    const navigate = useNavigate();
    const { register, handleSubmit, setError, formState: { errors } } = useForm({
        resolver: yupResolver(signupSchema)
    });

    const submitForm = async (data) => {
        const payload = { ...data, role: 'user' };

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/users/register/", payload);
            console.log("Success:", response.data);
            navigate("/login");
        } catch (error) {
            if (error.response && error.response.data) {
                const serverErrors = error.response.data;

                // 1. التعامل مع الأخطاء الخاصة بالحقول (مثل الإيميل المكرر)
                Object.keys(serverErrors).forEach((field) => {
                    setError(field, {
                        type: "server",
                        message: serverErrors[field][0]
                    });
                });

                // 2. التعامل مع الأخطاء العامة (non_field_errors) إذا وجدت
                if (serverErrors.non_field_errors) {
                    setError("root.serverError", {
                        type: "server",
                        message: serverErrors.non_field_errors[0]
                    });
                }
            }
            console.error("Error details:", error.response?.data);
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

        if (strength <= 2) {
            e.target.style.border = "2px solid #ff0000";
        } else if (strength === 3 || strength === 4) {
            e.target.style.border = "2px solid #ff8c00";
        } else if (strength === 5) {
            e.target.style.border = "2px solid #07c937";
        }
    }

    return (
        <div className={style.bg}>
            <div className={style.glowTopRight}></div>
            <div className={style.glowBottomLeft}></div>
            <div className={style.bgGrid} />

            <div className={style.left}>
                <Link to="/" >
                    <img src={darklogo} alt="logo" className={`${style.logo}`} />
                </Link>
                <h3 ><b>{t.signupTitle}</b></h3>
                <br />
                <form onSubmit={handleSubmit(submitForm)} >

                    <div className="row">
                        {inputs.slice(0, 2).map((input) => (
                            <div key={input.id} className={`form-floating mb-3 ${input.col}`}>
                                <Input
                                    {...input}
                                    register={register}
                                    onChange={input.name === 'password' ? handlePasswordStrength : undefined}
                                />
                                <label htmlFor={input.id}>{input.label}</label>
                                {errors[input.name] && <InputError error={errors[input.name]} />}
                            </div>
                        ))}

                    </div>

                    {inputs.slice(2).map((input) => (
                        <div key={input.id} className={`form-floating mb-3 mt-3 ${input.col}`}>
                            <Input
                                {...input}
                                register={register}
                                onChange={input.name === 'password' ? handlePasswordStrength : undefined}
                            />
                            <label htmlFor={input.id}>{input.label}</label>
                            {errors[input.name] && <InputError error={errors[input.name]} />}
                        </div>
                    ))}

                    <button type="submit" className={`${style.btn}`}> <b>{t.signup}</b>  </button>
                </form>
                <br />
                <p> {t.haveAccount}<Link to="/login" className={style.s}> <b>{t.login}</b> </Link>
                </p>
            </div>

        </div>
    )
}

