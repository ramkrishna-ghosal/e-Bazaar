import React, { Component } from 'react';
import axios from 'axios';

import Banner from '../../UI/Banner';
import CategoryList from './Category/CategoryList'
import Footer from '../../components/Footer';
import LoginModal from '../../components/LoginModal';
class Home extends Component {
    state = {
        searchText: '',
        categoryList: []
    }
    render() {
        return (
            <div>
                <div className="page-home">

                    <div className="store-wrapper">
                        <div className="wrapper">

                            <Banner />
                            <div className="slider-container">
                                <h1 className="slider-header hard--bottom">Categories</h1>
                                <CategoryList categories={this.state.categoryList} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        );
    }

    componentDidMount() {
        this.categoryListFetch();
    }
    categoryListFetch() {
        axios.get('http://localhost:3000/api/admin/categories').then(response => {
            console.log(response.data.data);
            this.setState({ categoryList: response.data.data });
        })
    }
    clsloginBox = () => {
        document.getElementById("overlay").style.display = "none";
        document.getElementById("modal-content").style.display = "none";
        document.getElementsByTagName('body')[0].style.overflow = "visible";
    }
}

export default Home;
