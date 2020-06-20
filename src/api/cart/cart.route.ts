import { Router } from 'express';

import Controller from './cart.controller';

const carts: Router = Router();
const controller = new Controller();

// Add Cart
carts.post('/add', controller.addCart);

// Get Cart Product
carts.get('/get/:id', controller.getCart);

// Update Cart
carts.put('/update', controller.updateCart);

// Delete Cart
carts.delete('/delete/:id', controller.deleteCart);

export default carts;
