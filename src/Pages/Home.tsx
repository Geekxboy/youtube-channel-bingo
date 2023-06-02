import { useNavigate } from "react-router-dom";
import './css/Home.scss';
import { useState } from "react";

// Intialize game data storage
let gameProps = {
  channelUrl: '',
  squares: [""],
  boardSize: '5',
  clipLength: 60,
  freeSpace: false
}

// Load in saved game data
const gameOptions = localStorage.getItem("options");
if (gameOptions) {
  const jsonOptions = JSON.parse(gameOptions);
  gameProps.channelUrl = jsonOptions.channelUrl;
  gameProps.squares = jsonOptions.squares;
  gameProps.boardSize = jsonOptions.boardSize;
  gameProps.clipLength = jsonOptions.clipLength;
  gameProps.freeSpace = jsonOptions.freeSpace;
}

const Home = () => {

  let navigate = useNavigate();
  const [ getErrorMessage, setErrorMessage ] = useState("");

  // Start the game
  const playGame = () => {
    if (!validateYouTubeUrl(gameProps.channelUrl)) {
      setErrorMessage("Invalid Youtube Channel URL Provided");
      return;
    }

    if (gameProps.squares.length < requiredSquares()) {
      setErrorMessage("You need atleast '" + String(requiredSquares()) + "' square options to fill up all of the bingo squares.");
      return;
    }

    localStorage.removeItem("gridArray")
    localStorage.setItem("options", JSON.stringify(gameProps));
    navigate("/play");
  };

  const updateSquares = (event: any) => {
    let lines = event.target.value.split(/\r|\r\n|\n/);
    let filteredLines = [];
    for (var i = 0; i < lines.length; i++) {
      if (lines[i]) {
        filteredLines.push(lines[i]);
      }
    }

    gameProps.squares = filteredLines;
  }
  
  function validateYouTubeUrl(urlToParse:string){
    if (urlToParse) {
        var regExp = /^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.be)\/.+$/;
        if (urlToParse.match(regExp)) {
            return true;
        }
    }
    return false;
  }

  function requiredSquares() {
    var size = parseInt(gameProps.boardSize) * parseInt(gameProps.boardSize);
    if (gameProps.freeSpace) size--;
    return size;
  }

  return (
    <>
      <div className="row d-flex justify-content-center align-items-center text-center">
        <div className="col-md-3 mt-3">
          <p className="text-danger">{getErrorMessage}</p>
        </div>
      </div>

      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-md-4 px-5 ">
          <div className="form-floating mb-3">
            <input className="form-control" id="channelUrl" type="text" defaultValue={gameProps.channelUrl} placeholder="Youtube Channel URL" onChange={ e => gameProps.channelUrl = e.target.value } />
            <label htmlFor="channelUrl">Youtube Channel URL</label>
          </div>
          <div className="form-floating mb-3">
            <textarea className="form-control" id="bingoSquares" placeholder="Bingo Squares" defaultValue={gameProps.squares.join('\r\n')} onChange={updateSquares}></textarea>
            <label htmlFor="bingoSquares">Bingo Squares</label>
          </div>
          <div className="form-floating mb-3">
            <select className="form-select" id="boardSize" aria-label="Board Size" defaultValue={gameProps.boardSize} onChange={ e => gameProps.boardSize = e.target.value }>
              <option value="5">5x5</option>
              <option value="6">6x6</option>
            </select>
            <label htmlFor="boardSize">Board Size</label>
          </div>
          <div className="form-floating mb-3">
            <input className="form-control" id="clipLength" type="number" defaultValue={gameProps.clipLength} placeholder="Clip Length" onChange={ e => gameProps.clipLength = parseInt(e.target.value) } />
            <label htmlFor="clipLength">Clip Length (In Seconds)</label>
          </div>
          <div className="mb-3">
              <div className="form-check form-switch">
                <input className="form-check-input" id="enableFreeSpace" type="checkbox" name="enableFreeSpace" defaultChecked={gameProps.freeSpace} onChange={ e => gameProps.freeSpace = e.target.checked } />
                <label className="form-check-label" htmlFor="enableFreeSpace">Enable Free Space</label>
              </div>
          </div>
          <div className="d-grid">
            <button className="btn btn-primary btn-lg" id="playButton" type="submit" onClick={ playGame }>Play</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;