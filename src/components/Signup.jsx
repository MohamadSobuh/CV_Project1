import logo from "./../images/logo.png";
import sign from "./../images/sign.png";
import style from "./Sign.module.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "./Input";
import InputError from "./InputError";
import { signupSchema } from "./validationSchema";
import { useNavigate } from "react-router-dom";

export default function Signup() {

    const inputs = [
        {
            name: "firstname",
            type: "text",
            label: "First name",
            id: "firstname",
            col: "col-md-6"
        },
        {
            name: "lastname",
            type: "text",
            label: "Last name",
            id: "lastname",
            col: "col-md-6"
        },
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
    const navigate = useNavigate();

    const submitForm = async (data) => {
        const payload = { ...data, role: 'user' };

        try {
            const response = await axios.post("http://localhost:5000/api/users/signup", payload); //هون حطو ال url تبع backend
            console.log("Success:", response.data);
            navigate("/");  //المكان الذي ينتقل إليه بعد التسجيل

        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
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


    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(signupSchema)
    });

    return (
        <div className={style.bg}>
            <div className={style.left}>
                <Link to="/" >
                    <img src={logo} alt="logo" className={`${style.logo}`} />
                </Link>
                <h3 >Sign up into CVision !</h3>
                <br />
                <form onSubmit={handleSubmit(submitForm)}>

                    <div className="row">

                        {inputs.map((input) => (
                            <div key={input.id} className={`form-floating mb-3 mt-3 ${input.col}`} >


                                <Input  {...input} register={register}
                                    onChange={input.name === 'password' ? handlePasswordStrength : undefined} />
                                <label htmlFor={input.id}>{input.label}</label>
                                {errors[input.name] && <InputError error={errors[input.name]} />}



                            </div>
                        ))}

                    </div>

                    <button type="submit" className={`${style.btn}`}><b>Sign Up</b></button>
                </form>
                <br />
                <p> Already have an account?<Link to="/login" className={style.s}> <b>Log in</b> </Link>
                </p>
            </div>

            <div className={style.right}>
                <img src={sign} alt="Sign" />
            </div>
        </div>
    )
}

