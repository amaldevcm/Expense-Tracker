import React, { useState, useEffect } from 'react'
import { NewExpense } from './NewExpense'
import { ExpenseList } from './ExpenseList'
import { MonthlySummary } from './MonthlySummary'


// Mock data for the expense tracker
const initialExpenses = [
  {
    id: 1,
    date: new Date(2023, 6, 15),
    amount: 45.99,
    category: 'Groceries',
    description: 'Weekly groceries',
    paymentMethod: 'Credit Card',
  },
  {
    id: 2,
    date: new Date(2023, 6, 14),
    amount: 12.5,
    category: 'Transportation',
    description: 'Uber ride',
    paymentMethod: 'PayPal',
  },
  {
    id: 3,
    date: new Date(2023, 6, 13),
    amount: 25.0,
    category: 'Dining',
    description: 'Lunch with colleagues',
    paymentMethod: 'Cash',
  },
  {
    id: 4,
    date: new Date(2023, 6, 12),
    amount: 9.99,
    category: 'Entertainment',
    description: 'Movie subscription',
    paymentMethod: 'Debit Card',
  },
  {
    id: 5,
    date: new Date(2023, 6, 10),
    amount: 35.5,
    category: 'Shopping',
    description: 'New shirt',
    paymentMethod: 'Credit Card',
  },
]

// Payment method categories with colors
export const paymentMethods = {
  'Credit Card': 'bg-blue-500',
  'Debit Card': 'bg-blue-700',
  'Cash': 'bg-green-500',
  'Bank Transfer': 'bg-indigo-600',
}

export const ExpenseTracker = () => {
  const url = 'http://localhost:3000/api/';
  // const url = 'https://expense-manager-uqvh.onrender.com/api/';

  const [expenses, setExpenses] = useState(initialExpenses);

  let currentMonthExpenses = 0;
  let totalExpenses = 0;
  let expensesByPaymentMethod = {};
  let expensesByCategory = {};

  function getExpenses() {
    fetch(url+'expenses').then(res => res.json())
                          .then(res => {
                            if(res.expense) {
                                setExpenses(res['expenses']);
                                calculateTotalExpense();
                            } else {
                                console.log(res.error);
                            }
                          });
  }

  useEffect(() => {
    setExpenses([]);
    getExpenses();
  }, []);

  const calculateTotalExpense = () => {
    // calculate total expense   
    totalExpenses = currentMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0)

    // calculate monthly expense
    currentMonthExpenses = expenses.filter((expense) => {
        const now = new Date()
        return (
            expense.date.getMonth() === now.getMonth() &&
            expense.date.getFullYear() === now.getFullYear()
        )
    });

    // calculate monthly expense by payment method
    currentMonthExpenses.forEach((expense) => {
        if (!expensesByPaymentMethod[expense.paymentMethod]) {
            expensesByPaymentMethod[expense.paymentMethod] = 0
        }
        expensesByPaymentMethod[expense.paymentMethod] += expense.amount
    });

    // Calculate expenses by category
    currentMonthExpenses.forEach((expense) => {
        if (!expensesByCategory[expense.category]) {
        expensesByCategory[expense.category] = 0
        }
        expensesByCategory[expense.category] += expense.amount
    });
  }

  const addExpense = (newExpense) => {
    setExpenses([
      ...expenses,
      {
        ...newExpense,
        id: expenses.length + 1,
        date: new Date(),
      },
    ]);
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
        <header className="mb-8">
            <h1 className="text-3xl font-bold text-blue-800">Expense Tracker</h1>
            <p className="text-slate-600">Keep track of your daily expenses</p>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left column - Expense List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Recent Transactions</h2>
            <ExpenseList expenses={expenses} />
          </div>
        </div>

        {/* Right column - Expense Summary */}
        <div className="lg:col-span-1">
            <MonthlySummary totalExpenses={totalExpenses} expensesByPaymentMethod={expensesByPaymentMethod} expensesByCategory={expensesByCategory}/>
            
            {/* <button onClick={() => setShowForm(!showForm)} className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center transition-colors">
            <PlusIcon size={20} className="mr-2" />
            {showForm ? 'Cancel' : 'Add New Expense'}
            </button> */}

            <div className="mt-6 bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-blue-800 mb-4">Add Expense</h2>
                <NewExpense onSubmit={addExpense}/>
            </div>
        </div>
        
      </div>
    </div>
  )
}
