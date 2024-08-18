import { useState } from "react"

function NewExpense({stateChange, edited, item}) {
    console.log(edited, item);
    // const url = 'http://localhost:3000/api/';
    const url = 'https://expense-manager-uqvh.onrender.com/api/';
    const [title, setTitle] = useState(edited? item.title: '');
    const [desc, setDesc] = useState(edited? item.description: '');
    const [currency, setCurrency] = useState(edited? item.currency: 'IND');
    const [amount, setAmount] = useState(edited? item.amount: '');
    const [payType, setPayType] = useState(edited? item.paymentType: 'cash');

    function saveExpense() {
        const data = {
            title: title,
            description: desc,
            currency: currency,
            amount: Number.parseFloat(amount),
            paymentType: payType
        }

        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: {}
        }
        
        requestOptions.body = JSON.stringify(data)
        fetch(url+'newExpense', requestOptions)
                                .then((res) => {
                                    console.log(res);
                                    resetFields();
                                    stateChange(true);
                                });
    }

    function usdToIndConversion(amount){
        if(!amount || amount === '')
            return 0.00;
        return (amount*83).toFixed(2);
    }

    function resetFields(){
        setTitle('');
        setDesc('');
        setCurrency('IND');
        setAmount('');
        setPayType('cash');
    }

    return (
        <>
        <h2 className="font-bold border-b-2 border-gray-400 p-2 mb-3">New Expense</h2>
        <div className="flex flex-col p-2">
            <div className="flex flex-row mb-3">
                <label className="w-1/3 mr-2">Title</label>
                <input type="text" className="w-full h-11 border border-gray-300 outline-blue-400 rounded p-1" value={title} onChange={e => setTitle(e.target.value)}/>
            </div>

            <div className="flex flex-row mb-3">
                <label className="w-1/3 mr-2">Description</label>
                <textarea className="w-full border border-gray-300 outline-blue-400 rounded p-1" value={desc} onChange={e => setDesc(e.target.value)}/>
            </div>
            
            <div className="flex flex-row mb-3">
                <label className="w-1/3 mr-2">Currency</label>
                <select className="w-full h-11 border border-gray-300 outline-blue-400 rounded p-1" value={currency} onChange={e => setCurrency(e.target.value)}>
                    <option value="IND">Indian Rupee</option>
                    <option value="USD">US Dollar</option>
                </select>
            </div>

            <div className="flex flex-row mb-3">
                <label className="w-1/3 mr-2">Expense</label>
                <div className="w-full flex flex-row">
                    <input type="text" className="w-full h-11 border border-gray-300 outline-blue-400 rounded p-1" value={amount} onChange={e => setAmount(e.target.value)}/>
                    { currency === 'USD' && <label className="p-2"><i className="bi bi-arrow-left-right"></i></label> }
                    { currency === 'USD' && 
                    <span className="w-full h-11 justify-center border border-gray-300 outline-blue-400 rounded p-1 disabled:bg-gray-400" aria-disabled><i className="bi bi-currency-rupee p-1"></i>{usdToIndConversion(amount)}</span> }
                </div>
            </div>

            <div className="flex flex-row mb-3">
                <label className="w-1/3 mr-2">Payment Mode</label>
                <select className="w-full h-11 border border-gray-300 outline-blue-400 rounded p-1" value={payType} onChange={e => setPayType(e.target.value)}>
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                </select>
            </div>

            <div className="flex flex-row mb-3">
                <button className="w-1/4 text-white bg-blue-400 border-2 border-blue-600 rounded m-2 p-1" onClick={saveExpense}>Save</button>
                <button className="w-1/4 text-black bg-gray-300 border-2 border-gray-400 rounded m-2 p-1" onClick={resetFields}>Reset</button>
            </div>

        </div>
        </>
    )
}

export default NewExpense;