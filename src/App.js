import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';
import Sidebar from './UI/Sidebar';
import Header from './UI/Header';
import Index from './components/Index';
import Category from './components/Category/Category';
import AddCategory from './components/Category/AddCategory';
import SubCategory from './components/SubCategory/SubCategory';
import AddSubCategory from './components/SubCategory/AddSubCategory';
import Footer from './components/Footer';
import Product from './components/Product/Product';
import AddProduct from './components/Product/AddProduct';
import ProductVariant from './components/ProductVariant/ProductVariant';
import AddProductVariant from './components/ProductVariant/AddProductVariant';

import Orders from './components/Orders';



class App extends Component {
  state = {
    employeeData: [
      { id: 1, name: "Dakota Rice", country: "Niger", city: "Oud-Turnhout", salary: "$36,738" },
      { id: 2, name: "Minerva Hooper", country: "Curaçao", city: "Sinaai-Waas", salary: "$23,789" },
      { id: 3, name: "Sage Rodriguez", country: "Netherlands", city: "Baileux", salary: "$56,142" },
      { id: 4, name: "Philip Chaney", country: "Korea, South", city: "Overland Park", salary: "$38,735" },
      { id: 5, name: "Doris Greene", country: "Malawi", city: "Feldkirchen in Kärnten", salary: "$63,542" },
      { id: 6, name: "Mason Porter", country: "Chile", city: "Gloucester", salary: "$78,615" }

    ],
    filteredData: undefined,
    searchText: '',
    dropdownActive: false
  }
  

  componentDidMount() {
    console.log('Component Did Mount -- App.js')
  }


  render() {
    return (<div className="App">
       <Router>
      <Sidebar />
      <div className="main-panel">
        <Header
          search={this.searchHandler}
          searchText={this.state.searchText} />
       
          <Route path="/" exact component={Index} />
          <Route path="/category/" exact component={Category} />
          <Route path="/category/add" component={AddCategory} />
          <Switch>
            <Route path="/subcategory/:catid/add" component={AddSubCategory} />
            <Route path="/subcategory/:catid" component={SubCategory} />
          </Switch>
          <Switch>
            <Route path="/product/:subcatid/add" component={AddProduct} />
            <Route path="/product/:subcatid" component={Product} />
          </Switch>
          <Switch>
            <Route path="/variant/:prodid/add" component={AddProductVariant} />
            <Route path="/variant/:prodid" component={ProductVariant} />
          </Switch>
          <Route path="/orders/" component={Orders} />


        {/* {this.state.filteredData? <Content data={this.state.filteredData}/> : null} */}
        <Footer />


      </div>
        </Router>
    </div>)
  }

}

export default App;
