import { useEffect } from 'react';
import GameGrid from '../Components/GameGrid/GameGrid';
import VideoPlayer from '../Components/VideoPlayer/VideoPlayer';
import './css/Play.scss';
import { useNavigate } from 'react-router-dom';

const Play = () => {
  const gameOptions = localStorage.getItem("options");
  let jsonOptions = JSON.parse('{"channelUrl":"","squares":[],"boardSize":"5","clipLength":60,"freeSpace":false}');
  let navigate = useNavigate();

  useEffect(() => {
    if (!gameOptions) {
      navigate("/");
    }
  }, [ gameOptions, navigate ]);

  if (gameOptions) 
    jsonOptions = JSON.parse(gameOptions);
  

  return (
    <>
        <div className="row d-flex justify-content-center text-center">
          <div className="col-lg-6 px-5">
            <VideoPlayer channelUrl={jsonOptions.channelUrl} clipLength={jsonOptions.clipLength} />
          </div>
          <div className="col-lg-6 px-5">
            <GameGrid gridSize={jsonOptions.boardSize} squares={jsonOptions.squares} freeSpace={jsonOptions.freeSpace} />
          </div>
        </div>
    </>
  );
};

export default Play;