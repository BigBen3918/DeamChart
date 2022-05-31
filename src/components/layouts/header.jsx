import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Squash as Hamburger } from "hamburger-react";
import logo from "../../assets/images/logo.png";

export default function Header() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 992 ? null : setOpen(false);
        };

        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness());
    });

    return (
        <>
            <section className="navbar">
                <div className="container">
                    <img src={logo} alt="" />
                    <div className="header__item">
                        <ul>
                            <li>
                                <Link to="">Casio</Link>
                            </li>
                            <li>
                                <Link to="">Dex</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="header__exit">
                        <Hamburger
                            toggled={open}
                            toggle={setOpen}
                            size={25}
                            hideOutline={true}
                            rounded
                        />
                    </div>
                </div>
            </section>

            {/* Sidebar Panel */}
            <div
                className="sidebar"
                style={open ? { left: "0" } : { left: "-300px" }}
            >
                <div>
                    <img src={logo} alt="" />
                </div>
                <div className="spacer-half"></div>
                <span>
                    <div>
                        <Link to="">Casino</Link>
                    </div>
                    <div>
                        <Link to="">Dex</Link>
                    </div>
                </span>
            </div>

            <div
                id="overlay__screen"
                style={open ? { display: "block" } : { display: "none" }}
                onClick={() => setOpen(false)}
            ></div>
        </>
    );
}
