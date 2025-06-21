import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Home from "./page";
import { act } from "@testing-library/react";
import Header from "@/components/Header";

jest.useFakeTimers();

// Mock fetch globally for all tests in this file
beforeEach(() => {
  globalThis.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue([
      {
        id: 1,
        movie_key: "the-matrix",
        name: "The Matrix",
        description:
          "A computer hacker learns about the true nature of reality.",
        genres: ["Action", "Sci-Fi"],
        rate: 8.7,
        length: "1hr 30mins",
        img: "the-matrix.jpg",
      },
      {
        id: 2,
        movie_key: "inception",
        name: "Inception",
        description:
          "A thief who steals corporate secrets through dream-sharing technology.",
        genres: ["Action", "Thriller"],
        rate: 8.8,
        length: "2hr 28mins",
        img: "inception.jpg",
      },
    ]),
  } as unknown as Response);
});

afterEach(() => {
  jest.resetAllMocks();
  delete globalThis.fetch;
});

test("Renders loading spinner initially", () => {
  render(<Home />);
  const loader = screen.getByRole("status");
  expect(loader).toBeInTheDocument();
});

test("Toggles genre filter correctly", async () => {
  render(<Home />);

  await waitFor(() => screen.getByText(/The Matrix/i)); // Load movies

  const viewAll = screen.getByText(/View All/i); //Pressed the view all button to unlock header
  fireEvent.click(viewAll);

  const dropdownHeader = screen.getByText("Genres"); //Open dropdown menu
  fireEvent.click(dropdownHeader);

  const actionOption = await screen.findByText("Action"); // need to be more specific otherwise presses tag, for the second option
  fireEvent.click(actionOption); //Choose Action in menu

  const selectedTag = await screen.getByText("Action", {
    selector: ".genre-tag",
  });
  expect(selectedTag).toBeInTheDocument(); // Confirm "Action" appears in selected genre tags

  expect(screen.getByText(/The Matrix/i)).toBeInTheDocument();
  expect(screen.getByText(/Inception/i)).toBeInTheDocument(); // Filtered result, both movies include "Action" so both should appear

  fireEvent.click(dropdownHeader);

  const actionOptionActive = await screen.getByText("Action", {
    selector: ".dropdown-item-active",
  });
  fireEvent.click(actionOptionActive);

  await waitFor(() => {
    expect(selectedTag).not.toBeInTheDocument();
  }); // Confirm the tag disappears

  expect(screen.getByText(/The Matrix/i)).toBeInTheDocument();
  expect(screen.getByText(/Inception/i)).toBeInTheDocument();
}); // Confirm both movies are still visible

test("Filters movies by query", async () => {
  render(<Home />);

  await waitFor(() => screen.getByText(/The Matrix/i));

  const viewAll = screen.getByText(/View All/i);
  fireEvent.click(viewAll);

  const searchInput = screen.getByPlaceholderText(/search/i); // Adjust placeholder text if needed
  fireEvent.change(searchInput, { target: { value: "matrix" } }); // Find the search input and type query

  // The Matrix should be visible, Inception hidden
  expect(screen.getByText(/The Matrix/i)).toBeInTheDocument();
  expect(screen.queryByText(/Inception/i)).not.toBeInTheDocument();
});

// Header tests

describe("Header", () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it("Renders title and buttons", () => {
    render(<Header />);
    expect(screen.getByText("Movie Collection")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /about/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /contact/i })
    ).toBeInTheDocument();
  });

  it("Shows toast when About is clicked", () => {
    render(<Header />);
    const aboutButton = screen.getByRole("button", { name: /about/i });
    fireEvent.click(aboutButton);
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Feature coming soon...")).toBeInTheDocument();
  });

  it("Toast disappears after timeout", async () => {
    render(<Header />);
    fireEvent.click(screen.getByRole("button", { name: /about/i }));

    expect(screen.getByRole("alert")).toBeInTheDocument();

    // Advance timers past the 3s timeout and 0.4s animation
    await act(async () => {
      jest.advanceTimersByTime(3400); // or 400, or 3000, wherever needed
    });

    await waitFor(() =>
      expect(screen.queryByRole("alert")).not.toBeInTheDocument()
    );
  });

  it("Resets toast if button is clicked again while visible", async () => {
    render(<Header />);

    const contactButton = screen.getByRole("button", { name: /contact/i });

    fireEvent.click(contactButton); // Show toast initially
    expect(screen.getByRole("alert")).toBeInTheDocument();

    fireEvent.click(contactButton); // Reset logic while toast is still showing
    await act(async () => {
      jest.advanceTimersByTime(400); // Simulate the 400ms exit transition reset
    });
    expect(screen.getByRole("alert")).toBeInTheDocument(); // Toast should still be showing
    await act(async () => {
      jest.advanceTimersByTime(3000); // Now advance past the new 3s timer
    });
    await waitFor(() =>
      expect(
        screen.queryByRole("alert", { name: /notification toast/i })
      ).not.toBeInTheDocument()
    ); // Toast should disappear again
  });
});
