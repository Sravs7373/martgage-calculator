import React,{Suspense} from 'react';
import { Routes,Route, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
const Welcome = React.lazy(()=>import('./components/pages/welcome/Welcome'));
const LoginFormContainer = React.lazy(()=>import('./components/pages/login/LoginFormContainer'))
const AddDetails = React.lazy(()=>import('./components/pages/add-details/AddDetails'));
const MortgageDetails = React.lazy(()=>import('./components/pages/add-details/details/MortgageDetails'));

const App = ()=>{
  return(
   <section className='overFlow-Hidden'>
      <Header />
      <Suspense fallback={<p className='loader'>Loading...</p>}>
      <Routes>
         <Route path='/' element={<Navigate to='/welcome' />}/>
         <Route path='/welcome' element={<Welcome />} />
         <Route path='/login' element={<LoginFormContainer />} />
         <Route path='/mort-list' element={<AddDetails />} />
         <Route path='/mort-list/:mortId' element={<MortgageDetails />} />
      </Routes>
      </Suspense>
   </section>
  )
}
export default App;