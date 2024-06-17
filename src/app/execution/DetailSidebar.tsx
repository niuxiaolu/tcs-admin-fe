import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import InfoItemCard from "@/components/InfoItemCard";
import {
  BASIC_INFO_FIELD_MAP,
  INSTRUMENT_FIELD_MAP,
  MISC_FIELD_MAP,
} from "./fieldMap";

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
    interestedParty: "Party A",
    createdTime: "2024-02-13T08:00:00Z",
    execId: "exec1",
    execRefId: "",
    execType: "Trade",
    orderId: "xxx",
    clOrderId: "xx",
    ordStatus: "Partially Filled",
    side: "Buy",
    orderQty: "100",
    cumQty: "80",
    leavesQty: "",
    lastQty: "",
    lastPrice: "",
    avgPrice: "",
    currency: "USD",
    tradeDate: "2024-01-23",
    text: "",
    settlDate: "2024-02-02",
    settlType: "",
    transactTime: "2024-02-05T08:15:00Z",
    // status: "Valid",
    status: "Allocated",
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
    miscFees: [
      {
        internalId: "",
        amt: "123",
        currency: "USD",
        type: "11",
        basis: "xxx",
        title: "Fee Title",
        description: "Fee Description",
        calcRule: "Calculation Rule",
      },
      {
        internalId: "",
        amt: "123",
        currency: "USD",
        type: "22",
        basis: "xxx",
        title: "Fee Title2",
        description: "Fee Description",
        calcRule: "Calculation Rule",
      },
    ],
  },
};

export default function ExecDetailSidebar(props: IProps) {
  const [detail, setDetail] = useState<{ [T: string]: any }>({});
  const [showJump, setShowJump] = useState<boolean>(false);

  // 组织详情数据
  const getDetailInfo = async () => {
    const { data = {} } = res;

    const basicInfo: unknown[] = [];
    for (let [label, field] of Object.entries(BASIC_INFO_FIELD_MAP)) {
      switch (label) {
        case "Execution Status":
          const val = data[field];
          const tm: any = {
            Allocated: "Allocation Detail",
            Invalid: "Exception Monitor",
          };
          setShowJump(val === "Valid");
          basicInfo.push({
            label: label,
            value: (
              <>
                <span style={{ color: "#883cae" }}>{val}</span>
                {tm[val] ? (
                  <span
                    className="flex flex-align-center"
                    style={{
                      color: "#fff",
                      backgroundColor: "#883cae",
                      padding: "3px",
                      borderRadius: "2px",
                      width: "fit-content",
                    }}
                  >
                    {tm[val]}
                  </span>
                ) : null}
              </>
            ),
          });
          break;
        default:
          basicInfo.push({
            label: label,
            value: data[field] ?? "",
          });
      }
    }

    const instrumentInfo: unknown[] = [];
    for (let [label, field] of Object.entries(INSTRUMENT_FIELD_MAP)) {
      switch (label) {
        case "Security Alts":
          const arr = data[field];
          instrumentInfo.push({
            label: label,
            value: "啊吧啊吧",
          });
          break;
        default:
          instrumentInfo.push({
            label: label,
            value: data.instrument[field] ?? "",
          });
      }
    }

    const miscFees: unknown[] = [];
    const miscFeesData = data.miscFees ?? [];
    for (let [label, field] of Object.entries(MISC_FIELD_MAP)) {
      miscFees.push({
        label: label,
        value: (
          <>
            {miscFeesData.map((fee: any, index: number) => {
              return <div key={index}>{fee[field] ?? ""}</div>;
            })}
          </>
        ),
      });
    }

    const detail: any = {};
    detail["Basic Info"] = basicInfo;
    detail["Instrument"] = instrumentInfo;
    detail["Misc Fees"] = miscFees;
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
            <span>Execution Detail</span>
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
              label="Execution Correction"
              severity="help"
              rounded
              style={{ height: "1.75rem" }}
              // onClick={}
            />
            <Button
              label="Execution Cancellation"
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
