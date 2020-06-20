import { Router } from 'express';
import Controller from './order.controller';

const orders: Router = Router();
const controller = new Controller();

// Add Orders
orders.post('/add', controller.addOrder);

export default orders;
