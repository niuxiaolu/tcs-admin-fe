"use client";

import React from "react";
import Image from "next/image";
import { Button } from "primereact/button";
import "./Header.scss";

export const Header: React.FC = () => {
  return (
    <div className="layout-top-bar">
      <div className="layout-topbar-logo">
        <Image
          src="/logo.png"
          alt="Trading Capturing System Logo"
          className="logo-img"
          width={50}
          height={50}
          priority
        />
        <div className="layout-topbar-desc">
          <p className="layout-topbar-title">Trading Capturing System</p>
          <p className="layout-topbar-subtitle">
            <span>Drill inslignt - </span>
            <span>Java Full Stack</span>
          </p>
        </div>
      </div>

      <div className="layout-topbar-menu">
        <Image
          src="/avatar.png"
          alt="Trading Capturing System User Avatar"
          className="logo-img"
          width={31}
          height={31}
          priority
        />
        <span>Welcome, Xiaolu</span>
        <Button label="Log out" severity="help" rounded />
      </div>
    </div>
  );
};
