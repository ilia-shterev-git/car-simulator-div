
/// Setting Gas' pedal DOM elements and event handlers
export default function GasPedalSetupsAndDisplay(elementsObject, varsObject) {

    varsObject.strGasPedalPositionValue;
    varsObject.intGasPedalPositionValue = 0;
    varsObject.intGasPedalPositionValForAutoRetract = 0;

    varsObject.boolIsGasPedalPressed = false;
    varsObject.boolIsGasPedalRetracted = true;

    /// Instantiting Gas' range slider
    let gasPedal = document.getElementById("gasPedalID");
    elementsObject.gasPedal = gasPedal;

    /// Instantiting the Gas' paragraphs which will display
    /// curent slider's position numeric values
    let pGasRangeValue = document.getElementById("gasRangeValue");

    elementsObject.pGasRangeValue = pGasRangeValue;
    gasPedal.addEventListener("mousedown", function () {
        /// Setting global var as flag which play role in the main cycle generator
        varsObject.boolIsGasPedalPressed = true;
        varsObject.boolIsGasPedalRetracted = false
    });

    /// After pedal is released
    gasPedal.addEventListener("mouseup", function () {

        /// Setting global var as flag which have role in the main cycle generator
        varsObject.boolIsGasPedalPressed = false;
        /// Setting the underneath paragraph's numeric value to show numbers
        /// while sliding
        //intGasPedalPositionValue = gasPedal.value;
    });

    gasPedal.addEventListener("input", function () {

        /// Setting the underneath paragraph's numeric value to show numbers
        /// while sliding forward
        /// Setting global var for gasPedal.value (current postion)

        varsObject.intGasPedalPositionValue = gasPedal.valueAsNumber;
        // OR
        //varsObject.intGasPedalPositionValue = parseInt(gasPedal.value);

        // The second value is for the revs' scales while autoretracting
        // Those two values will play indipendent roles in separate processes
        varsObject.intGasPedalPositionValForAutoRetract = varsObject.intGasPedalPositionValue;

        pGasRangeValue.textContent = gasPedal.value;
    });
}

/// Gas' pedal is released and auto retracting
/// Using a copy of the Gas Pedal Position Value as this value and the first
/// will decrment in separate ways
export function autoRetractGasPedal(elementsObject, varsObject) {

    // Using second value (copy) of the gas pedal position var as 2 vars are gong to decrement 
    // in different processes
    // Subtracts a value from intGasPedalPositionValForAutoRetract until 
    /// it reaches 0
    varsObject.intGasPedalPositionValForAutoRetract = CarSimulatorApp.LogicFactory
        .gasPedalCalcRetractingValue(varsObject.intGasPedalPositionValForAutoRetract);

    // explicitly converting int to string
    let strGasPedalPositionValue = varsObject.intGasPedalPositionValForAutoRetract + "";

    /// This will set the pedal's value while auto retracting
    elementsObject.gasPedal.value = strGasPedalPositionValue;

    /// This will display the pedal's value while auto retracting
    elementsObject.pGasRangeValue.textContent = strGasPedalPositionValue;

    if (varsObject.intGasPedalPositionValForAutoRetract === 0)
        varsObject.boolIsGasPedalRetracted = true;
}
