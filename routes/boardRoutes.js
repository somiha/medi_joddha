// routes/boardRoutes.js
const express = require("express");

const BoardService = require("../services/boardService");
const BoardController = require("../controllers/boardController");

const boardService = new BoardService();
const boardController = new BoardController(boardService);

const router = express.Router();

router.post("/", boardController.create);
router.get("/", boardController.getAll);
router.get("/:id", boardController.getById);
router.delete("/:id", boardController.delete);

module.exports = router;
