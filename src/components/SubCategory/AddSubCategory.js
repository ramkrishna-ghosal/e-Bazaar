import React, { Component } from 'react';
import axios from '../../config/axios';

class AddSubCategory extends Component {
    state = {
        name: '',
        categoryId:'',
        categories:[],
        error: '',
        expanded: false,
        toggleClass: 'dropdown-el'
    }

    render() {
        let options = this.state.categories.map(cat=><option value={cat.categoryId}>{cat.name}</option>)
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
                                    <h4 className="card-title ">Add New Subcategory</h4>
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
                                                <label className="bmd-label-floating">Category Name</label>
                                                <div className="arrow-down"></div>
                                                <select className="form-control" name="categoryId" 
                                                value={this.state.categoryId} onChange={this.categoryChangedHandler}>
                                                    <option value="">--Select--</option>
                                                    {options}
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
                                            onClick={this.addSubCategory}>Create</button>
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

    componentDidMount(){
        this.getAllCategories();
    }
    expandDropdown = () => {
        const newClasses = !this.state.expanded ? 'dropdown-el' : 'dropdown-el expanded';
        this.setState(prevState => ({
            expanded: !prevState.expanded,
            toggleClass:newClasses
        }));
    }
    textChangedHandler = (e) => {
        const controlName = e.target.name;
        const controlValue = e.target.value;
        let data = { ...this.state }
        data[controlName] = controlValue
        this.setState(data);
    }
    categoryChangedHandler = (e) =>{
        const controlName = e.target.name;
        const controlValue = e.target.value;
        let data = { ...this.state }
        data[controlName] = controlValue
        this.setState(data);
    }
    getAllCategories(){
        axios.get('admin/categories').then(response=>{
            console.log(response.data);
            this.setState({categories:response.data.data});
        })
    }
    clearState = () => {
        this.setState({
            name: '',
            description: '',
            error: undefined
        })
    }

    addSubCategory = () => {
        let payload = {
            name:this.state.name,
            categoryId:this.state.categoryId
        };
        if (this.state.name.length < 1) {
            this.setState({ error: 'Please enter a name' })
        }
        else if (this.state.categoryId.length < 1) {
            this.setState({ error: 'Please select a category' })
        }
        else {
            this.setState({ error: '' })
            console.log(payload);
            axios.post('admin/subcategories', payload).then(response => {
                console.log(response.data);
                const res = response.data;
                if (res.status === 1) {
                    alert('New Subcategopry Added')
                    this.props.history.push('/category');
                }
                else {
                    alert("Error: " + res.message)
                }
            })
        }
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

export default AddSubCategory;
