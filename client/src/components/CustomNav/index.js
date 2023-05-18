import React, { useState } from 'react'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const CustomNav = () => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isOpen)
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
    };

    return (
        <div className='custom-nav'>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/" className="mr-auto">Strapi app</NavbarBrand>
                <NavbarToggler onClick={toggle} className="mr-2" />
                <Collapse isOpen={isOpen} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink href='/Review'> Review</NavLink>
                        </NavItem>
                        {userId && (
                            <NavItem>
                                <NavLink href="/Logout">{userName}</NavLink>
                            </NavItem>
                        )}

                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default CustomNav
