// controllers/AppGuidelineController.js
// const path = require("path");

// class AppGuidelineController {
//   constructor(service) {
//     this.service = service;

//     this.create = this.create.bind(this);
//     this.getAll = this.getAll.bind(this);
//     this.getById = this.getById.bind(this);
//     this.update = this.update.bind(this);
//     this.delete = this.delete.bind(this);
//   }

//   // POST /api/app-guidelines
//   async create(req, res) {
//     try {
//       const { title, video_url } = req.body;
//       let videoFilename = null;

//       if (req.file) {
//         videoFilename = req.file.filename;
//       }

//       const data = {
//         title,
//         video: videoFilename,
//         video_url: video_url || null,
//       };

//       const guideline = await this.service.create(data);

//       res.status(201).json({
//         message: "App guideline created successfully",
//         guideline,
//       });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }

//   // GET /api/app-guidelines?page=1&limit=10
//   async getAll(req, res) {
//     try {
//       const page = parseInt(req.query.page) || 1;
//       const limit = parseInt(req.query.limit) || 10;
//       const offset = (page - 1) * limit;

//       const result = await this.service.getAll({ offset, limit });

//       // Make video URLs absolute
//       const baseUrl = `${req.protocol}://${req.get("host")}`;
//       const mappedRows = result.rows.map((item) => ({
//         ...item,
//         video: item.video ? `${baseUrl}/uploads/${item.video}` : null,
//       }));

//       res.json({
//         guidelines: mappedRows,
//         pagination: {
//           currentPage: page,
//           totalPages: Math.ceil(result.count / limit),
//           totalItems: result.count,
//           hasNext: page * limit < result.count,
//           hasPrev: page > 1,
//         },
//       });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }

//   // GET /api/app-guidelines/1
//   async getById(req, res) {
//     try {
//       const { id } = req.params;
//       const guideline = await this.service.getById(id);

//       if (!guideline) {
//         return res.status(404).json({ error: "Guideline not found" });
//       }

//       const baseUrl = `${req.protocol}://${req.get("host")}`;
//       const response = {
//         ...guideline,
//         video: guideline.video ? `${baseUrl}/uploads/${guideline.video}` : null,
//       };

//       res.json({ guideline: response });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }

//   // PUT /api/app-guidelines/1
//   async update(req, res) {
//     try {
//       const { id } = req.params;
//       const { title, video_url } = req.body;
//       const existing = await this.service.getById(id);

//       if (!existing) {
//         return res.status(404).json({ error: "Not found" });
//       }

//       let videoFilename = existing.video;
//       if (req.file) {
//         // Optional: Delete old file here
//         videoFilename = req.file.filename;
//       }

//       const data = {
//         title: title || existing.title,
//         video: videoFilename,
//         video_url: video_url !== undefined ? video_url : existing.video_url,
//       };

//       const updated = await this.service.update(id, data);

//       res.json({
//         message: "Updated successfully",
//         guideline: {
//           ...updated.toJSON(),
//           video: updated.video
//             ? `${req.protocol}://${req.get("host")}/uploads/${updated.video}`
//             : null,
//         },
//       });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }

//   // DELETE /api/app-guidelines/1
//   async delete(req, res) {
//     try {
//       const { id } = req.params;
//       const existing = await this.service.getById(id);

//       if (!existing) {
//         return res.status(404).json({ error: "Not found" });
//       }

//       // Optionally delete physical file
//       if (existing.video) {
//         const filePath = path.join(__dirname, "../uploads", existing.video);
//         require("fs").unlink(filePath, (err) => {
//           if (err) console.error("Failed to delete file:", err);
//         });
//       }

//       await this.service.delete(id);

//       res.json({ message: "Deleted successfully" });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }
// }

// module.exports = AppGuidelineController;

const path = require("path");

class AppGuidelineController {
  constructor(service) {
    this.service = service;

    // Bind all methods to ensure they are proper functions
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(req, res) {
    try {
      const { title, video_url } = req.body;
      let videoFilename = null;

      if (req.file) {
        videoFilename = req.file.filename;
      }

      const data = {
        title,
        video: videoFilename,
        video_url: video_url || null,
      };

      const guideline = await this.service.create(data);

      res.status(201).json({
        message: "App guideline created successfully",
        guideline,
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

      const baseUrl = `${req.protocol}://${req.get("host")}`;
      const mappedRows = result.rows.map((item) => ({
        ...item,
        video: item.video ? `${baseUrl}/uploads/${item.video}` : null,
      }));

      res.json({
        guidelines: mappedRows,
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
      const guideline = await this.service.getById(id);

      if (!guideline) {
        return res.status(404).json({ error: "Guideline not found" });
      }

      const baseUrl = `${req.protocol}://${req.get("host")}`;
      const response = {
        ...guideline,
        video: guideline.video ? `${baseUrl}/uploads/${guideline.video}` : null,
      };

      res.json({ guideline: response });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { title, video_url } = req.body;
      const existing = await this.service.getById(id);

      if (!existing) {
        return res.status(404).json({ error: "Not found" });
      }

      let videoFilename = existing.video;
      if (req.file) {
        videoFilename = req.file.filename;
      }

      const data = {
        title: title || existing.title,
        video: videoFilename,
        video_url: video_url !== undefined ? video_url : existing.video_url,
      };

      const updated = await this.service.update(id, data);

      res.json({
        message: "Updated successfully",
        guideline: {
          ...updated.toJSON(),
          video: updated.video
            ? `${req.protocol}://${req.get("host")}/uploads/${updated.video}`
            : null,
        },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const existing = await this.service.getById(id);

      if (!existing) {
        return res.status(404).json({ error: "Not found" });
      }

      if (existing.video) {
        const filePath = path.join(__dirname, "../uploads", existing.video);
        require("fs").unlink(filePath, (err) => {
          if (err) console.error("Failed to delete file:", err);
        });
      }

      await this.service.delete(id);

      res.json({ message: "Deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = AppGuidelineController;
