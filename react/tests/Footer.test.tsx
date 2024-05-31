import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { expect, it, vi } from "vitest";
import "react-toastify/dist/ReactToastify.css";

import Footer from "../src/components/Footer";

it("Click the footer link", async () => {
  render(<Footer />, { wrapper: BrowserRouter });

  expect(screen.getByText("Redes Sociales")).toBeInTheDocument();

  const user = fireEvent;
  const event = vi.spyOn(user, "click");
  const link = screen.getByText(/© Moonflower Labs/i);

  user.click(link);
  expect(event).toHaveBeenCalledTimes(1);
});
