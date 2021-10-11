


import BreaksPedalSetupsAndDisplay from "./SetupBreaksPedal.js";

import GasPedalSetupsAndDisplay from "./SetupGasPedal.js";

import SetupAndDisplayGearSection from "./SetupGearSection.js";

    /// Initializes checkBoxIgnition check box. Sets DOM's element event handler, vars and CSSs
    /// If checkBoxIgnition gets checked the global var varsObject.boolIsIgnitionKeyOn = true;
    /// Also some color chages to the Start button take place
import SetupAndDisplayKeySwitch from "./SetupKeySwitch.js";

import SetupAndStartIgnitionButton from "./SetupStartButton.js";


import { SetMainCyclesGenerator } from "./CarMainGenerator.js";



(function () {

    // Those objects will carry all the vars throughout the APP scope.  SetupStartButton
    let elementsObject = {},
        varsObject = {},

        startButton = document.getElementById("startButton"),
        pStartButtonText = document.getElementById("pStartButtonText"),
        pRevsReader = document.getElementById("pEngineSpeedReader");

    elementsObject.startButton = startButton;
    elementsObject.pStartButtonText = pStartButtonText;
    elementsObject.pRevsReader = pRevsReader;


    varsObject.boolIsEngineStarting = false;
    varsObject.boolIsEngineRunning = false;

    varsObject.boolIsParkGearOnEngineStarting = false;
    varsObject.boolEngineStarting1stCheck = false;
    varsObject.boolEngineStarting2ndCheck = false;
    varsObject.boolEngineStarting3rdCheck = false;

    //varsObject.boolIsOnGear = true;

    varsObject.randNumber=1;

    varsObject.boolEngineIsAtMax = false;

    varsObject.boolIsIgnitionKeyOn = false;

    varsObject.CurrentLanguage = MessagesFactory.CurrentLanguage;

    // When true adds green line to the scale and sets to false.
    // When false remives green line from the scale and sets to true  boolEngineDecelareted
    varsObject.boolEngineDecelareted = true;

    varsObject.numberOfRegularScales = 0;


    //varsObject.totalOfIdleScales = 6;

    //varsObject.totalOfRunScales = 34;
    varsObject.totalNumberOfRevsScales = 40;

    varsObject.totalEngineSpeed = 0;


    //varsObject.numberOfRunScales = 0;

    //varsObject.revsPerIdleRevScale = 145;
    //varsObject.revsPerGasPedalValue = 124;
    //varsObject.revsPerGasPedalValueLast = 73;

    ////cssClassRevsDanger = "revs-danger";

    //varsObject.idleEngineSpeed = 870;
    //varsObject.runEngineSpeed = 0;
    //varsObject.totalEngineSpeed = 0;
    //varsObject.engineSpeedLimit = 5800;

    varsObject.carsSpeed = 0;


    varsObject.tmpIntStarterRepetitions = 0;


    /// Setting Breaks' pedal DOM elements and event handlers
    BreaksPedalSetupsAndDisplay(elementsObject, varsObject);

    /// Setting Breaks' pedal DOM elements and event handlers
    GasPedalSetupsAndDisplay(elementsObject, varsObject);

    SetupAndDisplayGearSection(elementsObject, varsObject);

    SetupAndDisplayKeySwitch(elementsObject, varsObject);

    SetupAndStartIgnitionButton(elementsObject, varsObject);



    SetMainCyclesGenerator(elementsObject, varsObject);

}());