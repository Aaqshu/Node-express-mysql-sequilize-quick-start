module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "rootPasswordGiven@123",
  DB: "biobydecades",
  dialect: "mysql",
  operatorsAliases: '0',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
