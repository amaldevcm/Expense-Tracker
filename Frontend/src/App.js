import './App.css';
import {useEffect, useState} from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ExpenseTracker } from './Components/ExpenseTracker';
// import moment from 'moment';


function App() {
  return (
  <div className="min-h-screen bg-slate-50">
    <ExpenseTracker />
  </div>
)}

export default App;
