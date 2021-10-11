
// Early attempt to centralize number of cycles for different processes
function setCyclesCounts() {

    mainCiclesCounter++;

    //if ((mainCiclesCounter % 2) === 0) {
    //    itIsEach2ndCicle = true;
    //    itIsEach3rdCicle = false;
    //    itIsEach4thCicle = false;
    //}
    //else if ((mainCiclesCounter % 3) === 0) {
    //    itIsEach2ndCicle = false;
    //    itIsEach3rdCicle = true;
    //    itIsEach4thCicle = false;
    //}
    //else if ((mainCiclesCounter % 4) === 0) {
    //    itIsEach2ndCicle = false;
    //    itIsEach3rdCicle = false;
    //    itIsEach4thCicle = true;
    //}

    /// ==========================================

    itIsEach2ndCicle = false;
    itIsEach3rdCicle = false;
    itIsEach4thCicle = false;

    if ((mainCiclesCounter % 2) === 0) {
        itIsEach2ndCicle = true;
    }

    if ((mainCiclesCounter % 3) === 0) {
        itIsEach3rdCicle = true;
    }

    if ((mainCiclesCounter % 4) === 0) {
        itIsEach4thCicle = true;
    }
}

//export default 
function setMainCyclesGenerator() {



    /// set the main cycles generator
    runMainCycleClock = setInterval(function () {

        // This number will be the basis for calculating each second, third, forth
        // etc. cycle for events that should be happenning during those cycles
        //mainCiclesCounter++;

        // This will be a more generalized version of the above
        setCyclesCounts();

        //runAddRemoveTest();

        if ((boolIsAutoShifting === true) && ((mainCiclesCounter % 16) === 0) && (boolIsEngineStarting === false)) {

            makeAutoShift();
        }

        if (boolIsEngineStarting === true) {

            if ((boolEngineStarting1stCheck === true) && ((mainCiclesCounter % 16) === 0)){

                makeAutoBlinking();
            }
            else if ((itIsEach3rdCicle === true) && (boolEngineStarting2ndCheck === true)) {

                setRunningStarterImmitation();
            }

            if (boolEngineStarting3rdCheck === true) {
                turnEngineOn();
            }
        }

        if (boolIsEngineRuning === true) {

            // 
            if (boolIsGasPedalPressed === true) {

                if (boolIsOnGear === false) {

                    //// Made up intentionally, I can explain :)
                    if (gasPedal.value === "1") {
                        intGasPedalPositionValue = 1;
                        //gasPedal.value = "1";
                        pGasRangeValue.textContent = "1";
                    }

                    dealWithEngineSpeedRevsScalesNoGearShift();

                    boolEngineDecelareted = false;                   
                }
                else {  /// boolIsOnGear === true i.e. car is to run



                }
            }
            else {  /// boolIsGasPedalPressed === false  i.e. Gas' pedal's is released and auto retracting  CarSimulatorApp.LogicFactory.               

                if (boolIsGasPedalRetracted === false) {
                    autoRetractGasPedal();
                }

                if (boolEngineDecelareted === false) {
                    autoRetractEngineSpeedRevsScalesNoGearShift();
                }
                else if (boolEngineDecelareted === true) {
                    runPulsingIdle();
                }             
            }

            if (boolIsBreaksPedalPressed === true) {

            }
            else {  /// boolIsBreaksPedalPressed === false i.e. Breaks' pedal's is released and auto retracting

                if (boolIsBreaksPedalRetracted === false) {
                    autoRetractBreaksPedal();
                }
            }

            showEngineSpeed();
        }
        else {   ///   boolIsEngineRuning === false

            if ((boolIsBreaksPedalPressed === false) && (boolIsBreaksPedalRetracted === false)) {
                autoRetractBreaksPedal();
            }

            if ((boolIsGasPedalPressed === false) && (boolIsGasPedalRetracted === false)) {
                autoRetractGasPedal();
            }
        }    ///  End boolIsEngineRuning

        // ===============   Gas pedal Setups   ===============
            //intGasPedalPositionValue = 0;   
        //console.log(numberOfRunScales);

        // Resets the counter as we do not want to have a number to increment indefinitly.
        // The number is chosen as I do not believe there will be events happenning in more than each
        // 10 000 cycles 
        if (mainCiclesCounter > 10000) {
            mainCiclesCounter = 0
        }

        ///console.log(currentGearId + "  " + intCurrentShift);

    }, mainGeneratorClockInterval);
};