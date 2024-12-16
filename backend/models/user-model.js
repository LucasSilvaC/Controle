const connection = require('./connection');

// Insere um novo registro na tabela controle
const newUser = async (turma, nome, posto, controle_hora, item1, item2, item3, descricao) => {
    const [result] = await connection.execute(
        `
        INSERT INTO controle (turma, nome, posto, controle_hora, item1, item2, item3, descricao)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [turma, nome, posto, controle_hora, item1, item2, item3, descricao]
    );

    if (result.affectedRows === 0) {
        throw new Error('Erro ao inserir o registro no banco de dados.');
    };

    return result;
};

const checkUser = async (turma, nome, posto) => {
    const [result] = await connection.execute(
        `
        SELECT 
            turma, nome, posto
        FROM 
            controle
        WHERE 
            turma = ? AND nome = ? AND posto = ?
        `,
        [turma, nome, posto]
    );

    if (result.length === 0) {
        return false; 
    }

    return true; 
};

module.exports = { newUser, checkUser };
