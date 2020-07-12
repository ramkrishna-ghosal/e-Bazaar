import React, { Component } from 'react';
import axios from '../../config/axios';

import config from '../../config/config';
import Spinner from '../../UI/Spinner';
class OrderDetail extends Component {
    state = {

        order: undefined,
        orderId: undefined
    }



    render() {
        let products = '';
        if (this.state.order)
            products = this.state.order.products.map(product => {
                return <div className="gridcenter">
                    <div className="orderdetail-img">
                        <img className="proimg"
                            style={{ padding: '10px' }}
                            src={config.baseURL + product.image}
                            alt={product.name} />
                    </div>
                    <div className="orderdetail-desc">
                        <table className="order-products">
                            <tr>
                                <td>Name</td>
                                <td>{product.name}</td>
                            </tr>
                            <tr>
                                <td>Quantity</td>
                                <td>{product.quantity}</td>
                            </tr>
                            <tr>
                                <td>Price</td>
                                <td>{product.amount}</td>
                            </tr>
                        </table>
                    </div>

                </div>
            })
        return (
            <div className="content">
                <div className="container-fluid">
                    <div className="row">

                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header card-header-primary">
                                    <h4 className="card-title ">Order Details</h4>
                                    <p className="card-category"> Order# {this.state.order ? this.state.order.orderNo : null} </p>
                                </div>
                                <div className="card-body">
                                    {!this.state.order ? <Spinner /> :
                                        <div className="table-responsive">
                                            {/* <div className="clear-70"></div> */}
                                            <section className="container main">


                                                <div className="left-div">
                                                    <h5>Order No : {this.state.order.orderNo}</h5>
                                                </div>
                                                <div className="left-div">
                                                    <h5>Date : {this.state.order.createdat.split('T')[0]}</h5>
                                                </div>

                                                <div className="left-div">
                                                    {products}

                                                </div>
                                                <div className="left-div">
                                                    <div className="gridcenter">
                                                        <div>
                                                            Shipping Address : {this.state.order.deliveryAddr}
                                                        </div>
                                                    </div>
                                                    <div className="gridcenter">
                                                        <div>
                                                            <h5>Total Amount : {this.state.order.amount}</h5>
                                                        </div>
                                                        <div>
                                                            <h5>Payment Mode : {this.state.order.payment}</h5>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="left-div buttons">
                                                    <button onClick={() => this.changeStatusHandler('Confirmed')}
                                                        disabled={this.state.order.orderStatus !== 'Placed'}
                                                        className="btn btn-success btn-tbl">Confirm
                                                        </button>

                                                </div>
                                                <div className="left-div buttons">


                                                    <button onClick={() => this.changeStatusHandler('Cancelled')}
                                                        disabled={this.state.order.orderStatus !== 'Placed'}
                                                        className="btn btn-danger btn-tbl">Cancel
                                                        </button>

                                                </div>
                                                <div className="left-div buttons">
                                                    <button onClick={() => this.showModal()}
                                                    disabled={this.state.order.orderStatus !== 'Confirmed'}
                                                        className="btn btn-secondary btn-tbl">Set AWB
                                                        </button>
                                                </div>
                                                <div className="left-div buttons">

                                                     <button onClick={() => this.changeStatusHandler('Completed')}
                                                     disabled={this.state.order.orderStatus !== 'Shipped'}
                                                        className="btn btn-success btn-tbl">Delivered
                                                        </button>
                                                </div>
                                            </section>
                                            {/* <div className="clear-70"></div> */}

                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    changeStatusHandler = (status) => {
        let data = { ...this.state.order, products: [...this.state.order.products] }
        data.orderStatus = status;
        let payload = { data: { status } }
        axios.delete('admin/orders/' + this.state.order.id, payload).then(res => {
            const response = res.data;
            if (response.status === 1) {
                this.setState({
                    order: data
                });
            }
        })
        // this.toggleActive(data, index);

    }

    fetchDatafromWeb(id) {
        let url = 'admin/orders/' + id;


        axios.get(url).then(res => {
            if (res.data.status === 1) {
                console.log(res.data);
                let order = res.data.data;
                let bilAddr = JSON.parse(order.billingAddress);
                let shipAddr = JSON.parse(order.deliveryAddress);
                let deliveryAddr = shipAddr.houseno + ', ' + shipAddr.address1 + ', ' + shipAddr.address2 + ', '
                    + shipAddr.area + ' - ' + shipAddr.pincode;
                let billingAddr = bilAddr.houseno + ', ' + bilAddr.address1 + ', ' + bilAddr.address2 + ', '
                    + bilAddr.area + ' - ' + bilAddr.pincode;
                order.deliveryAddr = deliveryAddr;
                order.billingAddr = billingAddr;
                this.setState({
                    order: order,
                })
            } else {
                this.setState({
                    error: 'No data found',
                    order: undefined,
                })
            }


        })
    }
    componentDidMount() {
        let id = this.props.match.params.id;
        console.log(id)
        this.fetchDatafromWeb(id);
    }
    componentWillReceiveProps(nextProps) {
        // this._getContent(nextProps.params.featureName);
        // let subCategoryId = nextProps.match.params.subcatid;
        // console.log(nextProps);
        // this.fetchDatafromWeb(subCategoryId);

    }

}

export default OrderDetail;
