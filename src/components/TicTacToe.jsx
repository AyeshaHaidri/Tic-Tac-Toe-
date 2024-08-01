import Board from "./Board";
import GameOver from "./GameOver";
import GameState from "./GameState";
import { useEffect, useState } from "react";
import Reset from "./Reset";
import gameOverSoundAsset from "../sounds/game_over.wav";
import clickSoundAsset from "../sounds/click.wav"
import Head from "./Head";


const gameOverSound= new Audio(gameOverSoundAsset);
gameOverSound.volume=0.2;
const clickSound= new Audio(clickSoundAsset);
clickSound.volume=0.5;

const PLAYER_X="X";
const PLAYER_O="O";

const winningComb=[
    {combo:[0,1,2],strikeClass:"strike-row-1"},
    {combo:[3,4,5],strikeClass:"strike-row-2"},
    {combo:[6,7,8],strikeClass:"strike-row-3"},

    {combo:[0,3,6],strikeClass:"strike-col-1"},
    {combo:[1,4,7],strikeClass:"strike-col-2"},
    {combo:[2,5,8],strikeClass:"strike-col-3"},

    {combo:[0,4,8],strikeClass:"strike-dia-1"},
    {combo:[2,4,6],strikeClass:"strike-dia-2"},
]

function checkWinner(tile,setStrikeClass,setGameState)
{
    for(const {combo,strikeClass} of winningComb)
    {
        const tileValue1=tile[combo[0]];
        const tileValue2=tile[combo[1]];
        const tileValue3=tile[combo[2]];

        if(tileValue1!==null && tileValue1===tileValue2 && tileValue1===tileValue3)
        {
            setStrikeClass(strikeClass);
            if(tileValue1===PLAYER_X)
            {
                setGameState(GameState.playerXWins);
            }
            else{
                setGameState(GameState.playerOWins);
            }
            return;
        }
    }
    const areaAllTilesFilledIn=tile.every((tiles)=>tiles!==null);
    if(areaAllTilesFilledIn)
    {
        setGameState(GameState.draw);
    }
}

function TicTacToe(){
    const [tile,setTile]=useState(Array(9).fill(null));
    const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
    const [strikeClass,setStrikeClass]=useState();
    const [gameState,setGameState]=useState(GameState.inProgress);
   
    const handleTileClick=(index) =>
    {
        if(gameState!==GameState.inProgress)
        {
            return;
        }
        if(tile[index]!=null)
        {
            return;
        }
        const newTiles=[...tile];
        newTiles[index]=playerTurn;
        setTile(newTiles);
        if(playerTurn===PLAYER_X)
        {
            setPlayerTurn(PLAYER_O);
        }
        else{
            setPlayerTurn(PLAYER_X);
        }
    }

    const handleReset=()=>{
       setGameState(GameState.inProgress);
       setTile(Array(9).fill(null));
       setPlayerTurn(PLAYER_X);
       setStrikeClass(null);
    }

    useEffect(()=>{
        checkWinner(tile,setStrikeClass,setGameState);
       },[tile]);


       useEffect(()=>
    {
        if(tile.some((tiles)=>tiles!==null))
        {
            clickSound.play();
        }
    },[tile]);

    useEffect(()=>
        {
            if(gameState!==GameState.inProgress)
            {
                gameOverSound.play();
            }
        },[gameState]);
    return(
        <div>
            <Head />
            <Board strikeClass={strikeClass} playerTurn={playerTurn} tile={tile} onTileClick={handleTileClick}/> 
            <GameOver gameState={gameState}/>
            <Reset gameState={gameState} onReset={handleReset}/>
        </div>
    )
}
export default TicTacToe; 