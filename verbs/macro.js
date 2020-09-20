var sleep = require('./sleep');

async function macro({name}, {macros, verbs, devices}) {
  var macro = macros[name];
  var verb, command, step, delay;
  var result = "success";
  if(macro){
    for(var i = 0, len = macro.length; i < len; i++){
      step = macro[i];
      verb = verbs[step];
      await verb(step, {verbs, devices})
      if(step.delay){
        sleep.msleep(step.delay);
      }
    }
  } else {
    result = "macro not found: " + name;
  }
  return result
}

module.exports = {
  macro
}