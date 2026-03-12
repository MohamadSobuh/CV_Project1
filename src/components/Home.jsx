
import { Link } from 'react-router-dom'
import darklogo from "./../images/darklogo.png";
import style from "./Home.module.css";
import { FaRegFileAlt, FaBrain, FaList, FaCloudUploadAlt, FaSearch, FaClipboardList, FaChartLine } from "react-icons/fa";

export default function Home() {
    return (
        <div className={style.bg}>

            <div className={style.a}>
                <header className={style.head}>
                    <Link>
                        <img src={darklogo} className={style.logo} />
                    </Link>
                    <Link to={"/login"}>
                        <button className={`${style.btn1} `}> <b>Log in</b></button>
                    </Link>
                </header>

                <div className={style.body}>
                    <h1>Empower Your Skills, Elevate Your Career</h1>
                    <br />
                    <h5>Understand your abilities accurately and develop them continuously with an AI-powered <br /> smart system.</h5>
                    <br />
                    <Link to={"/login"}>
                        <button className={`${style.getStarted}`}> <b>Get Started</b></button>
                    </Link>
                </div>
            </div>

            <section className={style.section}>
                <h1>Why<b style={{ color: "#1A83A8" }} > CVision </b>Is Your Smart Career Assistant?</h1>

                <div className={`${style.r}  row `}>
                    <div className={`${style.card}  col-md-3 `}>
                        <div className={style.icon}>
                            <FaRegFileAlt className={style.iconInside} />
                        </div>
                        <h5>CV Analysis</h5>
                        <p>Upload and analyze your CV using the latest AI models to extract your skills and identify gaps</p>
                    </div>

                    <div className={`${style.card}  col-md-3 `} >
                        <div className={style.icon}>
                            <FaBrain className={style.iconInside} />
                        </div>
                        <h5>Smart Assessment</h5>
                        <p>Accurate interactive quizzes designed to measure your real skill level in your chosen field and identify weaknesses</p>
                    </div>

                    <div className={`${style.card}  col-md-3 `} >
                        <div className={style.icon}>
                            <FaList className={style.iconInside} />
                        </div>
                        <h5>Personal Learning Plan </h5>
                        <p>A learning path , with educational resources and short quizzes for <br />every skill</p>
                    </div>
                </div>
            </section>

            <section className={style.howWorks}>
                <h1 className={style.section}>How it works</h1>
                <div className={style.allsteps}>
                    <div className={`${style.step} row`} >
                        <div className='col-md-4 me-5'>
                            <h1 style={{ color: "#cd93ff" }} >01</h1>
                            <div className={style.steptitle}>
                                <FaCloudUploadAlt className={style.iconInside} style={{ color: "#AC40FB" }} />
                                <h5 style={{ color: "#AC40FB" }} ><b>Upload Your CV</b></h5>
                            </div>

                            <p>Upload your CV and select the field you want to work in.Our system will prepare your profile for analysis based on your chosen career path.</p>
                            <ul>
                                <li>Upload your CV easily</li>
                                <li>Choose your target field</li>
                                <li>Start the analysis process</li>
                            </ul>
                        </div>

                        <div className={`${style.workcard}  col-md-4`} style={{ boxShadow: " 0 0 30px 1px #AC40FB" }}>
                            <div className={style.iconhowWorks} style={{ backgroundColor: "#F2E3FF" }}>
                                <FaCloudUploadAlt className={style.iconInsideHowWorks} style={{ color: "#AC40FB" }} />
                            </div>
                        </div>
                    </div>

                    <div className={`${style.step} row`} >
                        <div className={`${style.workcard}  col-md-4 me-5`} style={{ boxShadow: " 0 0 30px 1px #F1416F" }}>
                            <div className={style.iconhowWorks} style={{ backgroundColor: "#fce1e6" }}>
                                <FaSearch className={style.iconInsideHowWorks} style={{ color: "#F1416F" }} />
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <h1 style={{ color: "#d48f9c" }}>02</h1>
                            <div className={style.steptitle}>
                                <FaSearch className={style.iconInside} style={{ color: "#F1416F" }} />
                                <h5 style={{ color: "#F1416F" }}><b>AI CV Analysis</b></h5>
                            </div>

                            <p>Our AI analyzes your CV to identify your strengths and weaknesses.</p>
                            <ul>
                                <li>Detect your existing skills</li>
                                <li>Identify missing or weak skills</li>
                                <li>Provide an overall score and evaluation</li>
                            </ul>
                        </div>
                    </div>

                    <div className={`${style.step} row`} >
                        <div className='col-md-4 me-5'>
                            <h1 style={{ color: "#7cc5a7" }} >03</h1>
                            <div className={style.steptitle}>
                                <FaClipboardList className={style.iconInside} style={{ color: "#3FB48D" }} />
                                <h5 style={{ color: "#3FB48D" }} > <b>Skill Assessment Test </b></h5>
                            </div>

                            <p>Based on the detected weak areas, you will take a short assessment test.</p>
                            <ul>
                                <li>Questions focused on your weak skills</li>
                                <li>Smart evaluation of your knowledge</li>
                                <li>Instant results after completing the test</li>
                            </ul>
                        </div>

                        <div className={`${style.workcard}  col-md-4 `} style={{ boxShadow: " 0 0 30px 1px #3FB48D" }}>
                            <div className={style.iconhowWorks} style={{ backgroundColor: "#ccf3e3" }}>
                                <FaClipboardList className={style.iconInsideHowWorks} style={{ color: "#3FB48D" }} />
                            </div>
                        </div>
                    </div>

                    <div className={`${style.step} row`} >
                        <div className={`${style.workcard}  col-md-4 me-5`} style={{ boxShadow: " 0 0 30px 1px #F76D2F" }}>
                            <div className={style.iconhowWorks} style={{ backgroundColor: "#FEE9DA" }}>
                                <FaChartLine className={style.iconInsideHowWorks} style={{ color: "#F76D2F" }} />
                            </div>
                        </div>
                        <div className='col-md-4 '>
                            <h1 style={{ color: "#e6a171" }} >04</h1>
                            <div className={style.steptitle}>
                                <FaChartLine className={style.iconInside} style={{ color: "#F76D2F" }} />
                                <h5 style={{ color: "#F76D2F" }}> <b> Personalized Learning Plan</b></h5>
                            </div>

                            <p>According to your results, we generate a personalized learning plan to help you improve.</p>
                            <ul>
                                <li>Structured topics to study</li>
                                <li>Tasks inside each topic</li>
                                <li>Quizzes to test your progress</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <footer>
                
            </footer>
        </div>
    )
}

