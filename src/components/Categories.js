import React, { Component } from 'react';

import axios from 'axios';
import ProductTile from './ProductTile'
class Categories extends Component {
    state = {
        searchText: '',
        categoryId:'',
        productList:undefined
    }

    componentDidMount(){
        this.setState({categoryId:this.props.match.params.catid})
        this.fetchCategoryProducts(this.props.match.params.catid);
        // console.log(this.props.match.params.catid);
    }
    render() {
        let tile=null;
        if(this.state.productList){
            tile=this.state.productList.map(product=><ProductTile key={product.id} product={product}/>);
        } 
        // console.log(this.state.productList,tile);
                                            
        return (
            <div className="categories">
                <div className="categories__body">
                    <div className="wrapper categories__body--wrapper">
                        <div className="categories-table ">
                            <div>
                                <div className="categories-table__row">

                                    <div className="section-left display--none@mobile">
                                        <div className="left-section scrollbar-custom">
                                            <ul className="category list-unstyled">
                                                <nav className="category-list">
                                                    <li className="category__current category-list__item no-child">
                                                        <a href="/">
                                                            <div className="category-item-details">
                                                                <i className="icon-plus"></i>
                                                                <span className="name">
                                                                    <span>Best Offers</span>
                                                                </span>
                                                            </div>
                                                        </a>
                                                    </li>

                                                    <li className="category-list__item no-child">
                                                        <a href="/">
                                                            <div className="category-item-details">
                                                                <i className="icon-plus"></i>
                                                                <span className="name">
                                                                    <span>Grocery &amp; Staples</span>
                                                                </span>
                                                            </div>
                                                        </a>
                                                    </li>

                                                    <li className="category-list__item no-child">
                                                        <a href="/">
                                                            <div className="category-item-details">
                                                                <i className="icon-plus"></i>
                                                                <span className="name">
                                                                    <span>Household Needs</span>
                                                                </span>
                                                            </div>
                                                        </a>
                                                    </li>

                                                    <li className="category-list__item no-child">
                                                        <a href="/">
                                                            <div className="category-item-details">
                                                                <i className="icon-plus"></i>
                                                                <span className="name">
                                                                    <span>Beverages</span>
                                                                </span>
                                                            </div>
                                                        </a>
                                                    </li>

                                                    <li className="category-list__item no-child">
                                                        <a href="/">
                                                            <div className="category-item-details">
                                                                <i className="icon-plus"></i>
                                                                <span className="name">
                                                                    <span>Home &amp; Kitchen</span>
                                                                </span>
                                                            </div>
                                                        </a>
                                                    </li>

                                                    <li className="category-list__item no-child">
                                                        <a href="/">
                                                            <div className="category-item-details">
                                                                <i className="icon-plus"></i>
                                                                <span className="name">
                                                                    <span>Furnishing &amp; Home Needs</span>
                                                                </span>
                                                            </div>
                                                        </a>
                                                    </li>

                                                    <li className="category-list__item no-child">
                                                        <a href="/">
                                                            <div className="category-item-details">
                                                                <i className="icon-plus"></i>
                                                                <span className="name">
                                                                    <span>Baby &amp; Kids</span>
                                                                </span>
                                                            </div>
                                                        </a>
                                                    </li>

                                                </nav>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="section-right">
                                        <div className="category-navs">
                                            <nav className="breadcrumb-navs">

                                                <ul className="list-unstyled list-inline">
                                                    <li className="breadcrumb-navs__lists-item">
                                                        <a href="/">
                                                            <span className="name">Home</span>
                                                        </a>
                                                    </li>
                                                    <li className="breadcrumb-navs__lists-item no-link">
                                                        <a href="/">
                                                            <span className="name">Best Offers</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </nav>
                                            <div className="category-navs__container">
                                                <h1 className="category-navs__current">Best Offers</h1>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="products products--grid">
                                            {tile}
                                                <a className="product__wrapper" href="/">
                                                    <div className="plp-product">
                                                        <div className="plp-product__offer">31% OFF</div>
                                                        <div className="plp-product__offer display--none">
                                                            ₹ 190 Off

                                                                        </div>
                                                        <div className="plp-product__img ">
                                                            <img className="img animated fadeIn" src="/images/ashirbaad.jpg" alt="" />
                                                        </div>
                                                        <div className="plp-product__name " title="Glonuts American Almonds">
                                                            <div className="LinesEllipsis  plp-product__name--box">
                                                                Glonuts American Almonds
                                                                                <wbr/></div>
                                                            </div>
                                                            <div className="plp-product__quantity" title="500 gm">
                                                                <span>500 gm</span>
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
                                                                    <button className="add-to-cart__dec"></button>
                                                                    <button className="add-to-cart__add-btn display--inline-block">Add To Cart</button>
                                                                    <button className="add-to-cart__inc"></button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                                </a>

                                                    <a className="product__wrapper" href="/">
                                                        <div className="plp-product">
                                                            <div className="plp-product__offer">33% OFF</div>
                                                            <div className="plp-product__offer display--none">
                                                                ₹ 320 Off

                                                                        </div>
                                                            <div className="plp-product__img ">
                                                                <img className="img animated fadeIn" src="/images/ashirbaad.jpg" alt="" />
                                                            </div>
                                                            <div className="plp-product__name " title="Pampers Baby Dry Pants Diaper (XL) - Pack of 58">
                                                                <div className="LinesEllipsis  plp-product__name--box">
                                                                    Pampers Baby Dry Pants Diaper (XL) - Pack of 58
                                                                                <wbr/></div>
                                                                </div>
                                                                <div className="plp-product__quantity" title="58 units">
                                                                    <span>58 units</span>
                                                                </div>
                                                                <div className="plp-product__price">
                                                                    <div className="plp-product__price--container">
                                                                        <div className="display--inline-block@mobile">
                                                                            <span className="plp-product__price--new">
                                                                                ₹ 629

                                                                                    </span>
                                                                        </div>
                                                                        <div className="plp-product__price--old display--inline-block@mobile">
                                                                            ₹ 949

                                                                                </div>
                                                                    </div>
                                                                </div>
                                                                <div className="plp-product__add-to-cart">
                                                                    <div className="add-to-cart">
                                                                        <button className="add-to-cart__dec"></button>
                                                                        <button className="add-to-cart__add-btn display--inline-block">Add To Cart</button>
                                                                        <button className="add-to-cart__inc"></button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                                </a>

                                                        <a className="product__wrapper" href="/">
                                                            <div className="plp-product">
                                                                <div className="plp-product__offer">33% OFF</div>
                                                                <div className="plp-product__offer display--none">
                                                                    ₹ 320 Off

                                                                        </div>
                                                                <div className="plp-product__img ">
                                                                    <img className="img animated fadeIn" src="/images/ashirbaad.jpg" alt="" />
                                                                </div>
                                                                <div className="plp-product__name " title="Pampers Baby Dry Pants Diaper (XL) - Pack of 58">
                                                                    <div className="LinesEllipsis  plp-product__name--box">
                                                                        Pampers Baby Dry Pants Diaper (XL) - Pack of 58
                                                                                <wbr/></div>
                                                                    </div>
                                                                    <div className="plp-product__quantity" title="58 units">
                                                                        <span>58 units</span>
                                                                    </div>
                                                                    <div className="plp-product__price">
                                                                        <div className="plp-product__price--container">
                                                                            <div className="display--inline-block@mobile">
                                                                                <span className="plp-product__price--new">
                                                                                    ₹ 629

                                                                                    </span>
                                                                            </div>
                                                                            <div className="plp-product__price--old display--inline-block@mobile">
                                                                                ₹ 949

                                                                                </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="plp-product__add-to-cart">
                                                                        <div className="add-to-cart">
                                                                            <button className="add-to-cart__dec"></button>
                                                                            <button className="add-to-cart__add-btn display--inline-block">Add To Cart</button>
                                                                            <button className="add-to-cart__inc"></button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                </a>

                                                            <a className="product__wrapper" href="/">
                                                                <div className="plp-product">
                                                                    <div className="plp-product__offer">33% OFF</div>
                                                                    <div className="plp-product__offer display--none">
                                                                        ₹ 320 Off

                                                                        </div>
                                                                    <div className="plp-product__img ">
                                                                        <img className="img animated fadeIn" src="/images/ashirbaad.jpg" alt="" />
                                                                    </div>
                                                                    <div className="plp-product__name " title="Pampers Baby Dry Pants Diaper (XL) - Pack of 58">
                                                                        <div className="LinesEllipsis  plp-product__name--box">
                                                                            Pampers Baby Dry Pants Diaper (XL) - Pack of 58
                                                                                <wbr/></div>
                                                                        </div>
                                                                        <div className="plp-product__quantity" title="58 units">
                                                                            <span>58 units</span>
                                                                        </div>
                                                                        <div className="plp-product__price">
                                                                            <div className="plp-product__price--container">
                                                                                <div className="display--inline-block@mobile">
                                                                                    <span className="plp-product__price--new">
                                                                                        ₹ 629

                                                                                    </span>
                                                                                </div>
                                                                                <div className="plp-product__price--old display--inline-block@mobile">
                                                                                    ₹ 949

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="plp-product__add-to-cart">
                                                                            <div className="add-to-cart">
                                                                                <button className="add-to-cart__dec"></button>
                                                                                <button className="add-to-cart__add-btn display--inline-block">Add To Cart</button>
                                                                                <button className="add-to-cart__inc"></button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </a>

                                                                <a className="product__wrapper" href="/">
                                                                    <div className="plp-product">
                                                                        <div className="plp-product__offer">33% OFF</div>
                                                                        <div className="plp-product__offer display--none">
                                                                            ₹ 320 Off

                                                                        </div>
                                                                        <div className="plp-product__img ">
                                                                            <img className="img animated fadeIn" src="/images/ashirbaad.jpg" alt="" />
                                                                        </div>
                                                                        <div className="plp-product__name " title="Pampers Baby Dry Pants Diaper (XL) - Pack of 58">
                                                                            <div className="LinesEllipsis  plp-product__name--box">
                                                                                Pampers Baby Dry Pants Diaper (XL) - Pack of 58
                                                                                <wbr/></div>
                                                                            </div>
                                                                            <div className="plp-product__quantity" title="58 units">
                                                                                <span>58 units</span>
                                                                            </div>
                                                                            <div className="plp-product__price">
                                                                                <div className="plp-product__price--container">
                                                                                    <div className="display--inline-block@mobile">
                                                                                        <span className="plp-product__price--new">
                                                                                            ₹ 629
    
                                                                                    </span>
                                                                                    </div>
                                                                                    <div className="plp-product__price--old display--inline-block@mobile">
                                                                                        ₹ 949
    
                                                                                </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="plp-product__add-to-cart">
                                                                                <div className="add-to-cart">
                                                                                    <button className="add-to-cart__dec"></button>
                                                                                    <button className="add-to-cart__add-btn display--inline-block">Add To Cart</button>
                                                                                    <button className="add-to-cart__inc"></button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                </a>

                                                                    <a className="product__wrapper" href="/">
                                                                        <div className="plp-product">
                                                                            <div className="plp-product__offer">33% OFF</div>
                                                                            <div className="plp-product__offer display--none">
                                                                                ₹ 320 Off
    
                                                                        </div>
                                                                            <div className="plp-product__img ">
                                                                                <img className="img animated fadeIn" src="/images/ashirbaad.jpg" alt="" />
                                                                            </div>
                                                                            <div className="plp-product__name " title="Pampers Baby Dry Pants Diaper (XL) - Pack of 58">
                                                                                <div className="LinesEllipsis  plp-product__name--box">
                                                                                    Pampers Baby Dry Pants Diaper (XL) - Pack of 58
                                                                                <wbr/></div>
                                                                                </div>
                                                                                <div className="plp-product__quantity" title="58 units">
                                                                                    <span>58 units</span>
                                                                                </div>
                                                                                <div className="plp-product__price">
                                                                                    <div className="plp-product__price--container">
                                                                                        <div className="display--inline-block@mobile">
                                                                                            <span className="plp-product__price--new">
                                                                                                ₹ 629
        
                                                                                    </span>
                                                                                        </div>
                                                                                        <div className="plp-product__price--old display--inline-block@mobile">
                                                                                            ₹ 949
        
                                                                                </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="plp-product__add-to-cart">
                                                                                    <div className="add-to-cart">
                                                                                        <button className="add-to-cart__dec"></button>
                                                                                        <button className="add-to-cart__add-btn display--inline-block">Add To Cart</button>
                                                                                        <button className="add-to-cart__inc"></button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                </a>

                                                                        <a className="product__wrapper" href="/">
                                                                            <div className="plp-product">
                                                                                <div className="plp-product__offer">33% OFF</div>
                                                                                <div className="plp-product__offer display--none">
                                                                                    ₹ 320 Off
        
                                                                        </div>
                                                                                <div className="plp-product__img ">
                                                                                    <img className="img animated fadeIn" src="/images/ashirbaad.jpg" alt="" />
                                                                                </div>
                                                                                <div className="plp-product__name " title="Pampers Baby Dry Pants Diaper (XL) - Pack of 58">
                                                                                    <div className="LinesEllipsis  plp-product__name--box">
                                                                                        Pampers Baby Dry Pants Diaper (XL) - Pack of 58
                                                                                <wbr/></div>
                                                                                    </div>
                                                                                    <div className="plp-product__quantity" title="58 units">
                                                                                        <span>58 units</span>
                                                                                    </div>
                                                                                    <div className="plp-product__price">
                                                                                        <div className="plp-product__price--container">
                                                                                            <div className="display--inline-block@mobile">
                                                                                                <span className="plp-product__price--new">
                                                                                                    ₹ 629
            
                                                                                    </span>
                                                                                            </div>
                                                                                            <div className="plp-product__price--old display--inline-block@mobile">
                                                                                                ₹ 949
            
                                                                                </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="plp-product__add-to-cart">
                                                                                        <div className="add-to-cart">
                                                                                            <button className="add-to-cart__dec"></button>
                                                                                            <button className="add-to-cart__add-btn display--inline-block">Add To Cart</button>
                                                                                            <button className="add-to-cart__inc"></button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                </a>

                                                                            <a className="product__wrapper" href="/">
                                                                                <div className="plp-product">
                                                                                    <div className="plp-product__offer">33% OFF</div>
                                                                                    <div className="plp-product__offer display--none">
                                                                                        ₹ 320 Off
            
                                                                        </div>
                                                                                    <div className="plp-product__img ">
                                                                                        <img className="img animated fadeIn" src="/images/ashirbaad.jpg" alt="" />
                                                                                    </div>
                                                                                    <div className="plp-product__name " title="Pampers Baby Dry Pants Diaper (XL) - Pack of 58">
                                                                                        <div className="LinesEllipsis  plp-product__name--box">
                                                                                            Pampers Baby Dry Pants Diaper (XL) - Pack of 58
                                                                                <wbr/></div>
                                                                                        </div>
                                                                                        <div className="plp-product__quantity" title="58 units">
                                                                                            <span>58 units</span>
                                                                                        </div>
                                                                                        <div className="plp-product__price">
                                                                                            <div className="plp-product__price--container">
                                                                                                <div className="display--inline-block@mobile">
                                                                                                    <span className="plp-product__price--new">
                                                                                                        ₹ 629
                
                                                                                    </span>
                                                                                                </div>
                                                                                                <div className="plp-product__price--old display--inline-block@mobile">
                                                                                                    ₹ 949
                
                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="plp-product__add-to-cart">
                                                                                            <div className="add-to-cart">
                                                                                                <button className="add-to-cart__dec"></button>
                                                                                                <button className="add-to-cart__add-btn display--inline-block">Add To Cart</button>
                                                                                                <button className="add-to-cart__inc"></button>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                </a>

                                                                                <a className="product__wrapper" href="/">
                                                                                    <div className="plp-product">
                                                                                        <div className="plp-product__offer">30% OFF</div>
                                                                                        <div className="plp-product__offer display--none">
                                                                                            ₹ 117 Off
                
                                                                        </div>
                                                                                        <div className="plp-product__img ">
                                                                                            <img className="img animated fadeIn" src="/images/ashirbaad.jpg" alt="" />
                                                                                        </div>
                                                                                        <div className="plp-product__name " title="All Out Ultra Mosquito Repellent (Refill)">
                                                                                            <div className="LinesEllipsis  plp-product__name--box">
                                                                                                All Out Ultra Mosquito Repellent (Refill)
                                                                                <wbr/></div>
                                                                                            </div>
                                                                                            <div className="plp-product__quantity" title="6x45 ml">
                                                                                                <span>6x45 ml</span>
                                                                                            </div>
                                                                                            <div className="plp-product__price">
                                                                                                <div className="plp-product__price--container">
                                                                                                    <div className="display--inline-block@mobile">
                                                                                                        <span className="plp-product__price--new">
                                                                                                            ₹ 273
                    
                                                                                    </span>
                                                                                                    </div>
                                                                                                    <div className="plp-product__price--old display--inline-block@mobile">
                                                                                                        ₹ 390
                    
                                                                                </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="plp-product__add-to-cart">
                                                                                                <div className="add-to-cart">
                                                                                                    <button className="add-to-cart__dec"></button>
                                                                                                    <button className="add-to-cart__add-btn display--inline-block">Add To Cart</button>
                                                                                                    <button className="add-to-cart__inc"></button>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                </a>
                                                                                    <a className="product__wrapper" href="/">
                                                                                        <div className="plp-product">
                                                                                            <div className="plp-product__offer">30% OFF</div>
                                                                                            <div className="plp-product__offer display--none">
                                                                                                ₹ 41 Off
                    
                                                                        </div>
                                                                                            <div className="plp-product__img ">
                                                                                                <img className="img animated fadeIn" src="/images/ashirbaad.jpg" alt="" />
                                                                                            </div>
                                                                                            <div className="plp-product__name " title="Good Knight Advanced Activ+ Cartridge Twin Saver Mosquito Repellent (Refill)">
                                                                                                <div className="LinesEllipsis LinesEllipsis--clamped plp-product__name--box">
                                                                                                    Good Knight Advanced Activ+ Cartridge Twin
                                                                                <wbr/>
                                                                                                        <span className="LinesEllipsis-ellipsis">…</span>
                                                                            </div>
                                                                                                </div>
                                                                                                <div className="plp-product__quantity" title="2x45 ml">
                                                                                                    <span>2x45 ml</span>
                                                                                                </div>
                                                                                                <div className="plp-product__price">
                                                                                                    <div className="plp-product__price--container">
                                                                                                        <div className="display--inline-block@mobile">
                                                                                                            <span className="plp-product__price--new">
                                                                                                                ₹ 93
                        
                                                                                    </span>
                                                                                                        </div>
                                                                                                        <div className="plp-product__price--old display--inline-block@mobile">
                                                                                                            ₹ 134
                        
                                                                                </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="plp-product__add-to-cart">
                                                                                                    <div className="add-to-cart">
                                                                                                        <button className="add-to-cart__dec"></button>
                                                                                                        <button className="add-to-cart__add-btn display--inline-block">Add To Cart</button>
                                                                                                        <button className="add-to-cart__inc"></button>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                </a>
                                                                                        <a className="product__wrapper" href="/">
                                                                                            <div className="plp-product">
                                                                                                <div className="plp-product__offer">36% OFF</div>
                                                                                                <div className="plp-product__offer display--none">
                                                                                                    ₹ 20 Off
                        
                                                                        </div>
                                                                                                <div className="plp-product__img ">
                                                                                                    <img className="img animated fadeIn" src="/images/ashirbaad.jpg" alt="" />
                                                                                                </div>
                                                                                                <div className="plp-product__name " title="Best Value Refined Sugar">
                                                                                                    <div className="LinesEllipsis  plp-product__name--box">
                                                                                                        Best Value Refined Sugar
                                                                                <wbr/></div>
                                                                                                    </div>
                                                                                                    <div className="plp-product__quantity" title="1 kg">
                                                                                                        <span>1 kg</span>
                                                                                                    </div>
                                                                                                    <div className="plp-product__price">
                                                                                                        <div className="plp-product__price--container">
                                                                                                            <div className="display--inline-block@mobile">
                                                                                                                <span className="plp-product__price--new">
                                                                                                                    ₹ 35
                            
                                                                                    </span>
                                                                                                            </div>
                                                                                                            <div className="plp-product__price--old display--inline-block@mobile">
                                                                                                                ₹ 55
                            
                                                                                </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className="plp-product__add-to-cart">
                                                                                                        <div className="add-to-cart">
                                                                                                            <button className="add-to-cart__dec"></button>
                                                                                                            <button className="add-to-cart__add-btn display--inline-block">Add To Cart</button>
                                                                                                            <button className="add-to-cart__inc"></button>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                </a>
                                                                                            <a className="product__wrapper" href="/">
                                                                                                <div className="plp-product">
                                                                                                    <div className="plp-product__offer">30% OFF</div>
                                                                                                    <div className="plp-product__offer display--none">
                                                                                                        ₹ 8 Off
                            
                                                                        </div>
                                                                                                    <div className="plp-product__img ">
                                                                                                        <img className="img animated fadeIn" src="/images/ashirbaad.jpg" alt="" />
                                                                                                    </div>
                                                                                                    <div className="plp-product__name " title="Catch Coriander Powder/Dhania">
                                                                                                        <div className="LinesEllipsis  plp-product__name--box">
                                                                                                            Catch Coriander Powder/Dhania
                                                                                <wbr/></div>
                                                                                                        </div>
                                                                                                        <div className="plp-product__quantity" title="100 gm">
                                                                                                            <span>100 gm</span>
                                                                                                        </div>
                                                                                                        <div className="plp-product__price">
                                                                                                            <div className="plp-product__price--container">
                                                                                                                <div className="display--inline-block@mobile">
                                                                                                                    <span className="plp-product__price--new">
                                                                                                                        ₹ 18
                                
                                                                                    </span>
                                                                                                                </div>
                                                                                                                <div className="plp-product__price--old display--inline-block@mobile">
                                                                                                                    ₹ 26
                                
                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className="plp-product__add-to-cart">
                                                                                                            <div className="add-to-cart">
                                                                                                                <button className="add-to-cart__dec"></button>
                                                                                                                <button className="add-to-cart__add-btn display--inline-block">Add To Cart</button>
                                                                                                                <button className="add-to-cart__inc"></button>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                </a>
                                                                                                <a className="product__wrapper" href="/">
                                                                                                    <div className="plp-product">
                                                                                                        <div className="plp-product__offer">30% OFF</div>
                                                                                                        <div className="plp-product__offer display--none">
                                                                                                            ₹ 22 Off
                                
                                                                        </div>
                                                                                                        <div className="plp-product__img ">
                                                                                                            <img className="img animated fadeIn" src="/images/ashirbaad.jpg" alt="" />
                                                                                                        </div>
                                                                                                        <div className="plp-product__name " title="Catch Garam Masala">
                                                                                                            <div className="LinesEllipsis  plp-product__name--box">
                                                                                                                Catch Garam Masala
                                                                                <wbr/></div>
                                                                                                            </div>
                                                                                                            <div className="plp-product__quantity" title="100 gm">
                                                                                                                <span>100 gm</span>
                                                                                                            </div>
                                                                                                            <div className="plp-product__price">
                                                                                                                <div className="plp-product__price--container">
                                                                                                                    <div className="display--inline-block@mobile">
                                                                                                                        <span className="plp-product__price--new">
                                                                                                                            ₹ 50
                                    
                                                                                    </span>
                                                                                                                    </div>
                                                                                                                    <div className="plp-product__price--old display--inline-block@mobile">
                                                                                                                        ₹ 72
                                    
                                                                                </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className="plp-product__add-to-cart">
                                                                                                                <div className="add-to-cart">
                                                                                                                    <button className="add-to-cart__dec"></button>
                                                                                                                    <button className="add-to-cart__add-btn display--inline-block">Add To Cart</button>
                                                                                                                    <button className="add-to-cart__inc"></button>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                </a>
                                                            </div>
                                                                                                <div className="products-bottom products-bottom--small hide"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                <div className="back-to-top">
                    <i className="back-to-top__icon"></i>
                </div>
            </div>
        );
    }

    fetchCategoryProducts(categoryId){
        axios.get('http://localhost:3000/api/admin/products/category/'+ categoryId)
        .then(response=>{
            console.log(response.data.data);
            this.setState({productList:response.data.data})
        })
    }
                                                            
}

export default Categories;
