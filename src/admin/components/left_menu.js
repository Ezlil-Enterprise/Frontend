import { Image, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
import {
  TransactionOutlined,
  CustomerServiceOutlined,
  RiseOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  ProductOutlined,
  UsergroupAddOutlined,
  LogoutOutlined,
  BuildOutlined,
} from "@ant-design/icons";
import "../asset/less/left_menu.less";
import { useNavigate } from "react-router-dom";
const LeftMenu = () => {
  const [selectedKey, setSelectedKey] = useState("0");
  const navigate = useNavigate();
  let role = "Super Admin";
  const allowedMenuItems = {
    "Super Admin": ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
    Admin: ["0", "1", "2", "3", "6"],
    User: ["0", "1", "2", "3", "6"],
  };

  const menuItems = [
    {
      key: "0",
      icon: <RiseOutlined />,
      label: "Dashboard",
      link: "/dashboard",
    },
    {
      key: "1",
      icon: <ProductOutlined style={{ fontSize: "1.4em" }} />,
      label: "Products",
      link: "/admin/products",
    },

    {
      key: "2",
      icon: <ShoppingCartOutlined style={{ fontSize: "1.4em" }} />,
      label: "Orders",
      link: "/admin/orders",
    },
    {
      key: "3",
      icon: <UsergroupAddOutlined style={{ fontSize: "1.4em" }} />,
      label: "Customer",
      link: "/admin/customers",
    },
    {
      key: "4",
      icon: <BuildOutlined style={{ fontSize: "1.4em" }} />,
      label: "Category",
      link: "/admin/category",
    },

    {
      key: "5",
      icon: <TransactionOutlined style={{ fontSize: "1.4em" }} />,
      label: "Transcation",
      link: "",
    },
    {
      key: "6",
      icon: <SettingOutlined style={{ fontSize: "1.4em" }} />,
      label: "Settings",
      link: "",
    },
    {
      key: "7",
      icon: <CustomerServiceOutlined style={{ fontSize: "1.4em" }} />,
      label: "Support",
      link: "",
    },
    {
      key: "8",
      icon: <LogoutOutlined style={{ fontSize: "1.4em" }} />,
      label: "Logout",
      link: "",
    },
  ];
  const handleMenuItemClick = (key) => {
    setSelectedKey(key);
    navigate(menuItems.find((item) => item.key === key).link);
  };

  return (
    <Sider
      breakpoint="xxl"
      trigger={null}
      className="left-menu"
      theme="light"
      collapsedWidth={70}
      style={{
        boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        height: "200vh",
      }}
    >
      <Image
        src="./images/logo.png"
        style={{ width: "65px", height: "64px" }}
      />
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        onClick={({ key }) => handleMenuItemClick(key)}
        className="temp"
        items={menuItems
          .filter((item) => allowedMenuItems[role].includes(item.key))
          .map((item) => item)}
      />
    </Sider>
  );
};

export default LeftMenu;
