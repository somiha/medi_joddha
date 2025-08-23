// controllers/schoolCollegeQuestionController.js
class SchoolCollegeQuestionController {
  constructor(service) {
    this.service = service;

    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.getBySchoolCollege = this.getBySchoolCollege.bind(this);
    this.getBySubjectAndChapter = this.getBySubjectAndChapter.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(req, res) {
    try {
      const { school_college_id, question_id, year } = req.body;

      if (!school_college_id || !question_id || !year) {
        return res.status(400).json({
          error: "school_college_id, question_id, and year are required",
        });
      }

      const data = await this.service.create({
        school_college_id,
        question_id,
        year,
      });

      res.status(201).json({
        message: "School/College question mapping created successfully",
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

  async getBySchoolCollege(req, res) {
    try {
      const { schoolCollegeId } = req.params;
      const data = await this.service.getBySchoolCollegeId(schoolCollegeId);
      if (data.length === 0) {
        return res
          .status(404)
          .json({ error: "No questions found for this school/college" });
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
          error:
            "No school-college questions found for this subject and chapter",
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
      const { school_college_id, question_id, year } = req.body;

      const data = await this.service.update(id, {
        school_college_id,
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

module.exports = SchoolCollegeQuestionController;
