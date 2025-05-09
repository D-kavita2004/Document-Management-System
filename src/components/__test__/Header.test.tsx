import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "../Elements/Header";
import { describe, beforeEach, expect, it, vi, beforeAll } from "vitest";
import { ThemeProvider } from "../ReusableComponents/theme-provider";
import '@testing-library/jest-dom';

// Mock useNavigate
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Fix matchMedia
beforeAll(() => {
  window.matchMedia = window.matchMedia || function () {
    return {
      matches: false,
      media: "",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    };
  };
});

// Mock props
const mockSetDisplayNav = vi.fn();

const renderHeader = (displayNav = false) => {
  return render(
      <ThemeProvider>
            <BrowserRouter>
                  <Header displayNav={displayNav} setDisplayNav={mockSetDisplayNav} />
            </BrowserRouter>
      </ThemeProvider>
  );
};

describe("Header Component", () => {
  beforeEach(() => {
    mockSetDisplayNav.mockClear();
    mockNavigate.mockClear();
  });

  it("renders logo", () => {
    renderHeader();
    const logo = screen.getByAltText("logo");
    expect(logo).toBeInTheDocument();
  });

  it("renders search input and icon", () => {
    renderHeader();
    expect(screen.getByPlaceholderText("Search Docs...")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("navigates to search page on Enter", () => {
    renderHeader();
    const input = screen.getByPlaceholderText("Search Docs...");
    fireEvent.change(input, { target: { value: "invoice" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    expect(mockNavigate).toHaveBeenCalledWith("/Search_Documents?q=invoice");
  });

  it("calls setDisplayNav when menu icon is clicked", () => {
    renderHeader(false);
    const menuIcon = screen.getByTestId("menu-icon");
    fireEvent.click(menuIcon);
    expect(mockSetDisplayNav).toHaveBeenCalledWith(true);
  });

  it("toggles theme between light and dark", () => {
      renderHeader();
    
      const initialToggle = screen.getByTestId("theme-toggle");
      fireEvent.click(initialToggle);
      expect(initialToggle).not.toBeInTheDocument();
      // Wait for the DOM to update and get the new icon
      const newToggle = screen.getByTestId("theme-toggle");
      expect(newToggle).toBeInTheDocument();
      expect(newToggle).not.toEqual(initialToggle); // Optional: make sure it's different
    });
    
});
