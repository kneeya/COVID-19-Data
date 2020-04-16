import React, { Component } from "react";
import { Table, Input, Button } from 'antd';
import Highlighter from 'react-highlight-words';
import {ReactComponent as Search} from '../ds/icons/svg/ontario-icon-search.svg';
import covidData from "../covidData.json";
import dict from "../dictionary";

const SearchOutlined = () => <Search/>;

class StackedTable extends React.Component {
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
    // console.log('this.state.data', this.props, covidData)
    let d = [...covidData.result.records].filter(item=>item[dict.totaCases] > 100);
    let tableData = d.map((item,z)=>{
        //console.log('item', item)
        return {
            index: z,
            date: item[dict.reportedDate],
            //check if yeterday data exists and find diff
            new: d[z-1] && item[dict.totaCases] - d[z-1][dict.totaCases],
        }
    })
    const columns = [
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        width: '25%',
        //...this.getColumnSearchProps('name'),
      },
      {
        title: 'New cases',
        dataIndex: 'new',
        key: 'new',
        width: '50%',
        //...this.getColumnSearchProps('age'),
      },
    ];
    return <Table columns={columns} dataSource={tableData} />;
  }
}

export default StackedTable;