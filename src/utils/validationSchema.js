import * as yup from 'yup';

const emailValidation = yup.string()
    .required("Email is required")
    .email("Invalid email format");

const passwordValidation = yup.string()
    .required("Password is required");


export const loginSchema = yup.object({
    email: emailValidation,
    password: passwordValidation,
});

export const signupSchemaForTasks = yup.object({
    task: yup.string().required("Task Name is required"),
    topic: yup.string().required("Topic is required"),
    content: yup.string().required("Content is required"),
    videoUrl: yup.string().url("Must be a valid URL").notRequired(),
    imageUrl: yup.string().url("Must be a valid URL").notRequired(),
    resources: yup.array().of(yup.string())
});


export const signupSchema = yup.object({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    email: emailValidation
        .required("Email is required")
        .email("Invalid email format")
        .min(5, "Email is too short")
        .max(50, "Email is too long"),

    password: passwordValidation
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .max(20, "Password can't exceed 20 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
});
export const questionSchema = yup.object().shape({
    questionType: yup
        .string()
        .required('يرجى اختيار نوع السؤال'),

    associatedTask: yup
        .string()
        .required('يرجى اختيار المهمة المرتبطة بهذا السؤال'),

    questionText: yup
        .string()
        .required('نص السؤال مطلوب')
        .min(10, 'يجب أن يكون السؤال 10 أحرف على الأقل'),

    option1: yup.string().required('الخيار الأول مطلوب'),
    option2: yup.string().required('الخيار الثاني مطلوب'),
    option3: yup.string().required('الخيار الثالث مطلوب'),
    option4: yup.string().required('الخيار الرابع مطلوب'),
    correctAnswer: yup
        .string()
        .required('يجب تحديد خيار واحد كإجابة صحيحة')
        .nullable(),
});
export const topicSchema = yup.object().shape({
    title: yup.string().required("Topic title is required"),
    desc: yup.string().required("Description is required").min(10, "Description too short"),
    tasks: yup.number().typeError("Must be a number").notRequired().positive().integer(),
    category: yup.string().required("Please select a category"),
    difficulty: yup.string().required("Please select a difficulty"),
});