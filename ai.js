const express=require('express')
const router=express.Router()
router.post('/ai-tutor',async(req,res)=>{
  const {question}=req.body
  const answer=`Answer for: ${question} (Connect your AI API here)`
  res.json({answer})
})
module.exports=router
