
/// Setting Breaks' pedal DOM elements and event handlers   startButton
export default function BreaksPedalSetupsAndDisplay(elementsObject, varsObject) {

    varsObject.intBreaksPedalPositionValue = 0;
    varsObject.strBreaksPedalPositionValue;
    varsObject.boolIsBreaksPedalPressed = false;
    varsObject.boolIsBreaksPedalRetracted = true;

    /// Instantiting the Breaks' range slider
    let breaksPedal = document.getElementById("breaksPedalID");
    elementsObject.breaksPedal = breaksPedal;

    /// Instantiting the Breaks' paragraphs which will display
    /// curent slider's position numeric values
    let pBreaksRangeValue = document.getElementById("breaksRangeValue");
    elementsObject.pBreaksRangeValue = pBreaksRangeValue;

    breaksPedal.addEventListener("mousedown", function () {

        /// Setting global var as flag which have role in the main cycle generator
        varsObject.boolIsBreaksPedalPressed = true;
        varsObject.boolIsBreaksPedalRetracted = false
    });

    /// After pedal is released
    breaksPedal.addEventListener("mouseup", function () {

        /// Setting global var as flag which have role in the main cycle generator
        varsObject.boolIsBreaksPedalPressed = false;

        /// Setting the underneath paragraph's numeric value to show numbers
        /// while retracting
        //intBreaksPedalPositionValue = parseInt(breaksPedal.value);
    });

    breaksPedal.addEventListener('input', function () {

        /// Setting the underneath paragraph's numeric value to show numbers
        /// while retracting parseInt()
        varsObject.intBreaksPedalPositionValue = breaksPedal.valueAsNumber;

        /// Setting the underneath paragraph's numeric value to show numbers
        /// while sliding foroward
        pBreaksRangeValue.textContent = breaksPedal.value;

    });
}

/// Breaks' pedal is released and auto retracting
export function autoRetractBreaksPedal(elementsObject, varsObject) {

        varsObject.intBreaksPedalPositionValue = CarSimulatorApp.LogicFactory
            .breakPedalCalcRetractingValue(varsObject.intBreaksPedalPositionValue);

        // explicitly converting int to string
    let strBreaksPedalPositionValue = varsObject.intBreaksPedalPositionValue + "";

        /// This will set the pedal's value while auto retracting
        elementsObject.breaksPedal.value = strBreaksPedalPositionValue;

        /// This will display in paragraph pedal's value while auto retracting
        elementsObject.pBreaksRangeValue.textContent = strBreaksPedalPositionValue;

    if (varsObject.intBreaksPedalPositionValue === 0)
        varsObject.boolIsBreaksPedalRetracted = true;
}
