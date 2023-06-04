import { Route,Routes } from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import HomeComponent from './components/Home';
import { ToastContainer } from 'react-toastify';
import AuthLoginProvider from './Context/AuthProvider';
import UsersComponent from './components/Users';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  
  return (
    <div className="App">
      <AuthLoginProvider>
        <Routes>
          <Route path="/" element={<LoginComponent/>}/>
          <Route path="/home" element={<HomeComponent/>}>
            <Route path="" element={<UsersComponent/>}/>
          </Route>
        </Routes>
        <ToastContainer/>
      </AuthLoginProvider>a
    </div>
  );
}

export default App;
