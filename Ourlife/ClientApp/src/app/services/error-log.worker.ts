/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  console.log(data)
});


//Make an object a string that evaluates to an equivalent object
//  Note that eval() seems tricky and sometimes you have to do
//  something like eval("a = " + yourString), then use the value
//  of a.
//
//  Also this leaves extra commas after everything, but JavaScript
//  ignores them.
let convertToText = (obj) => {
  //create an array that will later be joined into a string.
  var string = [];
  var prop;
  //is object
  //    Both arrays and objects seem to return "object"
  //    when typeof(obj) is applied to them. So instead
  //    I am checking to see if they have the property
  //    join, which normal objects don't have but
  //    arrays do.

  if (obj == undefined) {
    return String(obj);
  } else if (typeof (obj) == "object" && (obj.join == undefined)) {
    for (prop in obj) {
      if (obj.hasOwnProperty(prop))
        string.push(prop + ": " + convertToText(obj[prop]));
    };
    return "{" + string.join(",") + "}";

    //is array
  } else if (typeof (obj) == "object" && !(obj.join == undefined)) {
    for (prop in obj) {
      string.push(convertToText(obj[prop]));
    }
    return "[" + string.join(",") + "]";

    //is function
  } else if (typeof (obj) == "function") {
    string.push(obj.toString())

    //all other values can be done with JSON.stringify
  } else {
    string.push(JSON.stringify(obj))
  }

  return string.join(",");
}