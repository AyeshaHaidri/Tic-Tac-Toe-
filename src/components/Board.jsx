import Tiles from "./Tiles";
import Strike from "./Strike";
function Board({tile,onTileClick,playerTurn,strikeClass})
{
    return (
        <div className="board"> 
            <Tiles playerTurn={playerTurn} onClick={()=> onTileClick(0)} value={tile[0]}  className="right-border bottom-border"/>
            <Tiles playerTurn={playerTurn} onClick={()=> onTileClick(1)} value={tile[1]}  className="right-border bottom-border"/>
            <Tiles playerTurn={playerTurn} onClick={()=> onTileClick(2)} value={tile[2]}  className="bottom-border"/>
            <Tiles playerTurn={playerTurn} onClick={()=> onTileClick(3)} value={tile[3]}  className="right-border bottom-border" />
            <Tiles playerTurn={playerTurn} onClick={()=> onTileClick(4)} value={tile[4]}  className="right-border bottom-border"/>
            <Tiles playerTurn={playerTurn} onClick={()=> onTileClick(5)} value={tile[5]}  className=" bottom-border"/>
            <Tiles playerTurn={playerTurn} onClick={()=> onTileClick(6)} value={tile[6]}  className="right-border "/>
            <Tiles playerTurn={playerTurn} onClick={()=> onTileClick(7)} value={tile[7]}  className="right-border "/>
            <Tiles playerTurn={playerTurn} onClick={()=> onTileClick(8)} value={tile[8]}  className=""/>
            <Strike strikeClass={strikeClass}/>
        </div>
        
    )
}
export default Board;