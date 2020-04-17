import React, { Component } from "react";
import { Table, Input, Button } from "antd";
import Highlighter from "react-highlight-words";
import ReducedData from "../reducedData.json";
import dict from "../dictionary";
import { ReactComponent as Search } from "../ds/icons/svg/ontario-icon-search.svg";
import trans from "../translations.json";
const SearchOutlined = () => <Search />;

class StackedTable extends React.Component {
  state = {
    searchText: "",
    searchedColumn: "",
    data: undefined,
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          //   icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    //copy data coming in from props to a new object, remove some items that are too old, and build the new data for table
    const cD = Object.values(ReducedData.reduceAges);
    var unk = 0;
    var data = cD
      .filter((item) => {
        if (item[dict.Age_Group] === "Unknown") {
          unk =
            unk +
            item[dict.resolved] +
            item[dict.NotResolved] +
            item[dict.deaths];
          return false;
        } else {
          return true;
        }
      })
      .map((item, z) => {
        //console.log('item', item)
        if (item[dict.Age_Group] === "<20") {
          item[dict.Age_Group] = "Under 20";
        }
        if (item[dict.Age_Group] === "20s") {
          item[dict.Age_Group] = "20-29";
        }
        if (item[dict.Age_Group] === "30s") {
          item[dict.Age_Group] = "30-39";
        }
        if (item[dict.Age_Group] === "40s") {
          item[dict.Age_Group] = "40-49";
        }
        if (item[dict.Age_Group] === "50s") {
          item[dict.Age_Group] = "50-59";
        }
        if (item[dict.Age_Group] === "60s") {
          item[dict.Age_Group] = "60-69";
        }
        if (item[dict.Age_Group] === "70s") {
          item[dict.Age_Group] = "70-79";
        }
        if (item[dict.Age_Group] === "80s") {
          item[dict.Age_Group] = "80-89";
        }
        if (item[dict.Age_Group] === "90s") {
          item[dict.Age_Group] = "90-99";
        }
        return {
          ...item,
          index: z,
          total:
            item[dict.resolved] + item[dict.NotResolved] + item[dict.deaths],
        };
      });
    const columns = [
      {
        title: trans.agebreak.group[this.props.lang],
        dataIndex: "Age_Group",
        key: "Age_Group",
        //...this.getColumnSearchProps('age'),
      },
      {
        title: trans.agebreak.resolved[this.props.lang],
        dataIndex: dict.resolved,
        key: dict.resolved,
        //...this.getColumnSearchProps('address'),
      },
      {
        title: trans.agebreak.active[this.props.lang],
        dataIndex: dict.NotResolved,
        key: dict.resolved,
        //...this.getColumnSearchProps('address'),
      },
      {
        title: trans.agebreak.fatal[this.props.lang],
        dataIndex: dict.deaths,
        key: dict.deaths,
        //...this.getColumnSearchProps('address'),
      },
      {
        title: trans.reg.total[this.props.lang],
        dataIndex: "total",
        key: "total",
        //...this.getColumnSearchProps('address'),
      },
    ];
    return (
      <React.Fragment>
        <Table columns={columns} dataSource={data} />
        <p>
          {trans.agebreak.noteA[this.props.lang]} {unk}
          {trans.agebreak.noteB[this.props.lang]}
        </p>
      </React.Fragment>
    );
  }
}

export default StackedTable;
