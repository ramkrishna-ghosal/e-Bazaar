import React, { Component } from 'react';
import axios from '../../config/axios';
import { Link } from "react-router-dom";

import Spinner from '../../UI/Spinner';
class Category extends Component {
    state = {
        searchText: '',
        fetchedData: undefined,
        filteredData: undefined
    }

    searchHandler = (e) => {
        let inputData = e.target.value;

        let data = this.state.fetchedData;
        let filteredData = data.filter(val => {
            return val.name.toLowerCase().includes(inputData.toLowerCase());
        })
        this.setState({
            searchText: inputData,
            filteredData: filteredData
        });
    }

    changeActiveHandler = (index) => {
        let data = this.state.fetchedData;
        let rowData = data[index];
        rowData.isActive = rowData.isActive === 1 ? 0 : 1;
        data[index] = rowData;


        this.toggleActive(data, index);

    }

    render() {
        let empdata = [];
        if (this.state.filteredData)
            empdata = this.state.filteredData.map((data, index) => {
                return (
                    <tr key={data.id}>
                        <td style={{ width: '5%' }}>
                            {data.id}
                        </td>
                        <td style={{ width: '20%' }}>
                            <Link to={"/subcategory/" + data.categoryId}>{data.categoryId}</Link>
                        </td>
                        <td style={{ width: '15%' }}>
                            {data.name}
                        </td>
                        <td style={{ width: '50%' }}>
                            {data.description}
                        </td>
                        <td style={{ width: '10%' }}>
                            <button onClick={() => this.changeActiveHandler(index)}
                                className={data.isActive === 1 ? 'btn btn-danger' : 'btn btn-success'}>
                                {data.isActive === 1 ? 'De-activate' : 'Activate'}
                            </button>
                            {/* {data.createdat} */}
                        </td>
                    </tr>
                )
            })

        // if(empdata.length==0){
        //     empdata = 
        // }

        return (
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="col-md-3 pull-left">
                                <span className="btn btn-primary pull-left" onClick={this.props.history.goBack}>Back</span>
                            </div>

                            <div className="col-md-6 pull-left">
                                    <div className="input-group no-border">
                                        <input type="text" value={this.state.searchText} className="form-control" placeholder="Search..." onChange={this.searchHandler} />
                                            <i className="search-material-icons material-icons">search</i>
                                        {/* <button className="btn btn-white btn-round btn-just-icon">
                                            <div className="ripple-container"></div>
                                        </button> */}
                                    </div>
                            </div>

                            <div className="col-md-3 pull-right">
                                <Link className="btn btn-success pull-right" to={this.props.match.url + '/add'}>Add New</Link>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header card-header-primary">
                                    <h4 className="card-title ">Category Details</h4>
                                    <p className="card-category"> List of Categories </p>
                                </div>
                                <div className="card-body">
                                    {!this.state.fetchedData ? <Spinner /> :
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead className=" text-primary">
                                                    <tr>
                                                        <th>
                                                            ID
                                                    </th>
                                                        <th>
                                                            categoryId
                                                    </th>
                                                        <th>
                                                            Name
                                                    </th>
                                                        <th>
                                                            Description
                                                    </th>
                                                        <th>
                                                            Actions
                                                    </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {empdata}
                                                </tbody>
                                            </table>
                                            {empdata.length === 0 ? "No Rows" : null}
                                        </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        axios.get('admin/categories/').then(res => {
            if (res.data.status === 1)
                this.setState({
                    fetchedData: res.data.data,
                    filteredData: res.data.data
                })
            else {
                this.setState({ error: 'No data found' })
            }
            // console.log(res.data)
        })
    }

    toggleActive(data, index) {
        let payload = { data: { isActive: data[index].isActive } }
        axios.delete('admin/categories/' + data[index].id, payload).then(res => {
            this.setState({
                fetchedData: data,
                filteredData: data
            });

        })
    }
}

export default Category;
