const langJson = require('./langData.json'); 
var lang = JSON.parse(langJson);

//    -i-
// 0) English
// 1) Turkish

//Make a randomizer for place holders. so that overrides  :)
var lang = {
    msgFrm: {
        usrnm:        "Username",
        usrnmPlchldr: "Anonymous",
        sbjkt:        "Subject",
        sbjktPlchldr: "What is this message about?",
        msg:          "Message",
        msgPlchldr:   "Let us hear thy message!" 
    }
}
var lang2;

console.log(lang);

function randomizer(){
    let yolo = lang;
    return yolo;
};

lang2 = randomizer();
//console.log(lang2);