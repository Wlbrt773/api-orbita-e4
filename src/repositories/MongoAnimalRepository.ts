import Animal from "../models/Pet.js";
import type { IAnimalRepository, AnimalDTO, FiltroAnimalDTO } from "./IAnimalRepository.js";

export class MongoAnimalRepository implements IAnimalRepository {

    async listar() {
        return await Animal.find({});
    }

    async buscarPorId(id: string) {
        return await Animal.findById(id);
    }

    async buscarPorFiltro(filtro: FiltroAnimalDTO) {
        const filtros: Record<string, any> = {};

        if(filtros.tipoAnimal) filtros.tipoAnimal = filtros.tipoAnimal;
        if(filtros.raca) filtros.raca = filtros.raca;
        if(filtros.idade){
            filtros.idade = {$regex: filtros.idade, $options:"i"};
        }
        return await Animal.find(filtros);
    }

    async cadastrar(dados: AnimalDTO) {
        return await Animal.create({
                    nome: dados.nome,
                    tipoAnimal: dados.tipoAnimal,
                    especie: dados.especie,
                    raca: dados.raca,
                    genero: dados.genero,
                    idade: Number(dados.idade),
                    ...(dados.cover !== undefined ? { cover: dados.cover } : {}),
                });
    }

    async atualizar(id: string, dados: AnimalDTO) {
        return await Animal.findByIdAndUpdate(
            id,
            {$set: dados},
            {new: true}
        );
    }

    async atualizarParcial(id: string, dados: Partial<AnimalDTO>) {
        return await Animal.findByIdAndUpdate(
            id,
            {$set: dados},
            {new: true}
        );
    }

    async deletar(id: string) {
        const animalRemovido = await Animal.findByIdAndDelete(id);
        return Boolean(animalRemovido);
    }
}