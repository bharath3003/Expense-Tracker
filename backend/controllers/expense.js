const ExpenseSchema = require("../models/ExpenseModel")


exports.addExpense = async (req, res) => {
    // Destructor to decompose the object into individual attributes
    const {title, amount, category, description, date} = req.body

    const income = ExpenseSchema({
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
        res.status(200).json({message: 'Expense added'})
    } catch (error) {
        res.status(500).json({message: 'Failed to add expense'})
    }
    console.log(income)
}

exports.getExpense = async(req, res) => {
    try {
        // Sorting by createdAt property (-1 indicates that it is in decreasing order)
        const incomes = await ExpenseSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Failed to get Expense details'})
    }
}

exports.deleteExpense = async(req, res) => {
    const {id} = req.params
    ExpenseSchema.findByIdAndDelete(id)
        .then((income) => {
            res.status(200).json({message: 'Expense deleted'})
        })
        .catch((err) => {
            res.status(500).json({message: 'Failed to delete Expense'})
        })
}