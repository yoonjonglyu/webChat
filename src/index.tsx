import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';

import App from './app';

function render(App: React.FC) {
    ReactDOM.render(
        <RecoilRoot>
            <App />
        </RecoilRoot>,
        document.querySelector('#app')
    );
}

render(App);