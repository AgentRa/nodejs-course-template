const { PORT } = require('./common/config');
const app = require('./app');

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);

// For testing uncaughtException

// setTimeout(() => {
//   throw new Error('Oops!');
// }, 1500)

// For testing unhandledRejection

// setTimeout(() => {
//   Promise.reject(new Error('Oops!'));
// }, 1500)
