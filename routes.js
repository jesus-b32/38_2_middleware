const express = require('express');
const items = require('./fakeDb');
const ExpressError = require('./expressError');
const router = new express.Router();


/** this should render a list of shopping items
 * Here is what a response looks like:
**[{“name”: “popsicle”, “price”: 1.45}, {“name”:”cheerios”, “price”: 3.40}]**
*/
router.get('/', (req, res, next) => {
    try {
        // let allItems = items;
        return res.json({item: items})
    } catch(err) {
        return next(err)
    }
})

/** this route should accept JSON data and add it to the shopping list.
 * Here is what a response looks like:
**{“name”:”popsicle”, “price”: 1.45} => {“added”: {“name”: “popsicle”, “price”: 1.45}}**
*/
router.post('/', (req, res, next) => {
    try {
        const newItem = {name: req.body.name, price: req.body.price};
        items.push(newItem);
        return res.json({added: newItem});
    } catch(err) {
        return next(err)
    }
})

/** this route should display a single item’s name and price.
 * Here is what a response looks like:
**{“name”: “popsicle”, “price”: 1.45}**
*/
router.get('/:name', (req, res, next) => {
    try {
        const foundItem = items.find(item => item.name === req.params.name)
        if (foundItem === undefined) {
            throw new ExpressError('Item no found.', 404);
        }
        return res.json(foundItem);
    } catch(err) {
        return next(err)
    }
})

/** this route should modify a single item’s name and/or price.
 * Here is what a response looks like:
**{“name”:”new popsicle”, “price”: 2.45} => {“updated”: {“name”: “new popsicle”, “price”: 2.45}}**
*/
router.patch('/:name', (req, res, next) => {
    try {
        const foundItem = items.find(item => item.name === req.params.name)
        if (foundItem === undefined) {
            throw new ExpressError('Item no found.', 404);
        }
        foundItem.name = req.body.name;
        foundItem.price = req.body.price;
        return res.json({updated: foundItem});        
    } catch(err) {
        return next(err)
    }
})

/** this route should allow you to delete a specific item from the array.
 * Here is what a response looks like:
**{message: “Deleted”}**
*/
router.delete('/:name', (req, res, next) => {
    try {
        const removeItem = items.filter(item => item.name !== req.params.name);
        items = 
    } catch(err) {
        return next(err)
    }    
})



module.exports = router;

