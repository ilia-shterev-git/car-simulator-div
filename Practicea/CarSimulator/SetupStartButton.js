
   let CssFactory = CarSimulatorAppl.CssFactory,

    LogicFactory = CarSimulatorApp.LogicFactory,
    DomsFactory = CarSimulatorApp.DomElementsFactory;


// =====   End Data Transfer Objects Creation Area  =======================

/// This f-n conatins all logic for making starting engine effects
import doStartEngineSimulationWithPromises from "./zEngineStartSimulationWithPromises.js";

function stopEngine(startButton, elementsObject, varsObject) {

    CssFactory.setStartBtnToCssActivated(startButton);
}


function startEngine(startButton, elementsObject, varsObject) {

    // Sets Start Button's new colors. This method does this
    // 
    //StartButton.classList.remove("activаted");
    //StartButton.classList.add("activаted-clicked");       
    CssFactory.setStartBtnToCssActivatedClicked(startButton);

    elementsObject.parkGearElement = DomsFactory.createParkGearElement();

    // If currentGearId is properly set to Park position
    // the case will be resolved OK.
    // Otherwise the ignition process will be suspended until the 
    // gear shifter is set to Park position.
    varsObject.boolIsParkGearOnEngineStarting =
        LogicFactory.checkParkGear(varsObject.currentGearId);

    varsObject.boolIsEngineStarting = true;
    varsObject.boolEngineStarting1stCheck = true;

    // This GLOBAL var will be used in makeParkShiftAutoBlinking method
    varsObject.boolFlipFlop = true;

    doStartEngineSimulationWithPromises(elementsObject, varsObject);
}



/// =====  SetupAndStartIgnitionButton Area  =======================
export default function SetupAndStartIgnitionButton(elementsObject, varsObject) {

    //doStartEngineSimulationWithPromises(elementsObject, varsObject);

    function OnStartIgnitionButtonClick(event) {

        /// All globally declared
        //startButton = document.getElementById("startButton"),
        //pStartButtonText = document.getElementById("pStartButtonText");

        //elementsObject.startButton = startButton;
        //elementsObject.pStartButtonText = pStartButtonText;

        //varsObject.boolIsEngineStarting = false;
        //varsObject.boolIsEngineRunning = false;

        //  checkBoxIgnition

        //if (varsObject.boolIsIgnitionKeyOn === false)
        //    return;

        let startButton = elementsObject.startButton;

        if ((varsObject.boolIsEngineStarting === false) && (varsObject.boolIsEngineRunning === false)) {

            startEngine(startButton, elementsObject, varsObject);
        }
        else if (varsObject.boolIsEngineRunning === true) {

            stopEngine(startButton, elementsObject, varsObject);
        }
    }

    startButton.addEventListener("click", OnStartIgnitionButtonClick);
};
/// =====  SetupAndStartIgnitionButton Area End  =======================

/// =====  makeParkShiftAutoBlinking Area Runs at Cycles Clock Generator  =======================
export function makeParkShiftAutoBlinking(elementsObject, varsObject) {

    // Make the Park Gear Element's border to blink. Бlinking colors depend on
    // whethear current shift is Park as it should be or not. If yes
    // Park gear will blink between red and green (currently, may change in the future)
    // or if not Parkgear will blink between between 
    // black and green(currently, may change in the future).

    let ClassToRemove, ClassToAdd;

    if (varsObject.boolFlipFlop === true) {  

        if (varsObject.boolIsParkGearOnEngineStarting === true) {

            ClassToRemove = CssFactory.ClassSelectedGearBorder; 
            ClassToAdd = CssFactory.ClassGearErrorBorder;
        }
        else {

            ClassToRemove = CssFactory.ClassGearBlankBorder;
            ClassToAdd = CssFactory.ClassGearErrorBorder;
        }

        varsObject.boolFlipFlop = false;
    }
    else {

        if (varsObject.boolIsParkGearOnEngineStarting === true) {

            ClassToRemove = CssFactory.ClassGearErrorBorder;
            ClassToAdd = CssFactory.ClassSelectedGearBorder;
        }
        else {

            ClassToRemove = CssFactory.ClassGearErrorBorder;
            ClassToAdd = CssFactory.ClassGearBlankBorder;
        }

        varsObject.boolFlipFlop = true;
    }

    // Get Park Gear Element from the list of global vars
    let parkGearElement = elementsObject.parkGearElement; 

    CssFactory.switchClasses(parkGearElement, ClassToRemove, ClassToAdd);

}
/// =====  makeParkShiftAutoBlinking Area END Runs at Cycles Clock Generator =======================


/// =====  makeTurningStarterSimulation Area Runs at Cycles Clock Generator  =======================
export function makeTurningStarterSimulation(elementsObject, varsObject) {

    let EngineRevsFactory = CarSimulatorApp.EngineRevsFactory;

    if (varsObject.currNumberOfTurns >= varsObject.randNumberTurns)
        return;

    // While boolFlipFlop === true scales will be added to the revs meter
    //  until their max number - 6.
    // While boolFlipFlop === false scales will be removed  varsObject.tempNumberOfIdleScales
    ///   varsObject.totalOfIdleScales
    if (varsObject.boolFlipFlop === true) {

        /// On each clock EachXCicle creates one unit of idle rev which 
        // will be appended to the rev's scale
        EngineRevsFactory.increaseEngineSpdByOneIdle(elementsObject, varsObject);

        if (varsObject.currNumberOfIdleScales === LogicFactory.TotalOfIdleScales) {

            varsObject.boolFlipFlop = false;
        }
    }
    else {

        EngineRevsFactory.decreaseEngineSpdByByOneIdle(elementsObject, varsObject);

        if (varsObject.currNumberOfIdleScales === 0) {

            varsObject.boolFlipFlop = true;

            // one full starter cicle passed
            varsObject.currNumberOfTurns++;
        }
    }
}
/// =====  makeTurningStarterSimulation Area END Runs at Cycles Clock Generator =======================
