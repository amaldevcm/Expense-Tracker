import { useEffect, useState } from 'react'
import { ExpenseForm } from './NewExpense'
import { ExpenseList } from './ExpenseList'

const serverUrl = import.meta.env.VITE_SERVER_URL + '/api/';

export const ExpenseTracker = () => {
    const [expenses, setExpenses] = useState([])
    const [showForm] = useState(true)

    const getAllExpenses = () => {
        fetch(serverUrl + 'expenses').then(res => res.json())
            .then(res => {
                if (res.expenses) {
                    setExpenses(res['expenses']);
                    console.log(expenses)
                    evaluateStatistics();
                } else {
                    console.log(res.error);
                }
            });
    }

    useEffect(() => {
        setExpenses([]);
        getAllExpenses();
    }, []);

    const evaluateStatistics = () => {
        // const currentMonthExpenses = expenses.filter((expense: ExpenseSchema) => {
        //     const now = new Date();
        //     return (
        //         new Date(expense.createdDate).getMonth() === now.getMonth() &&
        //         new Date(expense.createdDate).getFullYear() === now.getFullYear()
        //     )
        // })

        // const totalExpenses = currentMonthExpenses.reduce(
        //     (sum, expense: ExpenseSchema) => sum + expense.amount,
        //     0,
        // )
    }

    const addExpense = () => {
        console.log('onsubmit called')
        setExpenses([]);
        getAllExpenses();
    }
    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-blue-800 dark:text-blue-400">
                        PayBook
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Keep track of your daily expenses
                    </p>
                </div>
            </header>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    {/* <MonthlySummary
                        totalExpenses={totalExpenses}
                        expensesByPaymentMethod={expensesByPaymentMethod}
                        expensesByCategory={expensesByCategory}
                    /> */}
                    {showForm && (
                        <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-400 mb-4">
                                Add Expense
                            </h2>
                            <ExpenseForm
                                serverUrl={serverUrl}
                                onSubmit={addExpense}
                            />
                        </div>
                    )}
                </div>
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-400 mb-4">
                            Recent Transactions
                        </h2>
                        <ExpenseList expenses={expenses} />
                    </div>
                </div>
            </div>
        </div>
    )
}
