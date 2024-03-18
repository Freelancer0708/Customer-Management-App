import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../components/firebase/firebaseConfig";

const app = initializeApp(firebaseConfig);

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
                <button type="submit">ログイン</button>
            </form>
        </section>
      </>
    );
  }
  