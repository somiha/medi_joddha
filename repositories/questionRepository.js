class QuestionRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async findAll(where = {}, offset = 0, limit = 10) {
    return await this.model.findAndCountAll({
      where,
      offset,
      limit,
      order: [["id", "ASC"]],
    });
  }

  async findById(id) {
    return await this.model.findByPk(id);
  }

  async update(id, data) {
    const question = await this.model.findByPk(id);
    if (!question) return null;
    return await question.update(data);
  }

  async delete(id) {
    const question = await this.model.findByPk(id);
    if (!question) return null;
    await question.destroy();
    return question;
  }

  async findByFilters(filters, offset = 0, limit = 10) {
    return await this.model.findAndCountAll({
      where: filters,
      offset,
      limit,
      order: [["id", "DESC"]],
    });
  }

  async findByIds(ids) {
    return await this.model.findAll({
      where: { id: ids },
    });
  }

  async getRegularQuestions({ subjectId, chapterId, topicId, limit = 10 }) {
    const where = { is_published: true, is_draft: false };
    if (subjectId) where.subject_id = subjectId;
    if (chapterId) where.chapter_id = chapterId;
    if (topicId) where.topic_id = topicId;

    return await this.model.findAll({
      where,
      attributes: [
        "id",
        "subject_id",
        "chapter_id",
        "topic_id",
        "question",
        "answer",
        "des",
        "option1",
        "option2",
        "option3",
        "option4",
        "option5",
        "question_image",
        "answer_image",
        "des_image",
        "option1_image",
        "option2_image",
        "option3_image",
        "option4_image",
        "option5_image",
      ],
      order: this.model.sequelize.literal("RAND()"),
      distinct: true,
      limit,
    });
  }

  // ✅ Updated: Get random board questions via join with optional board_id filtering
  async getBoardQuestions({
    subjectId,
    chapterId,
    topicId,
    boardId,
    limit = 10,
  }) {
    console.log("b id", boardId);
    const where = {
      "questions.is_published": true,
      "questions.is_draft": false,
    };
    if (subjectId) where["questions.subject_id"] = subjectId;
    if (chapterId) where["questions.chapter_id"] = chapterId;
    if (topicId) where["questions.topic_id"] = topicId;

    // Note: boardId filtering will be done in the SQL query

    return await this.model.sequelize.query(
      `
    SELECT DISTINCT 
      q.id,
      q.subject_id,
      q.chapter_id,
      q.topic_id,
      q.question,
      q.answer,
      q.des,
      q.option1,
      q.option2,
      q.option3,
      q.option4,
      q.option5,
      q.question_image,
      q.answer_image,
      q.des_image,
      q.option1_image,
      q.option2_image,
      q.option3_image,
      q.option4_image,
      q.option5_image,
      bq.board_id
    FROM questions q
    INNER JOIN board_questions bq ON q.id = bq.question_id
    WHERE q.is_published = TRUE 
      AND q.is_draft = FALSE
      ${subjectId ? "AND q.subject_id = :subjectId" : ""}
      ${chapterId ? "AND q.chapter_id = :chapterId" : ""}
      ${topicId ? "AND q.topic_id = :topicId" : ""}
      ${boardId ? "AND bq.board_id = :boardId" : ""}
    ORDER BY RAND()
    LIMIT :limit
    `,
      {
        replacements: {
          subjectId: subjectId || null,
          chapterId: chapterId || null,
          topicId: topicId || null,
          boardId: boardId || null,
          limit,
        },
        type: this.model.sequelize.QueryTypes.SELECT,
      }
    );
  }

  async getRandomQuestions({
    subjectId,
    chapterId,
    topicId,
    isBoard = false,
    total = 10,
    boardId,
  }) {
    const limit = Math.max(1, Math.min(parseInt(total) || 10, 100));

    if (isBoard) {
      return await this.getBoardQuestions({
        // ✅ Change from this.questionRepository to this
        subjectId,
        chapterId,
        topicId,
        boardId,
        limit,
      });
    } else {
      return await this.getRegularQuestions({
        // ✅ Change from this.questionRepository to this
        subjectId,
        chapterId,
        topicId,
        limit,
      });
    }
  }
}

module.exports = QuestionRepository;
