import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CategoryList extends Component {

    render() {
        let categoryArray='';
        if(this.props.categories)
        categoryArray = this.props.categories.map(category=>(
            <Link to={'/category/'+category.categoryId} key={category.categoryId}>
                        <div className="store-categories-list__item" data-test-id="l0-category">
                            <div className="category-image">
                                <img className="category-image__img animated fadeIn" alt="" src="images/ashirbaad.jpg" />
                            </div>
                            <div className="category-name">
                                <div className="category-name__name">{category.name}</div>
                                <div className="category-name__description" title="Pulses, Atta &amp; Other Flours, Rice &amp; Other Grains, Dry Fruits &amp; Nuts, Ghee &amp; Vanaspati, Spices, Salt &amp; Sugar">
                                    <div className="LinesEllipsis LinesEllipsis--clamped">
                                        {category.description}
                                        <wbr />
                                        <span className="LinesEllipsis-ellipsis">…</span>
                                    </div>
                                </div>
                            </div>
                            <div className="category-next-icon"></div>
                        </div>
                    </Link>
        ))
        return (
            <nav className="store-categories-list row">
                <div className="gr-6@tablet gr-6@desktop">
                    {categoryArray}
                </div>
                <div className="display--none@tablet display--none@desktop"></div>
            </nav>
        );
    }
}

export default CategoryList;
