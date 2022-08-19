import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ChatbotImage from './components/ChatbotImage';
import RegisterPage from './pages/RegisterPage';
import IsLogin from './components/IsLogin';
import CoursesAndAbbr from './components/CoursesAndAbbr';
import IsAuth from './components/IsAuth';
import CoursesPage from './dashboard/CoursesPage';
import CommentsPage from './dashboard/CommentsPage';
import OverviewPage from './dashboard/OverviewPage';
import QnA from './dashboard/QnA';
import AddCourse from './dashboard/AddCourse';
import UpdateCourse from './dashboard/UpdateCourse';
import NoPage from './pages/NoPage';

function App() {
   
  return (
    <BrowserRouter>
    <div className="App">
        <header>
          <ChatbotImage />
          <CoursesAndAbbr/>
          <IsLogin/>
        </header>
        <main>
          <Routes>
          <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
              <Route path='/dashboard/overview' element={<IsAuth><OverviewPage /></IsAuth>} />
            <Route path='/dashboard/courses' element={<IsAuth><CoursesPage /></IsAuth>} />
            <Route path='/dashboard/comments' element={<IsAuth><CommentsPage /></IsAuth>} />
            <Route path='/dashboard/QnA' element={<IsAuth><QnA /></IsAuth>} />
            <Route path='/dashboard/add-course' element={<IsAuth><AddCourse /></IsAuth>} />
            <Route path={`/dashboard/update-course/:_id`} element={<IsAuth><UpdateCourse /></IsAuth>} />
            <Route path = "*" element={<NoPage/>}/>
          </Routes>
          
        </main>
          
      
      <footer>All Right Reserved @2022</footer>
      </div>
   </BrowserRouter>   
  );
}

export default App;
