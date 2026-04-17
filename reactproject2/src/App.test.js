import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders travel portal heading", () => {
  render(<App />);
  const headingElement = screen.getByRole("heading", {
    name: /discover your next destination with practical travel insights/i,
  });
  expect(headingElement).toBeInTheDocument();
});
