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

app.post('/api/v1/scores', (request, response) => {
  const { initials, score } = request.body
  const scoreID = Date.now()

  for(let requiredParameter of ['initials', 'score']) {
    if (!request.body[requiredParameter]) {
      return response 
        .status(422)
        .send({ error: `Expected format { initials: <string>, score: <number> }.  You are missing a required parameter of ${requiredParameter}.`})
    }
  }

  app.locals.scores.push({ scoreID, initials, score })
  response.status(201).json({ scoreID, initials, score })
})

app.get('/api/v1/scores', (request, response) => {
  response.status(200).json(app.locals.scores)
})