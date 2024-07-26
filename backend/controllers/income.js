const IncomeSchema = require("../models/incomeModel")


exports.addIncome = async (req, res) => {
    // Destructor to decompose the object into individual attributes
    const {title, amount, category, description, date} = req.body

    const income = IncomeSchema({
        title, 
        amount, 
        category, 
        description, 
        date
    })
    try {
        if(!title || !category || !description || !date){
            // Status 400 is error, and there is a corresponding message
            return res.status(400).json({message: 'All fields are necessary!'})
        }
        if(amount <= 0){
            return res.status(400).json({message: 'Amount must be a positive number'})
        }
        await income.save()
        // Status 200 indicates success
        res.status(200).json({message: 'Income added'})
    } catch (error) {
        res.status(500).json({message: 'Failed to add income'})
    }
    console.log(income)
}

exports.getIncomes = async(req, res) => {
    try {
        // Sorting by createdAt property (-1 indicates that it is in decreasing order)
        const incomes = await IncomeSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Failed to get income details'})
    }
}

exports.deleteIncome = async(req, res) => {
    const {id} = req.params
    IncomeSchema.findByIdAndDelete(id)
        .then((income) => {
            res.status(200).json({message: 'Income deleted'})
        })
        .catch((err) => {
            res.status(500).json({message: 'Failed to delete income'})
        })
}