import { CalendarIcon } from 'lucide-react';
import type { ExpenseSchema, PaymentMethodKey } from './Common/CommonSchema';
import { PaymentMethods } from './Common/CommonSchema';
import moment from 'moment';

interface Props {
    expenses: ExpenseSchema[]
}

export const ExpenseList = ({ expenses }: Props) => {
    let currentDate = moment();
    let sortedExpenses = expenses;

    // Format date to display
    const formatDate = (date: Date) => {
        return moment(date).format('MMM-DD-YYYY');
    }

    const isDateSame = (date: Date) => {
        if (moment(date).isSame(currentDate, 'day')) {
            return true;
        } else {
            currentDate = moment(date);
            return false;
        }
    }

    const makeTitle = (str: String) => {
        if (str && str.length !== 0) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
        return '';
    }

    // const sortExpense = (e) => {
    //     const value = e.target.value;
    //     console.log(value);
    //     sortedExpenses = expenses.filter(expense => expense.category === value);
    // }

    return (
        <>
            <div className='flex flex-row'>
                <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-400 mb-4">
                    Recent Transactions
                </h2>

                {/* <select name="sort_category" id="sort_category" onChange={sortExpense}>
                    {Categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select> */}
            </div>

            <div>
                {sortedExpenses.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                        No expenses recorded yet.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {sortedExpenses.map((expense, index) => (<>
                            {isDateSame(expense.createdDate) ?
                                <p className=''></p> : <p className='text-center text-gray-400'>{moment(expense.createdDate).format('MMMM-DD-YYYY')}</p>}

                            <div
                                key={'expense_' + index}
                                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow bg-white dark:bg-gray-800"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="font-medium text-gray-900 dark:text-gray-100">
                                            {expense.description}
                                        </h3>
                                        {/* <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {expense.category}
                                        </p> */}
                                    </div>
                                    <span className="text-lg font-semibold text-blue-800 dark:text-blue-400">
                                        ${expense.amount.toFixed(2)}
                                    </span>
                                </div>
                                <div className="mt-3 flex items-center justify-between text-sm">
                                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                                        <CalendarIcon size={16} className="mr-1" />
                                        {formatDate(expense.createdDate)}
                                    </div>
                                    <div className="flex items-center">
                                        <div
                                            className={`w-3 h-3 rounded-full mr-1.5 ${PaymentMethods[expense.paymentType as PaymentMethodKey]}`}
                                        ></div>
                                        <span className="text-gray-600 dark:text-gray-300">
                                            {makeTitle(expense.paymentType)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </>
                        ))}
                    </div>
                )}
            </div>
        </>

    )
}
