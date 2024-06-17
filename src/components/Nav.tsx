"use client";

import { useRouter } from "next/navigation";
import "./Nav.scss";

export const Nav = () => {
  const router = useRouter();
  const jump = (e: any, url: string) => {
    document.querySelectorAll(".layout-nav-item").forEach((e) => {
      e.classList.remove("active");
    });
    e.currentTarget.classList.toggle("active");
    router.push(url);
  };

  return (
    <div className="layout-navbar">
      <div className="layout-nav-list">
        <div className="layout-nav-item active" onClick={(e) => jump(e, "/dashboard")}>
          <i className="pi pi-home"></i>
          <span>Dashboard</span>
        </div>

        <div
          className="layout-nav-item"
          onClick={(e) => jump(e, "/order")}
        >
          <i className="pi pi-credit-card"></i>
          <span>Order</span>
        </div>

        <div className="layout-nav-item" onClick={(e) => jump(e, "/execution")}>
          <i className="pi pi-database"></i>
          <span>Execution</span>
        </div>

        <div
          className="layout-nav-item"
          onClick={(e) => jump(e, "/allocation")}
        >
          <i className="pi pi-money-bill"></i>
          <span>Allocation</span>
        </div>

        <div className="layout-nav-item" onClick={(e) => jump(e, "/accounts")}>
          <i className="pi pi-dollar"></i>
          <span>Financial Account Management</span>
        </div>

        <div className="layout-nav-item" onClick={(e) => jump(e, "/users")}>
          <i className="pi pi-user"></i>
          <span>User Management</span>
        </div>
      </div>
    </div>
  );
};
