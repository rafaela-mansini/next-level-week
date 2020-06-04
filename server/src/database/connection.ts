import knex from 'knex';
import path from 'path';

//database configuration

const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite') //dirname retorna diretorio do arquivo onde está sendo executado
    },
    useNullAsDefault: true,
});

export default connection;