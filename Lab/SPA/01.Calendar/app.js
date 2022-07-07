import { hideDaysView, hideMonthsView } from "./renderers.js";
import { targetsHandlerMap } from "./api.js";
const main = document.querySelector('body');

hideMonthsView();
hideDaysView();

main.addEventListener('click', clickHandler);


function clickHandler(e) {
    if (typeof targetsHandlerMap[e.target.nodeName] == 'function') {
        targetsHandlerMap[e.target.nodeName](e.target);
    }
}