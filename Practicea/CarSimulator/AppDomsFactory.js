
var CarSimulatorApp = CarSimulatorApp || {};

CarSimulatorApp = (function () {

    "use strict";

    let DomElementsFactory = {};

    let elementToCreate = "div",

        // Classes list for rev's meter
        cssClassRevOuter = "outer-rev",
        cssClassRevsAny = "revs-any",
        cssClassRevsBlank = "revs-blank",
        cssClassRevsIdle = "revs-idle",
        cssClassRevsMainScale = "revs-main-scale",
        cssClassRevsOptimal = "revs-optimal",
        cssClassRevsOverLimit = "revs-over-limit",
        cssClassRevsDanger = "revs-danger",
        cssClassRevsReaderDanger = "revs-reader-danger",


        // END Classes list

        // Those bellow with the help of the above CSS classes
        // which will give rev's main scale different colororization
        engineRevsMinOptimal = 8,
        engineRevsMaxOptimal = 13,
        engineRevsOverLimit = 26,
        engineRevsDanger = 30,
        gearPark = "gearPark",
        gearNeutral = "gearNeutral",
        gearDirect = "gearDirect",
        gearFirst = "gearFirst",
        gearSecond = "gearSecond",

        // Currently I do not intend to develope solution for the last 
        //  two cases - 1st and 2ns gear. So they will not take place if engine is running
        arrGearsEngineRunning = [gearPark, gearNeutral, gearDirect],


        arrGearsEngineNotRunning = [gearPark, gearNeutral, gearDirect, gearFirst, gearSecond];

    DomElementsFactory.InitialGear = gearPark;

    DomElementsFactory.ArrGearsEngineRunning  = arrGearsEngineRunning;
    DomElementsFactory.ArrGearsEngineNotRunning = arrGearsEngineNotRunning;

    //DomElementsFactory.ClassActivаtedRed = cssClassActivаtedRed;

    // Each method here is public


    DomElementsFactory.createParkGearElement = function () {

        const parkGearId = DomElementsFactory.InitialGear,
              parkGearElement = document.getElementById(parkGearId);

        return parkGearElement;
    };

    // Sets those numbers for further calculations for the moving shift animation
    DomElementsFactory.getGearElementByDataNumber = function (intCurrentShift) {

        const gearId = arrGearsEngineNotRunning[intCurrentShift];

        const gearElement = document.getElementById(gearId);

        return gearElement;
    };

    DomElementsFactory.createCurrentAndNextGearElement_SetStyles = function (varsObject, intTempCurrentShift) {

        // Gets the current gear element for later styling.
        // current element will be taken the "SelectedGear" style.
        // This style will be given to the nextGearElement
        let currentGearElement = CarSimulatorApp.DomElementsFactory
            .getGearElementByDataNumber(intTempCurrentShift);

        // Gets the current gear element for later styling.
        // It will be given "SelectedGear" style.
        let nextGearElement = CarSimulatorApp.DomElementsFactory
            .getGearElementByDataNumber(varsObject.intCurrentShift);

        const tmpCssClassForSelectedGear = CarSimulatorApp.DomElementsFactory.ClassSelectedGearBorder;

        currentGearElement.classList.remove(tmpCssClassForSelectedGear);

        nextGearElement.classList.add(tmpCssClassForSelectedGear);

        return nextGearElement.id;
    };

    /// the one bellow - createDomElement private. My thought would be 
    // for later eventual testing purposes
    DomElementsFactory.createDomElement = function (elementType) {

        let elementToCreate = document.createElement(elementType);
        return elementToCreate;
    };

    DomElementsFactory.createDomElementWithOneClass = function (elementType, className) {

        let elementToCreate = DomElementsFactory.createDomElement(elementType);
        elementToCreate.classList.add(className);
        return elementToCreate;
    };

    DomElementsFactory.createDomElementWithTwoClasses = function (elementType, className1, className2) {

        let elementToCreate = DomElementsFactory.createDomElement(elementType);
        elementToCreate.classList.add(className1);
        elementToCreate.classList.add(className2);
        return elementToCreate;
    };

    DomElementsFactory.createDomElementWithAttribute = function (elementType, attrName, attrValue) {

        let elementToCreate = DomElementsFactory.createDomElement(elementType);
        elementToCreate.setAttribute(attrName, attrValue);
        return elementToCreate;
    };

    let RevsFactory = {};


    RevsFactory.ClassRevsReaderDanger = cssClassRevsReaderDanger;

    //RevsFactory.ClassRevsMainScale = cssClassRevsMainScale;


    // END rev's main scale different colororization

    RevsFactory.createOneRevScale = function (cssClassRevsType = cssClassRevsIdle) {

        let rev = DomElementsFactory.createDomElementWithOneClass(elementToCreate, cssClassRevOuter);

        let elementBlank = DomElementsFactory.createDomElementWithOneClass(elementToCreate, cssClassRevsBlank);
        let elementWithCssClassType = DomElementsFactory.createDomElementWithTwoClasses(elementToCreate, cssClassRevsAny, cssClassRevsType);

        rev.appendChild(elementWithCssClassType);
        rev.appendChild(elementBlank);

        return rev;
    };

    RevsFactory.calcAndCreateOneRevScale = function (numberOfRunScales) {

        let cssClassToUse;

        if (numberOfRunScales < engineRevsMinOptimal) {
            cssClassToUse = cssClassRevsMainScale;
        }
        else if ((numberOfRunScales >= engineRevsMinOptimal) && (numberOfRunScales < engineRevsMaxOptimal)) {
            cssClassToUse = cssClassRevsOptimal;
        }
        else if ((numberOfRunScales >= engineRevsMaxOptimal) && (numberOfRunScales < engineRevsOverLimit)) {
            cssClassToUse = cssClassRevsMainScale;
        }
        else if ((numberOfRunScales >= engineRevsOverLimit) && (numberOfRunScales < engineRevsDanger)) {
            cssClassToUse = cssClassRevsOverLimit;
        }
        else if (numberOfRunScales >= engineRevsDanger) {
            cssClassToUse = cssClassRevsDanger;
        }

        let rev = RevsFactory.createOneRevScale(cssClassToUse);

        return rev;
    };

    RevsFactory.createOneRevMainScale = function () {

        let rev = RevsFactory.createOneRevScale(cssClassRevsMainScale);

        return rev;
    };

    return {
        DomElementsFactory: DomElementsFactory,
        RevsFactory: RevsFactory
        //,RevsFactory: RevsFactory
    }

})();