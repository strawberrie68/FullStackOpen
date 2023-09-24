require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

const Address = require('./models/address')

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}



app.get('/', (request, response) => {
  response.send('<h1>This the api - use th keywords to get data</h1>')
})

app.get('/api/persons', (request, response) => {
  Address.find({}).then((result) => {
    response.json(result)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Address.findById(request.params.id)
    .then((address) => {
      if (address) {
        response.json(address)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name missing or number missing'
    })
  }

  const address = new Address({
    name: body.name,
    number: body.number,
  })

  address
    .save()
    .then((savedAddress) => {
      response.json(savedAddress)
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Address.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((updatedAddress) => {
      response.json(updatedAddress)
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Address.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
