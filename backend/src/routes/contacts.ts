import { Router } from 'express'
import Contact from '../models/Contact'

const router = Router()

// Create contact
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message, propertyId } = req.body

    const contact = await Contact.create({
      name,
      email,
      phone,
      message,
      propertyId,
      status: 'new',
    })

    res.status(201).json(contact)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
})

// Get all contacts (admin/agent)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.findAll({
      order: [['createdAt', 'DESC']],
    })
    res.json(contacts)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Update contact status
router.patch('/:id', async (req, res) => {
  try {
    const { status } = req.body
    const contact = await Contact.findByPk(req.params.id)

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' })
    }

    await contact.update({ status })
    res.json(contact)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
})

export default router
