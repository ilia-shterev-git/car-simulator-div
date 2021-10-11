
function setMainCyclesGenerator() {

    let mainGeneratorClockInterval = 18;

    /// set the main cycles generator
    runMainCycleClock = setInterval(function () {

        //runAddRemoveTest();

        if ((boolIsEngineRuning === true) && (boolIsOnGear === false) &&
            (boolIsGasPedalPressed === false) && (boolGasPedalRetractedAndDecelaretedFlag === true)) {

            runPulsingIdle();
        }

        // ===============   Breaks pedal Setups   ===============  
        if (boolIsBreaksPedalPressed === true) {

        }
        else {  /// boolIsBreaksPedalPressed === false i.e. Breaks' pedal's is released and auto retracting

            autoRetractBreaksPedal();
        }

        // ===============   Gas pedal Setups   ===============
        if (boolIsGasPedalPressed === true) {

            // Made up intentionally
            if (gasPedal.value === "1") {
                gasPedalCurrentValue = 1;
                //gasPedal.value = "1";
                pGasRangeValue.textContent = "1";
            }
            else { }

            dealWithPedalRevs(gasPedal.value);

            boolGasPedalRetractedAndDecelaretedFlag = false;



            //console.log("Pedal " + gasPedal.value);

            // console.log("Added " + numberOfRunScales);

        }
        else {    /// boolIsGasPedalPressed === false  i.e. Gas' pedal's is released and auto retracting

            //gasPedalCurrentValue = 0;

            if (boolGasPedalRetractedAndDecelaretedFlag === false) {
                autoRetractEngineSpeedNoGearShift();
            }


            autoRetractGasPedal();
        }

        if ((boolIsEngineStarting === true) && (boolIsOnGear === false)) {
            turnEngineOn();
        }

        console.log(numberOfRunScales);

    }, mainGeneratorClockInterval);
};

