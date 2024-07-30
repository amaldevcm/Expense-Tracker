import './App.css';
import {useEffect, useState} from 'react';
import ListItem from './Components/listItem';
import NewExpense from './Components/newExpense';
import 'bootstrap-icons/font/bootstrap-icons.css';
// import moment from 'moment';


function App() {
  const url = 'http://localhost:3000/api/';
  const [allExpenses, setExpenses] = useState([]);
  // const today = moment().startOf('day').toISOString();
  // const [dateDisplayed, setDateDisplayed] = useState({});
  const [isEdited, setEdited] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [totalCash, setTotalCash] = useState(0);
  const [totalCard, setTotalCard] = useState(0);
  const [toggleCurrency, setToggleCurr] = useState(false);
  // let dateDispalyed = {};

  function getExpenses() {
    fetch(url+'expenses').then(res => res.json())
                          .then(res => {
                            console.log(res);
                            setExpenses(res['expenses']);
                            calculateTotal(res['expenses']);
                          });
  }

  function calculateTotal(expenses) {
    let sum_cash = 0;
    let sum_card = 0;
    expenses.forEach(expense => {
      if(expense.paymentType === 'cash'){
        if(expense.currency === 'USD'){
          sum_cash += expense.amount*83;
        } else {
          sum_cash += expense.amount;
        }
      } else {
        if(expense.currency === 'USD'){
          sum_card += expense.amount*83;
        } else {
          sum_card += expense.amount;
        }
      }

      
      setTotalCash(sum_cash);
      setTotalCard(sum_card);
    })
  }

  function currencyConverter(amount) {
    if(toggleCurrency) {
      return (amount/83).toFixed(2);
    } else {
      return amount.toFixed(2);
    }
  }

  useEffect(() => {
    getExpenses();
  }, []);

  // function compareDates(date1, date2){
  //   if(!date1 || !date2)
  //     return false;
  //   return moment(Date(date1)).startOf('day').isSame(moment(Date(date2)).startOf('day'));
  // }

  // function getCreatedDate(e_date) {
  //   console.log(e_date);
  //   if(!compareDates(e_date, today)){
  //     if(dateDisplayed[e_date] !== undefined){
  //       let dates = dateDisplayed;
  //       dates[e_date] = 1;
  //       setDateDisplayed(dates);
  //       return moment(Date(e_date)).format('DD MMM YYYY');
  //     } 
  //     return null;

  //   } else {
  //     if(dateDisplayed[e_date] !== undefined){
  //       let dates = dateDisplayed;
  //       dates[e_date] = true;
  //       setDateDisplayed(dates);
  //       return 'Today';
  //     }
  //     return null;
  //   }
  // }

  function selectItemFunc(expense) {
    setSelectedItem(expense);
    setEdited(true);
    console.log('selected', selectedItem);
  }

  return (
    <>
    <nav className="justify-self-start border-b-2 border-gray-500 p-3 mb-2">
      <span className="text-xl font-bold logo">Expense Tracker</span>
    </nav>

    <div className='xl:mx-40 flex flex-row justify-end'>
      <span className='mx-3' onClick={()=>setToggleCurr(!toggleCurrency)}><strong>Cash:</strong> 
            {toggleCurrency && <i className="bi bi-currency-dollar"/>}
            {!toggleCurrency && <i className="bi bi-currency-rupee"/>}
            {currencyConverter(totalCash)}
      </span>
      <span className='mx-3' onClick={()=>setToggleCurr(!toggleCurrency)}><strong>Card:</strong> 
            {toggleCurrency && <i className="bi bi-currency-dollar"/>}
            {!toggleCurrency && <i className="bi bi-currency-rupee"/>}
            {currencyConverter(totalCard)}
      </span>
    </div>
    <div className="flex flex-row xl:mx-40">
      <div className="max-h-dvh flex flex-col w-1/2 m-4 overflow-y-auto">{
        allExpenses.map((expense) => <>
        
        <h2 className="font-bold border-b-2 border-gray-400 p-1 mb-3 text-center">Today</h2>
            <ListItem item={expense} key={expense._id} stateChange={getExpenses} viewItem={() => selectItemFunc(expense)}></ListItem>
          </>
        )
      }</div>
      <div className="w-1/2 m-4">
        <NewExpense stateChange={getExpenses} edited={isEdited} expense={selectedItem}></NewExpense>
      </div>
    </div>
    </>
  );
}

export default App;
