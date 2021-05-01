const express = require('express');
const server = express();

server
.get('/',function(req,res){
    res.send("uhuu")
})

.listen(8080,()=>console.log('server is working'))
// .use(express.static(''))