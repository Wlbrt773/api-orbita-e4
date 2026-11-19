export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "API de Gerenciamento de Animais",
    version: "1.0.0",
    description: "Documentação completa das rotas da entidade Animal",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor de Desenvolvimento",
    },
  ],
  tags: [
    {
      name: "Animais",
      description: "Operações de cadastro, consulta, atualização e remoção de animais",
    },
  ],
  components: {
    schemas: {
      Animal: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            example: "65f1a2b3c4d5e6f7a8b9c0d1",
          },
          nome: {
            type: "string",
            minLength: 3,
            example: "Rex",
          },
          raca: {
            type: "string",
            minLength: 3,
            example: "Labrador",
          },
          especie: {
            type: "string",
            minLength: 3,
            example: "Canina",
          },
          tipoAnimal: {
            type: "string",
            example: "Cachorro",
          },
          idade: {
            type: "integer",
            example: 3,
          },
          genero: {
            type: "string",
            minLength: 3,
            example: "Macho",
          },
          cover: {
            type: "string",
            format: "uri",
            example: "https://exemplo.com/imagens/rex.jpg",
          },
        },
      },
      CriarAnimalInput: {
        type: "object",
        required: ["nome", "raca", "especie", "idade", "genero"],
        properties: {
          nome: {
            type: "string",
            minLength: 3,
            example: "Rex",
          },
          raca: {
            type: "string",
            minLength: 3,
            example: "Labrador",
          },
          especie: {
            type: "string",
            minLength: 3,
            example: "Canina",
          },
          idade: {
            type: "integer",
            maximum: 2026,
            example: 3,
          },
          genero: {
            type: "string",
            minLength: 3,
            example: "Macho",
          },
          cover: {
            type: "string",
            format: "uri",
            nullable: true,
            example: "https://exemplo.com/imagens/rex.jpg",
          },
        },
      },
      AtualizarAnimalParcialInput: {
        type: "object",
        properties: {
          nome: {
            type: "string",
            minLength: 3,
            example: "Thor",
          },
          raca: {
            type: "string",
            minLength: 3,
            example: "Golden Retriever",
          },
          especie: {
            type: "string",
            minLength: 3,
            example: "Canina",
          },
          idade: {
            type: "integer",
            maximum: 2026,
            example: 4,
          },
          genero: {
            type: "string",
            minLength: 3,
            example: "Macho",
          },
          cover: {
            type: "string",
            format: "uri",
            nullable: true,
            example: "https://exemplo.com/imagens/thor.jpg",
          },
        },
      },
      ErroValidacao: {
        type: "object",
        properties: {
          mensagem: {
            type: "string",
            example: "Erro de validação nos dados enviados.",
          },
          erros: {
            type: "array",
            items: {
              type: "object",
              properties: {
                campo: {
                  type: "string",
                  example: "nome",
                },
                mensagem: {
                  type: "string",
                  example: "O nome deve ter pelo menos 3 caracteres.",
                },
              },
            },
          },
        },
      },
      MensagemErro: {
        type: "object",
        properties: {
          mensagem: {
            type: "string",
            example: "Erro interno no servidor.",
          },
        },
      },
    },
  },
  paths: {
    "/animais": {
      get: {
        tags: ["Animais"],
        summary: "Listar todos os animais",
        description: "Retorna uma lista com todos os animais cadastrados no banco de dados.",
        responses: {
          "200": {
            description: "Lista de animais retornada com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Animal",
                  },
                },
              },
            },
          },
          "500": {
            description: "Erro interno ao buscar animais.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemErro",
                },
                example: {
                  mensagem: "Erro ao buscar animal.",
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Animais"],
        summary: "Cadastrar um novo animal",
        description: "Cria um novo registro de animal após validação via Zod.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CriarAnimalInput",
              },
              example: {
                nome: "Rex",
                raca: "Labrador",
                especie: "Canina",
                idade: 3,
                genero: "Macho",
                cover: "https://exemplo.com/imagens/rex.jpg",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Animal cadastrado com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    mensagem: {
                      type: "string",
                      example: "Animal Cadastrado com Sucesso!",
                    },
                    Animal: {
                      $ref: "#/components/schemas/Animal",
                    },
                  },
                },
              },
            },
          },
          "400": {
            description: "Dados de entrada inválidos (falha na validação Zod).",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroValidacao",
                },
              },
            },
          },
          "500": {
            description: "Erro interno ao cadastrar animal.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemErro",
                },
                example: {
                  mensagem: "Error ao cadastrar animal.",
                },
              },
            },
          },
        },
      },
    },
    "/animais/busca": {
      get: {
        tags: ["Animais"],
        summary: "Buscar animais por filtro",
        description: "Filtra animais utilizando parâmetros opcionais via query string.",
        parameters: [
          {
            name: "tipoAnimal",
            in: "query",
            required: false,
            description: "Tipo do animal (busca exata).",
            schema: {
              type: "string",
              example: "Cachorro",
            },
          },
          {
            name: "raca",
            in: "query",
            required: false,
            description: "Raça do animal (busca exata).",
            schema: {
              type: "string",
              example: "Labrador",
            },
          },
          {
            name: "idade",
            in: "query",
            required: false,
            description: "Idade do animal (filtro por correspondência parcial/regex case-insensitive).",
            schema: {
              type: "string",
              example: "3",
            },
          },
        ],
        responses: {
          "200": {
            description: "Lista de animais filtrados retornada com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Animal",
                  },
                },
              },
            },
          },
          "400": {
            description: "Parâmetros de consulta inválidos.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroValidacao",
                },
              },
            },
          },
          "500": {
            description: "Erro interno ao filtrar animais.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemErro",
                },
                example: {
                  mensagem: "Error ao filtrar animal.",
                },
              },
            },
          },
        },
      },
    },
    "/animais{id}": {
      get: {
        tags: ["Animais"],
        summary: "Buscar animal por ID",
        description: "Retorna os dados de um animal específico a partir do seu ID (rota configurada como /animais:id no Express).",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID do animal no banco de dados.",
            schema: {
              type: "string",
              example: "65f1a2b3c4d5e6f7a8b9c0d1",
            },
          },
        ],
        responses: {
          "200": {
            description: "Animal encontrado com sucesso.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Animal",
                },
              },
            },
          },
          "400": {
            description: "Formato de ID inválido.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemErro",
                },
                example: {
                  mensagem: "ID inválido.",
                },
              },
            },
          },
          "404": {
            description: "Animal não encontrado.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemErro",
                },
                example: {
                  mensagem: "animal não encontrado.",
                },
              },
            },
          },
          "500": {
            description: "Erro interno ao buscar animal por ID.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemErro",
                },
                example: {
                  mensagem: "Erro ao buscar animal po ID.",
                },
              },
            },
          },
        },
      },
    },
    "/animais/{id}": {
      put: {
        tags: ["Animais"],
        summary: "Atualizar completamente um animal",
        description: "Substitui todos os dados obrigatórios de um animal existente pelo ID.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID do animal a ser atualizado.",
            schema: {
              type: "string",
              example: "65f1a2b3c4d5e6f7a8b9c0d1",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CriarAnimalInput",
              },
              example: {
                nome: "Rex Atualizado",
                raca: "Labrador Retriever",
                especie: "Canina",
                idade: 4,
                genero: "Macho",
                cover: "https://exemplo.com/imagens/rex-novo.jpg",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Animal atualizado com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    mensagem: {
                      type: "string",
                      example: "Animal atualizado com sucesso!",
                    },
                    animal: {
                      $ref: "#/components/schemas/Animal",
                    },
                  },
                },
              },
            },
          },
          "400": {
            description: "Dados inválidos enviados no corpo da requisição.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroValidacao",
                },
              },
            },
          },
          "404": {
            description: "Animal não encontrado.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemErro",
                },
                example: {
                  mensagem: "Animal não encontrado!",
                },
              },
            },
          },
          "500": {
            description: "Erro interno ao atualizar animal.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemErro",
                },
                example: {
                  mensagem: "Erro ao atualizar animal.",
                },
              },
            },
          },
        },
      },
      patch: {
        tags: ["Animais"],
        summary: "Atualizar parcialmente um animal",
        description: "Atualiza apenas os campos informados de um animal existente pelo ID.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID do animal a ser atualizado parcialmente.",
            schema: {
              type: "string",
              example: "65f1a2b3c4d5e6f7a8b9c0d1",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AtualizarAnimalParcialInput",
              },
              example: {
                nome: "Thor",
                idade: 5,
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Animal atualizado parcialmente com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    mensagem: {
                      type: "string",
                      example: "Animal atualizado parcialmente com sucesso!",
                    },
                    animal: {
                      $ref: "#/components/schemas/Animal",
                    },
                  },
                },
              },
            },
          },
          "400": {
            description: "Dados inválidos enviados na atualização parcial.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErroValidacao",
                },
              },
            },
          },
          "404": {
            description: "Animal não encontrado.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemErro",
                },
                example: {
                  mensagem: "Animal não encontrado!",
                },
              },
            },
          },
          "500": {
            description: "Erro interno ao atualizar parcialmente o animal.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemErro",
                },
                example: {
                  mensagem: "Erro ao atualizar parcialmente o animal.",
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Animais"],
        summary: "Remover um animal",
        description: "Remove permanentemente um animal do banco de dados pelo ID.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID do animal a ser removido.",
            schema: {
              type: "string",
              example: "65f1a2b3c4d5e6f7a8b9c0d1",
            },
          },
        ],
        responses: {
          "200": {
            description: "Animal removido com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    mensagem: {
                      type: "string",
                      example: "animal removido com sucesso!",
                    },
                  },
                },
              },
            },
          },
          "400": {
            description: "Formato de ID inválido.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemErro",
                },
                example: {
                  mensagem: "ID inválido.",
                },
              },
            },
          },
          "404": {
            description: "Animal não encontrado.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemErro",
                },
                example: {
                  mensagem: "Animal não encontrado!",
                },
              },
            },
          },
          "500": {
            description: "Erro interno ao remover animal.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MensagemErro",
                },
                example: {
                  mensagem: "Erro ao remover animal.",
                },
              },
            },
          },
        },
      },
    },
  },
} as const;