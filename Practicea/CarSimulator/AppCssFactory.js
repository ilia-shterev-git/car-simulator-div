
//var CarSimulatorAppl = CarSimulatorAppl || {};  cssClassRevsIdle = "revs-idle",

CarSimulatorAppl = (function () {

    "use strict";

    let CssFactory = {};

    CssFactory.ClassSelectedGearBorder = "selected-gear";
    CssFactory.ClassGearBlankBorder = "gear-blank-border";
    CssFactory.ClassGearErrorBorder = "gear-signaling-border";
    CssFactory.ClassActivаtedRed = "activаted-red";


    // Classes list for rev's meter
    CssFactory.ClassRevOuter = "outer-rev";
    CssFactory.ClassRevsAny = "revs-any";
    CssFactory.ClassRevsBlank = "revs-blank";
    CssFactory.ClassRevsIdle = "revs-idle",
    CssFactory.ClassRevsMainScale = "revs-main-scale";
    CssFactory.ClassRevsOptimal = "revs-optimal";
    CssFactory.ClassRevsOverLimit = "revs-over-limit";
    CssFactory.ClassRevsDanger = "revs-danger";
    CssFactory.ClassRevsReaderDanger = "revs-reader-danger";

    CssFactory.ClassIdleRevScale = "revs-idle";




    let ClassStartBtnActivаted = "activаted",
        ClassStartBtnActivаtedClicked = "activаted-clicked",
        ClassActivаtedRed = "activаted-red",
        ClassInactive = "start-inactive";

    CssFactory.switchClasses = function (domElement, CssClassToRemove, CssClassToAdd) {

        domElement.classList.remove(CssClassToRemove);
        domElement.classList.add(CssClassToAdd);
    };

    CssFactory.switchStartBtnToInactive = function (startButton, pStartButtonText) {

        pStartButtonText.classList.remove(ClassActivаtedRed);
        startButton.classList.remove(ClassStartBtnActivаted);
        startButton.classList.remove(ClassStartBtnActivаtedClicked);
        startButton.classList.add(ClassInactive);
    };

    CssFactory.switchStartBtnToInitialActivаted = function (startButton, pStartButtonText) {

        startButton.classList.add(ClassStartBtnActivаted);
        pStartButtonText.classList.add(ClassActivаtedRed);
    };

    CssFactory.switchStartBtnToClassActivаted = function (startButton) {

        CssFactory.switchClasses(startButton
            , ClassStartBtnActivаtedClicked
            , ClassStartBtnActivаted)
    };


    CssFactory.setStartBtnToCssActivatedClicked = function (startButton) {

        CssFactory.switchClasses(startButton
            , ClassStartBtnActivаted
            , ClassStartBtnActivаtedClicked);
    };


    return { CssFactory: CssFactory }
    
})();