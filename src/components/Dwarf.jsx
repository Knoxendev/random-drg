import { createEffect, createSignal} from "solid-js";
import "../stylesheet.css";

function Dwarf(props) {

    const [dwarf, setDwarf] = createSignal(props.applyDwarf);
    
    createEffect(()=>{
        handleDwarf();
    })

    function handleDwarf() {
        setDwarf(props.applyDwarf);
    }

    return (
  
    
    <div class="flex">
        <div class="flex-item">
            <h1 class="title">{(dwarf().dwarf)}</h1>
            <h3 class="subtitle">Dwarf</h3>
        </div>
        <div class="flex-item">
            <img src={`/images/dwarves/${dwarf().slug}.png`} alt="dwarf" class="slotImage dwarfImage"/>
        </div>
    </div>
    
      
    );
  }
  
  export default Dwarf;