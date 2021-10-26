import banquete from "./assets/banquete.jpg"
import LandingPage from './components/landing/landingPage.jsx'
function App() {
  return (
    <div className="App">
      <LandingPage imageSrc={banquete}/>
    </div>
  );
}

export default App;
