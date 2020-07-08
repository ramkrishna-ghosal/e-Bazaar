import React, { Component } from 'react';
import axios from '../../config/axios';

class AddProduct extends Component {
    state = {
        name: '',
        description: '',
        tags: '',
        categoryId: '',
        subCategoryId: '',
        categoryData: {
            categoryId: '',
            categoryName: ''
        },
        subCategoryData: {
            subCategoryId: '',
            subCategoryName: ''
        },
        error: ''
    }

    componentDidMount() {
        this.setState({ subCategoryId: this.props.match.params.subcatid })
        axios.get('admin/subcategories/categoryid/' + this.props.match.params.subcatid).then(response => {
            console.log(response.data);
            const responseData = response.data.data;
            this.setState({
                categoryId: responseData.categoryId,
                categoryData: {
                    categoryId: responseData.categoryId,
                    categoryName: responseData.categoryName
                },
                subCategoryData: {
                    subCategoryId: responseData.subCategoryId,
                    subCategoryName: responseData.subCategoryName
                }
            })
        })
    }

    render() {
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
                                    <h4 className="card-title ">Add New Product</h4>
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
                                                <label className="bmd-label-floating">Description</label>
                                                <textarea className="form-control" name="description"
                                                    value={this.state.description} onChange={this.textChangedHandler} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group bmd-form-group is-filled">
                                                <label className="bmd-label-floating">Tags</label>
                                                <textarea className="form-control" name="tags"
                                                    value={this.state.tags} onChange={this.textChangedHandler} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group bmd-form-group is-filled">
                                                <label className="bmd-label-floating">Category Name</label>
                                                <div className="arrow-down"></div>
                                                <select className="form-control" name="categoryId"
                                                    value={this.state.categoryId} onChange={this.dropDownChangedHandler}>
                                                    <option value={this.state.categoryData.categoryId}>{this.state.categoryData.categoryName}</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group bmd-form-group is-filled">
                                                <label className="bmd-label-floating">SubCategory Name</label>
                                                <div className="arrow-down"></div>
                                                <select className="form-control" name="subCategoryId"
                                                    value={this.state.subCategoryId} onChange={this.dropDownChangedHandler}>
                                                    <option value={this.state.subCategoryData.subCategoryId}>{this.state.subCategoryData.subCategoryName}</option>
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
                                            onClick={this.addCategory}>Create</button>
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
            name: '',
            description: '',
            tags:'',
            error: undefined
        })
    }

    addCategory = () => {
        let payload = {
            name: this.state.name,
            description: this.state.description,
            tags: this.state.tags,
            image:'image/image1.jpg',
            categoryId: this.state.categoryId,
            subCategoryId: this.state.subCategoryId,
        }
        if (this.state.name.length < 1) {
            this.setState({ error: 'Please enter a name' })
        }
        else if (this.state.description.length < 10) {
            this.setState({ error: 'Please enter a description 10 charaters long' })
        }
        else if (this.state.tags.split(',').length < 2) {
            this.setState({ error: 'Please enter minimum 2 tags separated by ,' })
        }
        // else if(this.state.description.length<10){
        //     this.setState({error:'Please enter a description 10 charaters long'})
        // }
        else {
            this.setState({ error: '' })
            axios.post('admin/products', payload).then(response => {
                console.log(response.data);
                const res = response.data;
                if (res.status === 1) {
                    alert('New Product Added')
                    this.props.history.push('/category');
                }
                else {
                    alert("Error: " + res.message)
                }
            })
        }
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

export default AddProduct;
