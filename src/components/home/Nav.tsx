import React from 'react';
import styles from "../../styles/home/Nav.module.css"
import Link from 'next/link';
import { useRouter } from 'next/router';


const Nav = () => {
    const router = useRouter();
    return (
        <nav className={styles.container}>
            <ul className={styles.navList}>
                <li className={router.pathname == "/" ? styles.active : styles.navItem}><Link href="/">Home</Link></li>
                <li className={router.pathname == "/about" ? styles.active : styles.navItem}><Link href="/about">About</Link></li>
                <li className={router.pathname == "/blog" ? styles.active : styles.navItem}><Link href="/blog">Blog</Link></li>
                <li className={router.pathname == "/login" ? styles.active : styles.navItem}><Link href="/login">Admin login</Link></li>
            </ul>
        </nav>
    );
}

export default Nav;