const stripe = require('stripe')(process.env.STRPE_PRIVATE_KEY);
const Tour = require('../models/tourModel')
const customAPIError = require('../errors/customAPIError');
const  { StatusCodes }= require('http-status-codes');

exports.getCheckOutSession = async (req, res, next) => {
    //1) get the currently booked tour
    const tour = await Tour.findById(req.params.tourId)
    //2) create checkout session
   const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: `${req.protocol}://${req.get(host)}/`,
        cancel_url: `${req.protocol}://${req.get(host)}/tour/${tour.slug}`,
        customer_email: req.user.email,
        client_reference_id: req.params.tourId,
        line_items: [
            {
                name: `{tour.name} Tour`,
                description: tour.summary,
                amount: tour.price * 100,
                currency: 'usd',
                quantity: 1
            }
        ]
    })
    //3) create session as response
    res.status(StatusCodes.OK).json({
        status: 'success',
        session
    })

    next();
}