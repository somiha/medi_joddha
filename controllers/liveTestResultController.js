// controllers/liveTestResultController.js
class LiveTestResultController {
  constructor(service) {
    this.service = service;

    this.add = this.add.bind(this);
    this.getByUserId = this.getByUserId.bind(this);
    this.getByTestId = this.getByTestId.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);

    this.getTodaysTests = this.getTodaysTests.bind(this);
    this.getRankingByTestId = this.getRankingByTestId.bind(this);
  }

  async add(req, res) {
    try {
      const {
        user_id,
        test_id,
        marks,
        time_duration,
        right_answer,
        wrong_answer,
        skipped,
      } = req.body;

      const data = { user_id, test_id };
      if (marks !== undefined) data.marks = marks;
      if (time_duration !== undefined) data.time_duration = time_duration;
      if (right_answer !== undefined) data.right_answer = right_answer;
      if (wrong_answer !== undefined) data.wrong_answer = wrong_answer;
      if (skipped !== undefined) data.skipped = skipped;

      const record = await this.service.add(data);

      res.status(201).json({
        message: "Live test submission added successfully",
        record,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getByUserId(req, res) {
    try {
      const { user_id } = req.params;
      const records = await this.service.getByUserId(user_id);
      res.json({ live_tests: records });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async getByTestId(req, res) {
    try {
      const { test_id } = req.params;
      const records = await this.service.getByTestId(test_id);
      res.json({ live_tests: records });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const record = await this.service.getById(id);
      res.json({ live_test: record });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { marks, time_duration, right_answer, wrong_answer, skipped } =
        req.body;

      const data = {};
      if (marks !== undefined) data.marks = marks;
      if (time_duration !== undefined) data.time_duration = time_duration;
      if (right_answer !== undefined) data.right_answer = right_answer;
      if (wrong_answer !== undefined) data.wrong_answer = wrong_answer;
      if (skipped !== undefined) data.skipped = skipped;

      const record = await this.service.update(id, data);

      res.json({
        message: "Live test updated successfully",
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
      res.json({ message: "Live test submission deleted" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getTodaysTests(req, res) {
    try {
      console.log("Fetching today's tests");
      const tests = await this.service.getTodaysTests();
      res.json({ tests });
    } catch (error) {
      console.error("Error fetching today's tests:", error);
      res.status(500).json({ error: "Failed to fetch today's tests" });
    }
  }

  async getRankingByTestId(req, res) {
    try {
      const { test_id } = req.params;
      const ranking = await this.service.getRankingByTestId(parseInt(test_id));
      res.json({ ranking });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = LiveTestResultController;
