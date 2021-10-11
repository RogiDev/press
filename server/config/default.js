require("dotenv").config();

module.exports = {
  app: {
    dbPort: 27017,
    secret: process.env.APP_SECRET_KEY_PROD,
    mongodbUri: process.env.MONGODB_URI_PROD
  }
}
