import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../components/firebase/firebaseConfig";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useAuth  } from '../components/auth/AuthContext';
import { useRouter } from 'next/router'

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorCode, setErrorCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { currentUser } = useAuth();
  const router = useRouter();

  function Submit() {
      signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
      router.push('/');
    })
    .catch((error) => {
      setErrorCode(error.code);
      setErrorMessage(error.message);
    });
  }
  function SignOutBtn() {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

    return (
      <>
        <h1>Login Page</h1>
        <section>
            <article>
                <table>
                    <tbody>
                        <tr>
                            <th>メールアドレス</th>
                            <td><input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <th>パスワード</th>
                            <td><input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}/></td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={Submit}>ログイン</button>
                <p>errorCode:{errorCode}</p>
                <p>errorMessage:{errorMessage}</p>
            </article>
        </section>
      </>
    );
  }
  