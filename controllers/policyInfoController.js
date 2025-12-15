// controllers/PolicyInfoController.js
class PolicyInfoController {
  constructor(service) {
    this.service = service;

    this.create = this.create.bind(this);
    this.get = this.get.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  // POST /api/policy-info
  async create(req, res) {
    try {
      const { about_us, terms_condition, privacy_policy } = req.body;

      const data = {
        about_us: about_us || "",
        terms_condition: terms_condition || "",
        privacy_policy: privacy_policy || "",
      };

      const policy = await this.service.create(data);

      res.status(201).json({
        message: "Policy info created successfully",
        policy,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // GET /api/policy-info
  async get(req, res) {
    try {
      const policy = await this.service.getAll();

      if (!policy) {
        return res.status(404).json({ error: "No policy info found" });
      }

      res.json({ policy });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // PUT /api/policy-info/:id
  async update(req, res) {
    try {
      const { id } = req.params;
      const { about_us, terms_condition, privacy_policy } = req.body;

      const data = {};
      if (about_us !== undefined) data.about_us = about_us;
      if (terms_condition !== undefined) data.terms_condition = terms_condition;
      if (privacy_policy !== undefined) data.privacy_policy = privacy_policy;

      const policy = await this.service.update(id, data);

      if (!policy) {
        return res.status(404).json({ error: "Policy info not found" });
      }

      res.json({
        message: "Policy info updated successfully",
        policy,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // DELETE /api/policy-info/:id
  async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await this.service.delete(id);

      if (!result) {
        return res.status(404).json({ error: "Policy info not found" });
      }

      res.json({ message: "Policy info deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = PolicyInfoController;
