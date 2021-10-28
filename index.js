const express=require('express')
const app=express()
const port=5000

app.get('/tours',(req,res)=>{
    res.send('welcome to travel adventure')
})
app.listen(port,()=>{
    console.log('server is running')
})