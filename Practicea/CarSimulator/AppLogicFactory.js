
var CarSimulatorApp = CarSimulatorApp || {};

CarSimulatorApp.LogicFactory = (function () {


    "use strict";

    let LogicFactory = {};

        // playing only role in the auto retracting pedals
    let tmpGasRetractingValue = 0,
        tmpBreaksRetractingValue = 0;

    const gasPedalRetractCoeff = 4,
        breakPedalRetractCoeff = 1,
        // END playing only role in the auto retracting pedals

        // Those bellow with the help of the above CSS classes
        // which will give rev's main scale different colororization
        engineRevsMinOptimal = 14,
        engineRevsMaxOptimal = 19,
        engineRevsOverLimit = 32,
        engineRevsDanger = 36,

        totalOfRunScales = 34,
        numberOfRunScales = 0,
        totalNumberOfRevsScales = 40,

        revsPerIdleRevScale = 145,
        revsPerGasPedalValue = 124,
        revsPerGasPedalValueLast = 73,



        //cssClassRevsDanger = "revs-danger",

        idleEngineSpeed = 870,
        runEngineSpeed = 0,
        //totalEngineSpeed = 0, selected-gear

        carsSpeed = 0,
        engineSpeedLimit = 5800,
        gearPark = "gearPark",
        gearNeutral = "gearNeutral",
        gearDirect = "gearDirect",
        gearReverse = "gearReverse",
        gearFirst = "gearFirst",


        // Currently I do not intend to develope solution for the last 
        //  two cases - 1st and 2ns gear. So they will not take place if engine is running
        arrAllGearsEngineRunning = [gearPark, gearNeutral, gearDirect],

        arrAllGearsEngineNotRunning = [gearPark, gearNeutral, gearDirect, gearReverse, gearFirst];

    LogicFactory.TotalOfIdleScales = 6;

    LogicFactory.TotalOfRunScales = 34;
        ///  numberOfRunScales = 0,
    LogicFactory.TotalNumberOfRevsScales = 40,

        LogicFactory.RevsPerIdleRevScale = revsPerIdleRevScale;
    LogicFactory.RevsPerGasPedalValue = revsPerGasPedalValue;
    LogicFactory.RevsPerGasPedalValueLast = revsPerGasPedalValueLast;

    LogicFactory.RevsPerRevScale = 145;


    LogicFactory.InitialGear = gearPark;


    LogicFactory.SetTimeoutRandomInterval = function (randNumber) {

        // This f-n sets an interval which will define the duration of the
        // second stage of the ignition simulation
        let timeoutRandomInterval, tempFixConst=960;

        //if (randNumber === 3)
        //    tempFixConst = 1400;
        //else if (randNumber === 4)
        //    tempFixConst = 1200;

        timeoutRandomInterval = randNumber * tempFixConst;

        return timeoutRandomInterval;
    };

    LogicFactory.MakeRandomNumber = function (min, max) {

        //  This funstion should return a numnber between min and max-1

        // I made those two simple tests to prove it - it would return a number 3 to 4
        //let randNumb = 0.01 * (5 - 3) + 3;
        //let randNumb = 0.99 * (5 - 3) + 3;

        let randNumb = Math.random() * (max - min) + min;

        randNumb = Math.floor(randNumb);

        return randNumb;

        return 3;
    };

        // We know that if currentGearId is properly set to Park position
        // the case will be resolved OK.
        // Otherwise the ignition process will be suspended until the 
        // gear shifter is set to Park position.
    LogicFactory.checkParkGear = function (currentGearId) {

        const boolIsParkGearOnEngineStarting =
            currentGearId === CarSimulatorApp.DomElementsFactory.InitialGear

        return boolIsParkGearOnEngineStarting;
    };

    // Sets those numbers for further calculations for the moving shift animation
    LogicFactory.getGearElementByDataNumber= function (intCurrentShift) {

        const gearId = arrAllGearsEngineNotRunning[intCurrentShift];

        const gearElement = document.getElementById(gearId);

        return gearElement;
    };


    LogicFactory.checkStatus_SetCurrentGearId_SetIsAutoShifting = function (varsObject, gearElementId) {

        if (varsObject.intCurrentShift === varsObject.intTargetShift) {

            varsObject.currentGearId = gearElementId;
            varsObject.boolIsAutoShifting = false;
        }
    };

    // 
    LogicFactory.setNextShift2 = function (varsObject) {

        let intTempCurrentShift = varsObject.intCurrentShift;

        if (varsObject.intCurrentShift < varsObject.intTargetShift)
            varsObject.intCurrentShift = varsObject.intCurrentShift + 1;

        else if (varsObject.intCurrentShift > varsObject.intTargetShift)
            varsObject.intCurrentShift = varsObject.intCurrentShift - 1;

        return intTempCurrentShift;
    };

    // 
    LogicFactory.setNextShift1 = function (varsObject) {

        if (varsObject.intCurrentShift < varsObject.intTargetShift)
            varsObject.intCurrentShift = varsObject.intCurrentShift + 1;

        else if (varsObject.intCurrentShift > varsObject.intTargetShift)
            varsObject.intCurrentShift = varsObject.intCurrentShift - 1;
    };


    LogicFactory.checkSetTargetElement = function (targetElement) {

        // If no element is selected ...
        // That should not happen but just in case ...
        if (targetElement == false)
            return ["", false];

        // If selected element is the span inside the gear div we need to get the parent div
        if (targetElement.tagName === "SPAN")
            targetElement = targetElement.parentElement;

        return [targetElement, true];
    };

    // We neeed to check now if the clicked element is correct one.
    // It is possible to have a click over the tiny space between shift blocks, etc.
    // That check should also take into account if the engine is running ot not
    // When running engine I am restricting the selection of the 1st and 2ns gear - currently.
    // I don intend to develope logic for those 2 cases - currently
    LogicFactory.checkIsRightElementClicked = function (targetElementId, boolIsEngineRunning) {

        let boolIsRightElementClicked;

        if (boolIsEngineRunning === true)
            boolIsRightElementClicked = arrAllGearsEngineRunning.includes(targetElementId);
        else
            boolIsRightElementClicked = arrAllGearsEngineNotRunning.includes(targetElementId);

        return boolIsRightElementClicked;

        // switch case - working but left for more advanced solution
        //switch (targetElementId) {
        //    case gearPark:
        //        boolIsRightElementClicked = true;
        //        break;
        //    case gearNeutral:
        //        boolIsRightElementClicked = true;
        //        break;
        //    case gearDirect:
        //        boolIsRightElementClicked = true;
        //        break;
        //    case gearFirst:
        //        boolIsRightElementClicked = true;
        //        break;
        //    case gearSecond:
        //        boolIsRightElementClicked = true;
        //        break;
        //    default:
        //        boolIsRightElementClicked = false;
        //}
    };


    // Sets those numbers for further calculations for the moving shift animation
    LogicFactory.setCurrentAndTargetShiftNumbers = function (targetElement, varsObject) {

        const currentGearElement = document.getElementById(varsObject.currentGearId);

        let tmpDataStringValue = currentGearElement.dataset.numericVal;
        varsObject.intCurrentShift = parseInt(tmpDataStringValue);

        tmpDataStringValue = targetElement.dataset.numericVal;
        varsObject.intTargetShift = parseInt(tmpDataStringValue);
    };


    LogicFactory.calcAutoRetractEngineSpeedNoGearShift = function (intGasPedalPositionValue, totalEngineSpeed) {

        if (intGasPedalPositionValue > 0) {

            if (intGasPedalPositionValue === totalNumberOfRevsScales) {

                totalEngineSpeed = totalEngineSpeed - revsPerGasPedalValueLast;
            }
            else if ((intGasPedalPositionValue > 1) && (intGasPedalPositionValue < totalNumberOfRevsScales)) {

                totalEngineSpeed = totalEngineSpeed - revsPerGasPedalValue;
            }
            else if (intGasPedalPositionValue === 1) {

                totalEngineSpeed = totalEngineSpeed - revsPerIdleRevScale;
            }
        }

        return totalEngineSpeed;
    }

    LogicFactory.calcEngineSpeedAndRevsScales = function (intGasPedalPositionValue) {

        let soughtNumberOfRunScales, totalEngineSpeed, intTempValue;

        if (intGasPedalPositionValue === 1) {

            totalEngineSpeed = idleEngineSpeed + revsPerIdleRevScale;
            soughtNumberOfRunScales = 1;
        }
        else if ((intGasPedalPositionValue > 1) && (intGasPedalPositionValue < totalNumberOfRevsScales)) {

            intTempValue = intGasPedalPositionValue - 1;
            intTempValue = Math.floor(intTempValue * revsPerGasPedalValue);

            totalEngineSpeed = idleEngineSpeed + revsPerIdleRevScale;
            totalEngineSpeed = totalEngineSpeed + intTempValue;

            intTempValue = intTempValue + revsPerIdleRevScale;

            soughtNumberOfRunScales = Math.floor(intTempValue / revsPerIdleRevScale);
        }
        else if (intGasPedalPositionValue === totalNumberOfRevsScales) {

            // Removing 2 gas pedal values - one for the initial value of 
            // revsPerIdleRevScale=145 and one for the last=73.
            // They will be added separately
            intTempValue = intGasPedalPositionValue - 2;
            intTempValue = Math.floor(intTempValue * revsPerGasPedalValue);

            totalEngineSpeed = idleEngineSpeed + revsPerIdleRevScale;
            totalEngineSpeed = totalEngineSpeed + intTempValue;
            totalEngineSpeed = totalEngineSpeed + revsPerGasPedalValueLast;

            soughtNumberOfRunScales = totalOfRunScales;
        }

        return { numberOfRunScales: soughtNumberOfRunScales, engineSpeed: totalEngineSpeed };
    };


    LogicFactory.breakPedalCalcRetractingValue = function (intBreaksPedalPositionValue) {

        /// Decrease breaksPedalCurrentValue while auto retracting
        if (intBreaksPedalPositionValue > 0) {

            tmpBreaksRetractingValue = intBreaksPedalPositionValue - breakPedalRetractCoeff;

            /// Value gets may get negative for a moment, so bring it back to zero
            if (tmpBreaksRetractingValue < 0) {
                tmpBreaksRetractingValue = 0;
            }
        }

        return tmpBreaksRetractingValue;
    };


    LogicFactory.gasPedalCalcRetractingValue = function (intGasPedalPositionValue) {

        /// Decrease value while auto retracting
        if (intGasPedalPositionValue > 0) {
            tmpGasRetractingValue = intGasPedalPositionValue - gasPedalRetractCoeff;

            /// Value gets may get negative for a moment, so bring it back to zero
            if (tmpGasRetractingValue < 0) {
                tmpGasRetractingValue = 0;
            }
        }

        return tmpGasRetractingValue;
    };

    return LogicFactory;

})();