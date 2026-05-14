import "dotenv/config";
import express from "express";
import cors from "cors";
import routes from "./src/routes/index.js";

const PORT = 4000;

const app = express();
app.use(cors());
routes(app);

app.listen(PORT, () => {
    console.log(`servidor escutando na porta ${PORT}`);
});

export default app;
