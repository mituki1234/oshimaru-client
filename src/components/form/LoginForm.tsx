import "../../styles/form/LoginForm.css"

function LoginForm() {
  return (
    <div className="overlay">
      <form method="post" action="/login" className="login-form">
        <h2>ログイン</h2>
        <input type="text" placeholder="IDを入力" />
        <input type="password" placeholder="パスワードを入力" />
        <button>ログイン</button>
        <p>アカウントを持っていない?<a href="/signup">こちら</a>をクリック</p>
      </form>
    </div>
  );
}
export default LoginForm;