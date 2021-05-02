const express = require('express');
const path = require('path');
const server = express();
const router = require('./routes')

server
.use(express.static('public'))
.set('view engine', 'ejs')
.use(router)

server.listen(8080,()=>console.log('server is working'))
