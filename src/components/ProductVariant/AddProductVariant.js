import React, { Component } from 'react';
import axios from '../../config/axios';

class AddProductVariant extends Component {
    state = {
        price: '',
        discountPrice: '',
        stock: '',
        label: '',
        productId: '',
        productData:[],
        error: ''
    }

    render() {
      let products=this.state.productData.map(product=><option key={product.productId} value={product.productId}>{product.name}</option>);
        return (
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="col-md-3 pull-left">
                                <span className="btn btn-primary pull-left" onClick={this.props.history.goBack}>Back</span>
                            </div>

                        </div>
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header card-header-primary">
                                    <h4 className="card-title ">Add New Product Variant</h4>
                                    <p className="card-category"></p>
                                </div>
                                <div className="card-body">
                                    {/* <form> */}
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group bmd-form-group is-filled">
                                                <label className="bmd-label-floating">Price</label>
                                                <input type="number" className="form-control" name="price"
                                                    value={this.state.price} onChange={this.textChangedHandler} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group bmd-form-group is-filled">
                                                <label className="bmd-label-floating">DiscountPrice</label>
                                                <input type="number" className="form-control" name="discountPrice"
                                                    value={this.state.discountPrice} onChange={this.textChangedHandler} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group bmd-form-group is-filled">
                                                <label className="bmd-label-floating">Stock</label>
                                                <input type="number" className="form-control" name="stock"
                                                    value={this.state.stock} onChange={this.textChangedHandler} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group bmd-form-group is-filled">
                                                <label className="bmd-label-floating">Label</label>
                                                <textarea className="form-control" name="label"
                                                    value={this.state.label} onChange={this.textChangedHandler} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group bmd-form-group is-filled">
                                                <label className="bmd-label-floating">Product Name</label>
                                                <div className="arrow-down"></div>
                                                <select className="form-control" name="productId"
                                                    value={this.state.productId} onChange={this.dropDownChangedHandler}>
                                                    {products}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <span className="text text-danger">{this.state.error}</span>
                                        </div>
                                    </div>
                                    <div style={{ 'display': 'block' }}>
                                        <button className="btn btn-negative" style={{ 'width': '25%' }}
                                            onClick={this.clearState}>Clear</button>

                                        <button className="btn btn-primary" style={{ 'width': '25%' }}
                                            onClick={this.addProduct}>Create</button>
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

    textChangedHandler = (e) => {
        const controlName = e.target.name;
        const controlValue = e.target.value;
        let data = { ...this.state }
        data[controlName] = controlValue
        this.setState(data);
    }

    clearState = () => {
        this.setState({
          price: '',
          discountPrice: '',
          stock: '',
          label: '',
          error: ''
        })
    }

    addProduct = () => {
        let payload = {
          price: this.state.price,
          discountPrice: this.state.discountPrice,
          stock: this.state.stock,
          label: this.state.label,
          productId: this.state.productId           
        }
        console.log(payload)
        if (this.state.price < 1) {
            this.setState({ error: 'Please enter a name' })
        }
        else if (this.state.discountPrice < 1 || this.state.discountPrice>this.state.price) {
            this.setState({ error: 'Please enter correct data' })
        }
        else if (this.state.label.length < 2) {
            this.setState({ error: 'Please enter a valid label' })
        }
        else if (this.state.stock< 1) {
            this.setState({ error: 'Please enter valid stock data' })
        }
        else {
            this.setState({ error: '' })
            axios.post('admin/products/variants', payload).then(response => {
                console.log(response.data);
                const res = response.data;
                if (res.status === 1) {
                    alert('New Product Variant Added')
                    this.props.history.push('/category');
                }
                else {
                    alert("Error: " + res.message)
                }
            })
        }
    }

    componentDidMount() {
      this.setState({ productId: this.props.match.params.prodid })
      axios.get('admin/products/').then(response => {
          const responseData = response.data.data.map(product=>product = {productId:product.productId,name:product.name});
          console.log(responseData);
          this.setState({productData:responseData});
      })
    }
    dropDownChangedHandler = (e) => {
        const controlName = e.target.name;
        const controlValue = e.target.value;
        let data = { ...this.state }
        data[controlName] = controlValue
        this.setState(data);
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

export default AddProductVariant;
