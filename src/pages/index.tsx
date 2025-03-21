import { useEffect, useState } from "react";
import Header from "../components/home/Header"
import styles from "../styles/home/Home.module.css"
import { IPost } from "../../types";


export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/posts?latest=true");
  const latestPost = await res.json();

  return {
      props: {
          latestPost,
      },
  };
}


const Home = ({ latestPost }: { latestPost: IPost }) => {

  return(
    <div>
      <Header />
    <div>
      <div className={styles.textContainer}>
        <h1>Welkom op mijn blog</h1>
        <p>Op deze website kan je alles terug vinden over mijn stage bij Aertssen als .NET Developer,
          Als je benieuwd ben wat ik allemaal moet doen tijdens mijn stage neem dan een kijkje bij de blogposts!
        </p>
        <div className={styles.postContainer}>
        <strong><h1>Meest recente post</h1></strong>
       <div className={styles.recentPost}>
        <h1>{latestPost?.title}</h1>
        <p>{latestPost?.content}</p>
        </div>
        </div>
        </div>
      </div>
    </div>
  )
};

export default Home;