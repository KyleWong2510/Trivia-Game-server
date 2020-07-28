const express = require('express')
const app = express()
const cors = require('cors')

app.set('port', process.env.PORT || 3001)
app.locals.title = 'Trivia Game'

app.use(cors())
app.use(express.json())

app.locals.scores = {scores: []}

app.get('/', (request, response) => {
  response.send('Trivia Game API')
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})

app.post('/api/v1/scores', (request, response) => {
  const { name, score } = request.body
  const scoreID = Date.now()

  for(let requiredParameter of ['name', 'score']) {
    if (!request.body[requiredParameter]) {
      return response 
        .status(422)
        .send({ error: `Expected format { name: <string>, score: <number> }.  You are missing a required parameter of ${requiredParameter}.`})
    }
  }

  app.locals.scores.scores.push({ scoreID, name, score })
  response.status(201).json({ scoreID, name, score })
})

app.get('/api/v1/scores', (request, response) => {
  response.status(200).json(app.locals.scores)
})