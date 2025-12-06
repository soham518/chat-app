import { useAuthStore } from "../store/useAuthStore";
const LogInPage = () => {
  const {authUser, isLoggedIn, login} = useAuthStore();
  console.log(authUser, isLoggedIn);
  return <div>
  <h1>Login page</h1>
  <h2>User:{authUser.name}, Id: {authUser._id}</h2>
  {isLoggedIn ? <h2>Login Status: true</h2> : <h2>Login Statu: false</h2>}
  <button className="btn" onClick={login}>Log in</button>
  </div>;
};

export default LogInPage;
