

let EngineRevsFactory = CarSimulatorApp.EngineRevsFactory;


//export function autoRetractEngineSpeedRevsScalesNoGearShift(elementsObject, varsObject) {

//    if ((numberOfRunScales === 0) && (intGasPedalPositionValue === 0)) {
//        boolEngineDecelareted = true;
//    }
//    else {

//        /  =========  using the external logic closure  ===================

//        if (intGasPedalPositionValue > 0) {

//            totalEngineSpeed = CarSimulatorApp.LogicFactory
//                .calcAutoRetractEngineSpeedNoGearShift(intGasPedalPositionValue, totalEngineSpeed);

//            intGasPedalPositionValue--
//        }
//        /  ========= END using the external logic closure  ===================

//        if (numberOfRunScales > 0) {

//            revsMeter.removeChild(revsMeter.firstElementChild);
//            numberOfRunScales--;
//        }
//    }
//}

///
function calculateAndAddRevs(soughtNumberOfRunScales) {

    let intTotalToAdd = soughtNumberOfRunScales - numberOfRunScales;

    let i;

    for (i = 0; i < intTotalToAdd; i++) {

        // Creates one scale (bar) in the external factory. 
        // numberOfRunScales is a parameter which will define which class (color) 
        // to be added to the next scale.

        let rev = CarSimulatorApp
            .RevsFactory.calcAndCreateOneRevScale(numberOfRunScales);

        // Prepends the rev to the main display itIsEach2ndCicle
        revsMeter.prepend(rev);

        numberOfRunScales++;
    }
}

function calculateAndRemoveRevs(soughtNumberOfRunScales) {

    let intTotalToRemove = numberOfRunScales - soughtNumberOfRunScales;

    let i;

    for (i = 0; i < intTotalToRemove; i++) {

        revsMeter.removeChild(revsMeter.firstElementChild);

        numberOfRunScales--;
    }

    //tmpMultipurposeVarFour = intTotalToAdd;
}


// Based on the gas pedal value calcualtes whether should remove or
// add revs scales to the main rev scale
// Two calcs take place actually. Second one is for the engine speed as number which will be
// displayed on the top left
export function setShowEngineSpeedANDRevsScalesNoGearShift(elementsObject, varsObject) {

    ///  =========  Using the external logic closure  ===================
    const { numberOfRunScales, engineSpeed } = CarSimulatorApp.LogicFactory
        .calcEngineSpeedAndRevsScales(varsObject.intGasPedalPositionValue);

    varsObject.totalEngineSpeed = engineSpeed;

    ///    ============================
    //varsObject.intGasPedalPositionValue = gasPedal.valueAsNumber;
    // OR
    //varsObject.intGasPedalPositionValue = parseInt(gasPedal.value);

    // The second value is for the revs' scales while autoretracting
    // Those two values will play indipendent roles in separate processes
    varsObject.intGasPedalPositionValForAutoRetract = varsObject.intGasPedalPositionValue;
    ///    ============================

    ///  =========  END using local logic. Moved in the external section. Chack above     ===================

    if (soughtNumberOfRunScales > numberOfRunScales) {

        // scales (bars) should be added
        calculateAndAddRevs(soughtNumberOfRunScales);
    }
    else if (soughtNumberOfRunScales < numberOfRunScales) {

        // scales (bars) should be removed
        calculateAndRemoveRevs(soughtNumberOfRunScales);
    }
}


export function showEngineSpeed(elementsObject, varsObject) {

    elementsObject.pRevsReader.textContent = varsObject.totalEngineSpeed;
}


export function runPulsingIdle(elementsObject, varsObject) {

    if (varsObject.numberOfRegularScales === 0) {

        EngineRevsFactory.increaseEngineSpdByOneRegular(elementsObject, varsObject);
    }
    else if (varsObject.numberOfRegularScales === 1) {

        EngineRevsFactory.decreaseEngineSpdByOneRegular(elementsObject, varsObject);
    }
}


// Add all idle revs on the left scale and sets the boolIsEngineRunning 
// flag to true;
export function turnEngineOn(elementsObject, varsObject) {

    // X idle elements has to be put for the scale. In order to make it real looking

    EngineRevsFactory.increaseEngineSpdByOneIdle(elementsObject, varsObject);


    // If engine's idle speed has reached the total needed, we can consider it 
    /// started and running
    if (varsObject.currNumberOfIdleScales === LogicFactory.TotalOfIdleScales) {

        varsObject.boolIsEngineStarting = false;
        varsObject.boolEngineStarting3rdCheck = false;

        varsObject.boolIsEngineRuning = true;

        /// varsObject.totalEngineSpeed = varsObject.idleEngineSpeed;
    }
}
