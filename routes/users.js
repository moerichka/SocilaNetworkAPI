const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

// -- ОБНОВИТЬ ПОЛЬЗОВАТЕЛЯ --
router.put("/:id", async (req, res) => {
  try {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      if (req.body.password) {
        try {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (error) {
          return res.status(500).json(error);
        }
      }
      try {
        const user = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        res.status(200).json("Аккаунт был обнавлен");
      } catch (error) {
        return res.status(500).json(error);
      }
    } else {
      return res.status(403).json("Вы можете обновлять только Ваш аккаунт!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// -- УДАЛИТЬ ПОЛЬЗОВАТЕЛЯ --
router.delete("/:id", async (req, res) => {
  try {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Аккаунт был удален");
      } catch (error) {
        return res.status(500).json(error);
      }
    } else {
      return res.status(403).json("Вы можете удалить только свой аккаунт!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// -- ПОЛУЧИТЬ ПОЛЬЗОВАТЕЛЯ --
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
});

// -- ПОДПИСАТЬСЯ НА ПОЛЬЗОВАТЕЛЯ --
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("Успешно подписаны");
      } else {
        res.status(403).json("Вы уже подписаны на этого пользователя");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Вы не можете подписаться сами на себя");
  }
});

// -- ОТПИСАТЬСЯ ОТ ПОЛЬЗОВАТЕЛЯ --

router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("Успешно отписаны");
      } else {
        res.status(403).json("Вы не были подписаны");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Вы не можете отписаться от самого себя");
  }
});

module.exports = router;
