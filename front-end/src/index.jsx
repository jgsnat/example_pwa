import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

// imgs
import './img/favicon.ico';
import './img/icon-72x72.png';
import './img/icon-96x96.png';
import './img/icon-128x128.png';
import './img/icon-144x144.png';
import './img/icon-152x152.png';
import './img/icon-192x192.png';
import './img/icon-384x384.png';
import './img/icon-512x512.png';


// css
import './css/index.css';
import './css/pure-min.css';

ReactDOM.render(
    <App />,
    document.querySelector("#main")
);