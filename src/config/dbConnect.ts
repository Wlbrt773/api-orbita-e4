import mongoose from "mongoose";

async function conectaNaDatabase(): Promise<typeof mongoose.connection>{

    const dbURI = process.env.DB_CONNECTION_STRING;

    if(!dbURI){
        throw new Error(
            "Variável não encontrado no arquivo .env",
        );
    }

    await mongoose.connect(dbURI);

    return mongoose.connection;
}

export default conectaNaDatabase;