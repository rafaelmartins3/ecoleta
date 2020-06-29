//importar a dependência do sqlite
const sqlite3 = require("sqlite3").verbose()


// criar objeto que irá fazer as operações do db
const db = new sqlite3.Database("./src/database/database.db")
// variável db recebe: um novo arquivo do tipo database que vai ser criado no caminho acima

// Exportar o BD
module.exports = db

// utilizar o objeto do banco de dados, para as operações
// db.serialize(() =>{
//     //TODOS COMANDOS SQL
//     // 1 - criar uma tabela - com crase para poder dar enter ("" e '' da problema se der enter)
//     db.run(` 
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             adress TEXT,
//             adress2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)

//     // 2 - inserir dados na tabela
//     const query = `
//         INSERT INTO places (
//             image,
//             name,
//             adress,
//             adress2,
//             state,
//             city,
//             items
//         ) VALUES (?,?,?,?,?,?,?);
//     `
//     const values = [
//         "https://images.unsplash.com/photo-1539692267500-f384fb119654?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=411&q=80",
//         "PaperSide",
//         "Guilherme Gembala, Jardim América",
//         "Número 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Papéis e Papelão"
//     ]

    // function afterInsertData (err){
    //     if(err){
    //         return console.log(err)
    //     }
    //     console.log("Cadastrado com sucesso!")
    //     console.log(this)
    // }
//     db.run(query, values, afterInsertData)
//     // 3 - consultar dados da tabela
//     db.all(`SELECT * FROM places`, function(err, rows){
//         if(err){
//             console.log(err)
//         }

//         console.log("Registros Salvos: ",rows)
//     })

    //4- deletar um dado da tabela

    // db.run(`DELETE FROM places WHERE id = ?`,[5], function(err){
    //     if(err){
    //         console.log(err)
    //     }
    //     console.log("Registro deletado com sucesso!")
        
    // })
//})


