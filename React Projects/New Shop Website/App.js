import logo from './logo.svg';
import './App.css';

import { useEffect, useState } from 'react';

function button_test(post_function){
  return (<button
    className="button_test"
    onclick={post_function}
    />
  );
}



function post_function(){
  const sendmessage = async () => {
    try{
    const response = await fetch('http://localhost:8080/api/user', {
      method: 'POST', //What Method
      headers: {
        'Content-Type': 'application/json' //What Content Type
      },
      body: JSON.stringify({message: "data"}) //What are we sending
    });
    const data = await response.json(); // Server response await is need for time
    console.log(data)
  } catch(error) {
    console.log('Error:',  error) //Error case nothing important
  }
 }
}

function sending_message(e){
  e.preventDefault(); 

  const form = e.target;
  const formJson = Object.fromEntries(new FormData(form).entries());
  console.log(formJson)

}

function App() {
  return (
    <div className="App">
      <form method="post" onSubmit={sending_message}>
        <label>
          <input name="test_input" />
        </label>
         <button type="submit">submit_test</button>
      </form>
    </div>
  );
}

export default App;
