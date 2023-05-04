import Stripe from "stripe"
const stripe = new Stripe("sk_test_51N14wjLk6lAgcvPf1erN7MDEtniVgvTyDZ2wuXWjFbqcCrT617BcpL4WwnFinPljg3YKvULWiItokWvyurNFajxG00H7YrP4dj")

export const subscribe_POST = async (req, res) => {
    const { name, email, paymentMethod, amount, cancel_at } = req.body
    console.log(name, email, paymentMethod, amount, cancel_at)

    try {
        //create customer 
        const customer = await stripe.customers.create({
            email: email,
            name: name,
            payment_method: paymentMethod,
            invoice_settings: { default_payment_method: paymentMethod }
            
        })
        // console.log(customer)
        const ephemeralKey = await stripe.ephemeralKeys.create({ customer: customer.id }, { apiVersion: '2022-11-15' })
        
        
        //create product (optional)
        const product = await stripe.products.create({ 
            name: 'Saving account daily subscription'
        })
        
        //create a subscription
        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            cancel_at: cancel_at,
            items: [
                {
                    price_data: {
                        currency: 'gbp',
                        product: product.id,
                        unit_amount: amount*100 ,
                        recurring: {
                            interval: 'day' },
                } }
            ],
            payment_settings: {
                payment_method_types: ['card'],
                save_default_payment_method: 'on_subscription'
            },
            expand: ['latest_invoice.payment_intent']
        })
        console.log(subscription)

        // const setupIntent = await stripe.setupIntents.retrieve(
        //     subscription.pending_setup_intent,
        // );

        // //send back the client secret 
        res.status(200).json({
            clientSecret: subscription.latest_invoice.payment_intent.client_secret,
            method: subscription.latest_invoice.payment_intent.payment_method,
            id: subscription.id
        })
    } catch (error) {
        console.log(error)
        res.json(400).json(error)
    }
}


///getting the payment object 

export const subId_Get = async (req, res) => {
    const { id } = req.params
    console.log(id)
    try {
        const subscription = await stripe.subscriptions.retrieve(
            id
        );

        res.status(200).json(subscription.status)
        console.log(subscription)
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}