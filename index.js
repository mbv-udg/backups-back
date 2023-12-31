const Express = require("express");
const cors = require('cors')
const app = Express();

const { port } = require("./config");
const PORT = process.env.PORT || port;

app.use(cors());
app.use(Express.json());

// Express Routes Import
const AuthorizationRoutes = require("./authorization/routes");
const MainRoutes = require("./main/routes");

// Starting app
app.use("/", AuthorizationRoutes);
app.use("/backups", MainRoutes);

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", port);
});