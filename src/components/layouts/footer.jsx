import React from "react";
import logo from "../../assets/images/logo.png";

export default function Footer() {
    return (
        <div className="bg__footer">
            <div className="container">
                <section className="footer">
                    <a href="https://babylonswap.finance">
                        <div>
                            <img src={logo} alt="" />
                            <h3>BabylonSwap</h3>
                        </div>
                    </a>
                    <p>Copyright &copy; 2022</p>
                </section>
            </div>
        </div>
    );
}
