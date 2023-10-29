const {app}= require('./server')

app.get('/',(req,res)=>res.send("seiright service running successfully"))
app.use('/webpage', require('./route/webpageRoute'))

module.exports = app