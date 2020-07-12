import React, { Component } from "react";
import axios from "../../config/axios";

import { decryptData, encryptData } from '../../util/encryption';

class AddCategory extends Component {
  fileInput = new Date();
  state = {
    UIState: {
      headerName: "",
      editItemId: undefined,
      editMode: false,
    },
    formData: {
      name: "",
      description: "",
      selectedFile: null,
      fileChanged: false,
      error: "",
    },
  };

  render() {
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
            </div>
            <div className="col-md-12">
              <div className="card">
                <div className="card-header card-header-primary">
                  <h4 className="card-title ">
                    {this.state.UIState.headerName}
                  </h4>
                  <p className="card-category"></p>
                </div>
                <div className="card-body">
                  {/* <form> */}
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group bmd-form-group is-filled">
                        <label className="bmd-label-floating">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={this.state.formData.name}
                          onChange={this.textChangedHandler}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group bmd-form-group is-filled">
                        <label className="bmd-label-floating">
                          Description
                        </label>
                        <textarea
                          className="form-control"
                          name="description"
                          value={this.state.formData.description}
                          onChange={this.textChangedHandler}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group bmd-form-group is-filled">
                        <label className="bmd-label-floating">Image</label>

                        <div className="upload-btn-wrapper">
                          <button
                            className="btn btn-upload"
                            onClick={() => {
                              document.getElementsByName("file")[0].click();
                            }}
                          >
                            Upload a file
                          </button>
                          <input
                            type="file"
                            name="file"
                            key={this.fileInput}
                            onChange={this.onFileChangeHandler}
                          />
                        </div>
                        <span className="form-control">
                          {this.state.formData.selectedFile
                            ? this.state.formData.selectedFile.name
                            : ""}
                        </span>
                        {/* <input type="file" name="file"
                                                        onChange={this.onFileChangeHandler} /> */}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <span className="text text-danger">
                        {this.state.formData.error}
                      </span>
                    </div>
                  </div>
                  <div style={{ display: "block" }}>
                    <button
                      className="btn btn-negative"
                      style={{ width: "25%" }}
                      onClick={this.clearState}
                    >
                      Clear
                    </button>
                    {this.state.UIState.editMode ? (
                      <button
                        className="btn btn-primary"
                        style={{ width: "25%" }}
                        onClick={this.updateCategory}
                      >
                        Update
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary"
                        style={{ width: "25%" }}
                        onClick={this.addCategory}
                      >
                        Create
                      </button>
                    )}
                  </div>
                  <div className="clearfix"></div>
                  {/* </form> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      axios
        .get("admin/categories/" + this.props.match.params.id)
        .then((response) => {
          // response = decryptData(response.data);
          let res = decryptData(response.data);
          const data = res.data;
          this.setState({
            UIState: {
              editItemId: this.props.match.params.id,
              editMode: true,
              headerName: "Edit Category",
            },
            formData: {
              name: data.name,
              description: data.description,
              selectedFile: {
                name: data.image,
              },
            },
          });
        });
    } else {
      this.setState({
        UIState: {
          headerName: "Add New Category",
        },
      });
    }
    console.log(this.props.match.params.id);
  }

  onFileChangeHandler = (event) => {
    let data = { ...this.state.formData };
    data.selectedFile = event.target.files[0];
    data.fileChanged = true;
    this.setState({
      formData: data,
    });
    console.log(event.target.files[0]);
  };

  textChangedHandler = (e) => {
    const controlName = e.target.name;
    const controlValue = e.target.value;
    let data = { ...this.state.formData };
    data[controlName] = controlValue;
    this.setState({
      formData: data,
    });
  };

  clearState = () => {
    this.fileInput = new Date();
    this.setState({
      formData: {
        name: "",
        description: "",
        error: "",
      },
    });
  };

  addCategory = () => {
    let payload = { ...this.state.formData };
    if (payload.name.length < 1) {
      this.setState({ error: "Please enter a name" });
    } else if (payload.description.length < 10) {
      this.setState({ error: "Please enter a description 10 charaters long" });
    } else {
      // let data = crypto.AES.encrypt(
      //   JSON.stringify(payload),
      //   config.key
      // ).toString();
      let data = encryptData(payload);
      const formData = new FormData();
      formData.append("photo", this.state.formData.selectedFile);
      formData.append("data", data);
      //   formData.append("name", payload.name);
      //   formData.append("description", payload.description);
      axios.post("admin/categories", formData).then((response) => {
        const res = decryptData(response.data);
        //  = response.data;
        if (res.status === 1) {
          alert("New Categopry Added");
          this.props.history.push("/category");
        } else {
          alert("Error: " + res.message);
        }
      });
    }
  };

  updateCategory = () => {
    let payload = { ...this.state.formData };
    if (payload.name.length < 1) {
      this.setState({ error: "Please enter a name" });
    } else if (payload.description.length < 10) {
      this.setState({ error: "Please enter a description 10 charaters long" });
    } else {
      let formData;
      if (this.state.formData.fileChanged) {
        // let data = crypto.AES.encrypt(
        //   JSON.stringify(payload),
        //   config.key
        // ).toString();
        let data = encryptData(payload);
        formData = new FormData();
        formData.append("photo", this.state.formData.selectedFile);
        formData.append("data", data);
        // data.append("name", payload.name);
        // data.append("description", payload.description);
      } else {
        // let data = crypto.AES.encrypt(
        //   JSON.stringify({
        //     name: payload.name,
        //     description: payload.description,
        //   }),
        //   config.key
        // ).toString();
        let data = encryptData({
          name: payload.name,
          description: payload.description,
        })
        formData = {
          data,
        };
      }
      axios
        .put("admin/categories/" + this.state.UIState.editItemId, formData)
        .then((response) => {
          // debugger
          let res = decryptData(response.data);
          if (res.status === 1) {
            alert("Category Updated");
            this.props.history.push("/category");
          } else {
            alert("Error: " + res.message);
          }
        });
    }
  };
}

export default AddCategory;
