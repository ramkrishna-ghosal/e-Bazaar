import React, { Component } from 'react';
import { Link } from "react-router-dom";

import axios from '../../config/axios';
import config from '../../config/config'
import Spinner from '../../UI/Spinner';

class ProductVariant extends Component {
  state = {
    searchText: '',
    fetchedData: undefined,
    filteredData: undefined,
    productId: undefined,
    productName: ''
  }

  changeActiveHandler = (index) => {
    let data = this.state.fetchedData.slice();
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
            <td>
              {data.id}
            </td>
            <td>
              {data.name}
            </td>
            <td>
              <img src={config.baseURL + data.image} alt={data.name} style={{ width: '50px' }} />
            </td>
            <td>
              &#8377; {data.price}
            </td>
            <td>
              &#8377; {data.discountPrice}
            </td>
            <td>
              {data.stock}
            </td>
            <td style={{ width: '20%' }}>
              <button onClick={() => this.editDatahandler(index)}
                className="btn-action blue">
                <i className="fa fa-edit" aria-hidden="true"></i>
              </button>
              <button onClick={() => this.changeActiveHandler(index)}
                className={data.isActive === 1 ? 'btn-action red' : 'btn-action green'}>
                <i className={data.isActive === 1 ? "fa fa-remove" : "fa fa-plus"} aria-hidden="true"></i>
              </button>
            </td>

            {/* <td>
              <button onClick={() => this.changeActiveHandler(index)}
                className={data.isActive ? 'btn btn-danger' : 'btn btn-success'}>
                {data.isActive ? 'De-activate' : 'Activate'}
              </button>
              {/* {data.createdat} 
            </td> */}
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
                  <h4 className="card-title ">Product variants</h4>
                  <p className="card-category"> Basic details of the Product variants available</p>
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
                              Name
                            </th>
                            <th>image</th>
                            <th>
                              price
                            </th>
                            <th>
                              discountPrice
                            </th>
                            <th>
                              stock
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

  componentDidMount() {
    // let productId = this.props.match.params.prodid;
    let productId = this.props.match.params.prodid;

    axios.get('admin/products/variants/all/' + productId).then(res => {
      // console.log(res.data.data);
      // if (res.data.status === 1)
      //   this.setState({ fetchedData: res.data.data })
      // else
      //   this.setState({ fetchedData: [] })

      if (res.data.status === 1)
        this.setState({
          fetchedData: res.data.data.variants,
          filteredData: res.data.data.variants,
          productId: productId,
          productName: res.data.data.productName
        })
      else {
        this.setState({
          error: 'No data found',
          fetchedData: [],
        })
      }

    })
  }

  toggleActive(data, index) {
    let payload = { data: { isActive: data[index].isActive } }
    axios.delete('admin/products/variants/' + data[index].id, payload).then(res => {
      if (res.data.status === 1)
        this.setState({ fetchedData: data });
      else
        alert('Something went wrong!!')
    })
  }

  editDatahandler(data) {
    console.log(this.props);
    console.log(this.state.filteredData[data]);
    this.props.history.push('/variant/' + this.state.filteredData[data].id + '/edit')
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
}

export default ProductVariant;
