// import banquete from "./assets/banquete.jpg"
// import LandingPage from './components/landing/landingPage.jsx'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/home/home.jsx"
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      {/* <LandingPage imageSrc={banquete}/> */}
      <Home/>
    </div>
    </BrowserRouter>
  );
}

export default App;
