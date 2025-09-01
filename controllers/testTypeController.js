// controllers/test_typeController.js
class TestTypeController {
  constructor(service) {
    this.service = service;

    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(req, res) {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ error: "Name is required" });
      }

      const test_type = await this.service.create({ name });

      res.status(201).json({
        message: "TestType created successfully",
        test_type,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const test_types = await this.service.getAll();
      res.json({ test_types });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const test_type = await this.service.getById(id);
      res.json({ test_type });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await this.service.delete(id);
      res.json({ message: "TestType deleted successfully" });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = TestTypeController;
