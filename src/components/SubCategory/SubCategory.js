import React, { Component } from "react";
import axios from "../../config/axios";
import { Link } from "react-router-dom";
import { decryptData, encryptData } from '../../util/encryption';

import Spinner from "../../UI/Spinner";

class SubCategory extends Component {
  state = {
    searchText: "",
    fetchedData: undefined,
    filteredData: undefined,
  };

  changeActiveHandler = (index) => {
    let data = this.state.fetchedData;
    let rowData = data[index];
    rowData.isActive = rowData.isActive === 1 ? 0 : 1;
    data[index] = rowData;

    // this.setState({ fetchedData: data });
    this.toggleActive(data, index);
  };

  render() {
    // debugger
    console.log(this.props);
    let empdata = [];
    if (this.state.filteredData)
      empdata = this.state.filteredData.map((data, index) => {
        return (
          <tr key={data.id}>
            <td>{data.id}</td>
            <td>
              <Link to={"/product/" + data.subCategoryId} className="link">
                {data.subCategoryId}
              </Link>
            </td>
            <td>{data.name}</td>
            <td>{data.createdat}</td>
            <td style={{ width: "20%" }}>
              <button
                onClick={() => this.editDatahandler(index)}
                className="btn-action blue"
              >
                <i className="fa fa-edit" aria-hidden="true"></i>
              </button>
              <button
                onClick={() => this.changeActiveHandler(index)}
                className={
                  data.isActive === 1 ? "btn-action red" : "btn-action green"
                }
              >
                <i
                  className={
                    data.isActive === 1 ? "fa fa-remove" : "fa fa-plus"
                  }
                  aria-hidden="true"
                ></i>
              </button>
            </td>

            {/* <td>
                            <button onClick={() => this.changeActiveHandler(index)}
                                className={data.isActive === 1 ? 'btn btn-danger' : 'btn btn-success'}>
                                {data.isActive === 1 ? 'De-activate' : 'Activate'}
                            </button>
                            {/* {data.createdat} 
                        </td> */}
          </tr>
        );
      });

    return (
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-3 pull-left">
                <span
                  className="btn btn-primary pull-left"
                  onClick={this.props.history.goBack}
                >
                  Back
                </span>
              </div>

              <div className="col-md-6 pull-left">
                <div className="input-group no-border">
                  <input
                    type="text"
                    value={this.state.searchText}
                    className="form-control"
                    placeholder="Search..."
                    onChange={this.searchHandler}
                  />
                  <i className="search-material-icons material-icons">search</i>
                  {/* <button className="btn btn-white btn-round btn-just-icon">
                                            <div className="ripple-container"></div>
                                        </button> */}
                </div>
              </div>

              <div className="col-md-3 pull-right">
                <Link
                  className="btn btn-success pull-right"
                  to={this.props.match.url + "/add"}
                >
                  Add New
                </Link>
              </div>
            </div>

            <div className="col-md-12">
              <div className="card">
                <div className="card-header card-header-primary">
                  <h4 className="card-title ">SubCategory Details</h4>
                  <p className="card-category"> List of SubCategories </p>
                </div>
                {!this.state.fetchedData ? (
                  <Spinner />
                ) : (
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table">
                        <thead className=" text-primary">
                          <tr>
                            <th>ID</th>
                            <th>subCategoryId</th>
                            <th>Name</th>
                            <th>createdat</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>{empdata}</tbody>
                      </table>
                      {empdata.length === 0 ? "No Rows" : null}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const categoryId = this.props.match.params.catid;
    axios.get("admin/subcategories/cat/" + categoryId).then((response) => {
      const res = decryptData(response.data);
      if (res.status === 1)
        this.setState({
          fetchedData: res.data,
          filteredData: res.data,
        });
      else {
        this.setState({ fetchedData: [], error: "No data found" });
      }
    });
  }

  toggleActive(Cdata, index) {
    let payload = { isActive: Cdata[index].isActive };
    let data = encryptData(payload);
    const formData = {
      data,
    };
    axios
      .delete("admin/subcategories/" + Cdata[index].id,  {data: formData})
      .then((response) => {
        const res = decryptData(response.data);
        if (res.status === 1)
          this.setState({
            fetchedData: Cdata,
            filteredData: Cdata,
          });
        else alert("Something went wrong!!");
      });
  }

  searchHandler = (e) => {
    let inputData = e.target.value;

    let data = this.state.fetchedData;
    let filteredData = data.filter((val) => {
      return val.name.toLowerCase().includes(inputData.toLowerCase());
    });
    this.setState({
      searchText: inputData,
      filteredData: filteredData,
    });
  };

  editDatahandler(data) {
    console.log(this.props);
    console.log(this.state.filteredData[data]);
    this.props.history.push(
      "/subcategory/" + this.state.filteredData[data].id + "/edit"
    );
  }
}

export default SubCategory;
