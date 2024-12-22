import {Container} from "@mui/material"
import BottomNavBar from "./components/BottomNavBar"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Movies from "./pages/Movies.tsx";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Questionnaire from "./pages/Questionnaire.tsx";
import EmotionsResult from "./pages/EmotionsResult.tsx";
import Profile from "./pages/Profile.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import GeneratedMovieWrapper from "./pages/GeneratedMovieWrapper.tsx";
import UserHistory from "./pages/UserHistory.tsx";
import Home from "./pages/Home.tsx";
import ChooseEmotion from "./pages/ChooseEmotion.tsx";
import {Toaster} from "sonner";

function App() {

  return (
    <Container maxWidth="sm" sx={{padding: 0}}>
      <Toaster richColors position={'top-right'}/>
      <Router>
        <Routes>
          <Route
            element={<ProtectedRoute/>}
          >
            <Route path="/movies" element={<Movies/>}/>
            <Route path="/questionnaire" element={<Questionnaire/>}/>
            <Route path="/results" element={<EmotionsResult/>}/>
            <Route path="/movies/generateMovie/emotions/:haveEmotions/:numMovies?" element={<GeneratedMovieWrapper/>}/>
            <Route path="/movies/:numMovies/selectEmotion" element={<ChooseEmotion/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path={"/history"} element={<UserHistory/>}/>
          </Route>

          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
        <BottomNavBar/>
      </Router>
    </Container>
  )
}

export default App
