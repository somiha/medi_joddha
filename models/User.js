// models/User.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: DataTypes.STRING,
      institution_type: DataTypes.STRING,
      institution_name: DataTypes.STRING,
      class: DataTypes.STRING,
      year: DataTypes.INTEGER,
      admission_type: DataTypes.STRING,
      mobile_number: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      device_id: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      referer: DataTypes.STRING,
    },
    {
      tableName: "users",
      indexes: [
        {
          unique: true,
          fields: ["email"],
        },
        {
          unique: true,
          fields: ["mobile_number"],
        },
      ],
    }
  );

  return User;
};
