-- CreateTable
CREATE TABLE "Animal" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "raca" TEXT NOT NULL,
    "especie" TEXT NOT NULL,
    "tipoAnimal" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "genero" TEXT NOT NULL,
    "cover" TEXT NOT NULL DEFAULT 'https://placehold.co/300x450?text=No+Cover',

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("id")
);
