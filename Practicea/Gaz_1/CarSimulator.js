


    "use strict";

    ///================ Begin Setups ==================================================================
    // DOM elements
    let breaksPedal, pBreaksRangeValue, gasPedal, pGasRangeValue, revsMeter;

    let runMainCycleClock, idleCycleClock;

    let idlеGeneratorClockInterval = 200,

        breaksPedalCurrentValue = 0,
        boolIsBreaksPedalPressed = false,
        gasPedalCurrentValue = 0,
        boolIsGasPedalPressed = false,

        // playing only role in the auto retracting pedals
        tmpGasRetractingValue = 0,
        tmpBreaksRetractingValue = 0,
        gasPedalRetractCoeff = 5,
        breaksPedalRetractCoeff = 5,
        // END playing only role in the auto retracting pedals

        // Classes list for rev's meter
        cssClassRevOuter = "outer-rev",
        cssClassRevsAny = "revs-any",
        cssClassRevsBlank = "revs-blank",
        cssClassRevsIdle = "revs-idle",
        cssClassRevsMainScale = "revs-main-scale",
        cssClassRevsOptimal = "revs-optimal",
        cssClassRevsOverLimit = "revs-over-limit",
        // END Classes list

        // Those bellow with the help of the above CSS classes
        // which will give rev's main scale different colororization
        engineRevsMinOptimal = 12,
        engineRevsMaxOptimal = 18,
        engineRevsOverLimit = 30,
        // END rev's main scale different colororization

        boolIsEngineStarting = false,
        boolIsEngineRuning = false,
        boolIsOnGear = false,

        // Acumulates the total number of added scales (strips, bars ) to the revsMeter.
        // When gad pedal is released that number will be removed from revsMeter
        // Also playing role in the flickering green idle bar for additional realizm
        // If 0 add one strip and increase by one. And vixe versa
        numberOfRunScales = 0,
        initialEnginsSpeed = 0,
        totalEnginsSpeed = 0,
        carsSpeed = 0,

        // When true adds green line to the scale and sets to false.
        // When false remives green line from the scale and sets to true
        boolGasPedalRetractedAndDecelaretedFlag = true,

        tmpMultipurposeVarTwo = 0,
        tmpMultipurposeVarTree = 0,
        tmpMultipurposeVarFour = 0;

    revsMeter = document.getElementById("revsMeterID");

    /// Setting Breaks' pedal DOM elements and event handlers    outer-rev
    function BreaksPedalSetupsAndDisplay() {

        /// Instantiting the Breaks' range slider
        breaksPedal = document.getElementById("breaksPedalID");

        /// Instantiting the Breaks' paragraphs which will display
        /// curent slider's position numeric values
        pBreaksRangeValue = document.getElementById("breaksRangeValue");

        breaksPedal.addEventListener("mousedown", function () {

            /// Setting global var as flag which have role in the main cycle generator
            boolIsBreaksPedalPressed = true;
        });

        /// After pedal is released
        breaksPedal.addEventListener("mouseup", function () {

            /// Setting global var as flag which have role in the main cycle generator
            boolIsBreaksPedalPressed = false;

            /// Setting the underneath paragraph's numeric value to show numbers
            /// while retracting
            breaksPedalCurrentValue = breaksPedal.value;
        });


        breaksPedal.addEventListener('input', function () {
            /// Setting the underneath paragraph's numeric value to show numbers
            /// while sliding foroward
            pBreaksRangeValue.textContent = breaksPedal.value;
        });
    }

    /// Setting Gas' pedal DOM elements and event handlers
    function GasPedalSetupsAndDisplay() {

        /// Instantiting Gas' range slider
        gasPedal = document.getElementById("gasPedalID");

        /// Instantiting the Gas' paragraphs which will display
        /// curent slider's position numeric values
        pGasRangeValue = document.getElementById("gasRangeValue");

        gasPedal.addEventListener("mousedown", function () {
            /// Setting global var as flag which play role in the main cycle generator
            boolIsGasPedalPressed = true;
        });

        /// After pedal is released
        gasPedal.addEventListener("mouseup", function () {

            /// Setting global var as flag which have role in the main cycle generator
            boolIsGasPedalPressed = false;
            /// Setting the underneath paragraph's numeric value to show numbers
            /// while sliding
            gasPedalCurrentValue = gasPedal.value;
        });

        gasPedal.addEventListener("input", function () {
            /// Setting the underneath paragraph's numeric value to show numbers
            /// while sliding forward
            pGasRangeValue.textContent = gasPedal.value;
        });
    }

    /// Breaks' pedal is released and auto retracting
    function autoRetractBreaksPedal() {

        /// Decrease breaksPedalCurrentValue while auto retracting
        if (breaksPedalCurrentValue > 0) {
            tmpBreaksRetractingValue = breaksPedalCurrentValue - breaksPedalRetractCoeff;

            /// Value gets may get negative for a moment, so bring it back to zero
            if (tmpBreaksRetractingValue < 0) {
                tmpBreaksRetractingValue = 0;
            }

            /// Only after all calculations, set value to the variable
            breaksPedalCurrentValue = tmpBreaksRetractingValue;
        }

        /// This will set the pedal's value while auto retracting
        breaksPedal.value = tmpBreaksRetractingValue;

        /// This will display in paragraph pedal's value while auto retracting
        pBreaksRangeValue.textContent = breaksPedalCurrentValue;
    }

    /// Gas' pedal is released and auto retracting     createDomElementWithAttribute("div", "id", "revs");
    function autoRetractGasPedal() {

        /// Decrease value while auto retracting
        if (gasPedalCurrentValue > 0) {
            tmpGasRetractingValue = gasPedalCurrentValue - gasPedalRetractCoeff;

            /// Value gets may get negative for a moment, so bring it back to zero
            if (tmpGasRetractingValue < 0) {
                tmpGasRetractingValue = 0;
            }

            /// Only after all calculations, set the value to the variable
            gasPedalCurrentValue = tmpGasRetractingValue;
        }

        /// This will set the pedal's value while auto retracting
        gasPedal.value = gasPedalCurrentValue;

        /// This will display the pedal's value while auto retracting
        pGasRangeValue.textContent = gasPedalCurrentValue;
    }

    /// Creates one unit of rev so that iit will append to the rev's scale
    function createOneRev(cssClassRevsType) {

        let rev = CarSimulatorApp
            .ElementsFactory.createDomElementWithOneClass("div", cssClassRevOuter);

        let elementBlank = CarSimulatorApp
            .ElementsFactory.createDomElementWithOneClass("div", cssClassRevsBlank);
        let elementWithCssClassType = CarSimulatorApp
            .ElementsFactory.createDomElementWithTwoClasses("div", cssClassRevsAny, cssClassRevsType);

        rev.appendChild(elementWithCssClassType);
        rev.appendChild(elementBlank);

        return rev;
    }

    /// Creates one unit of idle rev so that it will be appended to the rev's scale
    /// Creating it here would avoid multiple creations in the clock's cicles
    let oneIdleScaleRev = createOneRev(cssClassRevsIdle);

    let oneOptimalScaleRev = createOneRev(cssClassRevsOptimal);
    let oneOverLimitScaleRev = createOneRev(cssClassRevsOverLimit);

    ///  Append one unit of рev to the rev's scale
    function prependRev(oneScaleRevToPrepend) {

        revsMeter.prepend(oneScaleRevToPrepend);
    }

    // those vars are brought next to the func that uses then for quicker tests
    let numberOfIdleRevsCount = 0,
        numberOfIdleRevs = 9,
        numberOfCyclesCountOne = 0,
        numberOfCyclesDivideCoeffOne = 2,
        treshHoldForActionOne = 0;
    // Add all idle revs on the left scale and sets the boolIsEngineRuning flag to true;
    function turnEngineOn() {

        // X idle elements has to be put for the scale. In order to make it real looking
        /// I put every one element on every N-th cicle of the main generatior
        treshHoldForActionOne = numberOfCyclesCountOne % numberOfCyclesDivideCoeffOne;

        if (treshHoldForActionOne === 0) {

            /// On each clock cycle reates one unit of idle rev which
            // will be appended to the rev's scale
            // Created instead of cloned, just for the variety sake
            let oneIdleRev = createOneRev(cssClassRevsIdle);

            ///  Append one unit of idle rev to the rev's scale
            prependRev(oneIdleRev);

            // Get count how many idle revs are put on the scale.
            numberOfIdleRevsCount++;
            //console.log(numberOfIdleRevsCount);

            if (numberOfIdleRevsCount >= numberOfIdleRevs) {
                boolIsEngineStarting = false;
                boolIsEngineRuning = true;
            }
            /// resetting the value, as we do not want to keep it increasing indefinetily.
            numberOfCyclesCountOne = 0;
        }

        numberOfCyclesCountOne++;

        //console.log(numberOfCyclesCountOne);
    }

    let numberOfCyclesCountTwo = 0,
        numberOfCyclesDivideCoeffTwo = 3,
        treshHoldForActionTwo = 0;

    function runPulsingIdle() {

        //idleCycleClock = setInterval(function () { }, idlеGeneratorClockInterval);

        //numberOfCyclesCountTwo++;

        treshHoldForActionTwo = numberOfCyclesCountTwo % numberOfCyclesDivideCoeffTwo;

        if (treshHoldForActionTwo === 0) {

            if (numberOfRunScales === 0) {

                let oneMainScaleRev = createOneRev(cssClassRevsMainScale);

                prependRev(oneMainScaleRev);
                numberOfRunScales++;

                //console.log("dobawq");
            }
            else if (numberOfRunScales === 1) {

                revsMeter.removeChild(revsMeter.firstElementChild);
                numberOfRunScales--;
            }

            /// resetting the value, as we do not want to keep it increasing indefinetily.
            numberOfCyclesCountTwo = 0;
        }

        numberOfCyclesCountTwo++;
    }

    function runAddRemoveTest() {

        let i;

        if (boolIdleCyclesFlag === true) {

            //revsMeter.appendChild(oneMainScaleRev);

            for (i = 0; i < 200; i++) {

                let oneMainScaleRev2 = createOneRev(cssClassRevsMainScale);
                //let oneMainScaleRev2 = oneMainScaleRev.cloneNode(true);
                revsMeter.appendChild(oneMainScaleRev2);
            }

            boolIdleCyclesFlag = false;
        }
        else {

            if (revsMeter.hasChildNodes()) {

                for (i = 0; i < 200; i++) {
                    revsMeter.removeChild(revsMeter.firstElementChild);
                }

                //console.log("Removing " + i);
            }

            boolIdleCyclesFlag = true;
        }
    }

    ///
    function calculateAndAddRevs(intGasPedalValue) {

        let intTotalToAdd = intGasPedalValue - numberOfRunScales;

        let i, cssClassToUse;

        for (i = 0; i < intTotalToAdd; i++) {

            if (numberOfRunScales < engineRevsMinOptimal) {
                cssClassToUse = cssClassRevsMainScale;
            }
            else if ((numberOfRunScales >= engineRevsMinOptimal) && (numberOfRunScales <= engineRevsMaxOptimal)) {
                cssClassToUse = cssClassRevsOptimal;
            }
            else if ((numberOfRunScales >= engineRevsMaxOptimal) && (numberOfRunScales <= engineRevsOverLimit)) {
                cssClassToUse = cssClassRevsMainScale;
            }
            else if (numberOfRunScales > engineRevsOverLimit) {
                cssClassToUse = cssClassRevsOverLimit;
            }

            let oneScaleRevToPrepend = createOneRev(cssClassToUse);
            //let oneMainScaleRev2 = oneMainScaleRev.cloneNode(true);
            prependRev(oneScaleRevToPrepend);

            numberOfRunScales++;
        }



        //tmpMultipurposeVarFour = intTotalToAdd;

    }

    function calculateAndRemoveRevs(intGasPedalValue) {

        let intTotalToRemove = numberOfRunScales - intGasPedalValue;

        let i;

        for (i = 0; i < intTotalToRemove; i++) {

            revsMeter.removeChild(revsMeter.firstElementChild);

            numberOfRunScales--;
        }

        //tmpMultipurposeVarFour = intTotalToAdd;
    }

    // Based on the gas pedal value calcualtes whether should remove or
    // add revs scales to the main rev scale
    function dealWithPedalRevs(gasPedalValue) {

        let intGasPedalValue = parseInt(gasPedalValue);

        if (intGasPedalValue > numberOfRunScales) {

            // scales (bars) should be added

            calculateAndAddRevs(intGasPedalValue);

        }
        else if (intGasPedalValue < numberOfRunScales) {

            // scales (bars) should be removed

            calculateAndRemoveRevs(intGasPedalValue)

        }
    }

    // those vars are brought next to the func that uses then for quicker tests
    let numberOfCyclesCountVThree = 0,
        numberOfCyclesDivideCoeffVThree = 1,
        treshHoldForActionVThree = 0;

    // Removes all scales from revsMeter
    function autoRetractEngineSpeedNoGearShift() {

        numberOfCyclesCountVThree++;

        treshHoldForActionVThree = numberOfCyclesCountVThree % numberOfCyclesDivideCoeffVThree;

        if (treshHoldForActionVThree === 0) {}

        if (numberOfRunScales > 0) {

            revsMeter.removeChild(revsMeter.firstElementChild);

            numberOfRunScales--;
        }
        else if (numberOfRunScales === 0) {
            boolGasPedalRetractedAndDecelaretedFlag = true;
        }
    }

    ///================ End Setups numberOfRunScales===============================================================

    /// Setting Breaks' pedal DOM elements and event handlers
    BreaksPedalSetupsAndDisplay();

    /// Setting Gas' pedal DOM elements and event handlers
    GasPedalSetupsAndDisplay();

    ///setMainCyclesGenerator();

    function stopMainCyclesGenerator() {
        clearInterval(runMainCycleClock);
    }

    function startEngine() {

        boolIsEngineStarting = true;

        //setMainCyclesGenerator();
    }

    //console.log(numberOfRunScales);

    //startEngine();

    //idleCycleClock = setInterval(function () {
    //    runIdle();
    //}, 200);



    //dealWithPedalRevs(gasPedal.value);

(function () {}());
