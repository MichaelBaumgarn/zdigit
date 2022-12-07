import { render, screen } from "@testing-library/react";

import App from "./App";
import React from "react";
import userEvent from "@testing-library/user-event";

test("common app use cases", () => {
  render(<App />);
  const linkElement = screen.getByText(/customer/i);
  expect(linkElement).toBeInTheDocument();

  const searchInput = screen.getByTestId("search-input");
  userEvent.type(searchInput, "0234");
  const firstRow = screen.getByTestId("col-customer-0");
  expect(firstRow.textContent).toBe("Hansen-Block AG");
});
