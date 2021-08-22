
import React , { Component } from 'react' 
import { BrowserRouter as Router , Route , Switch ,Redirect } from 'react-router-dom'
import Home from './pages/home';

// import Detial from './pages/detail/loadable'
import Detail from './pages/detail'
import Header from './common/Header'
import Login from './pages/login'
import Write from './pages/writer'
class App extends Component {
  render(){
    return (
      
      <Router>
        <Header />
        <div>
          
          <Switch>
            <Route path='/LSLjianshu/' exact component={Home} />
            <Route path='/LSLjianshu/detail' component={Detail} /> 
            <Route path='/LSLjianshu/login' component={Login} />
            <Route path='/LSLjianshu/write' component={Write}/>
            <Redirect from='/' exact to='/LSLjianshu/'/> 
            <Redirect from='/detail' to='/LSLjianshu/detail'/>  
            <Redirect from='/login' to='/LSLjianshu/login'/> 
            <Redirect from='/write' to='/LSLjianshu/write'/> 
          </Switch>
        </div>
      </Router>
    )
  }
}
export default App;