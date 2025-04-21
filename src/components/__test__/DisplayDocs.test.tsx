import { render, screen, fireEvent } from "@testing-library/react";
import DisplayDocs from "../Elements/DisplayDocs";
import { describe, it, expect, vi } from "vitest";

const mockData = [
  { fileName: "Document1.pdf" },
  { fileName: "Doc2.pdf" },
  { fileName: "Example3.pdf" },
  { fileName: "AnotherFile.pdf" },
  { fileName: "RandomDoc.pdf" },
  { fileName: "LastOne.pdf" },
];

const mockColumns = [
  {
    header: "File Name",
    accessorKey: "fileName",
    cell: (info) => info.getValue(),
  },
];

const DisplayDocsComponents = () => {
  return render(
    <DisplayDocs mockData={mockData} columns={mockColumns} headerSearch="" />
  );
};
describe("DisplayDocs Component", () => {
  it("renders without crashing", () => {
    DisplayDocsComponents();
    expect(screen.getByPlaceholderText("Search docs...")).toBeInTheDocument();
  });

  it("shows suggestions when user types", () => {
    DisplayDocsComponents();
    const input = screen.getByPlaceholderText("Search docs...");
    fireEvent.change(input, { target: { value: "Doc" } });

    const suggestions = screen.getAllByRole("option");
    expect(suggestions.length).toBeGreaterThan(0);
  });

  it("changes page size input", () => {
    DisplayDocsComponents();
    const pageSizeInput = screen.getByLabelText("Rows per page:");
    fireEvent.change(pageSizeInput, { target: { value: "2" } });

    expect(pageSizeInput).toHaveValue(2);
  });

  it("navigates between pages", () => {
      DisplayDocsComponents();
    
      // Change page size to 2 so that pagination is triggered (6 items = 3 pages)
      const pageSizeInput = screen.getByLabelText("Rows per page:");
      fireEvent.change(pageSizeInput, { target: { value: "2" } });
    
      const nextBtn = screen.getByText("Next");
      const prevBtn = screen.getByText("Prev");
    
      // Initially, Prev should be disabled
      expect(prevBtn).toBeDisabled();
    
      // Click Next to go to page 2
      fireEvent.click(nextBtn);
      expect(prevBtn).not.toBeDisabled(); // Now Prev should be enabled
    
      // Click Prev to go back to page 1
      fireEvent.click(prevBtn);
      expect(prevBtn).toBeDisabled(); // Back on first page
    });
    
});
