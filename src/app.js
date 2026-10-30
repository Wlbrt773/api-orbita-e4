import express from "express";

const app = express();
app.use(express.json());

const animais =[
    { id: 1, nome: "Lucky",
        especie: "Gato"
    },
    { id: 2, nome: "Thor",
        especie: "Cachorro"
    },
    { id: 3, nome: "Rex",
        especie: "Papagaio"
    },
    { id: 4, nome: "Pandora",
        especie: "Coelho"
    },
    { id: 5, nome: "Belinha" ,
        especie: "Cachorro"
    }
];

function buscarAnimais(id){
    return animais.findIndex(animal =>{
        return animal.id === Number(id);
    })
}

//REQUISIÇÕES

app.get("/", (req, res) => {
    res.status(200).send("Codificação BackEnd");
});

app.get("/animais", (req, res) => {
    res.status(200).json(animais);
});

//cadastro

app.post("/animais", (req, res) => {
    animais.push(req.body);
    res.status(201).json(animais);
});

//atualizar dados

app.put("/animais/:id", (req, res) => {
        const index = buscarAnimais(req.params.id);
        animais[index].nome = req.body.nome;
        res.status(200).json(animais);
})

// Inicia o servidor na porta 3000

app.listen(3000, () => {
    console.log("Servidor em execução na porta 3000");
});

export default app;