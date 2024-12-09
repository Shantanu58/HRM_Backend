const Expense = require('../../../models/Expense'); // Changed to Expense model
const expenseValidator = require('../../../validators/Finance/ExpenseValidators'); // Changed to ExpenseValidator
const moment = require('moment'); // Import moment.js to handle date formatting

async function createExpense(req, res) {
  const { error } = expenseValidator.validate(req.body); // Changed to expenseValidator
  // If validation fails, return a 400 error with validation details
  if (error) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: error.details.map((detail) => detail.message).join(', '),
    });
  }

  const { account_name, amount, date, category, payee_name, payment_type, ref, description } = req.body; // Changed payer_name to payee_name

  try {
    // Format the date to MM-DD-YYYY
    const formattedDate = moment(date, 'YYYY-MM-DD').format('MM-DD-YYYY');

    // Check if an expense with the same referral ID (ref) already exists
    const existingExpense = await Expense.findOne({ ref }); // Changed Deposit to Expense
    if (existingExpense) {
      return res.status(400).json({
        message: 'Expense creation failed',
        errors: 'Expense with this referral ID already exists',
      });
    }

    // Create a new Expense document
    const newExpense = new Expense({
      account_name,
      amount,
      date: formattedDate, // Store the formatted date
      category,
      payee_name, // Changed payer_name to payee_name
      payment_type,
      ref,
      description,
    });

    // Save the Expense document to the database
    await newExpense.save();

    // Send success response
    res.status(201).json({
      message: 'Expense created successfully',
      data: newExpense,
    });
  } catch (err) {
    console.error(err);

    // Handle database or other errors
    res.status(500).json({
      message: 'An error occurred while creating the expense', // Changed from deposit to expense
      error: err.message,
    });
  }
}

module.exports = createExpense; // Export createExpense instead of createdeposit
