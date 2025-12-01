import React from "react";

interface TableColumn<T> {
  header: string;
  accessor: keyof T | string;
  render?: (value: any, row: T) => React.ReactNode;
  className?: string;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  className?: string;
}

export const Table = React.forwardRef<HTMLTableElement, TableProps<any>>(
  ({ columns, data, loading, className }, ref) => {
    if (loading) {
      return (
        <div className="text-center py-8 text-text-secondary">Loading...</div>
      );
    }

    if (data.length === 0) {
      return (
        <div className="text-center py-8 text-text-secondary">
          No data available
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table
          ref={ref}
          className={`w-full text-sm text-text-primary ${className || ""}`}
        >
          <thead className="bg-bg-tertiary border-b border-bg-tertiary">
            <tr>
              {columns.map((column, idx) => (
                <th
                  key={idx}
                  className={`px-4 py-3 text-left font-semibold ${
                    column.className || ""
                  }`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className="border-b border-bg-tertiary hover:bg-bg-tertiary transition-colors"
              >
                {columns.map((column, colIdx) => (
                  <td
                    key={colIdx}
                    className={`px-4 py-3 ${column.className || ""}`}
                  >
                    {column.render
                      ? column.render(row[column.accessor as string], row)
                      : row[column.accessor as string]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);

Table.displayName = "Table";
