import Stripe from "stripe"
const stripe = new Stripe("sk_test_51N14wjLk6lAgcvPf1erN7MDEtniVgvTyDZ2wuXWjFbqcCrT617BcpL4WwnFinPljg3YKvULWiItokWvyurNFajxG00H7YrP4dj")


export const payment_POST = async (req, res) => {
    const { amount } = req.body
    try {
        let customer = await stripe.customers.create()
        const ephemeralKey = await stripe.ephemeralKeys.create({ customer: customer.id }, { apiVersion: '2022-11-15'})
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'gbp',
            automatic_payment_methods: {
                enabled: true
            },
            customer: customer.id
        })
        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
            ephemeralKey: ephemeralKey.secret,
            customer: customer.id
        })
    } catch (error) {
        res.status(401).json({error: error.message})
    }


}