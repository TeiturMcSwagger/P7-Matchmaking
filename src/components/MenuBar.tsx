import * as React from 'react'
import { Link } from 'react-router-dom';

export class MenuBar extends React.Component {
  public render() {
    return (
        <header className="App-header">
        <h1>Awesome Matchmaking</h1>
        <ul>
          <li><Link to="/">Create Group / Home</Link></li>
          <li><Link to="/leave">Leave</Link></li>
        </ul>
      </header>
    )
  }
}

export default MenuBar