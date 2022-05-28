const router = require("express").Router();
const Post = require("../models/post");
const User = require("../models/User");

// -- СОЗДАТЬ ПОСТ --
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

// -- ОБНОВИТЬ ПОСТ --
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId.toString() === req.body.userId.toString()) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Пост был обновлен");
    } else {
      res.status(403).json("Вы можете изменять только ваши посты");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// -- УДАЛИТЬ ПОСТ --
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId.toString() === req.body.userId.toString()) {
      await post.deleteOne();
      res.status(200).json("Пост был удален");
    } else {
      res.status(403).json("Вы можете удалять только ваши посты");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// -- ЛАЙКНУТЬ \ ДИЗЛАЙКНУТЬ ПОСТ --
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("Пост был лайкнут");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("Пост был дизлайкнут");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// -- ПОЛУЧИТЬ ПОСТ --
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

// -- ПОЛУЧИТЬ ПОСТЫ С ПОДПИСОК --
router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (error) {
    res.status(500).json(error);
  }
});

// -- ПОЛУЧИТЬ ПОСТЫ ПОЛЬЗОВАТЕЛЯ --
router.get("/profile/:userId", async (req, res) => {
  try {
    const posts = await Post.find({userId: req.params.userId})
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
