import React from "react";
import "./InfoItemCard.scss";

export interface IDataItem {
  lable: string;
  value: string | JSX.Element;
}

export interface IProps {
  data?: IDataItem[];
  grid?: number;
}

const InfoItemCard = ({ data, grid = 2 }: IProps) => {
  const getItems = (arr: any[]) => {
    if (Array.isArray(arr) && arr.length > 0) {
      const els = arr.map((item: any, index: number) => {
        return (
          <div key={index} className="info-item">
            <div className="info-item-title">{item.label}</div>
            <div className="info-item-value">{item.value}</div>
          </div>
        );
      });
      return <div className={`info-card col${grid}`}>{els}</div>;
    } else {
      return null;
    }
  };

  return <>{data ? getItems(data) : null}</>;
};

export default InfoItemCard;
