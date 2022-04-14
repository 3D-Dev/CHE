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
        unique: true,
        trim: true,
      },
      referId: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      referEmail: {
        type: Sequelize.STRING,
        trim: true,
        defaultValue: '',
      },
      distributed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      totalDistribution: {
        type: Sequelize.BIGINT,
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
