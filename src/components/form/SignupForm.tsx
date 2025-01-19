import { useState } from "react";
import axios from "axios";
import Alert from "../alert/Alert";
import "../../styles/form/LoginForm.css";

const getProtectedData = async () => {
  try {
    const response = await axios.get(
      'http://localhost:3002/get-cookie', // 保護されたエンドポイント
      { withCredentials: true } // クッキーを送信
    );
    console.log(response.data.data.message); // 保護されたデータ
    if (response.data.data.message === "loginSuccess"){
      if (window.location.pathname === "/login") {
        window.location.href = "/";
      } else if (window.location.pathname === "/signup") {
        window.location.href = "/";
      } else {
        console.log("だめだね");
      }
    }
  } catch (error) {
    console.error("だめだね");
  }
};

getProtectedData();

function SignupForm() {
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
          "http://localhost:3002/signup",
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
        <h2>サインアップ</h2>
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
        <button onClick={handleSendSignup}>サインアップ</button>
        <p>
          アカウントを持っている?<a href="/login">こちら</a>をクリック
        </p>
      </div>
    </div>
  );
}

export default SignupForm;
