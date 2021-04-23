const express = require('express')

const app = express()

app.get('/', () => console.log('Welcome to API'))

app.listen(3001, () => console.log('Server running on 3001'))
