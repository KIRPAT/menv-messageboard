//imports
const Joi = require('joi');

//Scheme
const languageSchema = Joi.object().keys({
    //Language
    language:         Joi.string().alphanum(),
    //MessageForm
    msgFrm:{
        usrnm:        Joi.string().alphanum(),
        sbjkt:        Joi.string().alphanum(),
        sbjktPlchldr: Joi.string().alphanum(),
        msg:          Joi.string().alphanum(),
        msgPlchlder:  Joi.string().alphanum()  
    }
});

module.exports = languageSchema;