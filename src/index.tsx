import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';

function render(App: React.FC) {
    ReactDOM.render(
        <RecoilRoot>
            <App />
        </RecoilRoot>,
        document.querySelector('#app')
    );
}

render(() => <div> hi</div>);