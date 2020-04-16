import React, { Component } from "react";
import { Table, Input, Button } from 'antd';
import Highlighter from 'react-highlight-words';
import {ReactComponent as Search} from '../ds/icons/svg/ontario-icon-search.svg';
import covidData from "../covidData.json";
import dict from "../dictionary";
const SearchOutlined = () => <Search/>;

class TotalTable extends React.Component {
  state = {
    searchText: '',
    searchedColumn: '',
    data: undefined
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
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
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
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

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {

    //copy data coming in from props to a new object, remove some items that are too old, and build the new data for table
    var chartData = [...covidData.result.records].filter(item=>item[dict.totaCases] > 100).map((item,z)=>{
        console.log('item', item)
        return {
            index: z,
            date: item[dict.reportedDate],
            confirmed: item[dict.totaCases], 
            resolved: item[dict.resolved],
            deaths: item[dict.deaths]
        }
    })

    const columns = [
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        //...this.getColumnSearchProps('name'),
      },
      {
        title: 'Confirmed',
        dataIndex: 'confirmed',
        key: 'confirmed',
        //...this.getColumnSearchProps('age'),
      },
      {
        title: 'Resolved',
        dataIndex: 'resolved',
        key: 'resolved',
        //...this.getColumnSearchProps('address'),
      },
      {
        title: 'Total Deaths',
        dataIndex: 'deaths',
        key: 'deaths',
        //...this.getColumnSearchProps('address'),
      }
    ];
    return <Table columns={columns} dataSource={chartData} />;
  }
}

export default TotalTable;