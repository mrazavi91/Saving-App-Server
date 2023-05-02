import mongoose from "mongoose";
import Plan from "../Models/planModel.js";


export const plan_POST = async (req, res) => {
    const { amount, duration, purpose } = req.body
    const user_id = req.user._id
    
    try {
        const plan = await Plan.create({ amount, duration, purpose, user_id })
        res.status(200).json(plan)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
}
export const plan_GET = async (req, res) => {
    const { id } = req.params
    try {
        const plan = await Plan.findById({_id: id})
        res.status(200).json(plan)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
    
}

export const allPlan_GET = async (req, res) => {
    const user_id = req.user._id
    try {
        const plans = await Plan.find({ user_id })
        console.log(plans)
        res.status(200).json(plans)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

    
}