"use client";

import { useEffect, useReducer, useState } from "react";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import Table from "@/components/Table";
import ExecDetailSidebar from "./DetailSidebar";

const initialState = {
  searchParams: {},
  pageNumber: 1,
  pageSize: 10,
  sortField: null,
  sortOrder: null,
  dataList: [],
  total: 0,
};

const reducer = (state: any, { type, payload }: any) => {
  debugger;
  switch (type) {
    case "onSearchChange":
      return { ...state, payload };
    case "onPageChange":
      const { pageNumber, pageSize } = payload;
      return { ...state, pageNumber, pageSize };
    case "onSortChange":
      const { sortField, sortOrder } = payload;
      return { ...state, sortField, sortOrder };
    case "onDataChange":
      return { ...state, dataList: payload.dataList, total: payload.total };
    default:
      throw new Error();
  }
};

interface IProps {
  search?: boolean;
  orderId?: string;
}

export default function ExecutionPage({ search = true, ...props }: IProps) {
  const [detailId, setDetailId] = useState<string>("");
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);

  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    (initialState: any) => initialState
  );

  /** TODO Request Table Data */
  const getTableList = () => {
    setTimeout(() => {
      const params: any = { ...(state.searchParams ?? {}) };
      params.pageNumber = state.pageNumber;
      params.pageSize = state.pageSize;

      if (state.sortField) {
        params.sortCriteria = {
          field: state.sortField,
          isAsc: state.sortOrder === 1,
        };
      }
      console.info("所有请求参数：：", params);
      debugger;
      const list = [
        { execId: "001", status: "new" },
        { execId: "002", status: "new" },
        { execId: "003", status: "partiallyFilled" },
        { execId: "004", status: "filled" },
        { execId: "005", status: "new" },
        { execId: "006", status: "filled" },
        { execId: "007", status: "partiallyFilled" },
        { execId: "008", status: "new" },
        { execId: "009", status: "new" },
        { execId: "010", status: "filled" },
      ];

      dispatch({
        type: "onDataChange",
        payload: { dataList: list, total: list.length },
      });
    }, 500);
  };

  const handlePageChange = (params: any) => {
    debugger;
    dispatch({ type: "onPageChange", payload: params });
  };

  const handleDetail = (row: any) => {
    setDetailId(row?.execId);
    setSidebarVisible(true);
  };

  useEffect(() => {
    debugger;
    getTableList();
  }, [
    state.pageNumber,
    state.pageSize,
    state.sortField,
    state.sortOrder,
    state.searchParams,
  ]);

  return (
    <>
      <div className="main-card-light">
        {search ? (
          <div className="main-title-contaienr mb30">
            <p className="main-title">EXECUTION LIST</p>
            <Button label="Create Execution" severity="help" rounded />
          </div>
        ) : null}

        {search ? (
          <div className="search-form-container mb30">
            <InputText value={undefined} placeholder="Please enter Exec ID" />
            <Calendar
              value={null}
              placeholder="Transact Time"
              selectionMode="range"
              readOnlyInput
              hideOnRangeSelection
              showButtonBar
            />
            <Calendar
              value={null}
              placeholder="Trade Time"
              selectionMode="range"
              readOnlyInput
              hideOnRangeSelection
              showButtonBar
            />
            <Dropdown
              value={[]}
              options={[]}
              optionLabel="name"
              placeholder="Execution status"
            />
            <Dropdown
              value={[]}
              options={[]}
              optionLabel="name"
              placeholder="Side"
            />
          </div>
        ) : null}

        <Table
          dataList={state.dataList}
          totalNum={state.total}
          onPageChange={handlePageChange}
          empty={
            <>
              <p>No Execution Right Now</p>
              <p>Please Create New Execution or Switch Account Nickname</p>
            </>
          }
          sortField={state.sortField}
          sortOrder={state.sortOrder}
          onSort={(event: any) => {
            dispatch({ type: "onSortChange", payload: event });
          }}
          dataKey="execId"
          selectionMode="single"
          onRowClick={(event: any) => {
            const { data } = event;
            handleDetail(data);
            debugger;
          }}
        >
          <Column field="execId" header="Exec ID" sortable></Column>
          <Column field="execType" header="Exec Type"></Column>
          <Column field="orderId" header="Order ID"></Column>
          <Column field="side" header="Side"></Column>
          <Column field="avgPrice" header="Avg Price"></Column>
          <Column field="lastQty" header="Last Qty"></Column>
          <Column field="transactTime" header="Transact Time" sortable></Column>
          <Column field="tradeDate" header="Trade Date" sortable></Column>
          <Column field="status" header="Execution Status"></Column>
        </Table>
      </div>

      <ExecDetailSidebar
        id={detailId}
        visible={sidebarVisible}
        onHide={() => setSidebarVisible(false)}
      />
    </>
  );
}
