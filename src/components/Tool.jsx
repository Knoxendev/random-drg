import { createSignal, createEffect, Show} from "solid-js";
import Mods from "../components/Mods";

function Tool(props) {

    const [tool, setTool] = createSignal({
        "tool": props.tool[[Math.floor(Math.random() * props.tool.length)]],
        "modsID": [],
        "overclockID": 0
    });

    createEffect(()=>{
        props.tool;
        randomizeWeapon();
    })

    function randomizeWeapon() {
        // First, randomize tool.
        let randomizedTool = randomizeTool();
        let randomizedModsID = props.hasMods ? randomizeModsID(randomizedTool) : [];
        let randomizedOverclockID = props.hasOverclock ? randomizeOverclockID(randomizedTool) : 0;
        setTool({
            "tool": randomizedTool,
            "modsID": randomizedModsID,
            "overclockID": randomizedOverclockID
        });
    }
    function randomizeTool() {
        let toolSelected = props.tool;
        return toolSelected[Math.floor(Math.random() * toolSelected.length)];
    }

    function randomizeModsID(randomizedTool) {
        let toolTiers = Object.keys(randomizedTool.mods);
        let toolModsID = [];
        for (const element of toolTiers) {
            let currentTier = randomizedTool.mods[element];
            let chosenRandom = Math.floor(Math.random()*currentTier.length);
            toolModsID.push(chosenRandom);
        }
        
        return toolModsID;
    }

    function randomizeOverclockID(randomizedTool) {
        
        let num = Math.floor(Math.random() * randomizedTool.overclock.length);
        return num;
    }

    return (
        <div class="slot">
            <div class="slotInfo">
                <h1 class="title">{tool().tool.name}</h1>
                <h3 class="subtitle">{props.type}</h3>
                <div class={`flex ${!props.hasOverclock ? "center" : ""}`}>
                    <div class="flex-item">
                        <img src={`/images/${props.type}/${tool().tool.slug}.png`} class="slotImage" alt={props.type}/>
                    </div>
                    
                        <Show when={props.hasMods}>
                            <div class="flex-item">
                                <Mods weapon={tool().tool} mods={tool().modsID}/>
                            </div>
                        </Show>
                </div>
                
                
                <Show when={props.hasOverclock}>
                    <div class="overclockSection">
                        <div class={`overclock ${tool().tool.overclock[tool().overclockID].type}`}>
                            <img src={`/images/overclock/${tool().tool.overclock[tool().overclockID].slug}.png`} alt={tool().tool.overclock[tool().overclockID].name} title={tool().tool.overclock[tool().overclockID].name} />
                        </div>
                        <div class={`overclockName ${tool().tool.overclock[tool().overclockID].type}`}>
                            <h3 class="subtitle">{tool().tool.overclock[tool().overclockID].name}</h3>
                        </div>
                    </div>
                </Show>
            </div>
            <div class="slotButton buttonBottom">
                <button onClick={randomizeWeapon} class="randomizeButton smallButton" title={`Generate a new random ${props.type}.`}>Randomize {props.type} only</button>
            </div>
        </div>
    // <div class="primary slot">
    //     <h1 class="title">{(primary().name)}</h1>
    //     <h3 class="subtitle">Primary Weapon</h3>
    //     <button onClick={handlePrimary}>NEW PRIMARY! PLEASE</button>
    //     <img src={`/images/${primary().slug}.png`} class="slotImage" alt="primary"/>
    //     {/* <br/>
    //     {JSON.stringify(mods())}
    //     {JSON.stringify(modsID())}<br/>
    //     <button onClick={handleMods}>NEW MODS! PLEASE</button>
    //     <br/>
    //     {JSON.stringify(overclock())}
    //     {JSON.stringify(overclockID())}<br/>
    //     <button onClick={handleOverclocks}>NEW OVERCLOCK! PLEASE</button> */}
    //     <Mods weapon={primary()} mods={modsID()}/>
    //     <p>{overclock()}</p>
    // </div>
      
    );
  }
  
  export default Tool;