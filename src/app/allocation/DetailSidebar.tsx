import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import InfoItemCard from "@/components/InfoItemCard";
import { BASIC_INFO_FIELD_MAP } from "./fieldMap";

interface IProps {
  id: string;
  visible: boolean;
  onHide: () => void;
}

const res: any = {
  serviceStatus: {
    success: true,
    errorMsg: "",
  },
  data: {
    internalId: "123456",
    createdTime: "2024-02-13T08:00:00Z",
    allocId: "alloc1",
    refAllocId: "",
    allocTransType: "New",
    allocType: "Calculated",
    allocCancelReplaceReason: "Original details incomplete/incorrect",
    allocNoOrdersType: "Specified",
    orders: [
      {
        orderId: "ord1",
        clOrderId: "clOrd123",
        orderQty: "120",
        orderAvgPx: "200.41",
      },
    ],
    side: "Buy",
    settleType: "T+2",
    settleDate: "2024-04-07",
    execs: [
      {
        execId: "exec1",
        lastPx: "146.25",
        lastQty: "20",
      },
    ],
    quantity: "20",
    avgPrice: "200",
    currency: "USD",
    tradeDate: "2024-04-05",
    transactTime: "2024-04-05T08:15:00Z",
    status: "Valid",
    netMoney: "206",
    grossTradeAmt: "250",
    instrument: {
      product: 1,
      cfiCode: "CFI Code",
      securityId: "Security ID",
      securityIdSource: "Security ID Source",
      securityExchange: "Security Exchange",
      securityAltList: [
        {
          internalId: "678901",
          idSource: "ID Source",
          altId: "Alt ID",
        },
      ],
    },
    allocs: [
      {
        allocAccount: "string",
        allocAccountNumber: "string",
        allocQty: "string",
        allocAvgPx: "string",
        allocNetMoney: "string",
        miscFees: [
          {
            internalId: "",
            amt: "",
            currency: "USD",
            type: "",
            basis: "",
            title: "Fee Title",
            description: "Fee Description",
            calcRule: "Calculation Rule",
          },
        ],
      },
    ],
  },
};

export default function AllocDetailSidebar(props: IProps) {
  const [detail, setDetail] = useState<{ [T: string]: any }>({});
  const [showJump, setShowJump] = useState<boolean>(false);

  // 组织详情数据
  const getDetailInfo = async () => {
    const { data = {} } = res;

    const basicInfo: unknown[] = [];
    for (let [label, field] of Object.entries(BASIC_INFO_FIELD_MAP)) {
      switch (label) {
        case "Allocation Status":
          const val = data[field];
          setShowJump(val === "Valid");
          basicInfo.push({
            label: label,
            value: <span style={{ color: "#883cae" }}>{val}</span>,
          });
          break;
        default:
          basicInfo.push({
            label: label,
            value: data[field] ?? "",
          });
      }
    }

    const detail: any = {};
    detail["Basic Info"] = basicInfo;
    setDetail(detail);
    debugger;
  };

  useEffect(() => {
    if (props.id) {
      getDetailInfo();
    } else {
      setDetail({});
    }
  }, [props.id]);

  return (
    <>
      <Sidebar
        visible={props.visible}
        position="right"
        onHide={props.onHide}
        header={() => (
          <p className="main-title">
            <span>Allcation Detail</span>
            <span className="main-title-desc">{props.id}</span>
          </p>
        )}
        showCloseIcon={false}
      >
        {Object.keys(detail).map((label, index) => (
          <div className="main-card-dark mb15" key={index}>
            <p className="main-subtitle mb13">{label}</p>
            <InfoItemCard data={detail[label]} />
          </div>
        ))}

        {showJump ? (
          <div
            className="exec-detail-footer flex flex-justify-end"
            style={{ gap: "1rem", padding: "1rem 0" }}
          >
            <Button
              label="Allocation Correction"
              severity="help"
              rounded
              style={{ height: "1.75rem" }}
              // onClick={}
            />
            <Button
              label="Allocation Cancellation"
              severity="help"
              rounded
              style={{ height: "1.75rem" }}
              // onClick={}
            />
          </div>
        ) : null}
      </Sidebar>
    </>
  );
}
