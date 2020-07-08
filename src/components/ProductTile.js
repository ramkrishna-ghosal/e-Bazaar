import React, { Component } from 'react';

import axios from 'axios';
class ProductTile extends Component {
    // state = {
    //     searchText: '',
    //     categoryId:'',
    //     productList:undefined
    // }

    componentDidMount(){
        // this.setState({categoryId:this.props.match.params.catid})
        // this.fetchCategoryProducts(this.props.match.params.catid);
        // console.log(this.props.match.params.catid);
        console.log(this.props.product);
    }
    render() {
        return (
            <a className="product__wrapper" href="/">
                <div className="plp-product">
                    <div className="plp-product__offer">31% OFF</div>
                    <div className="plp-product__offer display--none">
                        ₹ 190 Off
                
                                </div>
                    <div className="plp-product__img ">
                        <img className="img animated fadeIn" src={this.props.product.image} alt="" />
                    </div>
                    <div className="plp-product__name " title="Glonuts American Almonds">
                        <div className="LinesEllipsis  plp-product__name--box">
                            {this.props.product.name}
                                        <wbr /></div>
                    </div>
                    <div className="plp-product__quantity" title="500 gm">
                        <span>{this.props.product.description}</span>
                    </div>
                    <div className="plp-product__price">
                        <div className="plp-product__price--container">
                            <div className="display--inline-block@mobile">
                                <span className="plp-product__price--new">
                                    ₹ 405
            
                                            </span>
                            </div>
                            <div className="plp-product__price--old display--inline-block@mobile">
                                ₹ 595
            
                                        </div>
                        </div>
                    </div>
                    <div className="plp-product__add-to-cart">
                        <div className="add-to-cart">
                            <button className="add-to-cart__dec">-</button>
                            <button className="add-to-cart__add-btn display--inline-block">Add To Cart</button>
                            <button className="add-to-cart__inc">+</button>
                        </div>
                    </div>
                </div>
            </a>            
        );
    }
}

export default ProductTile;