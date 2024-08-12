import moment from "moment";
import { DatePicker } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Row, Col } from "antd";
import React from "react";
import { convertToLocalTimeFormat } from "./date";

export function compareCaseIds(propertyName) {
  return (a, b) => {
    const aDigits = parseInt((a[propertyName] || "").match(/\d+$/)[0]);
    const bDigits = parseInt((b[propertyName] || "").match(/\d+$/)[0]);
    return aDigits - bDigits;
  };
}

export function filterValuesStr(data, propertyName) {
  return data.reduce((acc, item) => {
    if (!acc.some((option) => option.value === item[propertyName])) {
      acc.push({ text: item[propertyName], value: item[propertyName] });
    }
    return acc;
  }, []);
}

export function filterValuesBoolActiveAndInactive(data, propertyName) {
  return data.reduce((acc, data) => {
    let value = data[propertyName] === 1 ? "Active" : "Inactive";
    if (!acc.some((option) => option.value === value)) {
      acc.push({ text: value, value: value });
    }
    return acc;
  }, []);
}

const getNestedValue = (obj, path) => {
  return path.reduce(
    (acc, key) => (acc && acc[key] !== "undefined" ? acc[key] : null),
    obj
  );
};

export const filterWithInputSearch = (
  dataIndex,
  setColumnSearch,
  searchInput
) => ({
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
  }) => (
    <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
      <Input
        ref={searchInput}
        placeholder="Search..."
        value={selectedKeys[0] || ""}
        onChange={(e) =>
          setSelectedKeys(e.target.value ? [e.target.value] : [])
        }
        onPressEnter={() =>
          handleSearch(selectedKeys, confirm, setColumnSearch)
        }
        style={{
          marginBottom: 8,
          display: "block",
        }}
      />
      <Row gutter={[16, 16]}>
        <Col span={12} align="left">
          <Button
            disabled={!selectedKeys[0]}
            onClick={() =>
              clearFilters && handleReset(clearFilters, setColumnSearch)
            }
            size="small"
            type="link"
          >
            Reset
          </Button>
        </Col>
        <Col span={12} align="right">
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, setColumnSearch)}
            size="small"
          >
            Ok
          </Button>
        </Col>
      </Row>
    </div>
  ),
  filterIcon: (filtered) => (
    <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
  ),
  onFilter: (value, record) => {
    const recordValue = Array.isArray(dataIndex)
      ? getNestedValue(record, dataIndex)
      : record[dataIndex];
    return (
      recordValue &&
      recordValue.toString().toLowerCase().includes(value.toLowerCase())
    );
  },
  onFilterDropdownOpenChange: (visible) => {
    if (visible) {
      setTimeout(() => searchInput?.current?.select(), 100);
    }
  },
  render: (text) => text,
});

export const filterWithDateRange = ({
  handleSearch,
  handleReset,
  dataIndex,
}) => ({
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
  }) => (
    <div style={{ padding: 8 }}>
      <DatePicker.RangePicker
        style={{ marginRight: "10px" }}
        format="MM-DD-YYYY"
        onChange={(dates) => setSelectedKeys(dates ? [dates] : [])}
        value={selectedKeys[0]}
      />
      <Row style={{ marginTop: 10 }}>
        <Col span={12} align="left">
          <Button
            onClick={() => handleReset(clearFilters, setSelectedKeys)}
            size="small"
            type="link"
            disabled={selectedKeys.length === 0}
          >
            Reset
          </Button>
        </Col>
        <Col span={12} align="right">
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm)}
            size="small"
          >
            Ok
          </Button>
        </Col>
      </Row>
    </div>
  ),
  filterIcon: (filtered) => (
    <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
  ),
  onFilter: (value, record) => {
    const startDateValue = new Date(value[0]);
    const endDateValue = new Date(value[1]);
    const targetDate = new Date(record[dataIndex]);
    startDateValue.setHours(0, 0, 0, 0);
    endDateValue.setHours(23, 59, 59, 999);

    return targetDate >= startDateValue && targetDate <= endDateValue;
  },
  render: (text) => <span>{convertToLocalTimeFormat(text)}</span>,
});

const handleSearch = (selectedKeys, confirm, dataIndex, setColumnSearch) => {
  confirm();
  setColumnSearch(selectedKeys[0]);
};

const handleReset = (clearFilters, setColumnSearch) => {
  clearFilters();
  setColumnSearch("");
};

export const filterWithSearchAndCheckboxOptions = (options) => {
  return options.map((option) => ({
    text: option,
    value: option,
  }));
};
