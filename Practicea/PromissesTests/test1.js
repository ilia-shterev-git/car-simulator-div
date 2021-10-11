
import sumBoth from "./backFile.js";
import negBothFromModule from "./moduleFile.js";

(function () {

    let a = 12, b = 14;

    console.log(sumBoth(a, b));

    console.log(negBothFromModule(a, b));

}());