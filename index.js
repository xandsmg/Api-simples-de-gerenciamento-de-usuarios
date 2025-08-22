'use strict'
/**
 *  Gerenciamento de diretório de usuários. Cada registro de usuário conterá um nome
 * sobrenome e identificador numérico exclusivo que será usado para gerenciar cada um dos usuários individualmente.
 */

const express = require("express")
const app = express()
const body_parser = require("body-parser")
const http = require("http")

/**
 * o pacote body-parser é um middleware projetado para analisar o body da requisição recebida
 * 
 */
app.use(body_parser.json())
app.use(body_parser.urlencoded({ extended:false }))

var users = []


//Adicionar o usúario
app.post("/user_add", function(req, res) {
    var data = req.body

    if(data.first_name && data.last_name) {
        var user = {
            id: users.length + 1,
            date: new Date().toString(),
            first_name: data.first_name,
            last_name: data.last_name
        }
        
        users.push(user)
        
        res.status(200).json({
            message: "Usuário criado com sucesso.",
            user: user.first_name + " " + user.last_name
        })
    } else {
        res.status(400).json({
            message: "Criação de usuário inválida."
        })
    }
})

//Mostrar todos os usúarios
app.get("/users", function(req, res) {
    try {
        res.status(200).json({
            message: "Usuários resgatados com sucesso.",
            response: users
        })
    } catch (error) {
        res.status(401).json({
            message: "Usúarios não encontrados."
        })
    }
})

//Selecionar o usúario específico
app.get("/users/:id", function(req, res) {
    var id = req.params.id

    try {
        for(var i = 0; i < users.length; i++) {
            if(id == users[i].id) {
                res.status(200).json({
                    message: "Úsuario encontrado com sucesso",
                    response: users[i]
                })
            }
        }
    } catch (error) {
        res.status(400).json({
            message: "Úsuario não encontrado"
        })
    }
})

//Atualizar o usúario
app.patch("/user_update/:id", function(req, res) {
    var id = req.params.id
    var data = req.body

    try {
        for(var i = 0; i < users.length; i++) {
            if(id == users[i].id) {
                users[i].first_name = data.first_name
                users[i].last_name = data.last_name
    
                res.status(200).json({
                    message: "Usúario atualizado com sucesso!"
                })
            }
        }
    } catch (error) {
        res.status(401).json({
            message: "Usúario não encontrado."
        })
    }

})

//Deletar o usúario
app.delete("/user_delete/:id", function(req, res) {
    var id = req.params.id
    var data = req.body

    try {
        for(var i = 0; i < users.length; i++) {
            if(id == users[i].id) {
                users.splice(i, 1)
    
                res.status(200).json({
                    message: "Usúario deletado com sucesso.",
                })
            }
        }
    } catch (error) {
        res.status(401).json({
            message: "Usúario não encontrado"
        })
    }
})

app.listen(3000, function() {
    console.log("http://localhost:3000/")
})
