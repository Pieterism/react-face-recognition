import React from 'react';
import {Link} from "react-router-dom";
import './NavPills.css'

class NavPills extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="nav-center">
                    <ul className="nav nav-pills">
                        <li className="active"><Link data-toggle="pill" to="#image-input">Image input</Link></li>
                        <li><Link data-toggle="pill" to="#video-input">Video input</Link></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default NavPills;