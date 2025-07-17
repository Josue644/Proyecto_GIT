import express from 'express'
import mongoose from 'mongoose'

const Animal = mongoose.model('Animal', new mongoose.Schema({
  tipo: String,
  estado: String,
}))

const app = express()

mongoose.connect('mongodb://admin:password@monguito:27017/miapp?authSource=admin')

app.get('/', async (_req, res) => {
  console.log('listando... chanchitos...')
  const animales = await Animal.find();
  return res.send(animales)
})
app.get('/crear', async (_req, res) => {
  console.log('creando...')
  await Animal.create({ tipo: 'Chanchito', estado: 'Feliz' })
  return res.send('ok')
})
app.get('/eliminar', async (_req, res) => {
  console.log('eliminando... chanchitos')
  await Animal.deleteOne({ tipo: 'Chanchito', estado: 'Feliz' })
  return res.send('eliminado')
})
app.get('/delete-all', async (_req, res) => {
  console.log('eliminando todo...')
  await Animal.deleteMany({ tipo: 'Chanchito', estado: 'Feliz' })
  return res.send('se elimino todo los datos')
})

app.listen(3000, () => console.log('listening...'))