import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [email, setEmail] = require('react').useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password
      });
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "로그인 실패");
    }
  
  };
  const handleRegister = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:5000/api/register', {
      email,
      password
    });
    alert(response.data.message);
  } catch (error) {
    alert(error.response?.data?.message || "회원가입 실패");
  }
  };
  
  return (
    <div style={{ padding: '20px' }}>
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>이메일: </label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <br />
        <div>
          <label>비밀번호: </label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <br />
        <button type="submit">로그인</button>
        <button type="button" onClick={handleRegister} style={{ marginLeft: '10px' }}>회원가입</button>
      </form>
    </div>
  );
}

export default App;