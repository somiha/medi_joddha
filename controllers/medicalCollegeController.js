// controllers/medicalCollegeController.js
const { uploadImage } = require("../middleware/upload");

class MedicalCollegeController {
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
      const { name, short_name, description, established_year, location } =
        req.body;

      if (!name || !description) {
        return res.status(400).json({
          error: "Name and description are required",
        });
      }

      let banner = null;

      if (req.files?.image?.length > 0) {
        const file = req.files.image[0];
        const baseUrl = process.env.BASE_URL || "http://localhost:5000";

        banner = `${baseUrl}/uploads/${file.filename}`;
      } else if (req.body.banner_image) {
        banner = req.body.banner_image;
      }

      let uploadedPhotoUrls = [];
      if (req.files?.photos?.length > 0) {
        const baseUrl = process.env.BASE_URL || "http://localhost:5000";
        uploadedPhotoUrls = req.files.photos.map(
          (f) => `${baseUrl}/uploads/${f.filename}`
        );
      }

      const bodyPhotos = Array.isArray(req.body.photos) ? req.body.photos : [];
      const allPhotos = [...uploadedPhotoUrls, ...bodyPhotos];
      const uniquePhotos = [...new Set(allPhotos)];

      const data = {
        name,
        short_name,
        description,
        banner_image: banner,
        photos: uniquePhotos.length > 0 ? uniquePhotos : null,
        established_year: established_year || null,
        location: location || null,
      };

      const college = await this.service.add(data);

      res.status(201).json({
        message: "Medical college added successfully",
        college,
      });
    } catch (error) {
      console.error("Error in add medical college:", error.message);
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const result = await this.service.getAll(req.query);
      res.json({
        colleges: result.rows,
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
      const college = await this.service.getById(id);
      res.json({ college });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      let {
        name,
        short_name,
        description,
        banner_image,
        photos,
        established_year,
        location,
      } = req.body;

      let banner = null;
      if (req.file) {
        banner = `medical-college/${req.file.filename}`;
      } else if (req.body.banner_image) {
        banner = req.body.banner_image;
      }

      let photoUrls = [];
      if (req.body.photos && Array.isArray(req.body.photos)) {
        photoUrls = req.body.photos;
      }

      const data = {
        name,
        short_name,
        description,
        banner_image: banner,
        photos: photoUrls,
        established_year,
        location,
      };

      const college = await this.service.update(id, data);

      res.json({
        message: "Medical college updated successfully",
        college,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await this.service.delete(id);
      res.json({ message: "Medical college deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = MedicalCollegeController;
