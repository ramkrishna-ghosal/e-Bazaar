import React, { Component } from 'react';
import axios from '../config/axios';

// import { Link } from "react-router-dom";

import config from '../config/config';
import Spinner from '../UI/Spinner';
class Orders extends Component {
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
        let empdata=[];
        if (this.state.filteredData)
            empdata = this.state.filteredData.map((data, index) => {
                return (
                    <tr key={data.id}>
                        <td>
                            {data.id}
                        </td>
                        <td>
                            {/* <Link to={"/subcategory/" + data.categoryId}>{data.categoryId}</Link> */}
                            {data.orderNo}
                        </td>
                        <td>
                            {data.customerId}
                        </td>
                        <td>
                            {data.deliveryAddress}
                        </td>
                        <td>
                            {/* <button onClick={() => this.changeActiveHandler(index)}
                                className={data.isActive === 1 ? 'btn btn-danger' : 'btn btn-success'}>
                                {data.isActive === 1 ? 'De-activate' : 'Activate'}
                            </button> */}
                            {data.orderStatus}
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
                            <div className="col-md-6 pull-right">
                                <form className="navbar-form">
                                    <div className="input-group no-border">
                                        <input type="text" value={this.state.searchText} className="form-control" placeholder="Search..." onChange={this.searchHandler} />
                                        <button type="submit" className="btn btn-white btn-round btn-just-icon">
                                            <i className="material-icons">search</i>
                                            <div className="ripple-container"></div>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header card-header-primary">
                                    <h4 className="card-title ">Category Details</h4>
                                    <p className="card-category"> List of Categories </p>
                                </div>
                                <div className="card-body">
                                    {!this.state.fetchedData?<Spinner/>:
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead className=" text-primary">
                                                <tr>
                                                    <th>
                                                        ID
                                                    </th>
                                                    <th>
                                                    orderNo
                                                    </th>
                                                    <th>
                                                    customerId
                                                    </th>
                                                    <th>
                                                    deliveryAddress
                                                    </th>
                                                    <th>
                                                        orderStatus
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
        axios.get(config.baseURL + '/admin/orders/').then(res => {
            this.setState({
                fetchedData: res.data.data,
                filteredData: res.data.data
            })
            // console.log(res.data.data)
        })
    }

    toggleActive(data, index) {
        let payload = { data: { isActive: data[index].isActive } }
        axios.delete(config.baseURL + 'categories/' + data[index].id, payload).then(res => {
            this.setState({
                fetchedData: data,
                filteredData: data
            });
        })
    }
}

export default Orders;
