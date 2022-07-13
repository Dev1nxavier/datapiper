import React, { useContext, useEffect } from 'react'
import { FirebaseContext } from './database/firebase';
import './App.css';
import MyAppBar from './components/AppBar';
import { Routes, Route} from "react-router-dom";
import Home from './screens/Home';
import SearchScreen from './screens/SearchScreen';
import Footer from './components/Footer';

function App() {

  const { api } = useContext(FirebaseContext);


  useEffect(() => {

    api.getAllData();

  }, [api])


  return (
    <div className="App">
      <MyAppBar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/search' element={<SearchScreen/>}/>
        </Routes>
      <Footer/>
    </div>
  );
}
export default App;
