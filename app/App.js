import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import FirstContainer from "./containers/FirstContainer";
import reducer from "./reducers/rootReducer";
import {render} from 'react-dom';
import io from 'socket.io-client';

import './style/decoration.css';
import './style/flex.css';
import './style/spacing.css';
import './style/standard.css';

let store = createStore(reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class App extends Component {

    render() {    
        return (
            <Provider store={store}>
                <div>
                    <FirstContainer />
                </div>
            </Provider>
        );
  }
}

render(<App />, document.getElementById('app')) // use this for Webpack builds
// export default App; // Use this for hosting live
