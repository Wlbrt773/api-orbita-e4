import express from "express";
import type { Request, Response } from "express";
import animalRoutes from "./routes/animalRoutes.js";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./docs/swagger.js";


const app = express();

//MIDDLEWARE
app.use(express.json());
app.set("json spaces", 2);

//ROTA DA DOCUMENTAÇÃO INTERATIVA (SWAGGER)
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//ROTA BASE
app.get("/", (req: Request, res: Response) => {
    res.status(200).send(" API ORBITA - E4");
});

app.use(animalRoutes);

//Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log("Servidor em execução na porta 3000");
});

export default app;