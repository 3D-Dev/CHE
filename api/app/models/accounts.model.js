module.exports = (sequelize, Sequelize) => {
  const Accounts = sequelize.define("accounts", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        trim: true,
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
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      account: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        trim: true,
      },
      activated: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isIntroducer: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      isPublic: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      companyName: {
        type: Sequelize.STRING,
        defaultValue: '',
        trim: true,
      },
      referId: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
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
