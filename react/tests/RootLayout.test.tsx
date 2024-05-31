// RootLayout.test.tsx
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { expect, it, vi } from "vitest";
import "react-toastify/dist/ReactToastify.css";

import Footer from "../src/components/Footer";
import Homepage from "../src/components/Homepage";

it("Click the about router link", async () => {
  render(<Homepage />, { wrapper: BrowserRouter });

  expect(screen.getByText("Redes Sociales")).toBeInTheDocument();

  //   const user = fireEvent;
  //   const about = vi.spyOn(user, "click");
  //   const aboutLink = screen.getByText(/© Moonflower Labs/i);

  //   user.click(aboutLink);
  //   expect(about).toHaveBeenCalledTimes(1);
});
