import { render, screen } from "@testing-library/react";
import GridDocs from "../Elements/GridDocs";
import { vi,describe,expect,test } from "vitest";

// Mock flexRender to just return the value from context
vi.mock("@tanstack/react-table", async () => {
  const actual = await vi.importActual("@tanstack/react-table");
  return {
    ...actual,
    flexRender: vi.fn((_render, context) => context.getValue()),
  };
});

const mockRow = (id, fileName, date) => ({
  id,
  getVisibleCells: () => [
    {
      id: `${id}-fileName`,
      column: { id: "fileName", columnDef: { header: "File Name", cell: () => fileName } },
      getContext: () => ({ getValue: () => fileName }),
    },
    {
      id: `${id}-date`,
      column: { id: "date", columnDef: { header: "Date", cell: () => date } },
      getContext: () => ({ getValue: () => date }),
    },
  ],
});

const mockTable = {
  getPaginationRowModel: () => ({
    rows: [
      mockRow("1", "Document1.pdf", "2024-01-01"),
      mockRow("2", "Document2.docx", "2024-02-02"),
    ],
  }),
};

describe("GridDocs Component", () => {
  test("renders cards with file names and dates", () => {
    render(<GridDocs table={mockTable} />);

    expect(screen.getByText("Document1.pdf")).toBeInTheDocument();
    expect(screen.getByText("2024-01-01")).toBeInTheDocument();
    expect(screen.getByText("Document2.docx")).toBeInTheDocument();
    expect(screen.getByText("2024-02-02")).toBeInTheDocument();
  });

});
