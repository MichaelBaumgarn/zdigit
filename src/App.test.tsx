import { render, screen } from "@testing-library/react";

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

test("simple toggle", () => {
  render(<App />);
  const firstRowContract = screen.getByTestId("col-contract-0");
  const toggle = screen.getByTestId("toggle-contract");
  expect(firstRowContract.textContent).toBe("expired");
  userEvent.click(toggle);
  expect(firstRowContract.textContent).toBe("valid");
  userEvent.click(toggle);
  expect(firstRowContract.textContent).toBe("expired");
});

test("combine toggles", () => {
  render(<App />);
  const firstRowContract = screen.getByTestId("col-contract-0");
  const firstRowWarranty = screen.getByTestId("col-warranty-0");
  const toggleContract = screen.getByTestId("toggle-contract");
  const toggleWarranty = screen.getByTestId("toggle-warranty");

  // at the start, contract is set to expired by default
  expect(firstRowContract.textContent).toBe("expired");
  // the first time we click on any toggle, it will be set to valid
  userEvent.click(toggleContract);
  userEvent.click(toggleWarranty);

  expect(firstRowContract.textContent).toBe("valid");
  expect(firstRowWarranty.textContent).toBe("valid");

  // now we test different combinations
  userEvent.click(toggleWarranty);
  expect(firstRowContract.textContent).toBe("valid");
  expect(firstRowWarranty.textContent).toBe("expired");
  userEvent.click(toggleContract);
  expect(firstRowContract.textContent).toBe("expired");
  expect(firstRowWarranty.textContent).toBe("expired");
  userEvent.click(toggleWarranty);
  expect(firstRowContract.textContent).toBe("expired");
  expect(firstRowWarranty.textContent).toBe("valid");
});
