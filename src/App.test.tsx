import { fireEvent, render, screen } from "@testing-library/react";

import App from "./App";
import React from "react";
import userEvent from "@testing-library/user-event";

test("search", () => {
  render(<App />);
  const linkElement = screen.getAllByText(/customer/i);
  expect(linkElement[0]).toBeInTheDocument();

  const searchInput = screen.getByTestId("search-input");
  userEvent.type(searchInput, "0234");
  let firstRow = screen.getByTestId("col-customer-0");
  expect(firstRow.textContent).toBe("Hansen-Block AG");
  userEvent.clear(searchInput);
});

test("toggle", () => {
  render(<App />);
  const firstRowContract = screen.getByTestId("col-contract-0");
  const toggle = screen.getByTestId("toggle-contract");
  userEvent.click(toggle);
  expect(firstRowContract.textContent).toBe("valid");
  userEvent.click(toggle);
  expect(firstRowContract.textContent).toBe("expired");
});
