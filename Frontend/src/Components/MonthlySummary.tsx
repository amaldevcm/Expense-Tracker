import { TrendingUpIcon, CreditCardIcon, PieChartIcon } from 'lucide-react'
import { PaymentMethods } from './Common/CommonSchema'
import type { PaymentMethodKey } from './Common/CommonSchema'

interface Prop {
    totalExpenses: Number,
    expensesByPaymentMethod: Object,
    expensesByCategory: Object
}

export const MonthlySummary = ({ totalExpenses, expensesByPaymentMethod, expensesByCategory }: Prop) => {
    const currentMonth = new Date().toLocaleString('default', {
        month: 'long',
        year: 'numeric',
    })

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-400">
                    Monthly Summary
                </h2>
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    {currentMonth}
                </span>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 mb-6 border border-blue-100 dark:border-blue-900">
                <div className="flex items-center">
                    <div className="bg-blue-600 dark:bg-blue-700 p-3 rounded-full">
                        <TrendingUpIcon size={20} className="text-white" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Total Expenses
                        </p>
                        <p className="text-2xl font-bold text-blue-800 dark:text-blue-400">
                            ${totalExpenses.toFixed(2)}
                        </p>
                    </div>
                </div>
            </div>
            <div className="mb-6">
                <div className="flex items-center mb-3">
                    <CreditCardIcon
                        size={18}
                        className="text-blue-600 dark:text-blue-400 mr-2"
                    />
                    <h3 className="text-md font-medium text-gray-700 dark:text-gray-300">
                        Payment Methods
                    </h3>
                </div>
                <div className="space-y-3">
                    {Object.entries(expensesByPaymentMethod).map(([method, amount]) => (
                        <div key={method} className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div
                                    className={`w-3 h-3 rounded-full mr-2 ${PaymentMethods[method as PaymentMethodKey]}`}
                                ></div>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {method}
                                </span>
                            </div>
                            <span className="text-sm font-medium dark:text-gray-300">
                                ${amount.toFixed(2)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <div className="flex items-center mb-3">
                    <PieChartIcon
                        size={18}
                        className="text-blue-600 dark:text-blue-400 mr-2"
                    />
                    <h3 className="text-md font-medium text-gray-700 dark:text-gray-300">
                        Categories
                    </h3>
                </div>
                <div className="space-y-3">
                    {Object.entries(expensesByCategory).map(([category, amount]) => (
                        <div key={category} className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                {category}
                            </span>
                            <span className="text-sm font-medium dark:text-gray-300">
                                ${amount.toFixed(2)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
