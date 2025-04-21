import { render, screen, fireEvent } from "@testing-library/react";
import { vi,describe,expect,it} from "vitest";
import { Table } from "../Elements/Table"; 

// ✅ Mock flexRender to return value from context
vi.mock("@tanstack/react-table", async () => {
  const actual = await vi.importActual("@tanstack/react-table");
  return {
    ...actual,
    flexRender: vi.fn((_render, context) => context.getValue()),
  };
});

// ✅ Create mock column/row structure
const mockCell = (id, header, value) => ({
  id: `${id}-${header}`,
  column: {
    id: header,
    columnDef: {
      header,
      cell: () => value,
    },
  },
  getContext: () => ({
    getValue: () => value,
  }),
});

const mockRow = (id, data) => ({
  id,
  getVisibleCells: () =>
    Object.entries(data).map(([header, value]) => mockCell(id, header, value)),
});

const mockTable = {
  getHeaderGroups: () => [
    {
      id: "headerGroup1",
      headers: [
        {
          id: "name-header",
          column: {
            id: "name",
            columnDef: { header: "Name" },
            getToggleSortingHandler: () => vi.fn(),
          },
          getContext: () => ({ getValue: () => "Name" }),
        },
        {
          id: "type-header",
          column: {
            id: "type",
            columnDef: { header: "Type" },
            getToggleSortingHandler: () => vi.fn(),
          },
          getContext: () => ({ getValue: () => "Type" }),
        },
      ],
    },
  ],
  getPaginationRowModel: () => ({
    rows: [
      mockRow("row1", { name: "Document1", type: "PDF" }),
      mockRow("row2", { name: "Document2", type: "DOCX" }),
    ],
  }),
};

describe("Table Component", () => {
  it("renders all headers and rows", () => {
    render(<Table table={mockTable} />);

    // Check headers
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Type")).toBeInTheDocument();

    // Check cell content
    expect(screen.getByText("Document1")).toBeInTheDocument();
    expect(screen.getByText("PDF")).toBeInTheDocument();
    expect(screen.getByText("Document2")).toBeInTheDocument();
    expect(screen.getByText("DOCX")).toBeInTheDocument();
  });

  it("calls sorting handler on header click", () => {
    const sortHandler = vi.fn();

    // Clone and override mockTable
    const tableWithSort = {
      ...mockTable,
      getHeaderGroups: () => [
        {
          id: "headerGroup1",
          headers: [
            {
              id: "name-header",
              column: {
                id: "name",
                columnDef: { header: "Name" },
                getToggleSortingHandler: () => sortHandler,
              },
              getContext: () => ({ getValue: () => "Name" }),
            },
          ],
        },
      ],
    };

    render(<Table table={tableWithSort} />);

    const nameHeader = screen.getByText("Name");
    fireEvent.click(nameHeader);

    expect(sortHandler).toHaveBeenCalled();
  });
});
