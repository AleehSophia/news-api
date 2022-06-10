const express = require('express')
var mysql = require('mysql2')

const app = express()

const port = 3000

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1234567',
    database : 'sistema_noticias'
  });

  connection.connect();

app.get('/categorias', (req, res) => {

    connection.query('SELECT id, nome FROM sistema_noticias.categoria', function(err, rows, fields) {
        if (err) throw err;
        res.send(rows)
      });   
  })

  app.get('/categorias/:categoriaId/noticias', (req, res) => {

    connection.query('SELECT id, titulo FROM sistema_noticias.noticia WHERE id_categoria = ' + req.params.categoriaId, function(err, rows, fields) {
        if (err) throw err;
        res.send(rows)
      });   
  })

  app.get('/categorias/:categoriaId/noticias/:noticiaId', (req, res) => {

    connection.query('SELECT id, titulo, conteudo FROM sistema_noticias.noticia WHERE id_categoria = ' + req.params.categoriaId + ' AND id = ' + req.params.noticiaId, function(err, rows, fields) {
        if (err) throw err;
        res.send(rows[0])
      });   
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})