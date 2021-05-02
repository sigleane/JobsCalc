const express = require("express");
const path = require('path');
const router = express.Router();


router.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'views','index.html'))
})

router.get('/index.html',function(req,res){
    res.redirect("/")
})

router.get("/job", function(req,res){
    res.sendFile(path.join(__dirname,'views','job.html'))
})

router.get("/job-edit", function(req,res){
    res.sendFile(path.join(__dirname,'views','job-edit.html'))
})

router.get("/profile", function(req,res){
    res.sendFile(path.join(__dirname,'views','profile.html'))
})

module.exports = router
