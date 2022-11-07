import './stylesheet.css';
import { createSignal, createEffect, Index} from 'solid-js';
import dwarves from "./dwarfs.json";
import Dwarf from "./components/Dwarf";
import Perks from './components/Perks';
import Tool from './components/Tool';

function App() {

  const [loadout, setLoadout] = createSignal(dwarves[Math.floor(Math.random() * dwarves.length)]);
  let tools = () => [
    {
      "tool": loadout().primary,
      "type": "primary",
      "hasOverclock": true,
      "hasMods": true
    },
    {
      "tool": loadout().secondary,
      "type": "secondary",
      "hasOverclock": true,
      "hasMods": true
    },
    {
      "tool": loadout().pickaxe,
      "type": "pickaxe",
      "hasOverclock": false,
      "hasMods": true
    },
    {
      "tool": loadout().utility,
      "type": "utility",
      "hasOverclock": false,
      "hasMods": true
    },
    {
      "tool": loadout().traversal,
      "type": "traversal",
      "hasOverclock": false,
      "hasMods": true
    },
    {
      "tool": loadout().throwable,
      "type": "throwable",
      "hasOverclock": false,
      "hasMods": false
    },
    {
      "tool": loadout().armor,
      "type": "armor",
      "hasOverclock": false,
      "hasMods": true
    }
  ];

  createEffect(()=>{
    console.log("Dwarf changed");
    console.log(loadout());
  });


  // Get random Dwarf
  function getRandomDwarf() {
    // Get JSON object of random dwarf
    let chosen = dwarves[Math.floor(Math.random() * dwarves.length)];
    // Allows to reroll the same dwarf, while randomizing tools and mods.
    chosen == loadout() ? setLoadout({...chosen, "reroll" : true}) : setLoadout(chosen);
    
  }

  return (

    <div class="grid-container">
      <div class="grid-item dwarf">
        <div class="slot small">
          <Dwarf applyDwarf={loadout()}/>
          <div class="buttonSection">
            <button onClick={getRandomDwarf} class="randomizeButton" title="Generate a new random loadout.">Randomize Loadout</button>
          </div>
          
        </div>
        <div class="slot small">
        <Perks applyDwarf={loadout()}></Perks>
        </div>
      </div>
      <Index each={tools()}>
        {(tool) => 
          <div class="grid-item">
            <Tool tool={tool().tool} type={tool().type} hasOverclock={tool().hasOverclock} hasMods={tool().hasMods}></Tool>
          </div>
        }
      </Index>
    </div>
    
  );
}

export default App;
