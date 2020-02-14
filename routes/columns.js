const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');

const auth = require('../middleware/auth');

const Column = require('../models/columns');
const Card = require('../models/cards');

/**
 * GET /api/columns
 * Retreive all columns
 */
router.get('/', auth, async (req, res) => {
    // const columns = await Column.find().populate('cards');
    const columns = await Column.aggregate([
        {$lookup: {
            from: "cards",
            let: { column_id: "$_id" },
            pipeline: [
                {$match: {$expr: {$eq: ["$column", "$$column_id"]}}}
            ],
            as: "cards"
        }}
    ]);
    return res.status(200).send(columns);
});

/**
 * POST /api/columns
 * Create new column
 */
router.post('/', auth, (req, res) => {
    const input = Joi.object({
        name: Joi.string().min(1).max(256).required(),
        order: Joi.number().min(0)
    });

    const {error, value} = input.validate(req.body);
    if(error) return res.status(400).send(error);

    try {
        const column = new Column(value);
        column.save();
        return res.status(200).send(column);
    } catch(error) {
        return res.status(500).send(error);
    }
});

/**
 * PUT /api/columns/:id
 * Update column by ID
 */
router.put('/:id', auth, async (req, res) => {
    if( !req.params.id )
        return res.status(400).send('Invalid Resource.');

    const input = Joi.object({
        name: Joi.string().min(1).max(256).required(),
        order: Joi.number().min(0)
    });

    const {error, value} = input.validate(req.body);
    if(error) return res.status(400).send(error);

    try {
        value['updatedAt'] = Date.now();
        const column = await Column.findOneAndUpdate({_id: req.params.id}, value);
        return res.status(200).send(column);
    } catch(error) {
        return res.status(500).send(error);
    }
});

module.exports = router;