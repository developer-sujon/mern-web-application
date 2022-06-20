//external imports
import React, { Component } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

//enternel imports
import whiteLogo from "../../assets/images/whiteLogo.svg";
import blueLogo from "../../assets/images/blueLogo.svg";
import { NavLink, Link } from "react-router-dom";

class TopNavigation extends Component {
  constructor(props) {
    super();
    this.state = {
      navTitle: "navTitle",
      navLogo: whiteLogo,
      navBackground: "navBackground",
      navVariant: "dark",
      navItem: "navItem",
      pageTitle: props.pageTitle,
    };
  }

  onScroll = () => {
    if (window.scrollY > 100) {
      this.setState({
        navTitle: "navTitleScroll",
        navLogo: blueLogo,
        navBackground: "navScrollBackground",
        navVariant: "light",
        navItem: "navItemScroll",
      });
    } else {
      this.setState({
        navTitle: "navTitle",
        navLogo: whiteLogo,
        navBackground: "navTitleScroll",
        navVariant: "dark",
        navItem: "navItem",
      });
    }
  };

  componentDidMount = () => {
    window.addEventListener("scroll", this.onScroll);
  };

  render() {
    return (
      <>
        <title>{this.state.pageTitle}</title>
        <Navbar
          fixed="top"
          collapseOnSelect
          expand="lg"
          variant={this.state.navVariant}
          className={this.state.navBackground}
        >
          <Container fluid={true}>
            <Link to="/" className={this.state.navTitle + " navbar-brand"}>
              <img src={this.state.navLogo} alt="logo" /> Mohammad Sujon
            </Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav className="mr-auto">
                <NavLink to="/" className={this.state.navItem + " nav-link"}>
                  Home
                </NavLink>
                <NavLink
                  to="/services"
                  className={this.state.navItem + " nav-link"}
                >
                  Services
                </NavLink>
                <NavLink
                  to="/cources"
                  className={this.state.navItem + " nav-link"}
                >
                  Cources
                </NavLink>
                <NavLink
                  to="/portfolio"
                  className={this.state.navItem + " nav-link"}
                >
                  Portfolio
                </NavLink>
                <NavLink
                  to="/contact"
                  className={this.state.navItem + " nav-link"}
                >
                  Contact
                </NavLink>
                <NavLink
                  to="/about"
                  className={this.state.navItem + " nav-link"}
                >
                  About
                </NavLink>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default TopNavigation;
