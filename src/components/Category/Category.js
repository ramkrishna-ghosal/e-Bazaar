import React, { Component } from "react";
import { Link } from "react-router-dom";
import { decryptData, encryptData } from '../../util/encryption';

import config from "../../config/config";
import axios from "../../config/axios";
import Spinner from "../../UI/Spinner";
class Category extends Component {
  state = {
    searchText: "",
    fetchedData: undefined,
    filteredData: undefined,
  };

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

  changeActiveHandler = (index) => {
    let data = this.state.fetchedData.slice();
    let rowData = data[index];
    rowData.isActive = rowData.isActive === 1 ? 0 : 1;
    data[index] = rowData;

    this.toggleActive(data, index);
  };

  render() {
    let empdata = [];
    if (this.state.filteredData)
      empdata = this.state.filteredData.map((data, index) => {
        return (
          <tr key={data.id}>
            <td style={{ width: "15%" }}>
              {data.image !== "" ? (
                <img
                  src={config.baseURL + data.image}
                  alt={data.name}
                  style={{ width: "60px" }}
                />
              ) : null}
            </td>
            <td style={{ width: "15%" }}>
              <Link to={"/subcategory/" + data.categoryId} className="link">
                {data.name}
              </Link>
            </td>
            <td style={{ width: "50%", textOverflow: "ellipsis" }}>
              {data.description}
            </td>
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
          </tr>
        );
      });

    // if(empdata.length==0){
    //     empdata =
    // }

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
                  <h4 className="card-title ">Category Details</h4>
                  <p className="card-category"> List of Categories </p>
                </div>
                <div className="card-body">
                  {!this.state.fetchedData ? (
                    <Spinner />
                  ) : (
                    <div className="table-responsive">
                      <table className="table">
                        <thead className=" text-primary">
                          <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>{empdata}</tbody>
                      </table>
                      {empdata.length === 0 ? "No Rows" : null}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    axios.get("admin/categories/").then((response) => {
      // debugger
      const res = decryptData(response.data);
      if (res.status === 1)
        this.setState({
          fetchedData: res.data,
          filteredData: res.data,
        });
      else {
        this.setState({ error: "No data found" });
      }
      // console.log(res.data)
    });
  }

  editDatahandler(data) {
    console.log(this.props);
    console.log(this.state.filteredData[data]);
    this.props.history.push(
      this.props.match.url + "/" + this.state.filteredData[data].id + "/edit"
    );
  }

  toggleActive(Cdata, index) {
    let payload = { isActive: Cdata[index].isActive };
    let data = encryptData(payload);
    const formData = {
      data,
    };

    axios
      .delete("admin/categories/" + Cdata[index].id, {data: formData})
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
}

export default Category;
