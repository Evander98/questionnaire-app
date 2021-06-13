import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";
import { GlobalStyles } from "./assets/GlobalStyles";
import AddQuestion from "./components/AddQuestion";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import Register from "./components/Register";
import Survey from "./components/Survey";
import Result from './components/Result'
import Category from "./components/Category";
import Calculation from "./components/Calculation";

function App() {
  return (
    <div>
      <GlobalStyles/>
      <Navbar/>
      <Switch>
        <Route component={Survey} path='/' exact/>
        <Route component={Login} path='/login' exact/>
        <Route component={Register} path='/register' exact/>
        <Route component={Result} path='/result' exact/>
        <Route component={Category} path='/category' exact/>
        <Route component={Calculation} path='/calculation' exact/>
        {/* <Route component={AddQuestion} path='/add-question' exact/> */}
        <Route component={NotFound} path='*' exact/>
      </Switch>
    </div>
  );
}

export default withRouter(App);
