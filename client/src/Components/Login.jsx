import React, { useState } from "react";
import publicAxios from "../config/publicAxios";
import { useNavigate } from "react-router-dom"
import "./Login.css"

function Login(props) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleGetValue = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleLogin = async () => {
    const response = await publicAxios.post("/api/v1/login", user);
    localStorage.setItem("token", response.data.token);
    alert(response.data.message);
    navigate("/todo");
  };
  return (
    // <>
    //   <h1>Login</h1>
    //   <input type="text" name="email" onChange={handleGetValue} />
    //   <br />
    //   <input type="text" name="password" onChange={handleGetValue} />
    //   <button onClick={handleLogin}>Đăng nhập</button>
    // </>
 
      <div className="container">
        <div className="formLogin">
          <h1 className=' ' id="formTitle">Đăng nhập</h1>
          <div className="inputLogin">
            <form>
              <label htmlFor="username" /><br />
              <input type="text" name='email' onChange={handleGetValue} placeholder="Email" required /><br />
              <label htmlFor="password" /><br />
              <input type="password" id="password" name='password' onChange={handleGetValue} placeholder="Mật khẩu" required /><br />
              <button type="button" onClick={handleLogin} > Đăng nhập</button>

            </form>
          </div>
        </div>
      </div>


  );
}

export default Login;
