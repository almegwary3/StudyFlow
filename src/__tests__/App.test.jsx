import { beforeEach, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

beforeEach(() => {
  localStorage.clear();
});

test("adds a new task", async () => {
  const user = userEvent.setup();

  render(<App />);

  const input = screen.getByRole("textbox", {
    name: /new task/i,
  });

  await user.type(input, "Review React");

  await user.click(screen.getByRole("button", { name: /add task/i }));

  expect(screen.getByText("Review React")).toBeInTheDocument();
});
