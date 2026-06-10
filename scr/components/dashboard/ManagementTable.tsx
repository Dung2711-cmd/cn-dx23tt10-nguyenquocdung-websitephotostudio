import Link from "next/link";
import type { CSSProperties } from "react";

type ManagementTableProps = {
  actionHref?: string;
  columns: string[];
  rows: string[][];
  title: string;
};

export function ManagementTable({ actionHref, columns, rows, title }: ManagementTableProps) {
  return (
    <section className="dashboard-card management-table">
      <header>
        <div>
          <span>Quản lý</span>
          <h2>{title}</h2>
        </div>
        <input aria-label="Tìm kiếm" placeholder="Tìm kiếm..." />
      </header>
      <div className="management-table-grid" style={{ "--columns": columns.length } as CSSProperties}>
        {columns.map((column) => (
          <strong key={column}>{column}</strong>
        ))}
        {rows.map((row) =>
          row.map((cell, index) =>
            actionHref && index === 0 ? (
              <Link href={`${actionHref}/${cell.replace("#", "").toLowerCase()}`} key={`${row[0]}-${cell}`}>
                {cell}
              </Link>
            ) : (
              <span key={`${row[0]}-${cell}`}>{cell}</span>
            ),
          ),
        )}
      </div>
    </section>
  );
}
