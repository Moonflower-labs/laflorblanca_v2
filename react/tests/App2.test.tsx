import { fireEvent, GetByText } from "@testing-library/react";
import { render, screen } from "@testing-library/react";
import App from "../src/App";
import { describe, expect, test } from "vitest";
import React from "react";

describe("<App />", () => {
  test("App mounts properly", () => {
    const wrapper = render(<App />);
    expect(wrapper).toBeTruthy();

    // Get by h1
    const h1 = wrapper.container.querySelector("a");
    expect(h1?.textContent).toBe("La Flor Blanca");

    //   // Get by text using the React testing library
    //   const text = screen.getByText(
    //     /Click on the Vite and React logos to learn more/i
    //   );
    //   expect(text.textContent).toBeTruthy()
  });
});
