const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // 반드시 최상단에 위치

const app = express();
app.use(cors());
app.use(express.json());

// 1. 환경 변수에서 DB 주소 가져오기
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB 연결 성공'))
  .catch(err => console.error('❌ MongoDB 연결 실패:', err));

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// 회원가입 API
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const newUser = new User({ email, password });
    await newUser.save();
    res.status(201).json({ message: "회원가입 성공!" });
  } catch (err) {
    res.status(400).json({ message: "이미 존재하는 이메일입니다." });
  }
});

// 로그인 API
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "사용자가 존재하지 않습니다." });

    if (user.password !== password) {
      return res.status(400).json({ message: "비밀번호가 틀렸습니다." });
    }

    res.status(200).json({ message: "로그인 성공!", user: { email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "서버 에러" });
  }
});

// 2. 환경 변수에서 포트 가져오기
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 서버가 포트 ${PORT}에서 작동 중입니다.`));