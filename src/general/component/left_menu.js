import { Image, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React, { useState } from 'react';
import {TransactionOutlined,CustomerServiceOutlined,RiseOutlined,SettingOutlined,ProductOutlined,UsergroupAddOutlined,ShoppingCartOutlined,LogoutOutlined} from "@ant-design/icons";
import "../asset/less/left_menu.less";
const LeftMenu = () => {
    const [selectedKey, setSelectedKey] = useState("0");

    let role = "Super Admin";
    const allowedMenuItems = {
      "Super Admin": ["0", "1", "2", "3","4","5", "6","7"],
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
        link: "/products",
      },
      {
        key: "2",
        icon: <ShoppingCartOutlined  style={{ fontSize: "1.4em" }} />,
        label: "User",
        link: "",
      },
      {
        key: "3",
        icon: <UsergroupAddOutlined style={{ fontSize: "1.4em" }} />,
        label: "Customer",
        link: "",
      },
      {
        key: "4",
        icon: <TransactionOutlined  style={{ fontSize: "1.4em" }} />,
        label: "Transcation",
        link: "",
      },
      {
        key: "5",
        icon: <SettingOutlined   style={{ fontSize: "1.4em" }} />,
        label: "Settings",
        link: "",
      },
      {
        key: "6",
        icon: <CustomerServiceOutlined  style={{ fontSize: "1.4em" }} />,
        label: "Support",
        link: "",
      },
      {
        key: "7",
        icon: <LogoutOutlined  style={{ fontSize: "1.4em" }} />,
        label: "Logout",
        link: "",
      }
    
  

    ];
    const handleMenuItemClick = (key) => {
        setSelectedKey(key);
        navigate(menuItems.find((item) => item.key === key).link);
      };
    
    return (
        <Sider  breakpoint="xxl"
         trigger={null} className="left-menu"  theme='light' collapsedWidth={70} style={{boxShadow:" rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}  >
            <Image src='./images/logo.png' style={{width:"65px",height:"64px"}}/>
        <Menu mode="inline" selectedKeys={[selectedKey]} onClick={({ key }) => handleMenuItemClick(key)} className="temp" items={menuItems.filter((item) => allowedMenuItems[role].includes(item.key)).map((item) => item)} />
      </Sider>
    );
};

export default LeftMenu;