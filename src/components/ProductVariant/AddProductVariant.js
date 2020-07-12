import React, { Component } from 'react';
import axios from '../../config/axios';

class AddProductVariant extends Component {
    fileInput = new Date();
    state = {
        name: '',
        image: '',
        price: '',
        discountPrice: '',
        stock: '',
        selectedFile: null,
        productId: '',
        productData: [],
        variantId: '',
        error: '',
        fileChanged: false,
        editMode: false,
        heading: 'Add New Product Variant'
    }

    onFileChangeHandler = event => {
        this.setState({
            selectedFile: event.target.files[0],
            fileChanged:true
        })
        console.log(event.target.files[0])
    }
    render() {
        let products = this.state.productData.map(product => <option key={product.productId} value={product.productId}>{product.name}</option>);
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
                                    <h4 className="card-title ">{this.state.heading}</h4>
                                    <p className="card-category"></p>
                                </div>
                                <div className="card-body">
                                    {/* <form> */}
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group bmd-form-group is-filled">
                                                <label className="bmd-label-floating">Name</label>
                                                <input type="text" className="form-control" name="name"
                                                    value={this.state.name} onChange={this.textChangedHandler} />
                                            </div>
                                        </div>
                                    </div>

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
                                            <div className="form-group bmd-form-group is-filled">
                                                <label className="bmd-label-floating">Image</label>

                                                <div className="upload-btn-wrapper">
                                                    <button className="btn btn-upload" onClick={() => { document.getElementsByName('file')[0].click() }}>Upload a file</button>
                                                    <input type="file" name="file" key={this.fileInput} onChange={this.onFileChangeHandler} />
                                                </div>
                                                <span className="form-control">{this.state.selectedFile ? this.state.selectedFile.name : ''}</span>
                                                {/* <input type="file" name="file"
                                                        onChange={this.onFileChangeHandler} /> */}

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
                                        {this.state.editMode ?
                                            <button className="btn btn-primary" style={{ 'width': '25%' }}
                                                onClick={this.updateProductVariant}>Update</button> :
                                            <button className="btn btn-primary" style={{ 'width': '25%' }}
                                                onClick={this.addProductVariant}>Create</button>
                                        }



                                    </div>

                                    {/* <div style={{ 'display': 'block' }}>
                                        <button className="btn btn-negative" style={{ 'width': '25%' }}
                                            onClick={this.clearState}>Clear</button>

                                        <button className="btn btn-primary" style={{ 'width': '25%' }}
                                            onClick={this.addProduct}>Create</button>
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
        let data = { ...this.state }
        data[controlName] = controlValue
        this.setState(data);
    }

    clearState = () => {
        this.fileInput = new Date();
        this.setState({
            name: '',
            price: '',
            selectedFile: null,
            discountPrice: '',
            stock: '',
            error: ''
        })
    }

    addProductVariant = () => {
        let payload = {
            name: this.state.name,
            price: parseFloat(this.state.price),
            discountPrice: parseFloat(this.state.discountPrice),
            stock: parseInt(this.state.stock),
            productId: this.state.productId
        }
        // console.log(payload)
        if (this.state.name < 2) {
            this.setState({ error: 'Please enter a valid Name' })
        }
        else if (payload.price < 1) {
            this.setState({ error: 'Please enter a name' })
        }
        else if (payload.discountPrice < 1 || payload.discountPrice > payload.price) {
            this.setState({ error: 'Please enter correct data' })
        }
        else if (payload.stock < 1) {
            this.setState({ error: 'Please enter valid stock data' })
        }
        else {
            this.setState({ error: '' })
            const data = new FormData()
            data.append('photo', this.state.selectedFile)
            data.append('name', payload.name)
            data.append('price', payload.price)
            data.append('discountPrice', payload.discountPrice)
            data.append('stock', payload.stock)
            data.append('productId', payload.productId)
            axios.post('admin/products/variants', data).then(response => {
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
        // this.setState({ productId: this.props.match.params.prodid })
        // if(this.props.match.params.prodid)
        axios.get('admin/products/').then(response => {
            const responseData = response.data.data.map(product => product = { productId: product.productId, name: product.name });
            console.log(responseData);
            if (this.props.match.params.variantid)
                axios.get('admin/products/variants/' + this.props.match.params.variantid).then(response => {
                    console.log(response.data)
                    let variantData = response.data.data;
                    this.setState({
                        productData: responseData,
                        productId: this.props.match.params.prodid,
                        name: variantData.name,
                        selectedFile: {
                            name: variantData.image
                        },
                        price: variantData.price,
                        discountPrice: variantData.discountPrice,
                        stock: variantData.stock,
                        variantId: this.props.match.params.variantid,
                        editMode: true
                    });
                })
            else
                this.setState({
                    productData: responseData,
                    productId: this.props.match.params.prodid
                });

        })
    }

    dropDownChangedHandler = (e) => {
        const controlName = e.target.name;
        const controlValue = e.target.value;
        let data = { ...this.state }
        data[controlName] = controlValue
        this.setState(data);
    }

    updateProductVariant = () => {

        // console.log(payload)
        if (this.state.name < 2) {
            this.setState({ error: 'Please enter a valid Name' })
        }
        else if (parseFloat(this.state.price) < 1) {
            this.setState({ error: 'Please enter a name' })
        }
        else if (parseFloat(this.state.discountPrice) < 1 || parseFloat(this.state.discountPrice) > parseFloat(this.state.price)) {
            this.setState({ error: 'Please enter correct data' })
        }
        else if (this.state.stock < 1) {
            this.setState({ error: 'Please enter valid stock data' })
        }
        else {
            this.setState({ error: '' })
            // debugger
            let data;
            if (this.state.fileChanged) {
                data = new FormData()
                data.append('photo', this.state.selectedFile)
                data.append('name', this.state.name)
                data.append('price', this.state.price)
                data.append('discountPrice', this.state.discountPrice)
                data.append('stock', this.state.stock)
                data.append('productId', this.state.productId)
            }
            else {
                data = {
                    name: this.state.name,
                    price: parseFloat(this.state.price),
                    discountPrice: parseFloat(this.state.discountPrice),
                    stock: parseInt(this.state.stock),
                    productId: this.state.productId
                }
            }
            axios.put('admin/products/variants/' + this.state.variantId, data).then(response => {
                console.log(response.data);
                const res = response.data;
                if (res.status === 1) {
                    alert('Product Variant Updated')
                    this.props.history.push('/category');
                }
                else {
                    alert("Error: " + res.message)
                }
            })
        }
    }
}

    export default AddProductVariant;
