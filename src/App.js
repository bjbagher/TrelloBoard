import React from "react"
import Board from "./Board/Board.js"
import { BrowserRouter as Router, Link, Switch } from "react-router-dom"


function App() {
    return (
        <main>
            <Router>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/board">Board</Link>
                        </li>
                        <button>BUTTON</button>
                    </ul>
                </nav>
                <Switch>
                    <Router path="/board">
                        <Board />
                    </ Router >
                    <Router path="/">
                        <Board />
                    </Router>
                </Switch>
            </Router>
        </main>
    )
}




export default App;