import React from "react";
import { UserOutlined } from "@ant-design/icons";
let usedColors = [];

export const getAvatarColor = (initials) => {
  const colors = [
    "#f56a00", // Orange
    "#7265e6", // Purple
    "#ffbf00", // Yellow
    "#00a2ae", // Cyan
    "#ff7f50", // Coral
    "#4682b4", // Steel Blue
    "#6a5acd", // Slate Blue
    "#d2691e", // Chocolate
    "#9acd32", // Yellow Green
    "#ff4500", // Orange Red
    "#2e8b57", // Sea Green
  ];

  const availableColors = colors.filter((color) => !usedColors.includes(color));

  if (availableColors.length === 0) {
    usedColors = [];
    availableColors.push(...colors);
  }

  const selectedColor =
    availableColors[Math.floor(Math.random() * availableColors.length)];

  usedColors.push(selectedColor);

  return selectedColor;
};

export const getInitials = (userInfo) => {
  if (userInfo?.firstName && userInfo?.lastName) {
    return `${userInfo.firstName[0]}${userInfo.lastName[0]}`;
  }
  return <UserOutlined />;
};
