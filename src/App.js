import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

function App() {
  
  const someVariable = true;

  return (
    <Router>
      <div>
        <Header />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/render-prop" render={props => <RenderAbout {...props} extra={someVariable} /> } />
          <Route path="/topics" component={Topics} />
          {/* when none of the above match, <NoMatch> will be rendered */}
          <Route component={NoMatch} />
        </Switch>

      </div>
    </Router>
  );
}

function NoMatch() {
  return <h2>Page Not Found</h2>;
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function RenderAbout(props) {
  console.log(props);
  console.log(props.extra);
  return <h2>RenderAbout</h2>;
}

function Topic({ match }) {
  return <h3>Requested Param: {match.params.id}</h3>;
}

function Topics({ match }) {
  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      <Route path={`${match.path}/:id`} component={Topic} />
      <Route exact path={match.path} render={() => <h3>Please select a topic.</h3>}
      />
    </div>
  );
}

function Header() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/render-prop">Render with Property</Link>
      </li>
      <li>
        <Link to="/topics">Topics</Link>
      </li>
    </ul>
  );
}

export default App;