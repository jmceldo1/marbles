//Test js file to quickly test functions

var testMap = new Map();
testMap.set("p1", {greeting: "hello"});
testMap.set("p2", {greeting: "bye"});
// console.log(testMap);

// let element = testMap.get("Test");
// element.greeting = "World"
// console.log(element);
// console.log(testMap);

var move = {
    pieceId: "p1",
    location: "buh bye",
}

testMap.get(move.pieceId).greeting = move.location;
// console.log(testMap)

testMap.forEach(element => {
    // console.log(element);
});

const mapToObj = m => {
    return Array.from(m).reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});
  };
  
//   console.log(JSON.stringify(mapToObj(testMap))); // '{"foo":"bar","baz":"quz"}'

  console.log("New Idea");
  var newStuffs = Array.from(testMap.entries());
  console.log(newStuffs);

  let jsonNewMap = JSON.stringify(newStuffs);


  let newMap = new Map(JSON.parse(jsonNewMap));

  console.log(newMap);
  console.log(newMap.get('p1'));