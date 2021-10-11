

function setEnglisPhrasesArray() {

    arrayAllMessagesEnglish.push(OKStatus);
    arrayAllMessagesEnglish.push(UnexpectedError);
    arrayAllMessagesEnglish.push(ErrorOnIgnitionStage1);
    arrayAllMessagesEnglish.push(ErrorOnIgnitionStage2);
    arrayAllMessagesEnglish.push(ErrorOnIgnitionStage3);
    arrayAllMessagesEnglish.push(OKOnIgnitionStage1);
}



MessagesFactory = (function () {

    "use strict";

    let ReturnedMessages = {};

    let LangEnglish = 1,
        LangBulgarian = 2,
        CurrentLanguage = LangEnglish,

        OKStatus = "ОК",
        UnexpectedError = "Unexpected Error",

        ErrorOnIgnitionStage1 = "Gear NOT on Park Position",
        OKOnIgnitionStage1 = "Gear on Park Position",

        ErrorOnIgnitionStage2 = "Fail on starter turn",
        OKOnIgnitionStage2 = "Starter turning",

        ErrorOnIgnitionStage3 = "Fail on engine run",
        OKOnIgnitionStage3 = "Engine running",

        // Some Bulgarian blank phrases, just as an example
        OKStatusBg = "",
        UnexpectedErrorBg = "",

        ErrorOnIgnitionStage1Bg = "",
        OKOnIgnitionStage1Bg = "",

        ErrorOnIgnitionStage2Bg = "",
        OKOnIgnitionStage2Bg = "",

        ErrorOnIgnitionStage3Bg = "",
        OKOnIgnitionStage3Bg = "",

        arrayAllMessagesEnglish = new Array(),
        arrayAllMessagesBg = new Array();

    function setEnglisPhrasesArray() {

        arrayAllMessagesEnglish.push(OKStatus);
        arrayAllMessagesEnglish.push(UnexpectedError);

        arrayAllMessagesEnglish.push(ErrorOnIgnitionStage1);
        arrayAllMessagesEnglish.push(OKOnIgnitionStage1);

        arrayAllMessagesEnglish.push(ErrorOnIgnitionStage2);
        arrayAllMessagesEnglish.push(OKOnIgnitionStage2);

        arrayAllMessagesEnglish.push(ErrorOnIgnitionStage3);
        arrayAllMessagesEnglish.push(OKOnIgnitionStage3);    
    }

    function setPhrasesArrayBg() {

        arrayAllMessagesBg.push(OKStatusBg);
        arrayAllMessagesBg.push(UnexpectedErrorBg);

        arrayAllMessagesBg.push(ErrorOnIgnitionStage1Bg);
        arrayAllMessagesBg.push(OKOnIgnitionStage1Bg);

        arrayAllMessagesBg.push(ErrorOnIgnitionStage2Bg);
        arrayAllMessagesBg.push(OKOnIgnitionStage2Bg);

        arrayAllMessagesBg.push(ErrorOnIgnitionStage3Bg);
        arrayAllMessagesBg.push(OKOnIgnitionStage3Bg);
    }

    setEnglisPhrasesArray();
    setPhrasesArrayBg();

    ReturnedMessages.GetArrayIndexFromMessagesArray = function (strMessage) {

        let tmpArrayIndex = arrayAllMessagesEnglish.indexOf(strMessage);
        return tmpArrayIndex;
    }

    ReturnedMessages.GetMessageEnglishByArrayIndex = function (intArrayIndex) {

        let tmpMessage = arrayAllMessagesEnglish[intArrayIndex];
        return tmpMessage;
    }

    ReturnedMessages.GetMessageBulgarianByArrayIndex = function (intArrayIndex) {

        let tmpMessage = arrayAllMessagesBg[intArrayIndex];
        return tmpMessage;
    }

    let tmpMessage;

    ReturnedMessages.UnexpectedStatusError = function (intCurrentLanguage) {

        if (intCurrentLanguage === LangEnglish) {
            tmpMessage = "Error";
        }
        else if (intCurrentLanguage === LangBulgarian) {
            tmpMessage = "";
        }
        else {
            tmpMessage = "Error";
        }
    };


    ReturnedMessages.IgnitionStatusErrorStage3 = function (intCurrentLanguage) {

        if (intCurrentLanguage === LangEnglish) {
            tmpMessage = "Engine running Error";
        }
        else if (intCurrentLanguage === LangBulgarian) {
            tmpMessage = "";
        }
        else {
            tmpMessage = "Engine running Error";
        }
    };

    ReturnedMessages.IgnitionStatusOKStage3 = function (intCurrentLanguage) {

        let tmpMessage;

        if (intCurrentLanguage === LangEnglish) {
            tmpMessage = "OK";
        }
        else if (intCurrentLanguage === LangBulgarian) {
            tmpMessage = "";
        }
        else {
            tmpMessage = "OK";
        }

        return tmpMessage;
    };


    ReturnedMessages.IgnitionStatusErrorStage2 = function (intCurrentLanguage) {

        if (intCurrentLanguage === LangEnglish) {
            tmpMessage = "Turning starter Error";
        }
        else if (intCurrentLanguage === LangBulgarian) {
            tmpMessage = "";
        }
        else {
            tmpMessage = "Turning starter Error";
        }
    };

    ReturnedMessages.IgnitionStatusOKStage2 = function (intCurrentLanguage) {

        let tmpMessage;

        if (intCurrentLanguage === LangEnglish) {
            tmpMessage = "OK";
        }
        else if (intCurrentLanguage === LangBulgarian) {
            tmpMessage = "";
        }
        else {
            tmpMessage = "OK";
        }

        return tmpMessage;
    };


    ReturnedMessages.IgnitionStatusErrorStage1 = function (intCurrentLanguage) {

        if (intCurrentLanguage === LangEnglish) {
            tmpMessage = "Shift Pos Error";
        }
        else if (intCurrentLanguage === LangBulgarian) {
            tmpMessage = "";
        }
        else {
            tmpMessage = "Shift Pos Error";
        }
    };

    ReturnedMessages.IgnitionStatusOKStage1 = function (intCurrentLanguage) {

        let tmpMessage;

        if (intCurrentLanguage === LangEnglish) {
            tmpMessage = "OK";
        }
        else if (intCurrentLanguage === LangBulgarian) {
            tmpMessage = "";
        }
        else {
            tmpMessage = "OK";
        }

        return tmpMessage;
    };


    return {
        ReturnedMessages : ReturnedMessages,
        LangEnglish,
        LangBulgarian,
        CurrentLanguage,

        OKStatus,
        UnexpectedError,

        ErrorOnIgnitionStage1,
        OKOnIgnitionStage1,

        ErrorOnIgnitionStage2,
        OKOnIgnitionStage2,

        ErrorOnIgnitionStage3,
        OKOnIgnitionStage3,

        OKStatusBg,
        UnexpectedErrorBg,

        ErrorOnIgnitionStage1Bg,
        OKOnIgnitionStage1Bg,

        ErrorOnIgnitionStage2Bg,
        OKOnIgnitionStage2Bg,

        ErrorOnIgnitionStage3Bg,
        OKOnIgnitionStage3Bg
    }
}());
