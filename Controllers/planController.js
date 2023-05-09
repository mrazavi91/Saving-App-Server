import mongoose from "mongoose";
import Plan from "../Models/planModel.js";


export const plan_POST = async (req, res) => {
    const { savingPerDay: amount, duration, purpose, sub_id, amountSaved, created } = req.body
    // console.log(req.body)
    const user_id = req.user._id
    
    try {
        const plan = await Plan.create({ amount, duration, purpose, user_id, sub_id, amountSaved, start_date: created })
        // console.log(plan)
        res.status(200).json(plan)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
}

export const plan_UPDATE = async (req,res) => {
    const user_id = req.user._id
    console.log(req.body)

    try {
        const plan = await Plan.find({ _id: req.body._id }).updateOne({ _id: req.body._id }, { $set :{"amountSaved": req.body.amountSaved} })
        const updatedPlan = await Plan.find({ _id: req.body._id })
        // if (!Portfolio) {
        //     return res.status(400).json({ error: 'No such portfolio' })
        // }

        res.status(200).json(updatedPlan)
        console.log(updatedPlan)
    } catch (error) {
        res.status(401).json({ error: error.message })
        console.log(error)
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
        // console.log(plans)
        res.status(200).json(plans)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

    
}