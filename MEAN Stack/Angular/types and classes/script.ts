let myNum: Number = 5;
let myString: String = "Hello Universe";
let myArr: Array<Number> = [1, 2, 3, 4];
interface testObject {
    x?: Number;
    name?: String;
    y?: Number;
}
let myObj: testObject = { name: "Bill" };
let anythingVariable: any = "Hey";
anythingVariable = 25;
let arrayOne = [true, false, true, true];
let arrayTwo = [1, "abc", true, 2];
myObj = { x: 5, y: 10 };
// object constructor
class MyNode {
    val: any;
    private _priv: number;

    constructor(val: any) {
        this.val = 0;
        this.val = val;
    }

    doSomething() {
        this._priv = 10;
    }
}

let myNodeInstance: MyNode = new MyNode(1);
console.log(myNodeInstance.val);
function myFunction(): void {
    console.log("Hello World");
}
function sendingErrors(): never {
    throw new Error("Error message");
}
