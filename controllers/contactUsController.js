// controllers/ContactUsController.js
class ContactUsController {
  constructor(service) {
    this.service = service;

    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(req, res) {
    try {
      const { mobile_number, email, address } = req.body;

      const data = { mobile_number, email, address };

      const contact = await this.service.create(data);

      res.status(201).json({
        message: "Contact info created successfully",
        contact,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const result = await this.service.getAll({ offset, limit });

      res.json({
        contacts: result.rows,
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

  async getById(req, res) {
    try {
      const { id } = req.params;
      const contact = await this.service.getById(id);

      if (!contact) {
        return res.status(404).json({ error: "Contact not found" });
      }

      res.json({ contact });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { mobile_number, email, address } = req.body;

      const data = {};
      if (mobile_number !== undefined) data.mobile_number = mobile_number;
      if (email !== undefined) data.email = email;
      if (address !== undefined) data.address = address;

      const contact = await this.service.update(id, data);

      if (!contact) {
        return res.status(404).json({ error: "Contact not found" });
      }

      res.json({
        message: "Contact updated successfully",
        contact,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await this.service.delete(id);

      res.json({ message: "Contact deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = ContactUsController;
