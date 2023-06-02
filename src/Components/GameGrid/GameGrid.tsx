import { useEffect, useState } from "react";
import GridItem from "./GridItem";
import { useNavigate } from "react-router-dom";

interface GameGridProps {
  gridSize: string,
  squares: string[],
  freeSpace: boolean
}

export default function GameGrid({ gridSize, squares, freeSpace }: GameGridProps) {
  const [gridArray, setGridArray] = useState<string[]>([]);
  let navigate = useNavigate();

  useEffect(() => {
    const savedGridArray = localStorage.getItem("gridArray");
    if (savedGridArray) {
      setGridArray(JSON.parse(savedGridArray));
    } else {
      createGrid();
    }
  }, [])

  const createGrid = () => {
    var size = getGridSize();
    var array = shuffleArray(squares).slice(0, size);
    if (freeSpace) {
      if (size === 36) array[14] = "Free Space";
      if (size === 25) array[12] = "Free Space";
    }
    setGridArray(array);
    localStorage.setItem("gridArray", JSON.stringify(array));
  }

  const shuffleArray = (array:any[]) => {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  const getGridSize = () => {
    return parseInt(gridSize) * parseInt(gridSize);
  }

  return (
    <>
      <div className="row">
        {(gridArray as string[]).map(item => (
          <GridItem gridSize={gridSize} label={item} key={item} />
        ))}
      </div>

      <div className="row my-5 mx-5">
        <button className="btn btn-primary btn-lg" onClick={createGrid}>Shuffle Board</button>
        <button className="btn btn-danger btn-lg" onClick={() => navigate("/")}>New Game</button>
      </div>
    </>
  );
}
