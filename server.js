const express=require('express')
const http=require('http')
const {Server}=require('socket.io')
const bodyParser=require('body-parser')
const aiRouter=require('./ai')

const app=express()
const server=http.createServer(app)
const io=new Server(server)

app.use(bodyParser.json())
app.use(express.static('../frontend'))
app.use('/',aiRouter)

io.on('connection',socket=>{
  console.log('User connected')
  socket.on('draw',data=>socket.broadcast.emit('draw',data))
  socket.on('chat',data=>io.emit('chat',data))
  socket.on('disconnect',()=>console.log('User disconnected'))
})

server.listen(3000,()=>console.log('Server running on port 3000'))
