import { useState } from "react";
import axios from "axios";
import "../../styles/form/LoginForm.css";

function SignupForm() {
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");

  const handleSendSignup = async () => {
    try {
      const responce = await axios.post(
        "http://localhost:3000/signup",
        {
          type: "requestLogin",
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
    console.log(userId, password);
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
        <input
          type="password"
          placeholder="パスワードを入力"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSendSignup}>サインアップ</button>
        <p>
          アカウントを持っている?<a href="/login">こちら</a>をクリック
        </p>
      </div>
    </div>
  );
}
export default SignupForm;
