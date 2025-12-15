// models/PolicyInfo.js
module.exports = (sequelize, DataTypes) => {
  const PolicyInfo = sequelize.define(
    "PolicyInfo",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      about_us: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      terms_condition: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      privacy_policy: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "policy_info",
      timestamps: true,
    }
  );

  return PolicyInfo;
};
