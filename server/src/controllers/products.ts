import express from 'express'

const router = express.Router()

import productData from '../db/data/products.json'

router.get('/all', (_, res) => {
  res.json(productData)
})

router.get('/:id', (_, res) => {
  res.json({})
})

export default router
