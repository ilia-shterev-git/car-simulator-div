
const LogicFactory = CarSimulatorApp.LogicFactory,
      DomsFactory = CarSimulatorApp.DomElementsFactory;

/// Setting Gear's DOM elements and event handlers
export default function SetupAndDisplayGearSection(elementsObject, varsObject) {

    varsObject.boolIsAutoShifting = false;

    varsObject.boolIsOnGear = false;

    varsObject.currentGearId = DomsFactory.InitialGear;


    let gearSection = document.getElementById("gearSection");

    elementsObject.gearSection = gearSection;

    // This function event listener catches bubling event on the gear section 
    /// which inludes all gear blocks
    function gearSectionOnClick(event) {

        let targetElement = event.target;

        let [returnTargetElement, boolCheckForNullAndSetElement] = LogicFactory
            .checkSetTargetElement(targetElement);


        // If no element is selected ...
        // That should not happen but just in case ...
        if (boolCheckForNullAndSetElement === false)
            return;

        targetElement = returnTargetElement; 

        if (targetElement.id === varsObject.currentGearId)
            return;

        // We neeed to check now if the clicked element is correct one.
        // It is possible to have click over the space between shift blocks, etc.
        // That check should also take into account if the engine is running ot not
        // For the running engine I am restricting the selection of the 1st and 2ns gear - currently.
        // I don intend to develope logic for those 2 cases - currently.
        let boolIsRightElementClicked = LogicFactory
            .checkIsRightElementClicked(targetElement.id, varsObject.boolIsEngineRunning);

        if (!boolIsRightElementClicked)
            return;

        // This will set flag to the mainGenerator function to call 
        // function makeAutoShift(elementsObject, varsObject) which is bellow
        varsObject.boolIsAutoShifting = true;

        // Sets those numbers for further calculations for the moving shift animation
        // One of those moments where I do not know if I should set those numbers
        // by ref inside the function as they are properties of varsObject or should I
        // bring them back here and assign them inside this function
        LogicFactory.setCurrentAndTargetShiftNumbers(targetElement, varsObject);
    }

    gearSection.addEventListener("click", gearSectionOnClick);
}

/// Two versins of the same action - moving the shifter stick one after the other
/// immitating the push / pull by hand.

export function makeAutoShift1(varsObject) {

    // This should not happen but just in case
    if (varsObject.intCurrentShift === varsObject.intTargetShift) {

        // This will signal the mainGenerator function to stop calling this function
        varsObject.boolIsAutoShifting = false;
        return;
    }

    // Creates the current gear element by data number for later styling.
    // current element will be taken the "SelectedGear" style.
    // This style will be given to the nextGearElement
    let currentGearElement = DomsFactory
        .getGearElementByDataNumber(varsObject.intCurrentShift);

    // This will update the varsObject.intCurrentShift and increase it
    // or decrease it by one until it reaches varsObject.intTargetShift
    LogicFactory.setNextShift1(varsObject);

    // Gets the current gear element by data number for later styling.
    // It will be given "SelectedGear" class style.
    let nextGearElement = LogicFactory
        .getGearElementByDataNumber(varsObject.intCurrentShift);

    // Checks if varsObject.intCurrentShift === varsObject.intTargetShift
    // true it will set currentGearId and varsObject.boolIsAutoShifting = false
    // The last one will signal the mainGenerator function 
    // to stop calling this function
    LogicFactory.checkStatus_SetCurrentGearId_SetIsAutoShifting(varsObject, nextGearElement.id);

    const tmpCssClassForSelectedGear = DomsFactory.ClassSelectedGearBorder;

    currentGearElement.classList.remove(tmpCssClassForSelectedGear);

    nextGearElement.classList.add(tmpCssClassForSelectedGear);
}

export function makeAutoShift2(varsObject) {

    // This should not happen but just in case
    if (varsObject.intCurrentShift === varsObject.intTargetShift) {

        // This will signal the mainGenerator function to stop calling this function
        varsObject.boolIsAutoShifting = false;
        return;
    }

    // This will update the varsObject.intCurrentShift and increase it
    // or decrease it by one until it reaches varsObject.intTargetShift.
    // Before the increase however its value wil be stored in the
    // intTempCurrentShift var. Its value will be used to create 
    // currentGearElement while varsObject.intTargetShift will be used to obtain
    // nextGearElement
    let intTempCurrentShift = LogicFactory.setNextShift2(varsObject);

    // Here currentGearElement and nextGearElement will be created
    // by data number and first one will have "selectedGear" class removed.
    // The class will be transferred to the second one. 
    // This class gives border color 
    let nextGearElementId = DomsFactory
        .createCurrentAndNextGearElement_SetStyles(varsObject, intTempCurrentShift);

    // Checks if varsObject.intCurrentShift === varsObject.intTargetShift
    // true it will set currentGearId and varsObject.boolIsAutoShifting = false
    // The last one will signal the mainGenerator function 
    // to stop calling this function
    LogicFactory.checkStatus_SetCurrentGearId_SetIsAutoShifting(varsObject, nextGearElementId);
}





