
"use strict";

let CssFactory = CarSimulatorAppl.CssFactory,

    LogicFactory = CarSimulatorApp.LogicFactory,
    DomsFactory = CarSimulatorApp.DomElementsFactory;





// =====   Messages Creation Area  =======================  

let statusAndMessageObject = {};

function setRejectStatusMessageStage3(CurrentLanguage) {

    statusAndMessageObject.CheckStatus = MessagesFactory.ReturnedMessages
        .IgnitionStatusErrorStage3(CurrentLanguage);

    statusAndMessageObject.MessageIndex = MessagesFactory.ReturnedMessages
        .GetArrayIndexFromMessagesArray(MessagesFactory.ErrorOnIgnitionStage3);

    return statusAndMessageObject;
}

function setResolveStatusMessageStage3(CurrentLanguage) {

    // setting status OK message
    statusAndMessageObject.CheckStatus = MessagesFactory.ReturnedMessages
        .IgnitionStatusOKStage3(CurrentLanguage);

    statusAndMessageObject.MessageIndex = MessagesFactory.ReturnedMessages
        .GetArrayIndexFromMessagesArray(MessagesFactory.OKOnIgnitionStage3);

    return statusAndMessageObject;
}


function setRejectStatusMessageStage2(CurrentLanguage) {

    statusAndMessageObject.CheckStatus = MessagesFactory.ReturnedMessages
        .IgnitionStatusErrorStage2(CurrentLanguage);

    statusAndMessageObject.MessageIndex = MessagesFactory.ReturnedMessages
        .GetArrayIndexFromMessagesArray(MessagesFactory.ErrorOnIgnitionStage2);

    return statusAndMessageObject;
}

function setResolveStatusMessageStage2(CurrentLanguage) {

    // setting status OK message
    statusAndMessageObject.CheckStatus = MessagesFactory.ReturnedMessages
        .IgnitionStatusOKStage2(CurrentLanguage);

    statusAndMessageObject.MessageIndex = MessagesFactory.ReturnedMessages
        .GetArrayIndexFromMessagesArray(MessagesFactory.OKOnIgnitionStage2);

    return statusAndMessageObject;
}


function setRejectStatusMessageStage1(CurrentLanguage) {

    statusAndMessageObject.CheckStatus = MessagesFactory.ReturnedMessages
        .IgnitionStatusErrorStage1(CurrentLanguage);

    statusAndMessageObject.MessageIndex = MessagesFactory.ReturnedMessages
        .GetArrayIndexFromMessagesArray(MessagesFactory.ErrorOnIgnitionStage1);

    return statusAndMessageObject;
}

function setResolveStatusMessageStage1(CurrentLanguage) {

    // setting status OK message
    statusAndMessageObject.CheckStatus = MessagesFactory.ReturnedMessages
        .IgnitionStatusOKStage1(CurrentLanguage);

    statusAndMessageObject.MessageIndex = MessagesFactory.ReturnedMessages
        .GetArrayIndexFromMessagesArray(MessagesFactory.OKOnIgnitionStage1);

    return statusAndMessageObject;
}

// =====   End Messages Creation Area  =======================

// =====   Data Transfer Objects Creation Area  =======================

function setInitialDataTransferObj(elementsObject, varsObject, currentLanguage) {

    let arrayAllMessages = new Array();

    let dataTransferObj = {
        currentLanguage: currentLanguage,
        arrayAllMessages: arrayAllMessages,
        elementsObject: elementsObject,
        varsObject: varsObject
    };

    return dataTransferObj;
}

// =====   End Data Transfer Objects Creation Area  =======================


function setResolveStatusStage1(dataTransferObj) {

    // setting status and OK message Stage 1
    let statusAndMessageStage1 = setResolveStatusMessageStage1(dataTransferObj.currentLanguage);

    dataTransferObj.arrayAllMessages.push(statusAndMessageStage1);
}

function setRejectStatusStage1(dataTransferObj) {

    // setting status and Error message Stage 1
    let statusAndMessageStage1 = setRejectStatusMessageStage1(dataTransferObj.currentLanguage);

    dataTransferObj.arrayAllMessages.push(statusAndMessageStage1);
}


function setResolveStatusStage2(dataTransferObj) {

    // setting status and OK message Stage 2
    let statusAndMessageStage2 = setResolveStatusMessageStage2(dataTransferObj.currentLanguage);

    dataTransferObj.arrayAllMessages.push(statusAndMessageStage2);
}

function setRejectStatusStage2(dataTransferObj) {

    // setting status and Error message Stage 2
    let statusAndMessageStage2 = setRejectStatusMessageStage2(dataTransferObj.currentLanguage);

    dataTransferObj.arrayAllMessages.push(statusAndMessageStage2);
}


function setResolveStatusStage3(dataTransferObj) {

    // setting status and OK message Stage 3
    let statusAndMessageStage3 = setResolveStatusMessageStage3(dataTransferObj.currentLanguage);

    dataTransferObj.arrayAllMessages.push(statusAndMessageStage3);
}

function setRejectStatusStage3(dataTransferObj) {

    // setting status and Error message Stage 3
    let statusAndMessageStage3 = setRejectStatusMessageStage3(dataTransferObj.currentLanguage);

    dataTransferObj.arrayAllMessages.push(statusAndMessageStage3);
}

// =====   End Data Transfer Objects Creation Area  =======================



export default function doStartEngineSimulationWithPromises(elementsObject, varsObject) {


    /// =====   Resolves And Rejects Area =======================

    function setUnexpectedError(error) {

        let statusAndMessageStage1 = error;

        // setting status and Error message Stage 1
        //let statusAndMessageStage1 = setErrorStatusMessageStage1(dataTransferObj.currentLanguage);

        //dataTransferObj.arrayAllMessages.push(statusAndMessageStage1);
    }

    function onStageOneResolve(dataTransferObj) {

        const { arrayAllMessages, elementsObject, varsObject } = dataTransferObj;

        setResolveStatusStage1(dataTransferObj);

        let parkGearElement = elementsObject.parkGearElement;

        // Remove the blank border (black currently) 
        if (parkGearElement.classList.contains(CssFactory.ClassGearBlankBorder)) {

            parkGearElement.classList.remove(CssFactory.ClassGearBlankBorder);
        }

        // Adds the Class Selected Gear (green currently)
        if (!parkGearElement.classList.contains(CssFactory.ClassSelectedGearBorder)) {

            parkGearElement.classList.add(CssFactory.ClassSelectedGearBorder);
        }

        varsObject.boolEngineStarting1stCheck = false;
        varsObject.boolEngineStarting2ndCheck = true;

        // This var will be re-used in the next stage
        varsObject.boolFlipFlop = true;

        varsObject.currNumberOfIdleScales = 0;
        varsObject.currNumberOfTurns = 0;

        // Since it is OK to continue a random number will be needed for the next stage
        // It will define the number of starter turns' sumultions more realistically
        // The number will be 3 or 4 currently
        varsObject.randNumberTurns = LogicFactory.MakeRandomNumber(3, 5);

        // Calculates the duration which will be enough to fit all starter turns - 3 or 4
        varsObject.timeoutRandomInterval =
            LogicFactory.SetTimeoutRandomInterval(varsObject.randNumberTurns);

        // Returns next method which in tern returns a Promise
        return setStageTwoTurningStarterSimulation(dataTransferObj);
    }

    function onStageOneReject(dataTransferObj) {

        const { arrayAllMessages, elementsObject, varsObject } = dataTransferObj;

        setRejectStatusStage1(dataTransferObj);

        let parkGearElement = elementsObject.parkGearElement;

        if (!parkGearElement.classList.contains(CssFactory.ClassGearErrorBorder)) {

            parkGearElement.classList.add(CssFactory.ClassGearErrorBorder);
        }

        // Sets Start Button's colors to initial position
        CssFactory.switchStartBtnToClassActivаted(startButton);

        // The above method does this
        //StartButton.classList.remove("activаted-clicked");
        //StartButton.classList.add("activаted");

        varsObject.boolIsEngineStarting = false;

        return setStageTwoTurningStarterSimulation(dataTransferObj);

        ///   throw new Error("RECEIVED NULL OBJECT");
    }

    function onStageTwoResolve(dataTransferObj) {

        const { arrayAllMessages, elementsObject, varsObject } = dataTransferObj;

        setResolveStatusStage2(dataTransferObj);

        varsObject.boolEngineStarting2ndCheck = false;
        varsObject.boolEngineStarting3rdCheck = true;

        // Returns next method which in tern returns a Promise
        return setStageThreeEngineRunning(dataTransferObj);
    }

    function onStageTwoReject(dataTransferObj) {

        const { arrayAllMessages, elementsObject, varsObject } = dataTransferObj;

        setRejectStatusStage2(dataTransferObj);

        varsObject.boolIsEngineStarting = false;

        return setStageThreeEngineRunning(dataTransferObj);

        //return Promise.reject(dataTransferObj);
    }

    function onStageThreeResolve(dataTransferObj) {

        const { arrayAllMessages, elementsObject, varsObject } = dataTransferObj;

        setResolveStatusStage3(dataTransferObj);

        checkBoxIgnition.disabled = true;
    }

    function onStageThreeReject(dataTransferObj) {

        const { arrayAllMessages, elementsObject, varsObject } = dataTransferObj;

        setRejectStatusStage3(dataTransferObj);

        //return Promise.reject(dataTransferObj);
    }

    /// =====  End Resolves And Rejects Area  =======================

    let dataTransferObj = setInitialDataTransferObj(elementsObject, varsObject, varsObject.CurrentLanguage);

    const setStageOneGearCheck = function () {
        return new Promise(function (resolve, reject) {
            // Here I demonstrate how elementsObject, varsObject
            // would be transfered down a setTimeout method
            // if they were not globally availbale
            setTimeout(function (elementsObject, varsObject) {

                if (varsObject.boolIsParkGearOnEngineStarting === true) {
                    
                    resolve(dataTransferObj);
                }
                else if (varsObject.boolIsParkGearOnEngineStarting === false) {

                    reject(dataTransferObj);
                }
                // Here I demonstrate how elementsObject, varsObject
                // would be transfered down a setTimeout method
                // if they were not globally availbale
            }, 3000, elementsObject, varsObject);
        });
    };
    /// ===========  End setStageOneGearCheck

    const setStageTwoTurningStarterSimulation = function (dataTransferObj) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {

                //// Some made up code which immitates conditions for resolve and reject
                //const someImaginaryResult = 100;

                if ((varsObject.boolIsEngineStarting === true) && (varsObject.boolEngineStarting2ndCheck === true)) {

                    resolve(dataTransferObj);
                }
                else {
 
                    reject(dataTransferObj);
                }
            }, varsObject.timeoutRandomInterval);
        });
    };
    /// ===========  End setStageTwoTurningStarterSimulation

    const setStageThreeEngineRunning = function (dataTransferObj) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {

                // Some made up code which immitates conditions for resolve and reject
                const someImaginaryResult = 100;

                if ((varsObject.boolIsEngineStarting === true) && (varsObject.boolEngineStarting3rdCheck === true)) {

                    resolve(dataTransferObj);;
                }
                else {

                    reject(dataTransferObj);
                }

            }, 1200);
        });
    };
    ///   End setStageThreeEngineRunning       

    setStageOneGearCheck()
        .then(onStageOneResolve, onStageOneReject)
        .then(onStageTwoResolve, onStageTwoReject)
        .then(onStageThreeResolve, onStageThreeReject)
        .catch(setUnexpectedError);
};