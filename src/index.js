import hh from "hyperscript-helpers";
import { add } from "ramda";
import { h, diff, patch } from "virtual-dom";
import createElement from "virtual-dom/create-element";

const { div, button, input } = hh(h);

const MSGS = {
  SAVE: "SAVE",
  DELETE: "DELETE",
  TEXTFIELD: "TEXTFIELD",
};

const generateMessage = (msg, data) => {
  return {
    type: msg,
    data,
  };
};

function view(dispatch, model) {
  const btnStyle =
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
  return div({ className: "flex flex-col gap-4 items-center" }, [
    div({ className: "flex gap-4" }, [
    input({
      className: "Eat",
      placeholder: "Eat",
      oninput: (event) =>
        dispatch(generateMessage(MSGS.TEXTFIELD, event.target.value)),
    }),
    input({
      className: "Caloriesnumber",
      placeholder: "Calories",
      oninput: (event) =>
        dispatch(generateMessage(MSGS.TEXTFIELD, event.target.value)),
    }),
    ]),
    div({ className: "flex gap-4" }, [
    button({ className: btnStyle, onclick: () => dispatch(MSGS.SAVE) }, "SAVE"),
    button({ className: btnStyle, onclick: () => dispatch(MSGS.DELETE) },"DELETE"),
    ]),
  ]);
}

function update(msg, model) {
  switch (msg.type) {
    case MSGS.SAVE:
      const model = add(msg, model);
      return {...model, savedText: "",};
    case MSGS.DELETE:
      return {...model, savedText: "",};
    case MSGS.TEXTFIELD:
      return {...model, inputText: msg.data,};
    default:
      return model;
  };
  
}

// impure code below (not avoidable but controllable)
function app(initModel, update, view, node) {
  let model = initModel;
  let currentView = view(dispatch, model);
  let rootNode = createElement(currentView);
  node.appendChild(rootNode);
  function dispatch(msg) {
    model = update(msg, model);
    const updatedView = view(dispatch, model);
    const patches = diff(currentView, updatedView);
    rootNode = patch(rootNode, patches);
    currentView = updatedView;
  }
}

const initModel = {
  Ti
};

const rootNode = document.getElementById("app");
app(initModel, update, view, rootNode);
