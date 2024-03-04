const connectDatabase = require("./config/database");

const app = require("./app");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log("uncaughtException", err);
  process.exit(1);
});

//connect to database
connectDatabase();

const server = app.listen(
  process.env.PORT,

  () => {
    console.log(`server is working on http://localhost:${process.env.PORT}`);
  }
);

// unhandled Promise rejection
process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection", err);
  server.close(() => {
    process.exit(1);
  });
});
