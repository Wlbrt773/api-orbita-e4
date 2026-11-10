import mongoose, {Schema, Document} from "mongoose";

export interface InterfaceAnimal extends Document{
    nome: string;
    tipoAnimal: string;
    especie: string;
    raca: string;
    genero: string;
    idade: number;
}

//DEFINIÇÃO DO SCHEMA MAPEANDO OS CAMPOS

