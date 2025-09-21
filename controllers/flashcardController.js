// controllers/flashcardController.js
class FlashcardController {
  constructor(service) {
    this.service = service;

    // Bind methods
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
  }

  async getAll(req, res) {
    try {
      const { subject_id, course_id, topic_id } = req.query;

      const filters = {};
      if (subject_id) filters.subject_id = parseInt(subject_id);
      if (course_id) filters.course_id = parseInt(course_id);
      if (topic_id) filters.topic_id = parseInt(topic_id);

      const flashcards = await this.service.getAll(filters);

      res.json({ flashcards });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const flashcard = await this.service.getById(parseInt(id));
      res.json({ flashcard });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = FlashcardController;
