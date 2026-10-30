import express from "express";

const app = express();
app.use(express.json());

const animais =[
    { id: 1, nome: "Lucky",
        tipoAnimal: "Gato",
        especie: "Felis catus",
        raca: "Siamês",
        genero: "Macho",
        idade: "5 Meses"
    },
    { id: 2, nome: "Thor",
        tipoAnimal: "Cão",
        especie: "Canis Lupos familiaris",
        raca: "Pastor Alemão",
        genero: "Macho",
        idade: "1 Ano"
    },
    { id: 3, nome: "Rex",
        tipoAnimal: "Papagaio",
        especie: "Amazona amazonica",
        raca: "Papagaio-Curica",
        genero: "Macho",
        idade: "1 Ano"
    },
    { id: 4, nome: "Pandora",
        tipoAnimal: "Coelho",
        especie: "Oryctolagus Cuniculus",
        raca: "Coelho Europeu",
        genero: "fêmea",
        idade: "6 meses"
    },
    { id: 5, nome: "Belinha",
        tipoAnimal: "Cão",
        especie: "Canis Lupos familiaris",
        raca: "Poodle",
        genero: "fêmea",
        idade: "2 Anos"
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
    const {nome, tipoAnimal, especie, raca, genero, idade}
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