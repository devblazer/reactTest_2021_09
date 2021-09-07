import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PageHome from "./pages/home/pageHome";
import PageProduct from "./pages/product/pageProduct";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/beer/:beerId"><PageProduct /></Route>
        <Route path="/"><PageHome /></Route>
      </Switch>
    </Router>
  );
}

export default App;
