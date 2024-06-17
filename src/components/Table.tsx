import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Paginator } from "primereact/paginator";
import "./Table.scss";

interface IPaginator {
  pageSize: number;
  pageNumber: number;
}

interface IProps {
  dataList: any;
  totalNum: number;
  empty?: string | React.ReactNode;
  sizeOptions?: number[] | undefined;
  onPageChange: (params: IPaginator) => void;
  [T: string | number]: any;
}

const Table: React.FC<IProps> = ({
  dataList = [],
  totalNum = 0,
  children,
  sizeOptions = [5, 10, 20, 50, 100],
  onPageChange,
  ...props
}) => {
  const [firstIndex, setFirstIndex] = useState(0); // 当前页第一条数据索引
  const [pageSize, setPageSize] = useState(sizeOptions[0]);

  /** 切页码/切页大小 */
  const handlePageChange = ({ first, rows, page, totalPages }: any) => {
    const pageNumber = Math.ceil((first + 1) / rows);
    setFirstIndex(first);
    setPageSize(rows);

    console.info("----> pageNumber", pageNumber);

    debugger;
    if (onPageChange && typeof onPageChange === "function") {
      debugger;
      onPageChange({
        pageSize: rows,
        pageNumber: pageNumber,
      });
    }
  };

  return (
    <div className="table-container">
      <DataTable
        {...props}
        value={dataList}
        selectionMode="single"
        emptyMessage={() => (
          <div className="table-empty-box">
            <i className="pi pi-exclamation-circle"></i>
            {props.empty ? props.empty : <p>No available options</p>}
          </div>
        )}
      >
        {children}
      </DataTable>
      {totalNum > 0 && dataList?.length > 0 ? (
        <div className="table-paginator-container">
          <Paginator
            first={firstIndex}
            rows={pageSize}
            totalRecords={totalNum}
            rowsPerPageOptions={sizeOptions}
            onPageChange={handlePageChange}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Table;
