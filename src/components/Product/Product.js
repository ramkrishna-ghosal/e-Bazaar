import React, { Component } from 'react';
import axios from '../../config/axios';
import { Link } from "react-router-dom";

import config from '../../config/config';
import Spinner from '../../UI/Spinner';
class Product extends Component {
    state = {
        searchText: '',
        fetchedData: undefined,
        filteredData: undefined,
        subCategoryId: undefined
    }

    changeActiveHandler = (index) => {
        let data = this.state.fetchedData;
        let rowData = data[index];
        rowData.isActive = rowData.isActive === 1 ? 0 : 1;
        data[index] = rowData;

        this.toggleActive(data, index);
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

    render() {
        let empdata = [];
        if (this.state.filteredData)
            empdata = this.state.filteredData.map((data, index) => {
                return (
                    <tr key={data.id}>
                        <td>
                            {data.id}
                        </td>
                        <td>
                            <Link to={"/variant/" + data.productId}>{data.productId}</Link>
                        </td>
                        <td>
                            {data.name}
                        </td>
                        <td>
                            {data.description}
                        </td>
                        <td>
                            {data.tags}
                        </td>
                        {/* <td>
                            {data.createdat}
                        </td> */}
                        <td>
                            <button onClick={() => this.changeActiveHandler(index)}
                                className={data.isActive ? 'btn btn-danger' : 'btn btn-success'}>
                                {data.isActive ? 'De-activate' : 'Activate'}
                            </button>
                            {/* {data.createdat} */}
                        </td>
                    </tr>
                )
            })

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
                                    <h4 className="card-title ">Product Details</h4>
                                    <p className="card-category"> List of products </p>
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
                                                            productId
                                                    </th>
                                                        <th>
                                                            Name
                                                    </th>
                                                        <th>
                                                            Description
                                                    </th>
                                                        <th>
                                                            Tags
                                                    </th>
                                                        {/* <th>
                                                        createdat
                                                    </th> */}
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
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    fetchDatafromWeb(subCategoryId) {
        let url = config.baseURL + 'admin/products/';
        if (subCategoryId !== 'all') {
            url += 'subcategory/' + subCategoryId
        }

        axios.get(url).then(res => {
            if (res.data.status === 1)
                this.setState({
                    fetchedData: res.data.data,
                    filteredData: res.data.data,
                    subCategoryId: subCategoryId
                })
            else {
                this.setState({
                    error: 'No data found',
                    fetchedData: [],
                })
            }


        })
    }
    componentDidMount() {
        let subCategoryId = this.props.match.params.subcatid;
        this.fetchDatafromWeb(subCategoryId);
    }
    componentWillReceiveProps(nextProps) {
        // this._getContent(nextProps.params.featureName);
        let subCategoryId = nextProps.match.params.subcatid;
        // console.log(nextProps);
        this.fetchDatafromWeb(subCategoryId);

    }
    // componentWillUpdate(){
    //     debugger
    //     let subcategoryId = this.props.match.params.subcatid;
    //     console.log(this.state.subCategoryId);
    //     const stateSubcatid = this.state.subCategoryId;
    //     if(this.state.subcategoryId === subcategoryId)
    //         return false
    //     else 
    //         return true;
    // }

    toggleActive(data, index) {
        let payload = { data: { isActive: data[index].isActive } }
        axios.delete(config.baseURL + 'products/' + data[index].id, payload).then(res => {
            this.setState({
                fetchedData: data,
                filteredData: data
            });
        })
    }
}

export default Product;
