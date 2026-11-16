import express from "express";
import type { Request, Response } from "express";
import Animal, { type InterfaceAnimal } from "./models/Pet.js";

// export interface Animal{
//     id: number;
//     nome: string;
//     tipoAnimal: string;
//     especie: string;
//     raca: string;
//     genero: string;
//     idade: number;
// }

const app = express();
app.use(express.json());
app.set("json spaces", 2);

// const animais: Animal[] =[
//     { id: 1,
//         nome: "Lucky",
//         tipoAnimal: "Gato",
//         especie: "Felis catus",
//         raca: "Siamês",
//         genero: "Macho",
//         idade: 0.6
//     },
//     { id: 2,
//         nome: "Thor",
//         tipoAnimal: "Cão",
//         especie: "Canis Lupos familiaris",
//         raca: "Pastor Alemão",
//         genero: "Macho",
//         idade: 1
//     },
//     { id: 3,
//         nome: "Rex",
//         tipoAnimal: "Papagaio",
//         especie: "Amazona amazonica",
//         raca: "Papagaio-Curica",
//         genero: "Macho",
//         idade: 1
//     },
//     { id: 4,
//         nome: "Pandora",
//         tipoAnimal: "Coelho",
//         especie: "Oryctolagus Cuniculus",
//         raca: "Coelho Europeu",
//         genero: "Fêmea",
//         idade: 0.6
//     },
//     { id: 5,
//         nome: "Belinha",
//         tipoAnimal: "Cão",
//         especie: "Canis Lupos familiaris",
//         raca: "Poodle",
//         genero: "Fêmea",
//         idade: 2
//     }
// ];

//FUNÇÕES

// function buscarAnimal(id: string | number): number {
//     return animais.findIndex(animal =>{
//         return animal.id === Number(id);
//     })
// }

//REQUISIÇÕES

app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Codificação BackEnd");
});

//GET REFATORADO 11/11/2026
app.get("/animais", async (req: Request , res: Response) => {
});

//cadastro

app.post("/animais", async (req: Request<{},{},InterfaceAnimal>, res: Response) => {
});

//atualizar dados

app.put("/animais/:id", async (req: Request<{id: string}, {}, InterfaceAnimal>, res: Response) => {
});

//REQUISIÇÃO PATCH (ATUALIZAR PARCIALMENTE OS DADOS)
app.patch("/animais/:id", async (req: Request<{id: string}, {}, InterfaceAnimal>, res: Response) => {
});

//Requisição delet

app.delete("/animais/:id", async (req: Request<{id: string}>, res: Response) => {   
})

//Inicia o servidor na porta 3000

app.listen(3000, () => {
    console.log("Servidor em execução na porta 3000");
});

export default app;