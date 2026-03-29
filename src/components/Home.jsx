import { Link } from 'react-router-dom'
import darklogo from "../images/darklogo.png";
import heroimg from "../images/heroimg.jpg";
import translations from "../locales/translations";
import style from "./Home.module.css";
import { FaRegFileAlt, FaBrain, FaList, FaCloudUploadAlt, FaSearch, FaClipboardList, FaChartLine, FaArrowRight, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { useState } from 'react';


export default function Home({ language, setLanguage }) {
    const [email, setEmail] = useState("");
    const handleSubscribe = (e) => {
        e.preventDefault();
        alert("Thank you for subscribing!");
    };

    const t = translations[language];

    return (
        <div id="home" className={style.bg}>
            <header className={style.head}>
                <Link>
                    <img src={darklogo} className={style.logo} alt="logo" />
                </Link>
                <div className={style.headright}>
                    <select name='lang' className={`${style.selectLang}`} value={language} onChange={(e) => setLanguage(e.target.value)}>
                        <option value="en">ENG</option>
                        <option value="ar">AR</option>
                    </select>

                    <Link to={"/login"}>
                        <button className={style.btn1}><b>{t.login}<FaArrowRight /></b></button>
                    </Link>
                </div>
            </header>

            <div className={style.hero}>
                <div >
                    <h1>{t.heroTitle1}<br />{t.heroTitle2}</h1>
                    <h6>
                        {t.heroDesc}
                    </h6>
                    <Link to={"/login"}>
                        <button className={style.getStarted}><b>{t.getStarted}</b></button>
                    </Link>
                </div>

                <div className={style.imageContent}>
                    <div className={style.imgBox}><img src={heroimg} /></div>
                </div>
            </div>

            <section id="why" className={style.section}>
                <h1>{t.whyTitle}</h1>
                <div className={`${style.r}  row `}>
                    <div className={`${style.card}  col-md-3 `}>
                        <div className={style.icon}>
                            <FaRegFileAlt className={style.iconInside} />
                        </div>
                        <h5>{t.card1Title}</h5>
                        <p>{t.card1Desc}</p>
                    </div>

                    <div className={`${style.card}  col-md-3 `} >
                        <div className={style.icon}>
                            <FaBrain className={style.iconInside} />
                        </div>
                        <h5>{t.card2Title}</h5>
                        <p>{t.card2Desc}</p>
                    </div>

                    <div className={`${style.card}  col-md-3 `} >
                        <div className={style.icon}>
                            <FaList className={style.iconInside} />
                        </div>
                        <h5>{t.card3Title}</h5>
                        <p>{t.card3Desc}</p>
                    </div>
                </div>
            </section>

            <section id="how" className={style.howWorks}>
                <h1 className={style.section2}>{t.howWorks}</h1>
                <div className={style.allsteps}>
                    <div className={`${style.step} row`} >
                        <div className='col-md-4 me-md-5'>
                            <h1 style={{ color: "#cd93ff" }} >01</h1>
                            <div className={style.steptitle}>
                                <FaCloudUploadAlt className={style.iconInside} style={{ color: "#AC40FB" }} />
                                <h5 style={{ color: "#AC40FB" }} ><b>{t.step1Title}</b></h5>
                            </div>

                            <p>{t.step1Desc}</p>
                            <ul>
                                <li>{t.step1List1}</li>
                                <li>{t.step1List2}</li>
                                <li>{t.step1List3}</li>
                            </ul>
                        </div>

                        <div className={`${style.workcard}  col-md-4`} style={{ boxShadow: " 0 0 30px 1px #AC40FB" }}>
                            <div className={style.iconhowWorks} style={{ backgroundColor: "#F2E3FF" }}>
                                <FaCloudUploadAlt className={style.iconInsideHowWorks} style={{ color: "#AC40FB" }} />
                            </div>
                        </div>
                    </div>

                    <div className={`${style.step} row`} >
                        <div className={`${style.workcard}  col-md-4 me-md-5`} style={{ boxShadow: " 0 0 30px 1px #F1416F" }}>
                            <div className={style.iconhowWorks} style={{ backgroundColor: "#fce1e6" }}>
                                <FaSearch className={style.iconInsideHowWorks} style={{ color: "#F1416F" }} />
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <h1 style={{ color: "#d48f9c" }}>02</h1>
                            <div className={style.steptitle}>
                                <FaSearch className={style.iconInside} style={{ color: "#F1416F" }} />
                                <h5 style={{ color: "#F1416F" }}><b>{t.step2Title}</b></h5>
                            </div>

                            <p>{t.step2Desc}</p>
                            <ul>
                                <li>{t.step2List1}</li>
                                <li>{t.step2List2}</li>
                                <li>{t.step2List3}</li>
                            </ul>
                        </div>
                    </div>

                    <div className={`${style.step} row`} >
                        <div className='col-md-4 me-md-5'>
                            <h1 style={{ color: "#7cc5a7" }} >03</h1>
                            <div className={style.steptitle}>
                                <FaClipboardList className={style.iconInside} style={{ color: "#3FB48D" }} />
                                <h5 style={{ color: "#3FB48D" }} > <b>{t.step3Title}</b></h5>
                            </div>

                            <p>{t.step3Desc}</p>
                            <ul>
                                <li>{t.step3List1}</li>
                                <li>{t.step3List2}</li>
                                <li>{t.step3List3}</li>
                            </ul>
                        </div>

                        <div className={`${style.workcard}  col-md-4 `} style={{ boxShadow: " 0 0 30px 1px #3FB48D" }}>
                            <div className={style.iconhowWorks} style={{ backgroundColor: "#ccf3e3" }}>
                                <FaClipboardList className={style.iconInsideHowWorks} style={{ color: "#3FB48D" }} />
                            </div>
                        </div>
                    </div>

                    <div className={`${style.step} row`} >
                        <div className={`${style.workcard}  col-md-4 me-md-5`} style={{ boxShadow: " 0 0 30px 1px #F76D2F" }}>
                            <div className={style.iconhowWorks} style={{ backgroundColor: "#FEE9DA" }}>
                                <FaChartLine className={style.iconInsideHowWorks} style={{ color: "#F76D2F" }} />
                            </div>
                        </div>
                        <div className='col-md-4 '>
                            <h1 style={{ color: "#e6a171" }} >04</h1>
                            <div className={style.steptitle}>
                                <FaChartLine className={style.iconInside} style={{ color: "#F76D2F" }} />
                                <h5 style={{ color: "#F76D2F" }}> <b>{t.step4Title}</b></h5>
                            </div>

                            <p>{t.step4Desc}</p>
                            <ul>
                                <li>{t.step4List1}</li>
                                <li>{t.step4List2}</li>
                                <li>{t.step4List3}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section id="subscribe" className={style.subscription}>
                <div className='row'>
                    <div className='col-md-6'>
                        <h3>{t.subscribeTitle1} <br /> {t.subscribeTitle2} </h3>
                        <br />
                        <p>{t.subscribeDesc}</p>
                    </div>

                    <div className={`${style.stay} col-md-6`}>
                        <div>
                            <p>{t.stayUpdated}</p>
                            <form onSubmit={handleSubscribe}>
                                <input type="email" placeholder={t.emailPlaceholder} value={email} onChange={(e) => setEmail(e.target.value)} required />
                                <button><b>{t.subscribe}</b></button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <footer className={style.footer}>
                <div className='row'>
                    <div className='col-md-4'>
                        <a href="#home">
                            <img src={darklogo} className={style.logo} alt="logo" />
                        </a>
                        <p>{t.footerTagline}</p>
                    </div>

                    <div className="col-md-4">
                        <b>{t.footerQuickLinks}</b>
                        <br />
                        <ul>
                            <li><a href="#home">{t.home}</a></li>
                            <li><a href="#why">{t.why}</a></li>
                            <li><a href="#how">{t.how}</a></li>
                            <li><a href="#subscribe">{t.stay}</a></li>
                            <li><Link to={"/login"}>{t.login}</Link></li>
                            <li><Link to={"/signup"}>{t.signup}</Link></li>
                        </ul>
                    </div>
                    <div className='col-md-4'>
                        <b>{t.footerFollow}</b>
                        <br />
                        <div className={style.socialIcons}>
                            <a href=""> <FaInstagram size={30} color="#E4405F" /> </a>
                            <a href="" style={{ marginLeft: "10px" }}> <FaWhatsapp size={30} color="#25D366" /> </a>
                        </div>
                    </div>
                </div>

            </footer>

        </div>
    )
}

