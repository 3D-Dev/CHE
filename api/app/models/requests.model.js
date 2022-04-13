module.exports = (sequelize, Sequelize) => {
  return sequelize.define("request", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 2, // 0: fail, 1: success, 2: waiting
      },
      startAt: {
        type: Sequelize.DATE,
      },
      retruyCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0, // max of retruy is 3
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
      instanceMethods: {}
    })
}
