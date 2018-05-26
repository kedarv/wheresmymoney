import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/users';

export class BodyNav extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  handleLogout = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  }  
  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">wheresmymoney</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
            {this.props.user && this.props.user.authenticated ?
              <NavItem>
                <NavLink href="#" onClick={this.handleLogout}>Logout</NavLink>
              </NavItem>
            :null}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

function mapStateToProps (state) {
    return {
        user: state.user
    };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  logoutUser: () => {
          dispatch(logoutUser());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(BodyNav);