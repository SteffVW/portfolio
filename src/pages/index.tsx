import { useEffect } from "react";
import Header from "../components/home/Header"
import { startServer } from "../../server/server";


const Home = () => {
  
  useEffect(() => {
    // startServer();
  }, []);

  return(
    <div>
      <Header />
      <h1>Welkom</h1>
    </div>
  )
};

export default Home;