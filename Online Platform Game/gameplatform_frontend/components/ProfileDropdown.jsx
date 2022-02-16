import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';

export default class ProfileDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle() {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  render() {
    const { dropdownOpen } = this.state;
    const {
      userLogin, scored, badge, logout,
    } = this.props;
    
    return (
      <Dropdown
        isOpen={dropdownOpen}
        toggle={this.toggle}
        data-testid="dropdown"
      >
        <DropdownToggle caret nav>
          <Image src="/profile.png" width="30" height="30" alt="user" />
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>
            <Link href="/userprofile" passHref>
              <a href="replace" className="nav-link text-dark">
                <small>
                  Signed in as 
                  {' '}
                  <b>{userLogin}</b>
                </small>
              </a>
            </Link>
          </DropdownItem>
          <div className="ms-md-4">
            <small>
              Your Score : 
              {' '}
              <b data-testid="scored">{scored}</b>
              {' '}
              <span
                className="badge rounded-pill bg-warning text-black fw-bolder ms-2"
                style={{ fontSize: '14px' }}
              >
                {badge}
              </span>
            </small>
          </div>
          <DropdownItem divider />
          <DropdownItem>
            <Link href="/userprofile" data-testid="profile" passHref>
              <a href="replace" className="nav-link text-dark">
                Your profile
              </a>
            </Link>
          </DropdownItem>
          <DropdownItem>
            <Link href="/updateProfile" passHref>
              <a
                href="replace"
                data-testid="editProfile"
                className="nav-link text-dark"
              >
                Edit profile
              </a>
            </Link>
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem data-testid="logout" onClick={logout}>
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}
