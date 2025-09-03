// controllers/premiumProgramUserController.js
class PremiumProgramUserController {
  constructor(service) {
    this.service = service;

    this.add = this.add.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async add(req, res) {
    try {
      const { userId, programId, isActive, note } = req.body;
      const adminId = req.user?.id; // from auth middleware

      if (!userId || !programId) {
        return res
          .status(400)
          .json({ error: "User ID and Program ID are required" });
      }

      const data = { userId, programId, isActive, note };
      const record = await this.service.add(data, adminId);

      res.status(201).json({
        message: "User granted premium access",
        record,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const result = await this.service.getAll(req.query);
      res.json({
        premiumAccess: result.rows,
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
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const record = await this.service.getById(id);
      res.json({ record });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { isActive, note } = req.body;
      const adminId = req.user?.id;

      const data = {};
      if (isActive !== undefined) data.isActive = isActive;
      if (note !== undefined) data.note = note;

      const record = await this.service.update(id, data, adminId);

      res.json({
        message: "Access updated successfully",
        record,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await this.service.delete(id);
      res.json({ message: "Premium access removed" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = PremiumProgramUserController;
