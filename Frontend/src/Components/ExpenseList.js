import { paymentMethods } from './ExpenseTracker';
import { CalendarIcon } from 'lucide-react';
import moment from 'moment';


export const ExpenseList = ({ expenses }) => {
  // Sort expenses by date (most recent first)
  const sortedExpenses = [...expenses].sort((a, b) => b.date - a.date);
  // Format date to display
  const formatDate = (date) => {
    console.log(date);
    return moment(date).format('MMM-DD-YYYY');
  }

  return (
    <div>
      {sortedExpenses.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No expenses recorded yet.
        </div>
      ) : (
        <div className="space-y-4">
          {sortedExpenses.map((expense) => (
            <div
              key={expense.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">
                    {expense.description}
                  </h3>
                  <p className="text-sm text-gray-500">{expense.category}</p>
                </div>
                
                <span className="text-lg font-semibold text-blue-800">
                  { expense.currency === 'INR'? <>&#8377;</>: <>&#x24;</> } { expense.amount.toFixed(2) }
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-500">
                  <CalendarIcon size={16} className="mr-1" />
                  { formatDate(expense.createdDate) }
                </div>
                <div className="flex items-center">
                  <div
                    className={`w-3 h-3 rounded-full mr-1.5 ${paymentMethods[expense.paymentMethod]}`}
                  ></div>
                  <span className="text-gray-600">{expense.paymentMethod}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
