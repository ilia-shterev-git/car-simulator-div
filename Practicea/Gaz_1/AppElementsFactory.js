

var CarSimulatorApp = {};
CarSimulatorApp.ElementsFactory = (function () {

    "use strict";

    let Factory = {};

    Factory.createDomElement = function (elementType) {

        let elementToCreate = document.createElement(elementType);
        return elementToCreate;
    };

    Factory.createDomElementWithOneClass = function (elementType, className) {

        let elementToCreate = Factory.createDomElement(elementType);
        elementToCreate.classList.add(className);
        return elementToCreate;
    };

    Factory.createDomElementWithTwoClasses = function (elementType, className1, className2) {

        let elementToCreate = Factory.createDomElement(elementType);
        elementToCreate.classList.add(className1);
        elementToCreate.classList.add(className2);
        return elementToCreate;
    };

    Factory.createDomElementWithAttribute = function (elementType, attrName, attrValue) {

        let elementToCreate = Factory.createDomElement(elementType);
        elementToCreate.setAttribute(attrName, attrValue);
        return elementToCreate;
    };

    return Factory;

})();


