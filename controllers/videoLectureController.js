// controllers/VideoLectureController.js
class VideoLectureController {
  constructor(service) {
    this.service = service;

    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.getBySubjectId = this.getBySubjectId.bind(this);
    this.getByChapterId = this.getByChapterId.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  // POST /api/video-lectures
  async create(req, res) {
    try {
      const {
        url,
        course,
        course_id,
        subject_id,
        chapter_id,
        topic_id,
        notes,
      } = req.body;

      const data = {
        url,
        course,
        course_id,
        subject_id,
        chapter_id,
        topic_id,
        notes,
      };

      const lecture = await this.service.create(data);

      res.status(201).json({
        message: "Video lecture created successfully",
        lecture,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // GET /api/video-lectures?page=1&limit=10
  async getAll(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const result = await this.service.getAll({ offset, limit });

      res.json({
        lectures: result.rows,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(result.count / limit),
          totalItems: result.count,
          hasNext: page * limit < result.count,
          hasPrev: page > 1,
        },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // GET /api/video-lectures/1
  async getById(req, res) {
    try {
      const { id } = req.params;
      const lecture = await this.service.getById(id);

      if (!lecture) {
        return res.status(404).json({ error: "Video lecture not found" });
      }

      res.json({ lecture });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // GET /api/video-lectures/subject/5?page=1&limit=10
  async getBySubjectId(req, res) {
    try {
      const { subject_id } = req.params;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const result = await this.service.getBySubjectId(subject_id, {
        offset,
        limit,
      });

      if (result.rows.length === 0) {
        return res.status(404).json({
          error: "No video lectures found for this subject",
        });
      }

      res.json({
        lectures: result.rows,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(result.count / limit),
          totalItems: result.count,
          hasNext: page * limit < result.count,
          hasPrev: page > 1,
        },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // GET /api/video-lectures/chapter/3?page=1&limit=10
  async getByChapterId(req, res) {
    try {
      const { chapter_id } = req.params;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const result = await this.service.getByChapterId(chapter_id, {
        offset,
        limit,
      });

      if (result.rows.length === 0) {
        return res.status(404).json({
          error: "No video lectures found for this chapter",
        });
      }

      res.json({
        lectures: result.rows,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(result.count / limit),
          totalItems: result.count,
          hasNext: page * limit < result.count,
          hasPrev: page > 1,
        },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // PUT /api/video-lectures/1
  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;

      const updated = await this.service.update(id, data);

      if (!updated) {
        return res.status(404).json({ error: "Video lecture not found" });
      }

      res.json({
        message: "Video lecture updated successfully",
        lecture: updated,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // DELETE /api/video-lectures/1
  async delete(req, res) {
    try {
      const { id } = req.params;
      await this.service.delete(id);

      res.json({ message: "Video lecture deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = VideoLectureController;
