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
    try{
        const listaAnimais = await Animal.find({});
        res.status(200).json(listaAnimais);
    }catch (erro){
        res.status(500).json({ mensagem: "Erro ao buscar animal."});
    }
    
});

//cadastro

app.post("/animais", async (req: Request<{},{},InterfaceAnimal>, res: Response) => {
    
    try{
    const {nome, tipoAnimal, especie, raca, genero, idade} = req.body;

    const novoAnimal = await Animal.create({
        nome,
        tipoAnimal,
        especie,
        raca,
        genero,
        idade: Number(idade),
    });

        res.status(201).json({
            mensagem: "Animal Cadastrado com Sucesso!",
            Animal: novoAnimal
        });
        }catch (error){
            res.status(500).json({mensagem:"Error ao cadastrar animal."})
        }
    });

//atualizar dados

app.put("/animais/:id", (req: Request, res: Response) => {
    const index = buscarAnimal(String(req.params.id));

    //verifica se o animal foi encontrado

    if (index === -1) {
        res.status(404).json({
            mensagem: "Animal não encontrado!"
        });
            return;
    }

    const {nome, tipoAnimal, especie, raca, genero, idade} = req.body;
        animais[index]= {
        ...animais[index]!,
        nome,
        tipoAnimal,
        especie,
        raca,
        genero,
        idade: Number(idade),
        };

//Resposta com mensagem

res.status(200).json({
        mensagem: "Animal atualizado com sucesso!",
        animal: animais[index]
    });
});

//alterações específicas

app.patch("/animais/:id", (req: Request, res: Response) => {
    const index = buscarAnimal(String(req.params.id));

    if (index === -1) {
        res.status(404).json({
            mensagem: "Animal não encontrado!"
        });
        return;
    }

    const { nome, tipoAnimal, especie, raca, genero, idade } = req.body;
    animais[index] = {
        ...animais[index]!,
        ...(nome !== undefined && { nome }),
        ...(tipoAnimal !== undefined && { tipoAnimal }),
        ...(especie !== undefined && { especie }),
        ...(raca !== undefined && { raca }),
        ...(genero !== undefined && { genero }),
        ...(idade !== undefined && { idade: Number(idade) })
    };

    //Resposta com mensagem

    res.status(200).json({
        mensagem: "Animal atualizado com sucesso!",
        animal: animais[index]
    });
});

//Requisição delete

app.delete("/animais/:id",(req: Request, res: Response) => {
    const index = buscarAnimal(String(req.params.id));

    if (index === -1){
        res.status(404).json({menssagem: "animal não encontrado"})
    }

// Remove o Livro do Array
    animais.splice(index,1);

    res.status(200).json({
        menssagem: "animal removido com sucesso!",
    
    });
});
//Inicia o servidor na porta 3000

app.listen(3000, () => {
    console.log("Servidor em execução na porta 3000");
});

export default app;