import logo from "./../images/logo.png";
import sign from "./../images/sign.png";
import style from "./Sign.module.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Input from "./Input";
import InputError from "./InputError";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "./validationSchema";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const inputs = [
    {
        name: "email",
        type: "email",
        label: "Enter your Email",
        id: "emailInput",
        col: "col-md-12"
    },
    {
        name: "password",
        type: "password",
        label: "Enter your Password",
        id: "passwordInput",
        col: "col-md-12"
    }
];

export default function Signin() {
    const [serverError, setServerError] = useState("");
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm(
        {
            resolver: yupResolver(loginSchema)
        }
    );
    const navigate = useNavigate();

    console.log("Current Values:", watch());
    const submitForm = async (data) => {
        try {
            const response = await axios.post("http://localhost:5000/api/users/login", data); //هون حطو ال url تبع backend
            //     const token = response.data.access; // التوكن الأساسي
            // const refreshToken = response.data.refresh;

            // localStorage.setItem("accessToken", token);
            // localStorage.setItem("refreshToken", refreshToken);

            // localStorage.setItem("userRole", response.data.user.role);

            // console.log("Login Successful! Token stored.");
            console.log("Success:", response.data);
            navigate("/");  //المكان الذي ينتقل إليه بعد تسجيل الدخول

        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            setServerError(error.response?.data || error.message);
        }
    };

    return (
        <div className={style.bg}>
            <div className={style.left}>
                <Link to="/" >
                    <img src={logo} alt="logo" className={`${style.logo}`} />
                </Link>
                <h3 >Welcome back !</h3>
                <br />
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
                    <input type="checkbox" id="remember" {...register("remember")} /> <label htmlFor="remember">Remember me</label>

                    <br />
                    <button type="submit" className={`${style.btn}`} disabled={isSubmitting}><b>Login</b></button>
                </form>
                <br />
                <p> Don't have an account?<Link to="/signup" className={style.s}> <b>Sign Up</b> </Link> </p>

            </div>

            <div className={style.right}>
                <img src={sign} alt="Sign" />
            </div>
        </div>
    )
}

