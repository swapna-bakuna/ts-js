class x(){
    i(){}
}
class y(){
    v(){}
}
export {
    x,
    y
}

function a(){

}

export {
    a
}
import {a} from "a"
a()

import {x,y} from "xy"

new x().i()
new y().v()