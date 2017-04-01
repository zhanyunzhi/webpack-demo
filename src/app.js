/**
 * Created by user on 2017/3/30.
 */
//es6的写法
import './css/common.css';
import Layer from './components/layer/layer.js';
const App = function() {
    console.log(Layer);
    var dom = document.getElementById('app');
    var layer = new Layer();

    dom.innerHTML = layer.tpl;
};

new App();