import Header from "../../components/home/Header";
import styles from "../../styles/about/About.module.css";

const About = () => {
    return(
        <div>
            <Header />
            <div className={styles.container}>
                <h1>Steff Van Weereld</h1>
                <div className={styles.intro}>
                        <div className={styles.imgContainer}>
                            <img src="/portfolio_about_foto.jpg" alt="Steff Van Weereld" className={styles.img}/>
                        </div>
                            <p className={styles.aboutText}> Als student programmeur ben ik ijverig op zoek naar kansen om bij te leren.
                                Mijn interesse met programmeren startte aan het CVO Antwerpen.
                                Ik studeerde webdesign. 
                                Toen ik door had dat ik dat leuk vond, ben ik na het behalen van mijn diploma, 
                                doorgestroomd naar de AP Hogeschool waar ik de richting programmeren ging volgen. Deze intressen blijft nu steeds groeien!
                            </p>
                        </div>
                <div className={styles.content}>
                        <div className={styles.aboutItem}>
                            <h2>Vaardigheden</h2>
                            <div className={styles.skills}>
                            <ul>
                                <li>HTML</li>
                                <li>CSS</li>
                                <li>JavaScript</li>
                                <li>Typescript</li>
                                <li>React</li>
                                <li>Next.js</li>
                                <li>Express</li>
                                <li>C#</li>
                                <li>.NET</li>
                                <li>MongoDB</li>
                                <li>Git</li>
                                <li>GitHub</li>
                            </ul>
                            </div>
                        </div>
                    <div className={`${styles.aboutItem} ${styles.education}`}>
                        <h2>Opleiding</h2>
                        <ul>
                            <li>TSO diploma met beroepsspecifieke opleiding: webdesign</li>
                            <li>Graduaat programmeren - AP hogeschool</li>
                        </ul>
                        <h2>Stage</h2>
                        <ul>
                            <li>Aertssen .NET developer</li>
                        </ul>
                        <h2>Beroepservaring: Jobstudent</h2>
                        <ul>
                            <li>Winkelbediende Slagerij Lode Zandvliet</li>
                            <li>Buurtslagers Hoevenen</li>
                            <li>Winkelbediende Albert Heijn Stabroek</li>
                        </ul>
                    </div>
                    <div className={`${styles.aboutItem} ${styles.contact}`}>
                        <h2>Contact</h2>
                        <ul>
                            <li><a href="https://www.linkedin.com/in/steff-van-weereld-413a812a1/">LinkedIn</a></li>
                            <li><a href="mailto:steffvw@gmail.com">Email</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;