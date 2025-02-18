import Header from "../components/home/Header"
import styles from "../styles/home/Home.module.css"


const Home = () => {

  return(
    <div>
      <Header />
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1>Welkom op mijn blog</h1>
        <p>Op deze website kan je alles terug vinden over mijn stage bij Aertssen als .NET Developer,
          Als je benieuwd ben wat ik allemaal moet doen tijdens mijn stage neem dan een kijkje bij de blogposts!
        </p>
        <div className={styles.aertssenContainer}>
        <h1>Geschiedenis van Aertssen</h1>
        <h2>Grondwerken Marcel Aertssen</h2>
        <p>Oprichting ‘Grondwerken Marcel Aertssen’. Wanneer eind jaren '50 het polderdorp Oorderen plaats moet maken voor de uitbreiding van de Haven van Antwerpen,
           blijft Marcel niet bij de pakken zitten. Hij koopt zijn eerste graafkraan en start ‘Grondwerken Marcel Aertssen’ op.
            Samen met echtgenote Maria Janssens koopt hij in het Laageind in Stabroek een weide aan, waar ze samen aan hun bedrijf bouwen.</p>
        <h2>Nieuwe generatie, nieuwe activiteiten</h2>
        <p>In de jaren 1980 worden de kinderen van Marcel Aertssen, Greg, Raf, Saskia en Luc, klaargestoomd om sleutelfuncties op te nemen in het bedrijf.
           Zij gaan op zoek naar nieuwe activiteiten om het bedrijf verder te helpen groeien.
           Intussen blijft Aertssen meewerken aan toonaangevende infrastructuurprojecten, 
           zoals de Berendrechtsluis – op dat ogenblik de grootste sluis ter wereld – en de Liefkenshoektunnel.</p>
          <h2>Dochteronderneming over de taalgrens</h2>
          <p>
          In 2000 richtte Aannemingsbedrijf Aertssen in Luik zijn dochterbedrijf Aertssen Terrassements op. 
          Dat bedrijf spitst zich toe op de ontginning van steengroeves en transport- en aannemingsprojecten in Wallonië. 
          Sinds 2021 zijn Aannemingsbedrijf Aertssen en Aertssen Terrassements samengesmolten tot Aertssen Infra. Terrassements werd omgedoopt tot Aertssen Infra Sud.
          </p>
            <h2>Nieuw hoofdkantoor</h2>
            <p>In 2008 verhuist de groep naar een nieuw bedrijfsgebouw aan Laageind 91 te Stabroek. In het gebouw van 2 verdiepingen zijn zo’n 130 bedienden aan de slag. 
              Achteraan de site werkt Aertssen Services aan het onderhoud en herstel van het machinepark.
            </p>
        </div>
        </div>
      </div>
    </div>
  )
};

export default Home;