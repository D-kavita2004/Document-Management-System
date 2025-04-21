import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../Elements/Navbar"; 

const renderNavbar = (displayNav = true, pathname = "/") => {
  const mockSetDisplayNav = vi.fn();

  render(
    <MemoryRouter initialEntries={[pathname]}>
      <Navbar displayNav={displayNav} setDisplayNav={mockSetDisplayNav} />
    </MemoryRouter>
  );

  return { mockSetDisplayNav };
};

describe("Navbar Component", () => {
  it("renders company name", () => {
    renderNavbar();
    expect(
      screen.getByText(/SmartCoders Consulting Pvt. Ltd./i)
    ).toBeInTheDocument();
  });

  it("renders all menu items", () => {
    renderNavbar();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("My Documents")).toBeInTheDocument();
    expect(screen.getByText("Upload Documents")).toBeInTheDocument();
    expect(screen.getByText("Search Documents")).toBeInTheDocument();
  });

  it("renders Logout section", () => {
    renderNavbar();
    expect(screen.getByText(/LogOut/i)).toBeInTheDocument();
  });

  it("calls setDisplayNav(false) when X icon is clicked", () => {
    const { mockSetDisplayNav } = renderNavbar(true);
    const closeIcon = screen.getByTestId("close-icon");
    fireEvent.click(closeIcon);
    expect(mockSetDisplayNav).toHaveBeenCalledWith(false);
  });

  it("applies active class to current path", () => {
    renderNavbar(true, "/My_Documents");
    const activeLink = screen.getByText("My Documents");
    expect(activeLink.parentElement?.className).toMatch(/dark:bg-white/);
  });

  it("hides navbar when displayNav is false", () => {
    renderNavbar(false);
    const nav = screen.getByRole("navigation");
    expect(nav.className).toMatch(/-translate-x-full/);
  });

  it("shows navbar when displayNav is true", () => {
    renderNavbar(true);
    const nav = screen.getByRole("navigation");
    expect(nav.className).toMatch(/translate-x-0/);
  });

  it("Checking Navigation", () => {
    renderNavbar(true);
    const uploadLink = screen.getByText("Upload Documents");
    fireEvent.click(uploadLink);

    // Confirm the href is correct (Navigation occurred)
    expect(uploadLink.closest("a")).toHaveAttribute(
      "href",
      "/Upload_Documents"
    );
  });
});
