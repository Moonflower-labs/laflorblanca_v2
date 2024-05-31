/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import RootLayout from "../src/components/layouts/RootLayout";
import { beforeEach, describe, expect, it, vi } from "vitest";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "../src/App";

// it("renders Header component", async () => {
//   render(<RootLayout />, { wrapper: BrowserRouter });

//   const headerElement = await screen.findByText(/Header/i);
//   expect(headerElement).toBeInTheDocument();
// });

// it("renders Header component", async () => {
//   vi.mock("react-router-dom", async (importOriginal) => {
//     const actual: any = await importOriginal();
//     return {
//       ...actual,
//       useRouteLoaderData: () => ({ user: { id: 1, name: "Mock User" } }),
//       useFetcher: () => ({ formData: "mockFormData" }),
//     };
//   });

//   render(
//     <BrowserRouter>
//       <RootLayout />
//     </BrowserRouter>
//   );

//   const headerElement = await screen.findByText(/Header/i);
//   expect(headerElement).toBeInTheDocument();
// });

it("renders the App component", async () => {
  vi.mock("react-router-dom", async (importOriginal) => {
    const actual: any = await importOriginal();
    return {
      ...actual,
      useRouteLoaderData: () => ({ user: { id: 1, name: "Mock User" } }),
      useFetcher: () => ({ formData: "mockFormData" }),
      ScrollRestoration: () => null, // Mock the ScrollRestoration component
    };
  });

  vi.mock("../src/components/ui/ShoppingCart", () => ({
    __esModule: true,
    default: () => <div>Mocked ShoppingCart</div>,
  }));

  vi.mock("../src/components/ui/LogoutBtn", () => ({
    __esModule: true,
    default: () => <button>Mocked LogoutBtn</button>,
  }));

  render(<App />, { wrapper: BrowserRouter });

  const appElement = await screen.findByTestId("app");
  expect(appElement).toBeInTheDocument();
});
// it("renders Header component", async () => {
//   vi.mock("react-router-dom", async (importOriginal) => {
//     const actual: any = await importOriginal();
//     return {
//       ...actual,
//       useRouteLoaderData: () => ({ user: { id: 1, name: "Mock User" } }),
//       useFetcher: () => ({ formData: "mockFormData" }),
//     };
//   });

//   render(
//     <BrowserRouter>
//       <RootLayout />
//     </BrowserRouter>
//   );

//   const headerElement = await screen.findByText(/Header/i);
//   expect(headerElement).toBeInTheDocument();
// });

// describe("RootLayout Component", () => {
// it("renders Header component", async () => {
//   render(<App />, { wrapper: BrowserRouter });
//   const headerElement = screen.getByText(/Header/i);
//   expect(headerElement).toBeInTheDocument();
// });
// });

// it("renders AnimatedOutlet component", async () => {
//   const { container } = render(<RootLayout />, { wrapper: BrowserRouter });
//   const animatedOutletElement = container.querySelector(".animated-outlet");
//   expect(animatedOutletElement).not.toBeNull();
// });

// it("renders ScrollRestoration component", async () => {
//   const { container } = render(<RootLayout />, { wrapper: BrowserRouter });
//   const scrollRestorationElement =
//     container.querySelector("ScrollRestoration");
//   expect(scrollRestorationElement).toBeInstanceOf(HTMLDivElement);
// });

// beforeEach(() => {
//   // Mock the useRouteLoaderData function
//   vi.mock("react-router-dom", async (importOriginal) => {
//     const actual: any = await importOriginal();
//     return {
//       ...actual,

//       useRouteLoaderData: () => ({ user: { id: 1, name: "Mock User" } }),
//       useFetcher: () => ({ formData: "mockFormData" }),
//     };
//   });
// });
