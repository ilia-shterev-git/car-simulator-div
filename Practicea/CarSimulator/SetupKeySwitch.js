

let CssFactory = CarSimulatorAppl.CssFactory;

/// Setting checkBoxIgnition's DOM element event handler, vars and CSSs
export default function SetupAndDisplayKeySwitch(elementsObject, varsObject) {

    if ((varsObject.boolIsEngineStarting === true) || (varsObject.boolIsEngineRunning === true))
        return;

    let checkBoxIgnition = document.getElementById("checkBoxIgnition"),

        /// These are alredy globally declared
        startButton = elementsObject.startButton,
        pStartButtonText = elementsObject.pStartButtonText;

    /// Assigns the 2 vars globally
    elementsObject.checkBoxIgnition = checkBoxIgnition;

    varsObject.boolIsIgnitionKeyOn = false;

    /// If checkBoxIgnition gets checked the global var varsObject.boolIsIgnitionKeyOn = true;
    /// Also some color chages to the Start button take place
    checkBoxIgnition.addEventListener("change", function (e) {

        if (this.checked === true) {

            varsObject.boolIsIgnitionKeyOn = true;
            CssFactory.switchStartBtnToInitialActivаted(startButton, pStartButtonText)
        }
        else {

            varsObject.boolIsIgnitionKeyOn = false; 
            CssFactory.switchStartBtnToInactive(startButton, pStartButtonText)
        }
    });
}