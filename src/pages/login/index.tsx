import Header from "@/components/home/Header"
import styles from "../../styles/login/Login.module.css";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return(
    <div>
      <Header />
      <div>
      <form action="POST" className={styles.formContainer} onSubmit={(e) => {}}>
                <div className={styles.formItem}>
                    <label>Title</label>
                    <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className={styles.formItem}>
                    <label>Post</label>
                    <input type="text" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="submit" className={styles.button}>Login</button>
            </form>
      </div>
    </div>
  )
};

export default Login;
