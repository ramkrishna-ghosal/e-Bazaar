import React, { Component } from 'react';


class Footer extends Component {

    render() {
        return (
            <footer className="footer-wrapper no-gutter">
                <div className="footer no-gutter">

                    <div className="first-row">
                        <div className="gr-4@tablet gr-4@desktop column">
                            <div className="first-row__icon first-row__icon--best-prices"></div>
                            <div className="display--table-cell">
                                <div className="first-row__name">Best Prices &amp; Offers</div>
                                <div className="first-row__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                ut labore et dolore magna aliqua.</div>
                            </div>
                        </div>
                        <div className="gr-4@tablet gr-4@desktop column">
                            <div className="first-row__icon first-row__icon--genuine-products"></div>
                            <div className="display--table-cell">
                                <div className="first-row__name">Wide Assortment</div>
                                <div className="first-row__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                ut labore et dolore magna aliqua.</div>
                            </div>
                        </div>
                        <div className="gr-4@tablet gr-4@desktop column">
                            <div className="first-row__icon first-row__icon--easy-returns"></div>
                            <div className="display--table-cell">
                                <div className="first-row__name">Easy Returns</div>
                                <div className="first-row__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                ut labore et dolore magna aliqua.</div>
                            </div>
                        </div>
                    </div>

                    <div className="second-row">
                        <div className="column first-column right-border">
                            <h3 className="weight--semibold">Categories</h3>
                            <ul className="multi-column-list multi-column-list--triple@desktop multi-column-list--double@tablet multi-column-list--double@mobile">
                                <li>
                                    <a className="footer-list" href="/">Grocery &amp; Staples</a>
                                </li>
                                <li>
                                    <a className="footer-list" href="/">Fruits</a>
                                </li>
                                <li>
                                    <a className="footer-list" href="/">Vegetables</a>
                                </li>
                                <li>
                                    <a className="footer-list" href="/">Breakfast &amp; Dairy</a>
                                </li>
                                <li>
                                    <a className="footer-list" href="/">Soft Drinks</a>
                                </li>
                                <li>
                                    <a className="footer-list" href="/">Chips &amp; Crisps</a>
                                </li>
                                <li>
                                    <a className="footer-list" href="/">Namkeen</a>
                                </li>
                                <li>
                                    <a className="footer-list" href="/">Biscuits &amp; Cookies</a>
                                </li>
                                <li>
                                    <a className="footer-list" href="/">Fruit Drinks &amp; Juices</a>
                                </li>
                                <li>
                                    <a className="footer-list" href="/">Noodles &amp; Pasta</a>
                                </li>
                                <li>
                                    <a className="footer-list" href="/">Body &amp; Face Care</a>
                                </li>
                                <li>
                                    <a className="footer-list" href="/">Hair Care</a>
                                </li>
                                <li>
                                    <a className="footer-list" href="/">Laundry Detergents</a>
                                </li>
                                <li>
                                    <a className="footer-list" href="/">Dishwashers &amp; Cleaners</a>
                                </li>
                                <li>
                                    <a className="footer-list" href="/">Tea</a>
                                </li>
                                <li>
                                    <a className="footer-list" href="/">Baby Diapers</a>
                                </li>
                            </ul>
                        </div>
                        <div className="column second-column right-border">
                            <h3 className="weight--semibold">Useful Links</h3>
                            <ul className="multi-column-list--double">
                                <li>
                                    <a className="footer-list" href="/" target="_blank" rel="noopener noreferrer">About Us</a>
                                </li>
                                <li>
                                    <a className="footer-list" href="/" target="_blank" rel="noopener noreferrer">Blog</a>
                                </li>

                                <li>
                                    <a className="footer-list" href="/">Contact Us</a>
                                </li>
                                <li>
                                    <a className="footer-list" href="/" target="_blank" rel="noopener noreferrer nofollow">FAQ</a>
                                </li>
                                <li>
                                    <a className="footer-list" href="/" target="_blank" rel="noopener noreferrer">Press Contact</a>
                                </li>
                                <li>
                                    <a className="footer-list" href="/" target="_blank" rel="noopener noreferrer nofollow">Terms &amp; Conditions</a>
                                </li>
                                <li>
                                    <a className="footer-list" href="/" target="_blank" rel="noopener noreferrer nofollow">Privacy Policy</a>
                                </li>
                                <li>
                                    <a className="footer-list" href="/" target="_blank" rel="noopener noreferrer nofollow">Careers</a>
                                </li>

                            </ul>
                        </div>
                        <div className="column third-column display--none@mobile">

                            <div className="follow-us display--none@mobile">
                                <h3 className="follow-us__header">Follow us</h3>
                                <ul className="inline-list">
                                    <li className="inline-list__item">
                                        <a className="social-icon--facebook" href="/" target="_blank">..</a>
                                    </li>
                                    <li className="inline-list__item">
                                        <a className="social-icon--twitter" href="/" target="_blank">.</a>
                                    </li>
                                    <li className="inline-list__item">
                                        <a className="social-icon--instagram" href="/" target="_blank">.</a>
                                    </li>
                                    <li className="inline-list__item flush--right">
                                        <a className="social-icon--linkedin" href="/" target="_blank">.</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="gr-12 column copyright">
                            <span className="copyright__symbol">© </span>
                            Copyright 2018
    
                    </div>
                    </div>
                </div>
            </footer>

        );
    }
}

export default Footer;
