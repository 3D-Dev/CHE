module.exports = (sequelize, Sequelize) => {
  const Accounts = sequelize.define("accounts", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        trim: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        trim: true,
      },
      account: {
        type: Sequelize.STRING,
        allowNull: false,
        trim: true,
      },
      refer_id: {
        type: Sequelize.INTEGER,
      },
      refer_email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        trim: true,
      },
      total_distribution: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      }
    },
    {
      timestamps: true,
      freezeTableName: true,
      instanceMethods: {}
    })

  return Accounts
}
