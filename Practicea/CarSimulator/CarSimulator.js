

//import setMainCyclesGenerator from 'http://localhost:49795/CarSimulator/CarSimMainFunct2.js'

"use strict";

///================ Begin Setups ==================================================================


let runMainCycleClock, idleCycleClock;

let idlеGeneratorClockInterval = 200,

    currentGearId = CarSimulatorApp.LogicFactory.initialGear,


    varsObject.boolFlipFlop = false,




// those vars are brought next to the func that uses then for quicker tests numberOfIdleScales
    tempNumberOfIdleScales = 0,
    totalOfIdleScales = 6,

    totalOfRunScales = 34,
    totalNumberOfRevsScales = 40,
    numberOfRunScales = 0,

    revsPerIdleRevScale = 145,
    revsPerGasPedalValue = 124,
    revsPerGasPedalValueLast = 73,

    //cssClassRevsDanger = "revs-danger",

    idleEngineSpeed = 870,
    runEngineSpeed = 0,
    totalEngineSpeed = 0,

    carsSpeed = 0,
    engineSpeedLimit = 5800,

    tmpIntStarterRepetitions = 0;

let mainGeneratorClockInterval = 18;

const revsMeter = document.getElementById("revsMeter"),
    pRevsReader = document.getElementById("pEngineSpeedReader"),
    carSpeedMeter = document.getElementById("speedoMeter"),
    pCarSpeedReader = document.getElementById("pCarSpeedReader"),

    startButton = document.getElementById("startButton"),

    checkBoxIgnition = document.getElementById("checkBoxIgnition"),
    pStartButtonText = document.getElementById("pStartButtonText"),

    gearSection = document.getElementById("gearSection");


// Add all idle revs on the left scale and sets the boolIsEngineRunning 
// flag to true;
function turnEngineOn() {

    // X idle elements has to be put for the scale. In order to make it real looking
    /// I put one element on every N-th cicle of the main generatior

        /// On each clock cycle reates one unit of idle rev which
        // will be appended to the rev's scale
        // Created instead of cloned, just for the variety sake
        let oneIdleRev = CarSimulatorApp.RevsFactory.createOneRevScale();

        ///  Append one unit of idle rev to the rev's scale
        revsMeter.prepend(oneIdleRev);

        // Get count how many idle revs are put on the scale.
        tempNumberOfIdleScales++;
        //console.log(numberOfIdleRevsCount);

        // If engine's speed has reached the total needed, we can consider it 
        /// started and running
        if (tempNumberOfIdleScales === totalOfIdleScales) {

            boolIsEngineStarting = false;
            boolIsEngineRuning = true;
            totalEngineSpeed = idleEngineSpeed;
        }
}


function runPulsingIdle() {

    // itIsEach2ndCicle , itIsEach3rdCicle = false, itIsEach4thCicle

    if (itIsEach3rdCicle === true) {

        if (numberOfRunScales === 0) {

            let oneMainScaleRev = CarSimulatorApp.RevsFactory.createOneRevMainScale();

            revsMeter.prepend(oneMainScaleRev);
            numberOfRunScales++;

            totalEngineSpeed = totalEngineSpeed + revsPerIdleRevScale;
            //console.log("344");
        }
        else if (numberOfRunScales === 1) {

            revsMeter.removeChild(revsMeter.firstElementChild);
            numberOfRunScales--;

            totalEngineSpeed = totalEngineSpeed - revsPerIdleRevScale;
        }
    }
}

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

function makeRandomNumber(min, max) {
    const r = Math.random() * (max - min) + min
    return Math.floor(r)
}

function setRunningStarterImmitation() {

    if (tmpIntStarterRepetitions < randNumber) {

        // While boolFlipFlop === true scales will be added to the revs meter
        //  until their max number - 6.
        // While boolFlipFlop === false scales will be removed
        if (boolFlipFlop === true) {

            /// On each clock Each3rdCicle reates one unit of idle rev which 
            // will be appended to the rev's scale
            // Created instead of cloned, just for the variety sake
            let oneIdleRev = CarSimulatorApp.RevsFactory.createOneRevScale();

            ///  Append one unit of idle rev to the rev's scale
            revsMeter.prepend(oneIdleRev);

            // Get count how many idle revs are put on the scale.
            tempNumberOfIdleScales++;

            if (tempNumberOfIdleScales === totalOfIdleScales) {

                boolFlipFlop = false;
            }
        }
        else {
            // Get count how many idle revs are put on the scale.
            tempNumberOfIdleScales--;

            revsMeter.removeChild(revsMeter.firstElementChild);

            if (tempNumberOfIdleScales === 0) {

                boolFlipFlop = true;

                // one starter cicle passed
                tmpIntStarterRepetitions++;
            }
        }


        //console.log(numberOfIdleRevsCount);

        // If engine's speed has reached the total needed, we can consider it 
        /// started and running
        //if (tempNumberOfIdleScales === totalOfIdleScales) {

        //    boolIsEngineStarting = false;
        //    boolIsEngineRuning = true;
        //    totalEngineSpeed = idleEngineSpeed;
        //}
    }
}








checkBoxIgnition.addEventListener("change", function (e) {

    ///  startButton.classList.toggle("activаted");
    
    if (this.checked == true) {

        boolIsIgnitionKeyOn = true;
        pStartButtonText.classList.add("activаted-red");
        startButton.classList.add("activаted");
    } else {

        boolIsIgnitionKeyOn = false;
        pStartButtonText.classList.remove("activаted-red");
        startButton.classList.remove("activаted");
        startButton.classList.remove("activаted-clicked");
        startButton.classList.add("start-inactive");
    }
});

startButton.addEventListener("click", function () {

    if ((boolIsIgnitionKeyOn === false) || (boolIsEngineStarting === true) || (boolIsEngineRuning === true))
        return;

    //if (boolIsEngineStarting === true)
    //    return;

    //if (boolIsEngineRuning === true)
    //    return;

    startButton.classList.remove("activаted");
    startButton.classList.add("activаted-clicked");

    boolIsEngineStarting = true;

    checkParkGear();

    const parkGearId = CarSimulatorApp.LogicFactory.initialGear,
        parkGearElement = document.getElementById(parkGearId);

    // Both HTML elements - startButton, parkGearElement are avaiable globally
    // within that enclosure but here I demonstrate passing parameters down the line.
    const setStageOneGearCheck = function (startButton, parkGearElement) {
        return new Promise(function (resolve, reject) {
            setTimeout(function (startButton, parkGearElement) {

                if (boolIsParkGearOnEngineStarting === false) {

                    let gearCheckFailMessage = "Error: Gear not on Park Position",

                        rejectArgumentsObj = {
                            StartButton: startButton,
                            ParkGearElement: parkGearElement,
                            FailMessage: gearCheckFailMessage
                        };

                    reject(rejectArgumentsObj);
                }
                else {

                    let gearCheckOKMessage = "OK: Gear on Park Position",

                        resolveArgumentsObj = {
                            ParkGearElement: parkGearElement,
                            OKMessage: gearCheckOKMessage
                        };

                    resolve(resolveArgumentsObj);
                }
            }, 2000, startButton, parkGearElement);
        });
    };

    if (randNumber > 4)
        randNumber = 4;

    let timeoutRandomInterval, tempFixConst;

    if (randNumber === 3)
        tempFixConst = 1400;
    else if (randNumber === 4)
        tempFixConst = 1200;

    timeoutRandomInterval = randNumber * tempFixConst;

    let setRunningStarterImmitation = new Promise(function (resolve, reject) {
        setTimeout(function () {

            boolEngineStarting2ndCheck = false;
            boolEngineStarting3rdCheck = true;
            resolve("Resolved");
        }, timeoutRandomInterval);
    });

    let setEngineRunning = new Promise(function (resolve, reject) {
        setTimeout(function () {

            boolEngineStarting3rdCheck = false;
            checkBoxIgnition.disabled = true;

            console.log(tmpIntStarterRepetitions, boolEngineStarting3rdCheck);

            resolve("Resolved");
        }, 1200);
    });

    function printAll(result) {

        console.log(result, 343)
    }

    // Both HTML elements - startButton, parkGearElement are avaiable globally
    // within that enclosure but here I demonstrate passing parameters down the line.
    setStageOneGearCheck(startButton, parkGearElement)
        .then(onStageOneResolve, onStageOneReject)
        .then(setEngineRunning)
        .then(printAll);


    console.log(currentGearId);




    // stopMainCyclesGenerator();   /// startButton
});


// Based on the gas pedal value calcualtes whether should remove or
// add revs scales to the main rev scale
// Two calcs take place actually. Second one is for the engine speed as number which will be
// displayed on the top left
function dealWithEngineSpeedRevsScalesNoGearShift(elementsObject, varsObject) {

    ///  =========  Using the external logic closure  ===================
    const { numberOfRunScales: soughtNumberOfRunScales, engineSpeed } = CarSimulatorApp.LogicFactory
        .calcEngineSpeedAndRevsScales(intGasPedalPositionValue, totalEngineSpeed);

    totalEngineSpeed = engineSpeed;


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

//Removes all scales - RunScales , abpve the idle scales, from revsMeter,
// Lowers down the engine speed 
function autoRetractEngineSpeedRevsScalesNoGearShift() {

    if ((numberOfRunScales === 0) && (intGasPedalPositionValue === 0)) {
        boolEngineDecelareted = true;
    }
    else {

        ///  =========  using the external logic closure  ===================

        if (intGasPedalPositionValue > 0) {

            totalEngineSpeed = CarSimulatorApp.LogicFactory
                .calcAutoRetractEngineSpeedNoGearShift(intGasPedalPositionValue, totalEngineSpeed);

            intGasPedalPositionValue--
        }
        ///  ========= END using the external logic closure  ===================

        if (numberOfRunScales > 0) {

            revsMeter.removeChild(revsMeter.firstElementChild);
            numberOfRunScales--;
        }
    }
}

///================ End Setups numberOfRunScales===============================================================

function showEngineSpeed() {

    if (mainCiclesCounter % 5 === 0) {

        //if (totalEngineSpeed >= engineSpeedLimit) {

        //    let cssClassRevsDanger = CarSimulatorApp.RevsFactory.ClassRevsReaderDanger;

        //    pRevsReader.classList.add(cssClassRevsDanger);
        //    totalEngineSpeed = engineSpeedLimit;
        //}       
        //else
        //    pRevsReader.classList.remove(cssClassRevsDanger);

        pRevsReader.textContent = totalEngineSpeed;
    }

    //  console.log(totalEngineSpeed);
    //  console.log(intGasPedalPositionValue);
}


setMainCyclesGenerator();

function startEngine() {

    boolIsEngineStarting = true;
}

//console.log(numberOfRunScales);


//startEngine();

//idleCycleClock = setInterval(function () {
//    runIdle();
//}, 200);



//dealWithPedalRevs(gasPedal.value);

(function () { }());
