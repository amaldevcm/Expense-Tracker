export interface ExpenseSchema {
    title: string,
    amount: number,
    category: string,
    description: string,
    currency: string,
    exchangeRate: number,
    paymentType: string,
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

export type PaymentMethodKey = keyof typeof PaymentMethods;