import React from 'react';
import ReactDOM from 'react-dom';
import './app.css';
import {MoveableTest} from "./components/moveable/moveable-test";


ReactDOM.render(
    <React.StrictMode>
        <MoveableTest/>
    </React.StrictMode>,
    document.getElementById('app')
);
