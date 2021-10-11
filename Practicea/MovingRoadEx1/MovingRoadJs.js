


let road = document.getElementById("road"),

someObj = { movingForward: true },

boolGlobalStripTypeSetter = true;

// someObj.movingForward = false;

let stripsHeight = 40, globalStripsCounter = 0, subtractingCoeff_2 = 5;

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


function createStrip(stripsHeight) {

    let stripType = "strip";

    let cssStripTypeClass = getStripType();

    var stripBlock = document.createElement("div");

    stripBlock.setAttribute("class", cssStripTypeClass);
    stripBlock.setAttribute("id", stripType + globalStripsCounter);

    stripBlock.style.height = stripsHeight + "px";

    globalStripsCounter++;

    return stripBlock;
}

let i;
for (i = 0; i < 5; i++) {

    let stripBlock = createStrip(stripsHeight);

    road.prepend(stripBlock);
}

let oldStripBlock, oldStripBlocktHeight = 0, newStripBlock,
    newStripBlockHeight = 0, boolChangeDirections = true;

let someMillisecondsVar = 220;

if (!oldStripBlock) {

    oldStripBlocktHeight = stripsHeight;

    if (someObj.movingForward === true) {

        oldStripBlock = road.lastElementChild;
    }
    else {

        oldStripBlock = road.firstElementChild;
    }
}


if (!newStripBlock) {

    newStripBlockHeight = 0;
    newStripBlock = createStrip(newStripBlockHeight);

    if (someObj.movingForward === true) {

        road.prepend(newStripBlock);
    }
    else {

        road.appendChild(newStripBlock);
    }
}

///   setMainInterval() is the main function running under setInterval 
function setMainInterval() {

    someObj.movingForward = boolChangeDirections;

    oldStripBlocktHeight = oldStripBlocktHeight - subtractingCoeff_2;

    if (oldStripBlocktHeight > 0) {

        oldStripBlock.style.height = oldStripBlocktHeight + "px";
    }

    // ===============================================================

    newStripBlockHeight = newStripBlockHeight + subtractingCoeff_2;

    if (newStripBlockHeight < stripsHeight) {

        newStripBlock.style.height = newStripBlockHeight + "px";
    }

    if ((oldStripBlocktHeight <= 0) && (newStripBlockHeight === stripsHeight)) {

        oldStripBlock.remove();

        if (someObj.movingForward === true) {

            oldStripBlock = road.lastElementChild;
        }
        else {

            oldStripBlock = road.firstElementChild;
        }

        oldStripBlocktHeight = stripsHeight;

        // ===============================================================
        newStripBlock.style.height = newStripBlockHeight + "px";

        newStripBlockHeight = 0;

        newStripBlock = createStrip(newStripBlockHeight);

        if (someObj.movingForward === true) {

            road.prepend(newStripBlock);
        }
        else {

            road.append(newStripBlock);
        }
    }

    /// =============================================================   someObj.movingForward

    let currentBlock = document.getElementById("debuggingResults");

    currentBlock.innerHTML = oldStripBlock.id
        + "<br>" + oldStripBlocktHeight + " " + newStripBlockHeight + " " + newStripBlock.id
        + "<br>" + someObj.movingForward + " " + boolChangeDirections;
}

var intervalID = null;

let btnStart = document.getElementById("btnStart"),
    btnStop = document.getElementById("btnStop"),
    btnReverse = document.getElementById("btnReverse");

btnStart.addEventListener("click", event => intervalID = setInterval(setMainInterval, 20));

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