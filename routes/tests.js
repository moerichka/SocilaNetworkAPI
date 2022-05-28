const router = require("express").Router();
const Test = require("../models/test");

// -- СОЗДАТЬ ТЕСТ --
router.post("/", async (req, res) => {
  const newTest = new Test(req.body);

  try {
    const savedTest = await newTest.save();
    res.status(200).json(savedTest);
  } catch (error) {
    res.status(500).json(error);
  }
});

// -- СОХРАНИТЬ ОТВЕТЫ НА ТЕСТ --
router.put("/:id", async (req, res) => {
  const test = await Test.findById(req.params.id);

  try {
    await test.updateOne({ $push: { results: req.body } });
    res.status(200).json(test);
  } catch (error) {
    res.status(500).json(error);
  }
});

// -- ПОЛУЧИТЬ ТЕСТ --
router.get("/:id", async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    res.status(200).json(test);
  } catch (error) {
    res.status(500).json(error);
  }
});

// -- ПОЛУЧИТЬ ТЕСТЫ --
router.get("/", async (req, res) => {
  try {
    const tests = await Test.find();
    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
