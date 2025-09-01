// models/Admin.js
module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    "Admin",
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
      mobile_number: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      otp: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      otp_expires_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "admins",
      indexes: [
        {
          unique: true,
          fields: ["mobile_number"],
        },
      ],
    }
  );

  return Admin;
};
