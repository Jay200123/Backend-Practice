const { errorJson, errorHandler } = require("../middleware/errorJson");
const express = require("express");
const router = express.Router();
const app = express();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
app.use(errorJson);
app.use(errorHandler);

module.exports = { router, app };
