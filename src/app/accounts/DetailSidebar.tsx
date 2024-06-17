import { useEffect, useReducer, useState } from "react";
import { Sidebar } from "primereact/sidebar";
import Table from "@/components/Table";
import { Column } from "primereact/column";

interface IProps {
  id: string;
  visible: boolean;
  onHide: () => void;
}

const res: any = {};

const initialState = {
  cash: {
    dataList: [],
    total: 0,
    pageNumber: 1,
    pageSize: 10,
  },
  sec: {
    dataList: [],
    total: 0,
    pageNumber: 1,
    pageSize: 10,
  },
};

const reducer = (state: any, { type, payload }: any) => {
  debugger;
  const { pageNumber, pageSize, dataList, total } = payload;
  switch (type) {
    case "onCashPageChange":
      return { cash: { ...state.cash, pageNumber, pageSize }, sec: state.sec };
    case "onCashDataChange":
      return { cash: { ...state.cash, dataList, total }, sec: state.sec };
    case "onSecPageChange":
      return { cash: state.cash, sec: { ...state.sec, pageNumber, pageSize } };
    case "onSecDataChange":
      return { cash: state.cash, sec: { ...state.sec, dataList, total } };

    default:
      throw new Error();
  }
};

export default function AccountDetailSidebar(props: IProps) {
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    (initialState: any) => initialState
  );

  // 组织详情数据
  const getDetailInfo = async () => {
    const { data = {} } = res;
  };

  useEffect(() => {
    if (props.id) {
      getDetailInfo();
    }
  }, [props.id]);

  return (
    <>
      <Sidebar
        visible={props.visible}
        position="right"
        onHide={props.onHide}
        showCloseIcon={false}
        header={() => (
          <p className="main-title">
            <span>Account Detail</span>
            <span className="main-title-desc">{props.id}</span>
          </p>
        )}
      >
        <div className="main-card-dark mb15">
          <p className="main-subtitle mb13">Cash Balance</p>
          <Table
            dataList={state.cash.dataList}
            totalNum={state.cash.total}
            sizeOptions={undefined}
            onPageChange={(params: any) =>
              dispatch({ type: "onCashPageChange", payload: params })
            }
          >
            <Column field="" header="Currency"></Column>
            <Column field="" header="Amount"></Column>
          </Table>
        </div>

        <div className="main-card-dark mb15">
          <p className="main-subtitle mb13">Security Balance</p>
          <Table
            dataList={state.cash.dataList}
            totalNum={state.cash.total}
            sizeOptions={undefined}
            onPageChange={(params: any) =>
              dispatch({ type: "onSecPageChange", payload: params })
            }
          >
            <Column field="" header="Quantity"></Column>
            <Column field="" header="Instrument Name"></Column>
          </Table>
        </div>
      </Sidebar>
    </>
  );
}
