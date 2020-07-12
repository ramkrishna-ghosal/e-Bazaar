import React, { Component } from "react";
import axios from "../../config/axios";

import { Link } from "react-router-dom";
import { encryptData, decryptData } from "../../util/encryption";

// import config from "../../config/config";
import Spinner from "../../UI/Spinner";
import Modal from "../../UI/Modal";

class Orders extends Component {
  state = {
    searchText: "",
    fetchedData: undefined,
    filteredData: undefined,
    showModal: false,
    modalData: undefined,
    trackingCompany: "",
    trackingId: "",
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

  changeStatusHandler = (index, status) => {
    let data = this.state.fetchedData.slice();
    let rowData = data[index];
    rowData.orderStatus = status;
    data[index] = rowData;
    let payload = { data: encryptData({ status }) };
    axios
      .delete("admin/orders/" + data[index].id, { data: payload })
      .then((res) => {
        const response = decryptData(res.data);
        if (response.status === 1) {
          this.setState({
            fetchedData: data,
            filteredData: data,
          });
        }
      });
    // this.toggleActive(data, index);
  };

  changeVisible = (id, key, flag) => {
    console.log(id);
    let data = this.state.filteredData.slice();
    if (key === "address") {
      data[id].addressisOpen = flag;
    } else {
      data[id].trackingisOpen = flag;
    }
    this.setState({
      filteredData: data,
    });
  };

  showModal = (index) => {
    // this.setState
    let data = this.state.filteredData.slice()[index];

    this.setState({ showModal: true, modalData: data });
  };

  hideModal = () => {
    this.setState({
      showModal: false,
      modalData: undefined,
      trackingCompany: "",
      trackingId: "",
    });
  };

  selectedCourier = (e) => {
    this.setState({
      trackingCompany: e.target.value,
    });
  };

  trackingUpdate = (e) => {
    this.setState({
      trackingId: e.target.value,
    });
  };

  handleUpdate = () => {
    console.log("Update");
    console.log(this.state.trackingId, this.state.trackingCompany);
    if (
      this.state.trackingId.trim() === "" ||
      this.state.trackingCompany.trim() === ""
    ) {
      alert("Please Enter the data");
      return;
    }
    // let edata = crypto.AES.encrypt(
    //   JSON.stringify({
    //     trackingNo:
    //       this.state.trackingId.trim() +
    //       "#" +
    //       this.state.trackingCompany.trim(),
    //   }),
    //   config.key
    // ).toString();
    let edata = encryptData({
      trackingNo:
        this.state.trackingId.trim() + "#" + this.state.trackingCompany.trim(),
    });
    let param = { data: edata };
    axios.put("admin/orders/" + this.state.modalData.id, param).then((res) => {
      const response = decryptData(res.data);
      if (response.status === 1) {
        const data = this.state.filteredData.filter(
          (x) => x.id === this.state.modalData.id
        )[0];
        data.orderStatus = "Shipped";
        data.trackingNo = param.trackingNo;

        const newData = this.state.filteredData.map((x) => {
          if (x.id === this.state.modalData.id) {
            return data;
          }
          return x;
        });
        this.setState({
          filteredData: newData,
          fetchedData: newData,
        });
        this.hideModal();
      }
    });
    // this.``
  };
  render() {
    let empdata = [];
    if (this.state.filteredData)
      empdata = this.state.filteredData.map((data, index) => {
        return (
          <tr key={data.id}>
            <td>{data.id}</td>
            <td>
              {/* <Link to={"/subcategory/" + data.categoryId}>{data.categoryId}</Link> */}
              <Link to={"/orders/" + data.id}>{data.orderNo}</Link>
            </td>
            <td>
              <button
                onMouseEnter={() => this.changeVisible(index, "address", true)}
                onMouseLeave={() => this.changeVisible(index, "address", false)}
              >
                {data.contactPersonName}
                <span className="caret"></span>
              </button>
              {data.addressisOpen ? (
                <div className="table-dropdown">
                  <ul>
                    <li>{data.deliveryAddress}</li>
                    <li>{data.contactPersonPhone}</li>
                  </ul>
                </div>
              ) : null}
            </td>
            <td>{data.payment}</td>
            <td>
              <p
                onMouseEnter={() => this.changeVisible(index, "track", true)}
                onMouseLeave={() => this.changeVisible(index, "track", false)}
              >
                {data.orderStatus}
              </p>
              {data.trackingisOpen && data.trackingNo ? (
                <div className="table-dropdown">
                  <ul>
                    <li>Courier Company: {data.trackingNo.split("#")[1]}</li>
                    <li>Tracking# {data.trackingNo.split("#")[0]}</li>
                  </ul>
                </div>
              ) : null}
            </td>
            <td>
              {data.orderStatus === "Placed" ? (
                <button
                  onClick={() => this.changeStatusHandler(index, "Confirmed")}
                  className="btn btn-success btn-tbl"
                >
                  Confirm
                </button>
              ) : null}
              {data.orderStatus === "Placed" ? (
                <button
                  onClick={() => this.changeStatusHandler(index, "Cancelled")}
                  className="btn btn-danger btn-tbl"
                >
                  Cancel
                </button>
              ) : null}
              {data.orderStatus === "Confirmed" ? (
                <button
                  onClick={() => this.showModal(index)}
                  className="btn btn-secondary btn-tbl"
                >
                  Set AWB
                </button>
              ) : null}
              {data.orderStatus === "Shipped" ? (
                <button
                  onClick={() => this.changeStatusHandler(index, "Completed")}
                  className="btn btn-success btn-tbl"
                >
                  FulFilled
                </button>
              ) : null}
            </td>
          </tr>
        );
      });

    // if(empdata.length==0){
    //     empdata =
    // }

    return (
      <>
        <Modal show={this.state.showModal}>
          <p className="modal-heading">Enter Shipping Information</p>
          <div className="text-table-div input-label">Order No.</div>
          <div className="text-table-div">
            {this.state.modalData ? (
              <input
                type="text"
                className="input-100-pc"
                value={this.state.modalData.orderNo}
                readOnly
              />
            ) : (
              "&nbsp"
            )}
          </div>
          <div className="text-table-div input-label">Address</div>
          <div className="text-table-div">
            {this.state.modalData ? (
              <input
                type="text"
                className="input-100-pc"
                value={this.state.modalData.deliveryAddress}
                readOnly
              />
            ) : (
              "&nbsp"
            )}
          </div>
          <div className="text-table-div input-label">Tracking No.</div>
          <div className="text-table-div">
            <input
              type="text"
              className="input-100-pc"
              value={this.state.trackingId}
              onChange={this.trackingUpdate}
            />
          </div>

          <div className="text-table-div input-label">Courier</div>
          <div className="text-table-div">
            <select
              className="input-100-pc"
              value={this.state.trackingCompany}
              onChange={this.selectedCourier}
            >
              <option value="">--Select--</option>
              <option value="Blue Dart">Blue Dart</option>
              <option value="Fed Ex">Fed Ex</option>
              <option value="India Post">India Post</option>
            </select>
          </div>
          <div>
            <button className="btn btn-danger" onClick={this.hideModal}>
              close
            </button>
            <button className="btn btn-primary" onClick={this.handleUpdate}>
              Update
            </button>
          </div>
        </Modal>
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-6 pull-right">
                  <form className="navbar-form">
                    <div className="input-group no-border">
                      <input
                        type="text"
                        value={this.state.searchText}
                        className="form-control"
                        placeholder="Search..."
                        onChange={this.searchHandler}
                      />
                      <button
                        type="submit"
                        className="btn btn-white btn-round btn-just-icon"
                      >
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
                    <h4 className="card-title ">Orders Details</h4>
                    <p className="card-category"> List of All Orders </p>
                  </div>
                  <div className="card-body">
                    {!this.state.fetchedData ? (
                      <Spinner />
                    ) : (
                      <div className="table-responsive">
                        <table className="table">
                          <thead className=" text-primary">
                            <tr>
                              <th>ID</th>
                              <th>Order#</th>
                              <th>Delivery Contact</th>
                              <th>Payment</th>
                              <th>Status</th>
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
      </>
    );
  }
  componentDidMount() {
    axios.get("admin/orders/").then((response) => {
      debugger;
      let data = decryptData(response.data);
      // let data = res.data.data;
      for (const x of data.data) {
        x.deliveryAddress.replace("'g", '"g');
        let temp = JSON.parse(x.deliveryAddress);
        x.deliveryAddress =
          temp.houseno +
          ", " +
          temp.address1 +
          ", " +
          temp.address2 +
          ", " +
          temp.area +
          " - " +
          temp.pincode;
        x.contactPersonName = temp.contactPersonName;
        x.contactPersonPhone = temp.contactPersonPhone;
        x.addressisOpen = false;
        x.trackingisOpen = false;
      }
      this.setState({
        fetchedData: data.data,
        filteredData: data.data,
      });
      // console.log(res.data.data)
    });
  }
}

export default Orders;
