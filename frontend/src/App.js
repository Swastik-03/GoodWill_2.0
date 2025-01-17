// import './App.css';
import Landing from './components/home/landing';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getLoginStatus } from './services/authService.js';
import { SET_LOGIN_USER } from './redux/features/auth/authSlice.js';
import LoginContainer from './components/login/LoginContainer.js';
import Userhome from './components/user/Userhome.js';
import SerVices from './components/Services/Services.js'
import Contact from './components/Contact/contact.js'
import NGO_page from './components/NGO/NGO_Page.js'
import NGO_Dashboard from './components/NGO/NGO_Dashboard.js'
import UserdetailsForm from './components/user/UserdetailsForm.js';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import MainDashboard from './components/adminDashboard/MainDashboard.js';
import UserReviews from './components/Rating/Ratings.js';
import UserTable from "./components/adminDashboard/tables/UserTable";
import NGOsTable from "./components/adminDashboard/tables/NGOsTable";
import FeedbackTable from "./components/adminDashboard/tables/FeedbackTable";
import ReviewsTable from "./components/adminDashboard/tables/ReviewsTable";
import MessagesTable from "./components/adminDashboard/tables/MessagesTable";
import DonationsTable from "./components/adminDashboard/tables/DonationsTable";
import Feedback from "./components/feedback/Feedback";
import Home from "./blogs/Home";
import AddBlog from './blogs/AddBlog.js';
import BlogDetails from './blogs/BlogDetails.js';
import ContactUs from "./blogs/ContactUs.js";
import AboutUs from "./blogs/AboutUs.js";
import Layout from './blogs/Layout.js';
import Became_volunteer from './components/Services/forms/became_volunteer.js';
import UserProfile from './components/user/Userprofile.js'
import Campaign from './components/NGO/Campaign_Dashboard.js'

axios.defaults.withCredentials = true;


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
      console.log(status)
      dispatch(SET_LOGIN_USER(status));
    }
    loginStatus();
  }, [dispatch]);


  return (

    <Router>
      <div className="App">

        <div style={{ backgroundColor: 'white' }}>
          <Routes forceRefresh={true}>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/login" element={<LoginContainer />} />
            <Route exact path="/user" element={<Userhome />} />  {/*hide*/}
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/ngo" element={<NGO_page />} />  
            <Route exact path="/userdetails" element={<UserdetailsForm/>}/>
            <Route exact path='/Ngo_dashboard' element={<NGO_Dashboard />} />  {/*hide*/}
            <Route exact path='/Admin' element={<MainDashboard />} />  {/*hide*/}
            <Route exact path='/givereview' element={<UserReviews />} />  {/*hide*/}
            <Route exact path='/:username' element={<UserProfile />} />  
            <Route exact path='/campaign' element={<Campaign />} />  
       
       <Route exact path='/services' element={<SerVices/>}/>
       <Route exact path='/services/volunteer' element={<Became_volunteer/>} />


            <Route path='/blogs' element={<Layout />}>
              <Route path='' element={<Home />} />
              <Route path='add' element={<AddBlog />} />
              <Route path=':id' element={<BlogDetails />} />
              <Route path='contact' element={<ContactUs />} />
              <Route path='about' element={<AboutUs />} />
            </Route>

          </Routes>
        </div>
        <Routes>
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/adminDashboard" element={<MainDashboard />} />
          <Route path="/adminDashboard/UserTable" element={<UserTable />} />
          <Route
            path="/adminDashboard/FeedbackTable"
            element={<FeedbackTable />}
          />
          <Route path="/adminDashboard/ReviewsTable" element={<ReviewsTable />} />
          <Route
            path="/adminDashboard/DonationsTable"
            element={<DonationsTable />}
          />
          <Route
            path="/adminDashboard/MessagesTable"
            element={<MessagesTable />}
          />
          <Route path="/adminDashboard/NGOsTable" element={<NGOsTable />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
