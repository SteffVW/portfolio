import { useEffect, useState } from "react";
import Header from "../components/home/Header"
import styles from "../styles/home/Home.module.css"
import { IPost } from "../../types";


const Home = () => {

  const [latestPost, setLatestPost] = useState<IPost>();
  const [loading, setLoadig] = useState<boolean>(true);

  const fetchPosts = async() => {
    const res = await fetch("http://localhost:3000/api/posts?latest=true");
    const latestPost = await res.json();
    
    setLatestPost(latestPost);
    setInterval(() => {
      setLoadig(false);
    }, 500);
  }

  useEffect(() => {
    fetchPosts()
  }, []);

  return(
    <div>
      <Header />
    <div>
      <div className={styles.textContainer}>
        <h1>Welkom op mijn blog</h1>
        <p>Op deze website kan je alles terug vinden over mijn stage bij Aertssen als .NET Developer,
          Als je benieuwd ben wat ik allemaal moet doen tijdens mijn stage neem dan een kijkje bij de blogposts!
        </p>
        </div>
        <div className={styles.postContainer}>
        <strong><h1>Meest recente post</h1></strong>
       {!loading ? <div className={styles.recentPost}>
        <h1>{latestPost?.title}</h1>
        <p>{latestPost?.content}</p>
        </div>
        :
        <div className={styles.recentPost}>
          <h1>Post laden...</h1>  
        </div>
      }
        </div>
      </div>
    </div>
  )
};

export default Home;