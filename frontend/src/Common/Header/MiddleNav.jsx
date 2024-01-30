import React from 'react'

const MiddleNav = () => {
  return (
    <>
         <div className="header-middle header-middle-ptb-1 d-none d-lg-block">
                    <div className="container">
                        <div className="header-wrap">
                            <div className="logo logo-width-1">
                                <a href="index.html">
                                    <img src="assets/imgs/theme/logo.svg" alt="logo" />
                                </a>
                            </div>
                            <div className="header-right">
                                <div className="search-style-2">
                                    <form action="#">
                                        <select className="select-active">
                                            <option>All Categories</option>
                                            <option>Women's</option>
                                            <option>Men's</option>
                                            <option>Cellphones</option>
                                            <option>Computer</option>
                                            <option>Electronics</option>
                                            <option> Accessories</option>
                                            <option>Home &amp; Garden</option>
                                            <option>Luggage</option>
                                            <option>Shoes</option>
                                            <option>Mother &amp; Kids</option>
                                        </select>
                                        <input type="text" placeholder="Search for items..." />
                                    </form>
                                </div>
                                <div className="header-action-right">
                                    <div className="header-action-2">
                                        <div className="header-action-icon-2">
                                            <a href="shop-wishlist.html">
                                                <img
                                                    className="svgInject"
                                                    alt="Evara"
                                                    src="assets/imgs/theme/icons/icon-heart.svg"
                                                />
                                                <span className="pro-count blue">4</span>
                                            </a>
                                        </div>
                                        <div className="header-action-icon-2">
                                            <a className="mini-cart-icon" href="shop-cart.html">
                                                <img
                                                    alt="Evara"
                                                    src="assets/imgs/theme/icons/icon-cart.svg"
                                                />
                                                <span className="pro-count blue">2</span>
                                            </a>
                                            <div className="cart-dropdown-wrap cart-dropdown-hm2">
                                                <ul>
                                                    <li>
                                                        <div className="shopping-cart-img">
                                                            <a href="shop-product-right.html">
                                                                <img
                                                                    alt="Evara"
                                                                    src="assets/imgs/shop/thumbnail-3.jpg"
                                                                />
                                                            </a>
                                                        </div>
                                                        <div className="shopping-cart-title">
                                                            <h4>
                                                                <a href="shop-product-right.html">Daisy Casual Bag</a>
                                                            </h4>
                                                            <h4>
                                                                <span>1 × </span>$800.00
                                                            </h4>
                                                        </div>
                                                        <div className="shopping-cart-delete">
                                                            <a href="#">
                                                                <i className="fi-rs-cross-small" />
                                                            </a>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="shopping-cart-img">
                                                            <a href="shop-product-right.html">
                                                                <img
                                                                    alt="Evara"
                                                                    src="assets/imgs/shop/thumbnail-2.jpg"
                                                                />
                                                            </a>
                                                        </div>
                                                        <div className="shopping-cart-title">
                                                            <h4>
                                                                <a href="shop-product-right.html">Corduroy Shirts</a>
                                                            </h4>
                                                            <h4>
                                                                <span>1 × </span>$3200.00
                                                            </h4>
                                                        </div>
                                                        <div className="shopping-cart-delete">
                                                            <a href="#">
                                                                <i className="fi-rs-cross-small" />
                                                            </a>
                                                        </div>
                                                    </li>
                                                </ul>
                                                <div className="shopping-cart-footer">
                                                    <div className="shopping-cart-total">
                                                        <h4>
                                                            Total <span>$4000.00</span>
                                                        </h4>
                                                    </div>
                                                    <div className="shopping-cart-button">
                                                        <a href="shop-cart.html" className="outline">
                                                            View cart
                                                        </a>
                                                        <a href="shop-checkout.html">Checkout</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    </>
  )
}

export default MiddleNav
