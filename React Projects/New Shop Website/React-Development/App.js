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
    const response = await fetch('http://localhost:8080/user/test', {
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
  console.log(e)
  e.preventDefault();

  const form = e.target;
  const formJson = Object.fromEntries(new FormData(form).entries());
  console.log(formJson)
  const sendmessage = async() => {
    try{
      const response = await fetch('http://localhost:8080/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formJson)
      })
      const data = await response.text()
      console.log(data)
    } catch (error){
      console.log(error)
    }
  }
  
  sendmessage();
}

function App() {
  return (
    <div className="App">
      <form method="post" onSubmit={sending_message}>
        <label>
          <input name="username" />
          <input name="password" />
        </label>
         <button type="submit">submit_test</button>
      </form>
    </div>
  );
}

export default App;
