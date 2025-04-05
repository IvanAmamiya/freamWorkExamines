import Bind from "./bind";

// 遍历document后绑定。
// 新增的element怎么办 待思考。

const bind = new Bind();

class App {
    constructor(){
        bind();
    }
}

export default App;