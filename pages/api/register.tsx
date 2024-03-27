import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  // この例では、パスワードを固定値 'admin' に設定
  const password = 'admin';

  // パスワードをハッシュ化
  const saltRounds = 10; // ソルトのコストファクター
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // コンソールにハッシュ化されたパスワードを表示
  console.log(hashedPassword);

  // レスポンスとしてハッシュ化されたパスワードを返す
  res.status(200).json({ hashedPassword });
}
