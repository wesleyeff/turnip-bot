module.exports = (sequelize, DataTypes) => {
  return sequelize.define('turnipRecords', {
    price: DataTypes.INTEGER,
    timeOfDay: DataTypes.STRING,
    date: DataTypes.DATE,
    dayOfWeek: DataTypes.STRING,
    username: DataTypes.STRING,
    userId: DataTypes.STRING,
    messageUrl: DataTypes.STRING,
    server: DataTypes.STRING,
    channel: DataTypes.STRING,
  })
}
