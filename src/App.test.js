import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { render, fireEvent, waitForElement, getByTitle } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { store } from "./redux";
import { get } from "https";

const DATA = require("./../public/data.json");

const mockGood = () => {
  global.fetch = jest.fn().mockImplementation(() => {
    var p = new Promise((resolve, reject) => {
      resolve({
        ok: true,
        Id: "123",
        headers: { get: () => "application/json" },
        json: function() {
          return DATA;
        }
      });
    });

    return p;
  });
};

const mockFail = () => {
  global.fetch = jest.fn().mockImplementation(() => {
    var p = new Promise((resolve, reject) => {
      reject({
        ok: false,
        Id: "error",
        json: function() {
          return { error: "error" };
        }
      });
    });

    return p;
  });
};

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("loads and works", async () => {
  mockGood();

  const { queryByRole, getByText, queryByText, container, byByTitle, queryAllByRole } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  //console.log(container);

  // show loading by default
  expect(queryByRole("main").classList.contains("loading")).toBe(true);

  const data = DATA[0].rates;

  const currencyFullName = `${data[0].code} - ${data[0].currency}`; // eg 'USD - dolar amerykański,'

  // wait until currencies are loaded
  const waitForCurrencies = await waitForElement(() => getByText(currencyFullName));

  // loading is hidden
  expect(queryByRole("main").classList.contains("loading")).toBe(false);

  
  // we should have X options now
  expect(queryByRole("main").querySelectorAll("option")).toHaveLength(data.length);

  // clicking on add button
  fireEvent.click(queryAllByRole('button')[0]);

  // we should have at least one disabled option now
   expect(queryByRole("main").querySelectorAll("option[disabled]").length).toBeGreaterThanOrEqual(1);

});

it("error handlign and works", async () => {
  mockFail();

  const { queryByRole, getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(queryByRole("main").classList.contains("loading")).toBe(true);

  const waitForError = await waitForElement(() => getByText("Error"));

  expect(getByText("Error")).toBeInTheDocument();
});
