import React from 'react';
import { Route, Switch, withRouter } from "react-router-dom";

import Sidebar from './Sidebar';
import Header from './Header';
import Index from '../components/Dashboard';
import Category from '../components/Category/Category';
import AddCategory from '../components/Category/AddCategory';
import SubCategory from '../components/SubCategory/SubCategory';
import AddSubCategory from '../components/SubCategory/AddSubCategory';
import Footer from '../components/Footer';
import Product from '../components/Product/Product';
import AddProduct from '../components/Product/AddProduct';
import ProductVariant from '../components/ProductVariant/ProductVariant';
import AddProductVariant from '../components/ProductVariant/AddProductVariant';
import Orders from '../components/Orders/Orders';
import OrderDetail from '../components/Orders/OrderDetail';

function Layout(props) {
    console.log(props)
    if (localStorage.getItem('Auth_token') === null || localStorage.getItem('Auth_token') === undefined) {
        props.history.replace('/');
        return null
    }
    return (
        <div className="wrapper ">
            {props.isAuth ? <Sidebar /> : null}

            <div className="main-panel">
                {props.isAuth ? <Header changeLogin={props.changeLogin} /> : null}
                <Route path="/dashboard" component={Index} />
                <Route path="/category/" exact component={Category} />
                <Route path="/category/add" component={AddCategory} />
                <Route path="/category/:id/edit" component={AddCategory} />
                <Switch>
                    <Route path="/subcategory/:catid/add" component={AddSubCategory} />
                    <Route path="/subcategory/:id/edit" component={AddSubCategory} />
                    <Route path="/subcategory/:catid" component={SubCategory} />
                </Switch>
                <Switch>
                    <Route path="/product/:subcatid/add" component={AddProduct} />
                    <Route path="/product/:prodid/edit" component={AddProduct} />
                    {/* <Route path="/product/all" component={Product} /> */}
                    <Route path="/product/:subcatid" component={Product} />

                </Switch>
                <Switch>
                    <Route path="/variant/:prodid/add" component={AddProductVariant} />
                    <Route path="/variant/:variantid/edit" component={AddProductVariant} />
                    <Route path="/variant/:prodid" component={ProductVariant} />
                </Switch>
                <Switch>
                    <Route path="/orders/:id" component={OrderDetail} />
                    <Route path="/orders/" component={Orders} />

                </Switch>
                {/* <Route path='/404' component={My404Component} /> */}



                {/* {this.state.filteredData? <Content data={this.state.filteredData}/> : null} */}
                <Footer />


            </div>
        </div>
    )


}

export default withRouter(Layout);
