import Stripe from "stripe"
const stripe = new Stripe("sk_test_51N14wjLk6lAgcvPf1erN7MDEtniVgvTyDZ2wuXWjFbqcCrT617BcpL4WwnFinPljg3YKvULWiItokWvyurNFajxG00H7YrP4dj")

export const subscribe_POST = async (req, res) => {
    const { name, email , paymentMethod, amount} = req.body
    console.log(name, email, paymentMethod)
    const amoutS =  amount.toString()
     console.log(typeof amoutS)

    try {
        //create customer 
        const customer = await stripe.customers.create({
            email: email,
            name: name,
            payment_method: paymentMethod,
            invoice_settings: { default_payment_method: paymentMethod }
            
        })
        console.log(customer)
        const ephemeralKey = await stripe.ephemeralKeys.create({ customer: customer.id }, { apiVersion: '2022-11-15' })
        
        
        //create product (optional)
        const product = await stripe.products.create({ 
            name: 'Saving account weekly subscription'
        })
        
        //create a subscription
        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [
                {
                    price_data: {
                        currency: 'gbp',
                        product: product.id,
                        unit_amount: amount,
                        recurring: { interval: 'week' },
                } }
            ],
            payment_settings: {
                payment_method_types: ['card'],
                save_default_payment_method: 'on_subscription'
            },
            expand: ['latest_invoice.payment_intent']
        })

        // const setupIntent = await stripe.setupIntents.retrieve(
        //     subscription.pending_setup_intent,
        // );

        // //send back the client secret 
        res.status(200).json({
            clientSecret: subscription.latest_invoice.payment_intent.client_secret,
        })
    } catch (error) {
        console.log(error)
        res.json(400).json(error)
    }
}