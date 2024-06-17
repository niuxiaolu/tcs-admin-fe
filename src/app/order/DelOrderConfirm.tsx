import Image from "next/image";
import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";

interface IProps {
  orderId: string;
  visible: boolean;
  onClose: () => void;
}

export default function DelOrderConfirm(props: IProps) {
  const handleDelete = () => {
    // TODO Request
    // - DELETE /api/v1/order/{id}
    if (props.orderId) {
      alert("delete success!!!");
      props.onClose();
      // TODO 删除还需要重新跳转到 order 页面
    } else {
      alert("delete failed!!! not fount order id");
    }
  };

  return (
    <ConfirmDialog
      visible={props.visible}
      style={{ width: "600px" }}
      header={() => (
        <div className="flex" style={{ gap: "8px" }}>
          <Image src="/warning.png" alt="warning img" width={24} height={24} />
          <span>Warning</span>
        </div>
      )}
      footer={() => (
        <>
          <Button
            label="Cancel"
            severity="secondary"
            outlined
            style={{ borderRadius: "1.75rem", height: "32px" }}
            onClick={props.onClose}
          />
          <Button
            label="Delete"
            severity="warning"
            rounded
            style={{ height: "32px" }}
            onClick={handleDelete}
          />
        </>
      )}
      message={() => (
        <div
          style={{
            color: "#172B4D",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <p style={{ fontSize: "16px", fontWeight: "600" }}>
            Are you sure you want to DELETE?
          </p>
          <p>Once you delete, you can not find data back.</p>
        </div>
      )}
      onHide={props.onClose}
    />
  );
}
