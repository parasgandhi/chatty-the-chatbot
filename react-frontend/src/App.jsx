// Import dependencies
import React, {useEffect} from 'react';

// Import CSS
import ".//assets/Chat.css"
import "./assets/main.css"

// Import redux components
import {Provider} from "react-redux"
import store from "./store"

// import wrapper component
import {Wrapper} from "./components/Wrapper"
// import action 
import {CreateSession} from "./actions/paras" 

// connect application to redux
const App = () => {
  // in case the page is refreshed
  useEffect(()=>{
    // check if there is a session. Beyond the scope of this assignment though
    if(!localStorage.session){
      // create a session
      store.dispatch(CreateSession())
    }
  })

  return (
    <Provider store={store}>
      <div className="bg-gray-200 pb-24">
        {/* Insert wrapper component Here */}
        <Wrapper/>
      </div>
    </Provider>
  );
}

export default App;
