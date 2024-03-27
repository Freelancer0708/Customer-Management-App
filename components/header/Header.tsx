import React from 'react';
import styles from './Header.module.css';
import { useAuth } from '../auth/AuthContext';
import { getAuth, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from "../../components/firebase/firebaseConfig";
import Link from 'next/link'

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const Header = () => {
    const { currentUser } = useAuth();
    function SignOutBtn() {
        signOut(auth).then(() => {
          // Sign-out successful.
        }).catch((error) => {
          // An error happened.
        });
      }
    return (
        <>
        <header className={styles.header}>
            <div className={styles.link}>
                <Link href="/">Home</Link>
                <Link href="/login">Login</Link>
                {currentUser ? <><Link href="/products">Products</Link></> : <></>}
            </div>
            <div className={styles.check}>
                
                {currentUser ? <><button onClick={SignOutBtn}>ログアウト</button><p> {currentUser.email}</p></> : <p>ログインしていません</p>}
            </div>
        </header>
        </>
    );
}