import Header from "@/components/home/Header"
import styles from "../../styles/login/Login.module.css";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username, password}),
      credentials: "include"
    });

    console.log(response);

    const data = await response.json();

    if(!response.ok){
      setError(data.message);
      return;
    }

    setError(null);
    window.location.href = "/";
  }

  return(
    <div className={styles.container}>
      <Header />
      <div className={styles.mainContainer}>
        {error &&
          <div className={styles.error}>
            <h2>{error}</h2>
          </div> 
        }
      <form action="POST" className={styles.formContainer} onSubmit={onSubmit}>
                <div className={styles.formItem}>
                    <label>Username</label>
                    <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className={styles.formItem}>
                    <label>Password</label>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="submit" className={styles.button}>Login</button>
            </form>
      </div>
    </div>
  )
};

export default Login;
