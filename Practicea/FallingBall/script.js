var character = document.getElementById("character");
var game = document.getElementById("game");
var interval;
var both = 0;
var counter = 0;
var currentBlocks = [];

var blocks = setInterval(function(){
    var blockLast = document.getElementById("block"+(counter-1));

    if (counter > 0) {
        var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
    }

    if(blockLastTop<450||counter==0){
        var block = document.createElement("div");

        block.setAttribute("class", "block");

        block.setAttribute("id", "block"+counter);

        block.style.top = blockLastTop + 100 + "px";

        game.appendChild(block);

        currentBlocks.push(counter);
        counter++;
    }

    for(var i = 0; i < currentBlocks.length;i++){
        let current = currentBlocks[i];
        let iblock = document.getElementById("block"+current);

        let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));

        iblock.style.top = iblockTop - 0.2 + "px";

        if(iblockTop < -20){
            currentBlocks.shift();
            iblock.remove();
        }
    }

},1);
