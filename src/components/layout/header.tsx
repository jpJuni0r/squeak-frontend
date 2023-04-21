import React, {useContext} from "react";
import Link from "next/link";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {PersonFill} from "react-bootstrap-icons";

import { UserContext } from "@/context/user";
import {useRouter} from "next/router";

const Header = () => {
  const router = useRouter();
  const {userContext} = useContext(UserContext);
  const links: { title: string; href: string; }[] = [
    {
      title: "Select documents",
      href: "/",
    },
    {
      title: "Submission",
      href: "/submit",
    },
  ];

  return (
    <header>
      <Navbar bg="light" expand="lg" className="shadow-sm">
        <div className="container-fluid">
          <Link href="/" className="navbar-brand">
            Exam Shop
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse>
            <Nav className="flex-grow-1">
              {links.map(link => (
                <div className="nav-item" key={link.href}>
                  <Link className={`nav-link${router.pathname === link.href ? " active" : ""}`} href={link.href}>
                    {link.title}
                  </Link>
                </div>
              ))}
            </Nav>
            {userContext.status === "signed-out" ? (
              <div className="nav-item d-flex">
                <Link className="nav-link" href="/login">
                  Login
                </Link>
              </div>
            ) : (
              <NavDropdown
                title={
                  <>
                    <PersonFill className="me-1"/>
                    {userContext.username}
                  </>
                }
                align="end"
              >
                <Link href="/logout" className="dropdown-item">
                  Logout
                </Link>
              </NavDropdown>
            )}
          </Navbar.Collapse>
        </div>
      </Navbar>
    </header>
  );
};

export default Header;
