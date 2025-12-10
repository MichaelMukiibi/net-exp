import express from 'express'
import serverless from '@vendia/serverless-express'
const PORT = process.env.PORT || 3000

const app = express()

const PRODUCTS = [
  {id: 1, name: 'Pure Water'},
  {id: 2, name: 'Sparkling Water'},
  {id: 3, name: 'Pot Water'},
]

app.use(express.json())

app.get('/api', (req, res) => {
  res.status(200).send('Hello, world')
})

app.route('/api/products')
  .get((req, res) => {
    return res.status(200).json(PRODUCTS)
  })

  .post((req, res) => {

    let {name} = req.body

    if (isNaN(name)) return res.status(400).send('Bad request. Product name required');
    
    console.log(`Product: ${name} added`)

    return res.status(201).send('Product created')
  })
}

const handler = serverless({app})

export { handler }
