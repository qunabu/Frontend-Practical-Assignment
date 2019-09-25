import React from "react";
import Currencies from "./Currencies";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

it("currencies works", async () => {
  const onDeleteCode = jest.fn();
  const onDeleteAll= jest.fn();

  const data = [
    { currency: "bat (Tajlandia)", code: "THB", mid: 0.1304 },
    { currency: "dolar amerykański", code: "USD", mid: 3.9856 },
    { currency: "dolar australijski", code: "AUD", mid: 2.7013 },
    { currency: "dolar Hongkongu", code: "HKD", mid: 0.5084 }
  ];

  const {
    getByText,
    container,
    getAllByTitle
  } = render(<Currencies items={data} onDeleteCode={onDeleteCode} onDeleteAll={onDeleteAll} />);

  const randomItem = data[Math.floor(Math.random() * data.length)];
  const randomItemCurrTitle = `${randomItem.code} - ${randomItem.currency}, rate: ${randomItem.mid}`

  // random item showd be displayed be displayed
  expect(getByText(randomItemCurrTitle)).toBeInTheDocument();

  // clicking on the item should fire callback
  fireEvent.click(getAllByTitle('remove from the list')[0]);
  expect(onDeleteCode).toHaveBeenCalled();
  
  // clicking on the remove all items should fire callback
  fireEvent.click(getAllByTitle('remove all the list')[0]);
  expect(onDeleteAll).toHaveBeenCalled();

  // all items should ne listed now

  expect(container.querySelectorAll(".currency")).toHaveLength(data.length);

});
