import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { loadData } from "../data/ActionCreator";
import { DataTypes } from "../data/Types";
import { Shop } from "./Shop";
import { addToCart, removeFromCart, updateCartQuantity , clearCart } from "../data/CartActionCreator";
import { CartDetails } from "./CartDetails";

const mapStateToProps = (dataStore) => ({
    ...dataStore
})

const mapDispatchToProps = {
    loadData, addToCart, updateCartQuantity, removeFromCart, clearCart
}

const filterProducts = (products = [], category) =>
    (!category || category === "All") 
    ? products 
    : products.filter(x => x.category.toLowerCase() === category.toLowerCase());

export const ShopConnector = connect(mapStateToProps, mapDispatchToProps)(
    class extends Component {
        render() {
            return <Switch>
                <Route path="/shop/products/:category?" 
                render={(routeProps) => 
                <Shop {...this.props} {...routeProps}
                    products={filterProducts(this.props.products,
                        routeProps.match.params.category)} />} />
                <Route path="/shop/cart" render={(routeProps) =>
                    <CartDetails {...this.props} {...routeProps}/>}/>
                <Redirect to="/shop/products" />
            </Switch>
        }

        componentDidMount() {
            this.props.loadData(DataTypes.CATEGORIES);
            this.props.loadData(DataTypes.PRODUCTS);
        }
    }
)