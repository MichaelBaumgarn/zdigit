import { act, fireEvent, render, screen } from "@testing-library/react";

import App from "./App";
import React from "react";

test("renders learn react link", async () => {
  jest.mock("react-chartjs-2", () => ({
    Bar: () => null,

    BarElement: () => null,
    CategoryScale: () => null,
    Chart: () => null,
    LinearScale: () => null,
  }));
  render(<App />);
  const linkElement = screen.getByText(/88 have expiered warranty/i);
  // const noWarrantyText = await screen.findAllByText(/no warranty/i);
  // expect(noWarrantyText).toHaveLength(88);
  // expect(linkElement).toBeInTheDocument();
  const firstRow = screen.getByTestId("row-0");
  const customer = screen.getByTestId("col-customer-0");
  const initialName = customer.textContent;
  fireEvent.click(screen.getByTestId("warranty-toggle"));
  fireEvent.click(screen.getByTestId("warranty-toggle"));
  // act(() => {
  //   linkElement.click();
  //   screen.getByTestId("warranty-toggle").click();
  // });
  expect(screen.getByTestId("col-customer-0").textContent).toContain(
    "Schinner Group"
  );
  const foo = jest.fn();
  foo.mockResolvedValue({ foo: "bar" });
});
