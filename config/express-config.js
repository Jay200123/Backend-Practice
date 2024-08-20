const express = require("express");
const router = express.Router();
const app = express();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

module.exports = { router, app };
