const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connectDatabase = () => {
  try {
    mongoose.connect(process.env.DB_URL, {}).then((data) => {
      console.log(`${data.connection.host}`);
    });
  } catch {
    (err) => {
      console.log(err);
    };
  }
};

module.exports = connectDatabase;
