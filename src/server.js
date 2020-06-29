const express = require("express")
const server = express()

//Recebendo o objeto db lá do arquivo que eu exportei
const db = require("./database/db")

//configurar pasta public e src (clolocar a pasta como se fosse na raiz.)
server.use(express.static("public"))
server.use(express.static('src'))

//habilitar o req.body
server.use(express.urlencoded({extended: true}))

// utilizando template engine nunjucks - bombando o html
const nunjucks = require("nunjucks")
nunjucks.configure("src/views",{
    express:server,
    noCache: true

})

// configurar os caminhos da application
//pagina inicial
//req: request - requisição - pedido= coxinha
//res: response - resposta - servido= toma coxinha
server.get("/", (req,res)=>{
    return res.render("index.html")
})

// pagina create point
server.get("/create-point", (req,res)=>{

    //req.query: Query Strings (?blablabla&etcetal&papapa) da url - aparece nos endereços no form
    //console.log(req.query)

    return res.render("create-point.html")
})

//POST do formulário na página create-point
server.post("/savepoint", (req,res)=>{
    //console.log(req.body)
    
    // inserir dados no banco de dados
     const query = `
        INSERT INTO places (
            image,
            name,
            adress,
            adress2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.adress,
        req.body.adress2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData (err){
        if(err){
            return console.log(err)
        }
        console.log("Cadastrado com sucesso!")
        return res.render("create-point.html",{saved: true})
    }   
    
    db.run(query, values, afterInsertData)
   
})



// pagina search results
server.get("/search", (req,res)=>{

    const search = req.query.search

    if(search ==""){
        //pesquisa vazia
        return res.render("search-results.html",{total:0})
    }

    //pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if(err){
            console.log(err)
        }
       
        const total = rows.length
       
        // retorna a página html com os dados do bd 
        return res.render("search-results.html",{places:rows, total: total})
       
    })
    
})

//ligar o servidor
server.listen(3000)
