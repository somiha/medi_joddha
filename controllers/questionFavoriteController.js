// controllers/questionFavoriteController.js
class QuestionFavoriteController {
  constructor(service) {
    this.service = service;

    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.delete = this.delete.bind(this);
    this.removeFavorite = this.removeFavorite.bind(this);
    this.getByUser = this.getByUser.bind(this);
    this.checkFavorite = this.checkFavorite.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
  }

  async create(req, res) {
    try {
      const { user_id, question_id, subject_id, course_id, chapter_id } =
        req.body;

      const data = {
        user_id: parseInt(user_id),
        question_id: parseInt(question_id),
        subject_id: parseInt(subject_id),
        course_id: course_id ? parseInt(course_id) : null,
        chapter_id: chapter_id ? parseInt(chapter_id) : null,
      };

      const favorite = await this.service.create(data);

      res.status(201).json({
        message: "Question added to favorites",
        favorite,
      });
    } catch (error) {
      console.error("Error creating favorite:", error);
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const result = await this.service.getAll(req.query);

      res.json({
        favorites: result.rows,
        pagination: {
          currentPage: parseInt(req.query.page) || 1,
          totalPages: Math.ceil(
            result.count / (parseInt(req.query.limit) || 10)
          ),
          totalItems: result.count,
          hasNext:
            (parseInt(req.query.page) || 1) *
              (parseInt(req.query.limit) || 10) <
            result.count,
          hasPrev: (parseInt(req.query.page) || 1) > 1,
        },
      });
    } catch (error) {
      console.error("Error getting favorites:", error);
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const favorite = await this.service.getById(id);

      if (!favorite) {
        return res.status(404).json({ error: "Favorite not found" });
      }

      res.json({ favorite });
    } catch (error) {
      console.error("Error getting favorite:", error);
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await this.service.delete(id);
      res.json({ message: "Favorite removed successfully" });
    } catch (error) {
      console.error("Error deleting favorite:", error);
      res.status(400).json({ error: error.message });
    }
  }

  async removeFavorite(req, res) {
    try {
      const { userId, questionId } = req.params;
      await this.service.removeFavorite(userId, questionId);
      res.json({ message: "Question removed from favorites" });
    } catch (error) {
      console.error("Error removing favorite:", error);
      res.status(400).json({ error: error.message });
    }
  }

  async getByUser(req, res) {
    try {
      const { userId } = req.params;
      const result = await this.service.getByUser(userId, req.query);

      res.json({
        favorites: result.rows,
        pagination: {
          currentPage: parseInt(req.query.page) || 1,
          totalPages: Math.ceil(
            result.count / (parseInt(req.query.limit) || 10)
          ),
          totalItems: result.count,
          hasNext:
            (parseInt(req.query.page) || 1) *
              (parseInt(req.query.limit) || 10) <
            result.count,
          hasPrev: (parseInt(req.query.page) || 1) > 1,
        },
      });
    } catch (error) {
      console.error("Error getting user favorites:", error);
      res.status(500).json({ error: error.message });
    }
  }

  async checkFavorite(req, res) {
    try {
      const { userId, questionId } = req.params;
      const isFavorite = await this.service.checkFavorite(userId, questionId);

      res.json({
        is_favorite: isFavorite,
      });
    } catch (error) {
      console.error("Error checking favorite:", error);
      res.status(500).json({ error: error.message });
    }
  }

  async toggleFavorite(req, res) {
    try {
      const { user_id, question_id, subject_id, course_id, chapter_id } =
        req.body;

      const data = {
        user_id: parseInt(user_id),
        question_id: parseInt(question_id),
        subject_id: parseInt(subject_id),
        course_id: course_id ? parseInt(course_id) : null,
        chapter_id: chapter_id ? parseInt(chapter_id) : null,
      };

      const result = await this.service.toggleFavorite(data);

      res.json({
        message: `Question ${result.action} from favorites`,
        favorite: result.data,
      });
    } catch (error) {
      console.error("Error toggling favorite:", error);
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = QuestionFavoriteController;
