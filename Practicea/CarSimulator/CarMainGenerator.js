

import { autoRetractBreaksPedal } from './SetupBreaksPedal.js';

import { autoRetractGasPedal } from './SetupGasPedal.js';

import { makeAutoShift2 } from './SetupGearSection.js';

import { makeParkShiftAutoBlinking } from "./SetupStartButton.js";

import { makeTurningStarterSimulation } from "./SetupStartButton.js";

import { turnEngineOn } from "./SetupRunningEngine.js";

import { runPulsingIdle } from "./SetupRunningEngine.js";

import { showEngineSpeed } from "./SetupRunningEngine.js";

function SetMainCyclesGenerator(elementsObject, varsObject) {

    "use strict";

    varsObject.mainCiclesCounter = 0;

    let mainCiclesCounter = 0, itIsEach2ndCicle = false, itIsEach3rdCicle = false,
        itIsEach4thCicle = false, itIsEach15thCicle = false, itIsEach16thCicle = false;

    function setCyclesCounts() {

        mainCiclesCounter++;

        itIsEach2ndCicle = false;
        itIsEach3rdCicle = false;
        itIsEach4thCicle = false;
        itIsEach15thCicle = false;

        itIsEach16thCicle = false;

        // if with else if will not work. Trust me.
        if ((mainCiclesCounter % 2) === 0)
            itIsEach2ndCicle = true;

        if ((mainCiclesCounter % 3) === 0)
            itIsEach3rdCicle = true;

        if ((mainCiclesCounter % 4) === 0)
            itIsEach4thCicle = true;

        if ((mainCiclesCounter % 15) === 0)
            itIsEach15thCicle = true;

        if ((mainCiclesCounter % 16) === 0)
            itIsEach16thCicle = true;

        // Resets the counter as we do not want to have a number to increment indefinitly.
        // The number is chosen as I do not believe there will be events happenning in more than each
        // 100 000 cycles 
        if (mainCiclesCounter > 100000)
            mainCiclesCounter = 0;

        varsObject.mainCiclesCounter = mainCiclesCounter;
    }


    let mainGeneratorClockInterval = 18;

    /// set the main cycles generator
    // setInterval is assigned to a var as it would be possible to stop it
    // if there is a need for that
    let runMainCycleClock = setInterval(function () {

        // This will be the basis for calculating each second, third, forth
        // etc. cycle for events that should be happenning during those cycles

        setCyclesCounts();


        if (varsObject.boolIsEngineRuning === true) {

            // 
            if (varsObject.boolIsGasPedalPressed === true) {


                /// Initial setup at SetupAndDisplayGearSection as false
                if (varsObject.boolIsOnGear === false) {

                    //// Made up intentionally, I can explain :)
                    //if (gasPedal.value === "1") {
                    //    intGasPedalPositionValue = 1;
                    //    //gasPedal.value = "1";
                    //    pGasRangeValue.textContent = "1";
                    //}

                    dealWithEngineSpeedRevsScalesNoGearShift();

                    varsObject.boolEngineDecelareted = false;
                }
                else {  /// boolIsOnGear === true i.e. car is to run

                }

                showEngineSpeed(elementsObject, varsObject);
            }
            else {  /// boolIsGasPedalPressed === false  i.e. Gas' pedal's is released and auto retracting  CarSimulatorApp.LogicFactory.               

                if (varsObject.boolIsGasPedalRetracted === false) {
                    autoRetractGasPedal(elementsObject, varsObject);
                }

                if (varsObject.boolEngineDecelareted === false) {
                    //  autoRetractEngineSpeedRevsScalesNoGearShift();
                }
                else if (varsObject.boolEngineDecelareted === true) {

                    if (itIsEach3rdCicle) {

                        runPulsingIdle(elementsObject, varsObject);
                    }

                    //   showEngineSpeed();
                    if (itIsEach15thCicle) {

                        showEngineSpeed(elementsObject, varsObject);
                    }

                }
            }
        }    ///     End  boolIsGasPedalPressed
        else {   ///   boolIsEngineRuning === false

            if (varsObject.boolIsEngineStarting === true) {

                if ((varsObject.boolEngineStarting1stCheck === true) && (itIsEach16thCicle)) {

                    makeParkShiftAutoBlinking(elementsObject, varsObject);
                }
                else if (varsObject.boolEngineStarting2ndCheck === true) {

                    if (itIsEach3rdCicle) {
                        makeTurningStarterSimulation(elementsObject, varsObject);
                    }

                    if (itIsEach15thCicle) {
                        showEngineSpeed(elementsObject, varsObject);
                    }
                }

                if ((varsObject.boolEngineStarting3rdCheck === true) && (itIsEach3rdCicle)) {

                    if (itIsEach3rdCicle) {
                        turnEngineOn(elementsObject, varsObject);

                        showEngineSpeed(elementsObject, varsObject);
                    }

                }
            }

            if (varsObject.boolIsGasPedalPressed === false) { /// boolIsGasPedalPressed === false  i.e. Gas' pedal's is released and auto retracting  CarSimulatorApp.LogicFactory.               

                if (varsObject.boolIsGasPedalRetracted === false) {
                    autoRetractGasPedal(elementsObject, varsObject);
                }
            }

            //if ((varsObject.boolIsBreaksPedalPressed === false) && (varsObject.boolIsBreaksPedalRetracted === false)) {
            //    autoRetractBreaksPedal();
            //}

            //if ((varsObject.boolIsGasPedalPressed === false) && (varsObject.boolIsGasPedalRetracted === false)) {
            //    autoRetractGasPedal(); && (varsObject.boolIsEngineStarting === false)
            //}
        }
        ///  End boolIsEngineRuning

        if ((varsObject.boolIsAutoShifting) && (itIsEach16thCicle)) {

            makeAutoShift2(varsObject);
        }

        if (varsObject.boolIsBreaksPedalPressed === true) {

        }
        else {  /// boolIsBreaksPedalPressed === false i.e. Breaks' pedal's is released and auto retracting

            if ((varsObject.boolIsBreaksPedalRetracted === false) && (itIsEach3rdCicle)) {
                autoRetractBreaksPedal(elementsObject, varsObject);
            }
        }

        //    End boolIsBreaksPedalPressed

    }, mainGeneratorClockInterval);

    // never needed to call it
    function stopMainCyclesGenerator() {
        clearInterval(runMainCycleClock);
    }
}

export { SetMainCyclesGenerator };