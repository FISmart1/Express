const {body} = require('express-validator');
const prisma = require('../../prisma/client');
const validateRegister = [
    body('name').notEmpty().withMessage('nameisrequired'),
]