import { createSignal, createEffect, Index} from "solid-js";
import "../stylesheet.css";
import "/svg/modHexagon.svg"

function Primary(props) {

    const [mods, setMods] = createSignal(props.mods);
    const [weapon, setWeapon] = createSignal(props.weapon);
    const [tiersLength, setTiersLength] = createSignal(getTiersLength());

    createEffect(()=>{
        handleWeapon();
    })

    function handleMods() {
        setMods(props.mods);
    }
    
    function handleWeapon() {
        setWeapon(props.weapon);
        handleMods();
        handleTiersLength();
    }

    function handleTiersLength() {
        setTiersLength(getTiersLength());
    }

    function getTiersLength() {
        let weaponTiersLength = [];
        for (const element of Object.keys(weapon().mods)) {
            let currentTier = weapon().mods[element].length;
            weaponTiersLength.push(currentTier);
        }
        return weaponTiersLength;
    }

    return (
            <>
                    <ul class="modList">
                        <Index each={tiersLength()}>
                            {(tier, i) => 
                                <li class="modRow">
                                    {
                                        
                                        [...Array(tier())].map((_el, index)=> 

                                            <svg version="1.1" id="emoji" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                                viewBox="0 0 61.3 36.4" xml:space="preserve" class="modHexagon">
                                                <g id="line">
                                                    <path class={`mods ${index == mods()[i]? "sel" : ""}`} stroke="#FC9E00" stroke-width="3" fill-opacity="0" d="M2.2,18.9c-0.4-0.4-0.4-0.9,0-1.2L15.5,3.4c0.4-0.4,1-0.6,1.7-0.6H44c0.7,0,1.4,0.2,1.7,0.6L59,17.7
                                                        c0.4,0.4,0.4,0.9,0,1.2L45.7,33.2c-0.4,0.4-1,0.6-1.7,0.6H17.3c-0.7,0-1.4-0.2-1.7-0.6L2.2,18.9z"/>
                                                </g>
                                            </svg>
                                        )
                                    }
                                </li>
                                
                            }
                        </Index>
                        <p>{mods().map((e)=>e+1).join("")}</p>
                    </ul>
                
            </>
            

    );
  }
  
  export default Primary;