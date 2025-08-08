import { TrendingUpIcon, CreditCardIcon, PieChartIcon } from 'lucide-react'
import { paymentMethods } from './ExpenseTracker';
import moment from 'moment';

export const MonthlySummary = ({totalExpenses, expensesByPaymentMethod, expensesByCategory}) => {
  const currentMonth = moment().format('MMMM');

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-blue-800">Monthly Summary</h2>
        <span className="text-sm font-medium text-slate-500">
          {currentMonth}
        </span>
      </div>
      <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-100">
        <div className="flex items-center">
          <div className="bg-blue-600 p-3 rounded-full">
            <TrendingUpIcon size={20} className="text-white" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-slate-600">Total Expenses</p>
            <p className="text-2xl font-bold text-blue-800">
              ${totalExpenses.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <div className="flex items-center mb-3">
          <CreditCardIcon size={18} className="text-blue-600 mr-2" />
          <h3 className="text-md font-medium text-gray-700">Payment Methods</h3>
        </div>
        <div className="space-y-3">
          {Object.entries(expensesByPaymentMethod).map(([method, amount]) => (
            <div key={method} className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className={`w-3 h-3 rounded-full mr-2 ${paymentMethods[method]}`}
                ></div>
                <span className="text-sm text-gray-600">{method}</span>
              </div>
              <span className="text-sm font-medium">${amount.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-center mb-3">
          <PieChartIcon size={18} className="text-blue-600 mr-2" />
          <h3 className="text-md font-medium text-gray-700">Categories</h3>
        </div>
        <div className="space-y-3">
          {Object.entries(expensesByCategory).map(([category, amount]) => (
            <div key={category} className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{category}</span>
              <span className="text-sm font-medium">${amount.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
