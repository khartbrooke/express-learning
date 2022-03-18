const express =require("express");
const parser = require("body-parser");

const app = express();

app.use(parser.json());

const tyranidRoutes = require("./routes/tyranidRoutes");

app.use("/tyranid", tyranidRoutes);

app.use((err, req, res, next) => {
    res.status(err.status).send(err.message);
})

const server = app.listen(4494, () => {
    console.log("Server successfully started on port", server.address().port);
});

module.exports = server;