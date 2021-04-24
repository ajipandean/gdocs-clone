const mongoose = require('mongoose')
const Document = require('./schema/Document')

mongoose.connect('mongodb://localhost:27017/gdocsCloneDb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

const io = require('socket.io')(3001, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', socket => {
  console.log('Connected')

  socket.on('get-document', async documentId => {
    const doc = await findOrCreateDocument(documentId)
    socket.join(documentId)
    socket.emit('load-document', doc.data)

    socket.on('send_delta', delta => {
      socket.broadcast.to(documentId).emit('receive_changes', delta)
    })

    socket.on('save-document', async data => {
      await Document.findByIdAndUpdate(documentId, { data })
    })
  }) 
})

async function findOrCreateDocument(id) {
  if (id == null) return

  const doc = await Document.findById(id)
  if (doc) return doc
  return await Document.create({
    _id: id,
    data: '',
  })
}
