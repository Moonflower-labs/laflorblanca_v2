import { render, screen, waitFor } from "@testing-library/react";
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { vi, describe, it, expect, beforeEach, test } from "vitest";
import React from "react";
import AuthProvider from "../src/utils/auth";
import App from "../src/App";
import RootLayout from "../src/components/layouts/RootLayout";

test("renders the App component", async () => {
  render(<App />);

  // Wait for the RootLayout to be present
  await waitFor(() => {
    expect(screen.getByTestId("root-layout")).toBeInTheDocument();
  });

  // Check if the Homepage is rendered
  expect(screen.getByTestId("homepage")).toBeInTheDocument();
});
// test("renders the App component", async () => {
//   // Mock the useRouteLoaderData hook
//   vi.mock("react-router-dom", () => ({
//     ...vi.importActual("react-router-dom"),
//     useRouteLoaderData: () => ({
//       user: { id: 1, name: "Mock User" },
//     }),
//   }));

//   render(<RootLayout />);

//   // Wait for the RootLayout to be rendered
//   await waitFor(
//     () => {
//       expect(screen.getByTestId("root-layout")).toBeInTheDocument();
//     },
//     {
//       timeout: 2000, // Increase the timeout as needed
//       interval: 100, // Check every 100ms
//     }
//   );

//   // Check if the Homepage is rendered
//   expect(screen.getByTestId("homepage")).toBeInTheDocument();
// });

// describe("App Component", () => {
//   beforeEach(() => {
//     // Mock the AuthProvider and loadStripe functions
//     vi.spyOn(AuthProvider, "checkAuthentication").mockResolvedValue({
//       id: 1,
//       name: "Mock User",
//     });
//     vi.mock("@stripe/stripe-js", () => ({
//       loadStripe: () => Promise.resolve("mockStripePromise"),
//     }));
//   });

//   it("renders the App component correctly", async () => {
//     const router = createBrowserRouter([
//       {
//         path: "/",
//         element: <App />,
//       },
//     ]);

//     render(<RouterProvider router={router} />, { wrapper: React.StrictMode });

//     // Verify the presence of the RootLayout component
//     expect(screen.getByTestId("root-layout")).toBeInTheDocument();

//     // Verify the presence of the Homepage component
//     expect(screen.getByTestId("homepage")).toBeInTheDocument();
//   });

//   it("handles the redirect to the login page", async () => {
//     const router = createBrowserRouter([
//       {
//         path: "/",
//         element: <App />,
//       },
//       {
//         path: "/personality",
//         element: <div>Personality Page</div>,
//       },
//     ]);

//     render(<RouterProvider router={router} />, { wrapper: React.StrictMode });

//     // Navigate to the /personality route
//     window.history.pushState({}, "", "/personality");

//     // Verify that the user is redirected to the login page
//     await waitFor(() => {
//       expect(screen.getByTestId("auth-layout")).toBeInTheDocument();
//     });
//   });

//   it("handles the error page", async () => {
//     const router = createBrowserRouter([
//       {
//         path: "/",
//         element: <App />,
//       },
//       {
//         path: "/non-existent-route",
//         element: <div>Non-existent Page</div>,
//       },
//     ]);

//     render(<RouterProvider router={router} />, { wrapper: React.StrictMode });

//     // Navigate to the /non-existent-route
//     window.history.pushState({}, "", "/non-existent-route");

//     // Verify that the error page is rendered
//     await waitFor(() => {
//       expect(screen.getByTestId("error-page")).toBeInstanceOf(HTMLElement);
//     });
//   });

//   it("handles the logout functionality", async () => {
//     const router = createBrowserRouter([
//       {
//         path: "/",
//         element: <App />,
//       },
//       {
//         path: "/logout",
//         loader: () => {
//           return { redirect: "/" };
//         },
//         action: async () => {
//           await AuthProvider.logout();
//           return { redirect: "/" };
//         },
//       },
//     ]);

//     render(<RouterProvider router={router} />, { wrapper: React.StrictMode });

//     // Navigate to the /logout route
//     window.history.pushState({}, "", "/logout");

//     // Verify that the user is redirected to the homepage after logout
//     await waitFor(() => {
//       expect(screen.getByTestId("homepage")).toBeInTheDocument();
//     });
//   });
// });
