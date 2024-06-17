"use client";

import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { TabMenu } from "primereact/tabmenu";
import Table from "@/components/Table";
import InfoItemCard from "@/components/InfoItemCard";
import DelOrderConfirm from "../DelOrderConfirm";
import ExecutionPage from "@/app/execution/page";
import AllocationPage from "@/app/allocation/page";

const OrderDetailPage = ({ params }: any) => {
  const menus = [
    { label: "Executions List", icon: "pi pi-database" },
    { label: "Allocations List", icon: "pi pi-money-bill" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [id, setId] = useState<string>("");
  const [info, setInfo] = useState<any>({});
  const [delVisible, setDelVisible] = useState<boolean>(false);

  const getDetailData = async () => {
    // TODO Request detail data
    // - GET /api/v1/order/{id}
    const res = {
      orderId: "xxx",
      clOrderId: "xxx",
      orderStatus: "New",
      orderQuantity: "10.23",
      side: "Buy",
      orderType: "Market",
      price: "20.12",
      priceType: "Per Unit",
      currency: "USD",
      instrument: "...",
      settleType: "T+2",
      settleDate: "2023-10-20",
      tradeDate: "2023-10-21",
      systemCreatedDate: "2023-10-20T10:15:30+01:00",
      interestedParty: "jane@gmail.com",
    };
    const info = [
      {
        label: "Order ID",
        value: res.orderId,
      },
      {
        label: "Order Status",
        value: res.orderStatus,
      },
      {
        label: "Side",
        value: res.side,
      },
      {
        label: "Price",
        value: res.price,
      },
      {
        label: "Currency",
        value: res.currency,
      },
      {
        label: "Settle Type",
        value: res.settleType,
      },
      {
        label: "Settle Date",
        value: res.settleDate,
      },
      {
        label: "Client Order ID",
        value: res.clOrderId,
      },
      {
        label: "Order Quantity",
        value: res.orderQuantity,
      },
      {
        label: "Order Type",
        value: res.orderType,
      },
      {
        label: "Creation Time",
        value: res.systemCreatedDate,
      },
      {
        label: "Price Type",
        value: res.priceType,
      },
      {
        label: "Interested party",
        value: res.interestedParty,
      },
      {
        label: "Trade Date",
        value: res.tradeDate,
      },
      {
        label: "Instrument Name",
        value: res.instrument,
      },
    ];
    setInfo(info);
  };

  useEffect(() => {
    const _id = params?.id;
    if (_id && _id !== id) {
      getDetailData();
      setId(_id);
    }
  }, []);

  return (
    <>
      <div className="main-card-light">
        <div className="main-title-contaienr no-border">
          <p className="main-title">
            <span>ORDER DETAIL</span>
            <span className="main-title-desc">{id}</span>
          </p>
          <div>
            <Button
              label="Delete"
              severity="secondary"
              rounded
              onClick={() => setDelVisible(true)}
            />
            <Button label="Update" severity="help" rounded />
          </div>
        </div>

        <div className="ml30 mt15">
          <div className="main-card-dark mb30">
            <p className="main-subtitle mb13">Order Info</p>
            <InfoItemCard data={info} grid={6} />
          </div>

          <div className="main-card-dark">
            <p className="main-subtitle mb13">Order Fulfillment Details</p>
            <div className="br10">
              <TabMenu
                model={menus}
                activeIndex={activeIndex}
                onTabChange={(e) => setActiveIndex(e.index)}
              />
              {activeIndex === 0 && <ExecutionPage search={false} />}
              {activeIndex === 1 && <AllocationPage search={false} />}
            </div>
          </div>
        </div>
      </div>

      <DelOrderConfirm
        orderId={params.id}
        visible={delVisible}
        onClose={() => setDelVisible(false)}
      />
    </>
  );
};

export default OrderDetailPage;
