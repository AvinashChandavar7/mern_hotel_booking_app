import Stripe from "stripe";

const STRIPE_KEY = process.env.STRIPE_API_KEY as string

const stripe = new Stripe(STRIPE_KEY);


export default stripe;