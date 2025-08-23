// controllers/boardQuestionController.js
class BoardQuestionController {
  constructor(service) {
    this.service = service;

    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.getByBoard = this.getByBoard.bind(this);
    this.getBySubjectAndChapter = this.getBySubjectAndChapter.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(req, res) {
    try {
      const { board_id, question_id, year } = req.body;

      if (!board_id || !question_id || !year) {
        return res
          .status(400)
          .json({ error: "board_id, question_id, and year are required" });
      }

      const data = await this.service.create({ board_id, question_id, year });

      res.status(201).json({
        message: "Board question mapping created successfully",
        data,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const data = await this.service.getAll();
      res.json({ data });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const data = await this.service.getById(id);
      res.json({ data });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async getByBoard(req, res) {
    try {
      const { boardId } = req.params;
      const data = await this.service.getByBoardId(boardId);
      if (data.length === 0) {
        return res
          .status(404)
          .json({ error: "No questions found for this board" });
      }
      res.json({ data });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getBySubjectAndChapter(req, res) {
    try {
      const { subjectId, chapterId } = req.params;
      const data = await this.service.getBySubjectAndChapter(
        subjectId,
        chapterId
      );
      if (data.length === 0) {
        return res.status(404).json({
          error: "No board questions found for this subject and chapter",
        });
      }
      res.json({ data });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { board_id, question_id, year } = req.body;

      const data = await this.service.update(id, {
        board_id,
        question_id,
        year,
      });

      res.json({
        message: "Mapping updated successfully",
        data,
      });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await this.service.delete(id);
      res.json({ message: "Mapping deleted successfully" });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = BoardQuestionController;
