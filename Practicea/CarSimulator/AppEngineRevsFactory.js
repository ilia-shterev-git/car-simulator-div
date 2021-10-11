
let CssFactory = CarSimulatorAppl.CssFactory,

    LogicFactory = CarSimulatorApp.LogicFactory,
    DomsFactory = CarSimulatorApp.DomElementsFactory;

var CarSimulatorApp = CarSimulatorApp || {};

CarSimulatorApp.EngineRevsFactory = (function () {

    "use strict";

    let EngineRevsFactory = {};


    const revsMeter = document.getElementById("revsMeter");

    EngineRevsFactory.createOneRevScale = function (ClassRevsScaleType) {

        let elementToCreate = "div",

            rev = DomsFactory.createDomElementWithOneClass(elementToCreate,
                CssFactory.ClassRevOuter),

            elementBlank = DomsFactory.createDomElementWithOneClass(elementToCreate,
                CssFactory.ClassRevsBlank),

            elementWithCssClassType = DomsFactory.createDomElementWithTwoClasses(elementToCreate,
                CssFactory.ClassRevsAny, ClassRevsScaleType);

        rev.appendChild(elementWithCssClassType);
        rev.appendChild(elementBlank);

        return rev;
    };

    let decreaseEngineSpdByOne = function (varsObject) {

        revsMeter.removeChild(revsMeter.firstElementChild);

        varsObject.totalNumberOfRevsScales = varsObject.currNumberOfIdleScales;

        varsObject.totalEngineSpeed = varsObject.totalEngineSpeed - LogicFactory.RevsPerRevScale;

        /// pRevsReader.textContent = varsObject.totalEngineSpeed;
    };

    let increaseEngineSpdByOne = function (varsObject, classRevsScaleType) {

        // Created instead of cloned, just for the variety sake
        let oneIdleRev = EngineRevsFactory.createOneRevScale(classRevsScaleType);

        ///  Append one unit of idle rev to the rev's scale
        revsMeter.prepend(oneIdleRev);


        varsObject.totalNumberOfRevsScales = varsObject.currNumberOfIdleScales;

        varsObject.totalEngineSpeed = varsObject.totalEngineSpeed + LogicFactory.RevsPerRevScale;

        /// pRevsReader.textContent = varsObject.totalEngineSpeed;
    };

    EngineRevsFactory.decreaseEngineSpdByOneRegular = function (elementsObject, varsObject) {

        varsObject.numberOfRegularScales--;

        decreaseEngineSpdByOne(varsObject, LogicFactory.RevsPerIdleRevScale);
    };

    EngineRevsFactory.increaseEngineSpdByOneRegular = function (elementsObject, varsObject) {

        varsObject.numberOfRegularScales++;

        increaseEngineSpdByOne(varsObject, CssFactory.ClassRevsMainScale);
    };

    EngineRevsFactory.increaseEngineSpdByOneIdle = function (elementsObject, varsObject) {

        // Get count how many idle revs are put on the scale.  
        varsObject.currNumberOfIdleScales++;

        increaseEngineSpdByOne(varsObject,
            CssFactory.ClassIdleRevScale);
    };


    EngineRevsFactory.decreaseEngineSpdByByOneIdle = function (elementsObject, varsObject) {

        // Get count how many idle revs are put on the scale.
        varsObject.currNumberOfIdleScales--;

        decreaseEngineSpdByOne(varsObject);
    };


    return EngineRevsFactory;

})();