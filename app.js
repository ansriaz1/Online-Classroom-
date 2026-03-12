// User login
function login(){
  let role=document.getElementById('role').value
  let name=document.getElementById('name').value
  localStorage.setItem('role',role)
  localStorage.setItem('name',name)
  window.location='dashboard.html'
}

// Dashboard logic
if(location.pathname.includes('dashboard')){
  let role=localStorage.getItem('role')
  if(role==='teacher') document.getElementById('teacherPanel').style.display='block'
  else document.getElementById('studentPanel').style.display='block'
}

function createClass(){
  let code=Math.random().toString(36).substring(2,7)
  alert('Class Code: '+code)
}
function startLecture(){ window.location='whiteboard.html' }
function joinClass(){ window.location='whiteboard.html' }

// AI Tutor
function askAITutor(question){
  fetch('/ai-tutor', {
    method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({question})
  })
  .then(res=>res.json())
  .then(data=> alert('AI Tutor Answer: '+data.answer))
}

// Live whiteboard
const canvas=document.getElementById('board')
if(canvas){
  const ctx=canvas.getContext('2d')
  canvas.width=window.innerWidth; canvas.height=window.innerHeight-150
  let drawing=false
  const socket=io()
  canvas.onmousedown=()=>drawing=true
  canvas.onmouseup=()=>{drawing=false; ctx.beginPath()}
  canvas.onmousemove=(e)=>{
    if(!drawing) return
    ctx.lineWidth=3; ctx.lineCap='round'
    ctx.lineTo(e.clientX,e.clientY); ctx.stroke(); ctx.beginPath(); ctx.moveTo(e.clientX,e.clientY)
    socket.emit('draw',{x:e.clientX,y:e.clientY})
  }
  socket.on('draw',data=>{
    ctx.lineTo(data.x,data.y); ctx.stroke(); ctx.beginPath(); ctx.moveTo(data.x,data.y)
  })

  // Chat system
  const chatSocket=socket
  function sendMessage(msg){
    chatSocket.emit('chat',{user:localStorage.getItem('name'),message:msg})
  }
  chatSocket.on('chat',data=>{
    const log=document.getElementById('chatLog')
    log.innerHTML+=`<b>${data.user}:</b> ${data.message}<br>`
    log.scrollTop=log.scrollHeight
  })
}

// Register service worker for PWA
if('serviceWorker' in navigator){
  window.addEventListener('load',()=>{
    navigator.serviceWorker.register('/sw.js').then(reg=>console.log('SW registered',reg)).catch(err=>console.log('SW failed',err))
  })
}
