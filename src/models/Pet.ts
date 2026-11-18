import mongoose, {Schema, Document, type InferSchemaType} from "mongoose";

//DEFINIÇÃO DO SCHEMA MAPEANDO OS CAMPOS
const animalSchema = new Schema (
    {
        nome: { type: String, required: true },
        tipoAnimal: { type: String, required: true },
        especie: { type: String, required: true },
        raca: { type: String, required: true },
        genero: { type: String, required: true },
        idade: { type: Number, required: true },
        cover: {type: String, default: "https://placehold.co/300x450?text=No+Cover"},
    },
    { versionKey: false}

);

//EXTRAÇÃO AUTOMÁTICA DO TIPOP (SUBSTITUIR A CRIAÇÃO MANUAL DA INTERFACE)
export type InterfaceAnimal = InferSchemaType<typeof animalSchema>;

//CRIAÇÃO DO MODEL (MONGOOSE)
const Animal = mongoose.model("Animal", animalSchema);

//DISPONIBILIZA O MÓDULO PARA SER IMPORTADO
export default Animal;