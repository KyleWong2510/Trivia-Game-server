const express = require('express')
const app = express()
const cors = require('cors')

app.set('port', process.env.PORT || 3001)
app.locals.title = 'Trivia Game'

app.use(cors())
app.use(express.json())

app.locals.scores = []

app.get('/', (request, response) => {
  response.send('Trivia Game API')
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})

