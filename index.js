const express = require('express')
const { PORT } = require('./util/config')
const { errorHandler } = require('./util/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const authorsRouter = require('./controllers/authors')
const resetRouter = require('./controllers/reset')

const app = express()
app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorsRouter)
app.use('/api/reset', resetRouter)

app.get('/', (req, res) => res.status(200).end())

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
