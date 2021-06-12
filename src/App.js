import React, { useState } from "react";

// generate random number
let randomNumber = Math.floor(Math.random() * 20) + 1;


const Game = () => {
  const [value, setValue] = useState("");
  const [results, setResults] = useState("");
  const [remainingAttempts, setRemainingAttempts] = useState(10);
  const [guesses, setGuesses]= useState([]);
  const [gameOver, setGameOver] = useState(false);
  
  
  const clear = () => {
    setValue("");
  };
  
  const reset = () => {
    randomNumber = Math.floor(Math.random() * 20) + 1;
    setValue("");
    setResults("");
    setRemainingAttempts("10");
    document.getElementById("inputfield").disabled = false;
    setGuesses('');
    
  };
  
  const submit = () => {
    const userGuess = parseInt(value, setValue); // convert string to integer
    // If the user clicks 'Guess' without entering a number, ask them to pick a number
    setResults(<p className="alert alert-info">Pick a number</p>);
    setGuesses([...guesses, parseInt(value)]);
    // If user input matches randomNumber, user guess is Correct!
    if (userGuess === randomNumber) {
      setResults( <p className="alert alert-success">Correct number, YOU WON !</p>);
      document.getElementById("inputfield").disabled = true;
      setGameOver(true);
    }
      // If user input is higher than randomNumber, user guess is 'Too high'
    else if (userGuess > randomNumber)
    if (remainingAttempts > 1) {
      setResults(<p className="alert alert-warning">Too high, guess again</p>);
      setRemainingAttempts(remainingAttempts - 1)
    }  else {
      setResults(<p className="alert alert-danger">Game over!</p>);
      setRemainingAttempts("0")
        document.getElementById("inputfield").disabled = true;
    }
    // If user input is lower than randomNumber, user guess is 'Too low'
    else if (userGuess < randomNumber)
    if (remainingAttempts > 1) {
      setResults(<p className="alert alert-warning">Too low, guess again</p>);
      setRemainingAttempts(remainingAttempts - 1)
    } else {
      setResults(<p className="alert alert-danger">Game over!</p>);
      setRemainingAttempts("0")
      document.getElementById("inputfield").disabled = true;
      setGameOver(true);
    }
    setValue('');
  };
  
  return ( 
    <>
      <h2>Number Guessing Game</h2>
      <p className="lead">Guess a number between 1 and 20.</p>
      
      <input 
      id = "inputfield"
        value={value}
        type="number"
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="btn-group" role="group" aria-label="Basic example">
  <button type="button" className="btn btn-primary m-1"  onClick={submit}>Submit number</button>
  <button type="button" className="btn btn-primary m-1" onClick={clear}>Clear</button>
  <button type="button" className="btn btn-primary m-1" onClick={reset}>Reset</button>
</div>
{results}
{guesses.length ? <div>
                    Previous guesses: 
                     {guesses.map((guess, index) => {
                    return <span key={index}>{(index ? ', ' : '') + guess}</span>
                })}</div> : <div></div>}
  <div style = {{color: 'red'}}>
Remaining attempts : {remainingAttempts} 
  </div>
  {gameOver&&<button id= "start" className="btn btn-info m-1" onClick={reset}>Start New Game</button>}
    </>
  );
};

export default Game;
