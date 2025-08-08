export interface ExpenseSchema {
    title: String,
    amount: Number,
    category: String,
    description: String,
    currency: String,
    exchangeRate: Number,
    paymentType: String,
    createdDate: Date
}

export const PaymentMethods = {
    credit: 'bg-blue-500',
    debit: 'bg-blue-700',
    cash: 'bg-green-500',
    PayPal: 'bg-blue-400',
    'Bank Transfer': 'bg-indigo-600',
    'Mobile Payment': 'bg-purple-500',
}