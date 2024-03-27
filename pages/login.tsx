import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../components/firebase/firebaseConfig";
import { getAuth, signInWithEmailAndPassword  } from "firebase/auth";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function Submit() {
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}

export default function Login() {
    return (
      <>
        <h1>Login Page</h1>

        <section>
            <form action="" method="post">
                <table>
                    <tbody>
                        <tr>
                            <th>メールアドレス</th>
                            <td><input type="email" name="email" id="email" /></td>
                        </tr>
                        <tr>
                            <th>パスワード</th>
                            <td><input type="password" name="password" id="password" /></td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit" onClick={handleSignIn}>ログイン</button>
            </form>
        </section>
      </>
    );
  }
  