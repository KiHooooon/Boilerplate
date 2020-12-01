const express = require("express");
const router = express.Router();
const app = express();

router.post('/image', (req, res) => {
    // 가져온 이미지를 저장
    let data = req.body;
})

module.exports = app;