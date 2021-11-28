
import LandingPage from './components/landing/landingPage.jsx'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/home/home.jsx"
import CreateRecipe from "./components/createrecipe/createrecipe.jsx"
import Detail from "./components/detail/detail.jsx"

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/recipe" component={CreateRecipe} />
        <Route exact path="/home/:id" component={Detail} /> 
      </Switch>
    </div>
    </BrowserRouter>
  );
}
export default App;
