const express = require('express')
const { PORT } = require('./util/config')
const blogsRouter = require('./controllers/blogs')

const app = express()
app.use(express.json())

app.use('/api/blogs', blogsRouter)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
