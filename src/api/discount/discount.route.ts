import { Router } from 'express';
import Controller from './discount.controller';

const dicounts: Router = Router();
const controller = new Controller();

// Validate Discount
dicounts.post('/check', controller.isValidDiscountCode);

export default dicounts;
