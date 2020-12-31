import React,{Component} from "react";
import {Link} from "react-router-dom"// that will allow to link to different routes & and its same as the anchor(a) tag 

export default class Navbar extends Component{
    render() { //all components have to render something so thats why we use render method
        return (
            //bootstrap styles
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg"> 
                <Link to ="/" className="navbar-brand">ExerTracker</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Exercises</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create" className="nav-link">Create Exercise Log</Link>
                        </li><li className="navbar-item">
                            <Link to="/user" className="nav-link">Create User</Link>
                        </li>

                    </ul>
                </div> 
            </nav>
        )
    }
}