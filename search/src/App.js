import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AutoComplete from "./components/AutoComplete";
import ClientDetail from "./components/ClientDetail";
import OriginClients from "./components/OriginClients";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Error from "./components/Error";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <header className="App-header">
          <Switch>
            <Route path="/" exact component={AutoComplete}></Route>
            <Route path="/detail/:id" exact component={ClientDetail}></Route>
            <Route
              path="/origin/:origin"
              exact
              component={OriginClients}
            ></Route>
            <Route path="*" component={Error}></Route>
          </Switch>
        </header>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
