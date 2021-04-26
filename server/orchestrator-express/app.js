const express = require("express");
const router = require("./routes");
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.listen(PORT, () => console.log(`This app running on port:`, PORT));
