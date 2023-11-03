
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Newpage from './components/HealerDashboard';
//for the navigation bar
import NavigationBar from './components/NavigationBar';

// import { Test } from './components/Test';
import 'bootstrap/dist/css/bootstrap.min.css';
// import LoginFormOne from './components/LoginFormOne';
// anchors in the navbar for login and signup
import LoginFormValidation from './components/LoginFormValidation';
import SignupFormValidation from './components/SignupFormValidation';
import DataStore from './components/DataStore';
import UserDataTable from './components/UserDataTable';
import FormatTab from './components/FormatTab';
//healer dashboard
import HealerDashboard from './components/HealerDashboard';
import MyAccount from './components/MyAccount'//(profile,business,experience,education,appointment details in it)
import BankingDetails from './components/BankingDetails';
import TimeAvailability from './components/TimeAvailability';
import Subscriptions from './components/Subscription';
import Classes from './components/Classes';
import BookingHistory from './components/BookingHistory';


//Nav for inner pages
import NavBarInner from './components/NavBarInner';



function App() {

  const location = useLocation();
    
  const routeWithNavBarInner =[
    '/my-account', '/healer-dashboard-page', '/bank-details', '/time-page', '/subscription-page',
    '/classes-page', '/booking-page'
  ]
  
const toShowNavBarInner = routeWithNavBarInner.includes(location.pathname)
  //  const toHideNavBar = routeWithoutNavBar.includes(location.pathname);
  return (
   <>
     {/* {!toHideNavBar && <NavigationBar />}  */}
     {/* <NavBarInner> */}
      <NavigationBar/>
      {toShowNavBarInner && <NavBarInner />} 
      {/* </NavBarInner> */}
    
      <Routes>

       
        
       
        <Route path="/healer-dashboard-page" element={<HealerDashboard />} />
        {/* <Route path="/login-form-one" element={<LoginFormOne />} /> */}
        {/* <Route path="/test" element={<Test />} /> */}
        <Route path="/login-form-val" element={<LoginFormValidation/>} />
        <Route path="/signup-form-val" element={<SignupFormValidation/>} />
        {/* <Route path="/data-store" element={<DataStore/>} />
        <Route path="/user-data-table" element={<UserDataTable/>} />
        <Route path="/tabs" element={<FormatTab/>} /> */}
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/bank-details" element={<BankingDetails />} />
        <Route path="/time-page" element={<TimeAvailability />} />
        <Route path="/subscription-page" element={<Subscriptions />} />
        <Route path="/classes-page" element={<Classes />} />
        <Route path="/booking-page" element={<BookingHistory />} />
      
        
      </Routes>

  </>
  );
}
export default App;