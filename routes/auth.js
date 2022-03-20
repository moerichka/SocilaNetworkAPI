const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

// -- РЕГИСТРАЦИЯ --
router.post("/register", async (req, res) => {
  try {
    // шифруем пароль
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // создаем нового пользователя
    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //сохраняем в базу данных и ответ 200
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error)
  }
});

// -- АВТОРИЗАЦИЯ --
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("user not found");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("wrong password");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error)
  }
});

module.exports = router;
