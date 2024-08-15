import { Image, Menu, Spin } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useState, useEffect } from "react";
import {
  TransactionOutlined,
  CustomerServiceOutlined,
  RiseOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  ProductOutlined,
  UsergroupAddOutlined,
  BuildOutlined,
} from "@ant-design/icons";
import { MB05 } from "../../general/component/widget";
import Logo from "../../general/asset/image/logo.png";
import "../asset/less/left_menu.less";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { getUserDetails } from "../../general/api/authentication";

const LeftMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("0");
  const [userToken, setUserToken] = useState(Cookies.get("user_token"));
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userToken) {
        const userInfoResponse = await getUserDetails(userToken);
        setUserInfo(userInfoResponse);
      }
    };

    fetchUserInfo();
  }, [location.pathname, userToken]);

  useEffect(() => {
    const currentItem = menuItems.find((item) =>
      location.pathname.includes(item.link)
    );
    if (currentItem) {
      setSelectedKey(currentItem.key);
    }
  }, [location.pathname]);

  const role = userInfo?.role;

  const allowedMenuItems = {
    SuperAdmin: ["0", "1", "2", "3", "4", "5"],
    Admin: ["0", "1", "2", "3"],
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
      link: "/admin/transactions",
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
  ];

  const handleMenuItemClick = (key) => {
    setSelectedKey(key);
    navigate(menuItems.find((item) => item.key === key).link);
  };

  if (!role) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Sider
      breakpoint="xxl"
      trigger={null}
      className="left-menu"
      theme="light"
      collapsedWidth={70}
      style={{
        boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        height: "100vh",
      }}
    >
      <Image src={Logo} className="logo" preview={false} />
      <MB05 />
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
