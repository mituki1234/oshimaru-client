import { useState } from "react";
import "../../styles/form/LoginForm.css"
import axios from "axios";
import Alert from "../alert/Alert";

function LoginForm() {
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");

  const handleSendSignup = async () => {
    const sanitizedUserId = /[<>'"\\;]/.test(userId);
    const sanitizedPassword = /[<>'"\\;]/.test(password);
    const checkPassword = !/[A-Z]/.test(password);

    if (userId === "")
      Alert("IDが入力されていません", "error");
    else if (password === "")
      Alert("パスワードが入力されていません", "error");
    else if (password.length < 8)
      Alert("パスワードが八文字以上ではありません", "error");
    else if (checkPassword)
      Alert("パスワードが大文字を含んでいません", "error");
    else if (sanitizedUserId)
      Alert("IDに不正な文字が含まれています", "error");
    else if (sanitizedPassword)
      Alert("パスワードに不正な文字が含まれています", "error");
    else {
      try {
        const responce = await axios.post(
          "http://localhost:3002/login",
          {
            type: "requestSignup",
            data: {
              userId: userId,
              password: password,
            },
          },
          { withCredentials: true }
        );
        console.log(responce.data.message);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="overlay">
      <div className="login-form">
        <h2>ログイン</h2>
        <input
          type="text"
          placeholder="IDを入力"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <ul></ul>
        <input
          type="password"
          placeholder="パスワードを入力"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <ul>
          <li>パスワードは8文字以上</li>
          <li>パスワードには大文字を入れる</li>
          <li>パスワードには特殊な文字は入れない</li>
        </ul>
        <button onClick={handleSendSignup}>ログイン</button>
        <p>
          アカウント持っていない？<a href="/signup">こちら</a>をクリック
        </p>
      </div>
    </div>
  );
}
export default LoginForm;