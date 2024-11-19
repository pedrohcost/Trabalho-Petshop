const express  = require('express');
const cors = require('cors');
const connection = require('../back/db_config')

const app = express()
app.use(cors())
app.use(express.json())


const port = 3063

app.listen(port, () => console.log(`servidor rodando na porta ${port}`));


//pegar dados do cliente do banco


app.post('/cliente/cadastrar', (request, response) => {
    const { nome, telefone, endereco } = request.body

   // Buscar no banco de dados se existe o email e a digitada
    const query = 'INSERT INTO Cliente (nome, telefone, endereco) VALUES (?, ?, ?)'
    connection.query(query, [nome, telefone, endereco], (err, result) => {
        
       // primeiro lidar com o erro do mySQL se existir
        if (err) {
           return response.status(500).json({
               success: false,
               message: "Erro no cadastro",
            
           })
       }   
       else{
           return response.status(201).json({
               message: "Cadastro realizado com sucesso",
               success: true,
               cliente: result,
             
           })
       }
    })
})

//LISTAR CLIENTE
app.get('/cliente/listar', (req, res) => {
    const query = 'SELECT * FROM Cliente'
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao buscar clientes.' });
        }
        res.json({ success: true, data: results });
    });
});

//EDITAR CLIENTE

app.put('/cliente/editar/:id', (req, res) => {
    const {id} = req.params 
    const {nome, telefone, endereco} = req.body
    const query = 'UPDATE Cliente SET nome = ?, endereco = ?, telefone = ? WHERE id = ?'
    connection.query(query, [nome, telefone, endereco, id], (err) =>{
        if (err){
            return response.status(500).json({success: false, message:'erro ao atualizar'})
        } res.json({success: true, message: "usuario atualizado com sucesso"})
    })
})

//DELETAR
app.delete('/cliente/deletar/:id', (req, res) => {
    const {id} = req.params
    const query = 'DELETE FROM Cliente WHERE id = ? '
    connection.query(query, [id], (err) => {
        if (err){
            return response.status(500).json({success: false, message:'erro ao deletar'})
        } res.json({success: true, message: "usuario deletado com sucesso"})
    })
})