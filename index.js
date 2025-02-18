const app = require("./server");
const logger = require("./logger");

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    logger.info(`Server running on http://localhost:${PORT}`);
});

module.exports = server;