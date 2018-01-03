/**
* @description：
* @author: manble@live.com
* @created: 2017-12-23
*/

'use strict';

import { Component } from 'react';
import { render } from 'react-dom';
import {
   BrowserRouter as Router,
   HashRouter,
   StaticRouter,
   MemoryRouter,
   Route,
   Link,
   NavLink,
   Switch,
   Redirect,
   Prompt,
   withRouter
} from 'react-router-dom';
import css from 'scss/app.scss';

import loadable from 'react-loadable';
import loading from 'components/widgets/loading';

// This is an ugly code, just to fully learn api of react-router-dom
const Home = () => (
   <h2>Home</h2>
);
const About = loadable({
   loader: () => import('components/about'),
   loading: loading
});
const Topics = loadable({
   loader: () => import('components/topics'),
   loading: loading
});

const CustomRoute = ({ label, to, activeOnlyWhenExact }) => (
   <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
      <div className={match ? 'active' : ''}>
         {match ? '!' : ''} <Link to={to}>{label}</Link>
      </div>
   )} />
);

const ToHome = withRouter(({ history }) => (
   <button onClick={() => {
      history.push('/');
   }}>Home</button>
));

class App extends Component {
   constructor() {
      super();
      this.state = {
         isBlocking: false
      };
   }

   componentDidMount() {
      setTimeout(() => {
         // this.setState({
         //    isBlocking: true
         // });
      }, 10000);
   }

   render() {
      let { isBlocking } = this.state;
      return (
         <Router basename="/">
            <div>
               <header>
                  <ul className={css.nav}>
                     <li><CustomRoute to="/" label="Home" activeOnlyWhenExact={true} /></li>
                     <li><NavLink to="/about" activeClassName="selected">About</NavLink></li>
                     <li><Link to="/topics">Topics</Link></li>
                     <li><Link to="/redirect">redirect</Link></li>
                  </ul>
               </header>
               <main className={css.content}>
                  <Switch>
                     <Route exact path="/" component={Home} />
                     <Route path="/about" component={About} />
                     <Route path="/topics" component={Topics} />
                     <Route path="/redirect" render={props => (
                        <Redirect to={{
                           pathname: '/recirect-test',
                           search: '?type=type',
                           hash: '#hash',
                           state: { from: props.location }
                        }} push />
                     )} />
                     <Route render={props => (
                        <h3>No match for <code>{location.pathname}</code></h3>
                     )} />
                  </Switch>
               </main>
               <footer>
                  <ToHome />
               </footer>
               <Prompt when={isBlocking} message={location => (`Are you sure you want to go to ${location.pathname}`)} />
            </div>
         </Router>
      );
   }
}

render(<App />, document.querySelector('#app'));