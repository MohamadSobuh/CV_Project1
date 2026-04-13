import darklogo from "../../images/darklogo.png";
import style from "./Sign.module.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Input from "../../components/ui/Input";
import InputError from "../../components/ui/InputError";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../utils/validationSchema";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUserFlow } from '../../context/UserFlowContext';
import { useLocation } from "react-router-dom";
import translations from "../../locales/translations";


export default function Signin() {
    const location = useLocation();
    const language = location.state?.language || "en";
    const t = translations[language];

    const inputs = [
        {
            name: "email",
            type: "email",
            label: t.email,
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

    const { setUserId } = useUserFlow();
    const [serverError, setServerError] = useState("");
    const { register, handleSubmit, setError, watch, formState: { errors, isSubmitting } } = useForm(
        {
            resolver: yupResolver(loginSchema)
        }
    );
    const navigate = useNavigate();
    const checker = () => {
        if (localStorage.getItem("userRole") === "admin") {
            navigate("/admin/dashboard");
        } else {
            navigate("/user/dashboard");
        }
    }

    console.log("Current Values:", watch());
    const submitForm = async (data) => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/users/login/", data); //هون حطو ال url تبع backend
            const token = response.data.token; // التوكن الأساسي
            const userRole = response.data.user.role;
            const userId = response.data.user.id;
            localStorage.setItem("accessToken", token);

            localStorage.setItem("userRole", userRole);
            setUserId(userId);
            localStorage.setItem("userId", userId);

            console.log("Login Successful! Token stored.");
            console.log("Success:", response.data);
            checker();


        } catch (error) {
            if (error.response && error.response.data) {
                const serverErrors = error.response.data;

                if (serverErrors.non_field_errors) {
                    setError("email", {
                        type: "server",
                        message: serverErrors.non_field_errors[0]
                    });
                    setError("password", {
                        type: "server",
                        message: serverErrors.non_field_errors[0]
                    });
                }
            }
        }
    };

    return (
        <div className={style.bg} >
            <div className={style.glowTopRight}></div>
            <div className={style.glowBottomLeft}></div>

            <div className={style.bgGrid} />

            <div className={style.left}>
                <Link to="/" >
                    <img src={darklogo} alt="logo" className={`${style.logo}`} />
                </Link>
                <h3>                <b> {t.welcomeLogIn}</b>                </h3>
                <p>{t.loginMessge}</p>
                <form onSubmit={handleSubmit(submitForm)}>
                    {inputs.map((input) => (
                        <div key={input.id} className={`form-floating mb-3 ${input.name === 'email' ? 'mt-3' : ''}`}>
                            <Input
                                {...input}
                                register={register}
                            />
                            <label htmlFor={input.id}>{input.label}</label>

                            {errors[input.name] &&
                                <InputError error={errors[input.name]} />}

                        </div>
                    ))}

                    <button type="submit" className={`${style.btn}`} disabled={isSubmitting}><b>{t.login} </b></button>
                </form>
                <br />
                <p> {t.noAccount}<Link to="/signup" className={style.s} state={{ language }}> <b>{t.signup}</b> </Link> </p>

            </div>


        </div>
    )
}

