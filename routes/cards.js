const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');

const auth = require('../middleware/auth');

const Card = require('../models/cards');

/**
 * GET /api/cards
 * Retreive all cards
 */
router.get('/', auth, async (req, res) => {
    const cards = await Card.find();
    return res.status(200).send(cards);
});

/**
 * POST /api/cards
 * Create new card
 */
router.post('/', auth, (req, res) => {
    const input = Joi.object({
        column: Joi.string().required(),
        title: Joi.string().min(1).max(256).required(),
        content: Joi.string(),
        order: Joi.number().min(0)
    });
    console.log(req.body);
    const {error, value} = input.validate(req.body);
    if(error) return res.status(400).send(error);

    try {
        const card = new Card(value);
        card.save();
        return res.status(200).send(card);
    } catch(error) {
        return res.status(500).send(error);
    }
});

/**
 * PUT /api/cards/:id
 * Update One Card By ID
 */
router.put('/:id', auth, async (req, res) => {
    if( !req.params.id )
        return res.status(400).send('Invalid Resource.');

    const input = Joi.object({
        column: Joi.string().required(),
        title: Joi.string().min(1).max(256).required(),
        content: Joi.string(),
        order: Joi.number().min(0)
    });

    const {error, value} = input.validate(req.body);
    if(error) return res.status(400).send(error);

    try {
        value['updatedAt'] = Date.now();
        const card = await Card.findOneAndUpdate({_id: req.params.id}, value);
        return res.status(200).send(card);
    } catch(error) {
        return res.status(400).send(error);
    }
});

module.exports = router;