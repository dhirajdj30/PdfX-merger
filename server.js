const express = require('express')
const path = require('path')
const multer = require('multer')
const {mergePdfs} = require('./merge')
const upload = multer({dest:'uploads/'})
const app = express()
const port = 3000
app.use('/static',express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'templates/index.html'))
})

app.post('/merge', upload.array('pdfs',5) , async (req, res, next)=>{
    console.log(req.files)
    let d = await mergePdfs(path.join(__dirname, req.files[0].path),path.join(__dirname, req.files[1].path))
    res.redirect(`http://localhost:3000/static/${d}.pdf`)
    // res.send({data: req.files})

})
  
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})