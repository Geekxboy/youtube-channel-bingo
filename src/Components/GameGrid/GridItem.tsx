import { useState } from "react";

interface GameItemProps {
  gridSize: string,
  label: string
}

export default function GameItem({ gridSize, label }: GameItemProps) {
  const [isActive, setActive] = useState(false);

  const toggleClass = () => {
    setActive(!isActive);
  };

  return (
    <div className={isActive ? `active-grid-item grid-${gridSize}`: `grid-${gridSize}`} onClick={toggleClass}>
      <p>{ label }</p>
    </div>
  );
}
