//export interface ClienteDTO {
   //pedidoId?: string;
    //nome: string;
    //email: string;
    ///telefone:number;

export interface AnimalDTO {
    id?: string;
    nome: string;
    tipoAnimal: string;
    raca: string;
    especie: string;
    idade: number;
    genero: string;
    cover?: string | undefined;
}

export interface FiltroAnimalDTO {
    tipoAnimal?: string;
    raca?: string;
    idade?: number;
}

export interface IAnimalRepository {
    listar(): Promise<AnimalDTO[]>;
    buscarPorId(id: string): Promise<AnimalDTO | null>;
    buscarPorFiltro(filtro: FiltroAnimalDTO): Promise<AnimalDTO[]>;
    cadastrar(dados: AnimalDTO): Promise<AnimalDTO>;
    atualizar(id: string, dados: AnimalDTO): Promise<AnimalDTO[]>;
    atualizarParcial(id: string, dados: Partial<AnimalDTO>): Promise<AnimalDTO | null>;
    deletar(id: string): Promise<boolean>;
}
