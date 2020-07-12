import React, { Component } from "react";
import axios from "../../config/axios";
import { decryptData, encryptData } from "../../util/encryption";

class AddProduct extends Component {
  fileInput = new Date();
  state = {
    name: "",
    description: "",
    price: "",
    offerPrice: "",
    stock: "",
    selectedFile: null,
    tags: "",
    categoryId: "",
    subCategoryId: "",
    productId: "",
    categoryData: [],
    subCategoryData: [],
    error: "",
    editMode: false,
    fileChanged: false,
  };

  componentDidMount() {
    // debugger;

    axios.get("admin/categories/list/all").then((response) => {
      let res = decryptData(response.data);
      // return console.log(res.data)
      if (res.status === 1) {
        let categoryData = res.data;
        // this.setState({categoryData:categoryData});
        if (
          this.props.match.params.subcatid &&
          this.props.match.params.subcatid !== "all"
        )
          axios
            .get(
              "admin/subcategories/categoryid/" +
                this.props.match.params.subcatid
            )
            .then((response) => {
              console.log(response.data);
              let res = decryptData(response.data);
              if (res.status === 1) {
                const responseData = res.data;
                let subCategoryData = categoryData.filter(
                  (data) => data.categoryId === responseData.categoryId
                )[0].subcategories;
                this.setState({
                  categoryId: responseData.categoryId,
                  categoryData: categoryData,
                  subCategoryId: responseData.subCategoryId,
                  subCategoryData: subCategoryData,
                });
              } else alert("Something Went wrong!!");
            });
        else if (this.props.match.params.prodid) {
          axios
            .get("admin/products/" + this.props.match.params.prodid)
            .then((response) => {
              const res = decryptData(response.data);
              if (res.status === 1) {
                let prodData = res.data;
                let subCategoryData = categoryData.filter(
                  (data) => data.categoryId === prodData.categoryId
                )[0].subcategories;
                this.setState({
                  name: prodData.name,
                  description: prodData.description,
                  price: prodData.price,
                  offerPrice: prodData.offerPrice,
                  stock: prodData.stock,
                  selectedFile: {
                    name: prodData.image,
                  },
                  tags: prodData.tags,
                  categoryId: prodData.categoryId,
                  categoryData: categoryData,
                  subCategoryId: prodData.subCategoryId,
                  subCategoryData: subCategoryData,
                  productId: this.props.match.params.prodid,
                  editMode: true,
                });
                // console.log(prodData.categoryId);
              } else {
                alert("Something Went Wrong");
              }
            });
        } else {
          this.setState({
            categoryData: categoryData,
            subCategoryData: categoryData[0].subcategories,
          });
        }
      } else {
        alert("Something went Wrong!!");
      }
      // this.setState({
      //     categoryId: responseData.categoryId,
      //     categoryData: {
      //         categoryId: responseData.categoryId,
      //         categoryName: responseData.categoryName
      //     },
      //     subCategoryData: {
      //         subCategoryId: responseData.subCategoryId,
      //         subCategoryName: responseData.subCategoryName
      //     }
      // })
    });
  }

  render() {
    let categoryOptions = this.state.categoryData.map((data) => (
      <option key={data.categoryId} value={data.categoryId}>
        {data.name}
      </option>
    ));

    let subCategoryOptions = this.state.subCategoryData.map((data) => (
      <option key={data.subCategoryId} value={data.subCategoryId}>
        {data.name}
      </option>
    ));
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
                  <h4 className="card-title ">Add New Product</h4>
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
                          value={this.state.name}
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
                          {this.state.selectedFile
                            ? this.state.selectedFile.name
                            : ""}
                        </span>
                        {/* <input type="file" name="file"
                                                        onChange={this.onFileChangeHandler} /> */}
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
                          value={this.state.description}
                          onChange={this.textChangedHandler}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group bmd-form-group is-filled">
                        <label className="bmd-label-floating">Price</label>
                        <input
                          type="number"
                          className="form-control"
                          name="price"
                          value={this.state.price}
                          onChange={this.textChangedHandler}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group bmd-form-group is-filled">
                        <label className="bmd-label-floating">
                          Offer Price
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          name="offerPrice"
                          value={this.state.offerPrice}
                          onChange={this.textChangedHandler}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group bmd-form-group is-filled">
                        <label className="bmd-label-floating">Stock</label>
                        <input
                          type="number"
                          className="form-control"
                          name="stock"
                          value={this.state.stock}
                          onChange={this.textChangedHandler}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group bmd-form-group is-filled">
                        <label className="bmd-label-floating">Tags</label>
                        <textarea
                          className="form-control"
                          name="tags"
                          value={this.state.tags}
                          onChange={this.textChangedHandler}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group bmd-form-group is-filled">
                        <label className="bmd-label-floating">
                          Category Name
                        </label>
                        <div className="arrow-down"></div>
                        <select
                          className="form-control"
                          name="categoryId"
                          value={this.state.categoryId}
                          onChange={this.dropDownChangedHandler}
                        >
                          <option value="">--Select--</option>
                          {categoryOptions}
                          {/* <option value={this.state.categoryData.categoryId}>{this.state.categoryData.categoryName}</option> */}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group bmd-form-group is-filled">
                        <label className="bmd-label-floating">
                          SubCategory Name
                        </label>
                        <div className="arrow-down"></div>
                        <select
                          className="form-control"
                          name="subCategoryId"
                          value={this.state.subCategoryId}
                          onChange={this.dropDownChangedHandler}
                        >
                          <option value="">--Select--</option>
                          {subCategoryOptions}
                          {/* <option value={this.state.subCategoryData.subCategoryId}>{this.state.subCategoryData.subCategoryName}</option> */}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <span className="text text-danger">
                        {this.state.error}
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
                    {this.state.editMode ? (
                      <button
                        className="btn btn-primary"
                        style={{ width: "25%" }}
                        onClick={this.updateProduct}
                      >
                        Update
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary"
                        style={{ width: "25%" }}
                        onClick={this.addProduct}
                      >
                        Create
                      </button>
                    )}
                  </div>
                  {/*                                   
                                    <div style={{ 'display': 'block' }}>
                                        <button className="btn btn-negative" style={{ 'width': '25%' }}
                                            onClick={this.clearState}>Clear</button>

                                        <button className="btn btn-primary" style={{ 'width': '25%' }}
                                            onClick={this.addCategory}>Create</button>
                                    </div> */}
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

  textChangedHandler = (e) => {
    const controlName = e.target.name;
    const controlValue = e.target.value;
    let data = { ...this.state };
    data[controlName] = controlValue;
    this.setState(data);
  };

  onFileChangeHandler = (event) => {
    let data = this.state.selectedFile;
    data = event.target.files[0];
    this.setState({
      selectedFile: data,
      fileChanged: true,
    });
    console.log(event.target.files[0]);
  };

  clearState = () => {
    this.fileInput = new Date();
    this.setState({
      name: "",
      description: "",
      price: "",
      offerPrice: "",
      stock: "",
      categoryId: "",
      subCategoryId: "",
      selectedFile: null,
      tags: "",
      error: undefined,
    });
  };

  addProduct = () => {
    let payload = {
      name: this.state.name,
      description: this.state.description,
      price: parseFloat(this.state.price),
      offerPrice: parseFloat(this.state.offerPrice),
      stock: parseInt(this.state.stock),
      tags: this.state.tags,
      categoryId: this.state.categoryId,
      subCategoryId: this.state.subCategoryId,
    };
    if (this.state.name.length < 1) {
      this.setState({ error: "Please enter a name" });
    } else if (this.state.description.length < 10) {
      this.setState({ error: "Please enter a description 10 charaters long" });
    } else if (this.state.tags.split(",").length < 2) {
      this.setState({ error: "Please enter minimum 2 tags separated by ," });
    } else if (payload.price < 1) {
      this.setState({ error: "Please enter a name" });
    } else if (
      payload.discountPrice < 1 ||
      payload.discountPrice > payload.price
    ) {
      this.setState({ error: "Please enter correct data" });
    } else if (payload.stock < 1) {
      this.setState({ error: "Please enter valid stock data" });
    } else {
      this.setState({ error: "" });
      let data = encryptData(payload);
      const formData = new FormData();
      formData.append("photo", this.state.selectedFile);
      formData.append("data", data);
      // data.append('description', payload.description)
      // data.append('tags', payload.tags)
      // data.append('categoryId', payload.categoryId)
      // data.append('subCategoryId', payload.subCategoryId)

      axios.post("admin/products", formData).then((response) => {
        // debugger;
        console.log(response.data);
        const res = decryptData(response.data);
        // const res = response.data;
        if (res.status === 1) {
          alert("New Product Added");
          this.props.history.push("/product/" + this.state.subCategoryId);
        } else {
          alert("Error: " + res.message);
        }
      });
    }
  };

  dropDownChangedHandler = (e) => {
    const controlName = e.target.name;
    const controlValue = e.target.value;
    let data;
    if (controlName === "categoryId") {
      data = this.state.categoryData.slice();
      let subCategories = data.filter(
        (cat) => cat.categoryId === controlValue
      )[0]["subcategories"];
      console.log(subCategories);
      this.setState({
        subCategoryData: subCategories,
        categoryId: controlValue,
      });
    } else {
      this.setState({
        subCategoryId: controlValue,
      });
    }
    // let data = { ...this.state }
    // data[controlName] = controlValue
    // this.setState(data);
  };
  toggleActive(data, index) {
    let payload = { data: { isActive: data[index].isActive } };
    axios.delete("admin/categories/" + data[index].id, payload).then((res) => {
      this.setState({
        fetchedData: data,
        filteredData: data,
      });
    });
  }

  updateProduct = () => {
    let payload = {
        name: this.state.name,
        description: this.state.description,
        price: parseFloat(this.state.price),
        offerPrice: parseFloat(this.state.offerPrice),
        stock: parseInt(this.state.stock),
        tags: this.state.tags,
        categoryId: this.state.categoryId,
        subCategoryId: this.state.subCategoryId,
      };
    if (this.state.name.length < 1) {
        this.setState({ error: "Please enter a name" });
      } else if (this.state.description.length < 10) {
        this.setState({ error: "Please enter a description 10 charaters long" });
      } else if (this.state.tags.split(",").length < 2) {
        this.setState({ error: "Please enter minimum 2 tags separated by ," });
      } else if (payload.price < 1) {
        this.setState({ error: "Please enter a name" });
      } else if (
        payload.discountPrice < 1 ||
        payload.discountPrice > payload.price
      ) {
        this.setState({ error: "Please enter correct data" });
      } else if (payload.stock < 1) {
        this.setState({ error: "Please enter valid stock data" });
      } else {
      this.setState({ error: "" });
      let formData;
      if (this.state.fileChanged) {
        let data = encryptData(payload);
        formData = new FormData();
        formData.append("photo", this.state.selectedFile);
        formData.append("data", data);
        // data.append("description", this.state.description);
        // data.append("tags", this.state.tags);
        // data.append("categoryId", this.state.categoryId);
        // data.append("subCategoryId", this.state.subCategoryId);
      } else {
        const temp = encryptData(payload);
        formData = {
            data: temp
        }
      }

      axios
        .put("admin/products/" + this.state.productId, formData)
        .then((response) => {
            const res = decryptData(response.data);
          if (res.status === 1) {
            alert("Product Updated");
            this.props.history.push("/product/" + this.state.subCategoryId);
          } else {
            alert("Error: " + res.message);
          }
        });
    }
  };
}

export default AddProduct;
