//Test js file to quickly test functions

var testMap = new Map();
testMap.set("p1", {greeting: "hello"});
testMap.set("p2", {greeting: "bye"});
console.log(testMap);

// let element = testMap.get("Test");
// element.greeting = "World"
// console.log(element);
console.log(testMap);

var move = {
    pieceId: "p1",
    location: "buh bye",
}

testMap.get(move.pieceId).greeting = move.location;
console.log(testMap)

testMap.forEach(element => {
    console.log(element);
});