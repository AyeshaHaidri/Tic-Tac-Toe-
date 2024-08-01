import GameState from "./GameState";

function Reset({gameState,onReset})
{
    if(gameState===GameState.inProgress)
    {
        return;
    }
    return(
        <button onClick={onReset} className="reset-button">PLAY AGAIN</button>
    );
}
export default Reset;