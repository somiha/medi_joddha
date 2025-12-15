// models/ContactUs.js
module.exports = (sequelize, DataTypes) => {
  const ContactUs = sequelize.define(
    "ContactUs",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      mobile_number: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "contact_us",
      timestamps: true,
    }
  );

  return ContactUs;
};
