import { createEffect, createSignal, Index} from "solid-js";
import "../stylesheet.css";
import perks from "../perks.json";

function Perks(props) {

    const [perksID, setPerksID] = createSignal({
        "passive": [],
        "active": []
    });

    createEffect(()=>{
        props.applyDwarf;
        randomizePerks();
    })

    function randomizePerks() {
        let selectedPassive = perks.passive.sort(()=>0.5 - Math.random()).slice(0,3);
        let selectedActive = perks.active.sort(()=>0.5 - Math.random()).slice(0,2);
        setPerksID({
            "passive": selectedPassive,
            "active": selectedActive
        });
    }

    return (
  
    <>
        <div class="perkSection">
            <Index each={perksID().passive}>
            {(passive) => 
                <div class="perk passive">
                    <img src={`/images/perks/${passive().slug}.png`} alt={passive().name} title={passive().name}/>
                </div>
            }
            </Index>
            <Index each={perksID().active}>
                {(active) => 
                    <div class="perk active">
                        <img src={`/images/perks/${active().slug}.png`} alt={active().name} title={active().name}/>
                    </div>
                }
            </Index>
        </div>
        <div class="buttonSection smallButton">
            <button onClick={randomizePerks} class="randomizeButton smallButton" title="Generate new random perks.">Randomize perks only</button>
        </div>
    </>
      
    );
  }
  
  export default Perks;