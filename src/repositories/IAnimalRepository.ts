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
    listar(): Promise<any[]>;
    buscarPorId(id: string): Promise<any | null>;
    buscarPorFiltro(filtro: FiltroAnimalDTO): Promise<any[]>;
    cadastrar(dados: AnimalDTO): Promise<any>;
    atualizar(id: string, dados: AnimalDTO): Promise<any[]>;
    atualizarParcial(id: string, dados: Partial<AnimalDTO>): Promise<any | null>;
    deletar(id: string): Promise<boolean>;
}
