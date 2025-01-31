import Header from "@/components/home/Header"
import styles from "../../styles/login/Login.module.css";
import { useState } from "react";
import Cookies from "js-cookie";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username, password})
    });

    if(!response.ok){
      throw new Error("tf")
    }

    const data = await response.json();

    Cookies.set('token', data.token, { expires: 1, secure: true, sameSite: 'Strict' });

    console.log(data);
    window.location.href = "/";
  }

  return(
    <div>
      <Header />
      <div className={styles.container}>
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
