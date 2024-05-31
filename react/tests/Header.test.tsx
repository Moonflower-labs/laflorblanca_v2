import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { expect, it, test } from "vitest";
import Header from "../src/components/Header";
import Homepage from "../src/components/Homepage";
import RootLayout from "../src/components/layouts/RootLayout";

test("a test test :)", async () => {
  const FAKE_USER = { id: 1, username: "fakeUser" };
  const routes = [
    {
      element: <RootLayout />,
      loader: () => FAKE_USER,
      children: [
        {
          path: "/",
          element: <Homepage />,
          loader: () => FAKE_USER,
        },
      ],
    },
  ];
  const router = createMemoryRouter(routes, {
    initialEntries: ["/"],
    initialIndex: 0,
  });
  render(<RouterProvider router={router} />);
  await waitFor(() => screen.getByTestId("homepage"));
  expect(screen.getByTestId("username")).toHaveTextContent(FAKE_USER.username);
});
