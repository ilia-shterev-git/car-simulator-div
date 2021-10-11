


let road = document.getElementById("road"),

someObj = { movingForward: false },

    boolGlobalStripTypeSetter = false;

//someObj = { movingForward: true },

//    boolGlobalStripTypeSetter = true;


let mainIndex, allElements = [];

const TOTAL_NUMBER_STRIPS = 6
    , SUBTRACT_COEFF = 5
    , STRIPS_ELEMENT_HEIGHT = 40;

let UPPER_INDEX = TOTAL_NUMBER_STRIPS - 1;

function getStripType() {

    let cssStripTypeClass;

    if (boolGlobalStripTypeSetter === true) {

        cssStripTypeClass = "road-strip block-road-strip";
        boolGlobalStripTypeSetter = false;
    }
    else {

        cssStripTypeClass = "road-strip blank-road-strip";
        boolGlobalStripTypeSetter = true;
    }

    return cssStripTypeClass;
}

function createStrip(STRIPS_ELEMENT_HEIGHT, mainIndex) {

    let stripType = "strip";

    let cssStripTypeClass = getStripType();

    var stripBlock = document.createElement("div");

    stripBlock.setAttribute("class", cssStripTypeClass);
    stripBlock.setAttribute("id", stripType + mainIndex);

    stripBlock.style.height = STRIPS_ELEMENT_HEIGHT + "px";

    return stripBlock;
}

for (mainIndex = 0; mainIndex < TOTAL_NUMBER_STRIPS; mainIndex++) {

    let stripBlock = createStrip(STRIPS_ELEMENT_HEIGHT, mainIndex);

    allElements.push(stripBlock);

    road.prepend(stripBlock);
}




function moveElementFromZeroToUpper(stripElement) {

    // removes element from the index 0 end of array
    allElements.shift();

    // adds element at the upper index end of array
    allElements.push(stripElement);
}

//return;

//let someMillisecondsVar = 220;

let topStripBlock, topStripBlockHeight = 0, boolIsForwardTransition=false
    , bottomStripBlock, bottomStripBlockHeight = 0, boolIsBackwardTransition = false
    , boolChangeDirections = false;

///moveElementFromZeroToUpper(topStripBlock);

/// When someObj.movingForward === true top strips are moving downward.
/// In this case bottom strips are taken from their line and put on top for keeping continous motion.
/// When boolIsForwardTransition === true that means that bottom strip has just been set to 0 and 
/// sent to top. From here - if moving keeps forward it will grow at top. If however movinf changes to
/// backward it should be sent back to bottom with 0 height to grow there.
/// Looking side way the "belt's" axels are rolling counter clockwise

/// When someObj.movingForward === false bottom strips are moving upward.
/// In this case top strips are taken from their line and put at bottom for keeping continous motion.
/// When boolIsBackwardTransition === true that means that top strip has just been set to 0 and
/// sent to bottom. From here - if moving keeps backward it will grow at bottom. If however moving changes to
/// forward it should be sent back to top with 0 height to grow there.
/// Looking side way the "belt's" axels are rolling clockwise

//if (!topStripBlock) {}

    //UPPER_INDEX = TOTAL_NUMBER_STRIPS - 1;
topStripBlock = allElements[UPPER_INDEX];

bottomStripBlock = allElements[0];

    if (someObj.movingForward === true) {

        // When someObj.movingForward === true top strips are moving downward.
        // In this case the very top strip should be 0 heigth and should be able to increase.
        // The very bottom ones should be at strips's should be at their max heigth
        //  which currently is STRIPS_ELEMENT_HEIGHT

        topStripBlockHeight = 0;
        topStripBlock.style.height = topStripBlockHeight;

        boolIsForwardTransition = true;

        ///===================================================

        bottomStripBlockHeight = STRIPS_ELEMENT_HEIGHT;
}
    else {

        // When someObj.movingForward === false top strips are moving upward.
        // In this case the very bottom strip should be 0 heigth and should be able to increase.
        // The very top ones should be at strips's should be at their max heigth
        //  which currently is STRIPS_ELEMENT_HEIGHT

        bottomStripBlockHeight = 0;
        bottomStripBlock.style.height = bottomStripBlockHeight;

        boolIsBackwardTransition = true;

        ///===================================================

        topStripBlockHeight = STRIPS_ELEMENT_HEIGHT;
    }





//if (!bottomStripBlock) {}

    //UPPER_INDEX = 0;


///   setMainInterval() is the main function running under setInterval 
function setMainInterval() {

    someObj.movingForward = true;
    ///  someObj.movingForward = boolChangeDirections;


    if (someObj.movingForward === true) {

        if (boolIsBackwardTransition === true) {

            //bottomStripBlockHeight = 0;
            //bottomStripBlock.style.height = topStripBlockHeight + "px";

            bottomStripBlock.remove();

            //moveElementFromZeroToUpper(bottomStripBlock);
            allElements.shift();
            allElements.push(bottomStripBlock);

            road.prepend(bottomStripBlock);

            topStripBlock = allElements[UPPER_INDEX];

            bottomStripBlock = allElements[0];

            topStripBlockHeight = 0;
            bottomStripBlockHeight = STRIPS_ELEMENT_HEIGHT;

            boolIsBackwardTransition = false;
        }

        topStripBlockHeight = topStripBlockHeight + SUBTRACT_COEFF;
        topStripBlock.style.height = topStripBlockHeight + "px";

        bottomStripBlockHeight = bottomStripBlockHeight - SUBTRACT_COEFF;
        bottomStripBlock.style.height = bottomStripBlockHeight + "px";

        if ((topStripBlockHeight === STRIPS_ELEMENT_HEIGHT) && (bottomStripBlockHeight === 0)) {



            bottomStripBlock.remove();


            // removes element from the index 0 end of array
            allElements.shift();

            // adds element at the upper index end of array
            allElements.push(bottomStripBlock);




            bottomStripBlock = allElements[0];

            topStripBlock = allElements[UPPER_INDEX];

            road.prepend(topStripBlock);

            topStripBlockHeight = 0;
            bottomStripBlockHeight =40;

            boolIsForwardTransition = true;
        }
    }
    else {    ////   movingForward === false

        /// When someObj.movingForward === false bottom strips are moving upward.
/// In this case top strips are taken from their line and put at bottom for keeping continous motion.
/// When boolIsBackwardTransition === true that means that top strip has just been set to 0 and
/// sent to bottom. From here - if moving keeps backward it will grow at bottom. If however moving changes to
/// forward it should be sent back to top with 0 height to grow there.
/// Looking side way the "belt's" axels are rolling clockwise

        if (boolIsForwardTransition === true) {

            //topStripBlockHeight = 0;
            //topStripBlock.style.height = topStripBlockHeight + "px";

            topStripBlock.remove();

            //moveElementFromZeroToUpper(bottomStripBlock);


            // removes element from the index 0 end of array
            allElements.pop();

            // adds element at the upper index end of array
            allElements.unshift(topStripBlock);

            



            topStripBlock = allElements[UPPER_INDEX];

            bottomStripBlock = allElements[0];

            road.append(bottomStripBlock);

            topStripBlockHeight = STRIPS_ELEMENT_HEIGHT;
            bottomStripBlockHeight = 0;



            boolIsForwardTransition = false;
        }

        topStripBlockHeight = topStripBlockHeight - SUBTRACT_COEFF;
        topStripBlock.style.height = topStripBlockHeight + "px";

        bottomStripBlockHeight = bottomStripBlockHeight + SUBTRACT_COEFF;
        bottomStripBlock.style.height = bottomStripBlockHeight + "px";

        if ((topStripBlockHeight === 0) && (bottomStripBlockHeight === STRIPS_ELEMENT_HEIGHT)) {

            topStripBlock.remove();


            // 
            allElements.pop();

            // 
            allElements.unshift(topStripBlock);


            bottomStripBlock = allElements[0];

            topStripBlock = allElements[UPPER_INDEX];

            road.append(bottomStripBlock);

            topStripBlockHeight = 40;
            bottomStripBlockHeight = 0;

            boolIsBackwardTransition = true;

            if (UPPER_INDEX===0) 
                UPPER_INDEX = TOTAL_NUMBER_STRIPS - 1;

        }
    }

 

    /// =============================================================   someObj.movingForward

    let currentBlock = document.getElementById("debuggingResults");

    currentBlock.innerHTML = topStripBlock.id
        + "<br>" + topStripBlockHeight + " " + bottomStripBlockHeight + " " + bottomStripBlock.id
        + "<br>" + someObj.movingForward + " " + boolChangeDirections;
}

var intervalID = null;

let btnStart = document.getElementById("btnStart"),
    btnStop = document.getElementById("btnStop"),
    btnReverse = document.getElementById("btnReverse");

btnStart.addEventListener("click", event => intervalID = setInterval(setMainInterval, 830));

btnReverse.addEventListener("click", function (e) {

    if (boolChangeDirections === true) {

        boolChangeDirections = false;
        btnReverse.innerText = "Reverse -> Forward";

    } else {

        boolChangeDirections = true;
        btnReverse.innerText = "Forward -> Reverse";
    }
});

btnStop.addEventListener("click", function (e) {

    clearInterval(intervalID);
});