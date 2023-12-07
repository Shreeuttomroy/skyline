import logo from "./log.png";
function Footer() {
    return (
        <>
            <footer className="footer p-10 bg-base-300 font-semibold text-base-content">
                <aside>
                    <img className=" w-20 h-12" src={logo} alt="" />
                    <p>SkyLine Industries Ltd.<br />Providing reliable realstate since 2010</p>
                </aside>
                <nav>
                    <header className="footer-title">Company</header>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <header className="footer-title">Legal</header>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
                <nav>
                    <header className="footer-title">Follow On</header>
                    <a className="link link-hover">Linkedin</a>
                    <a className="link link-hover">Twitter</a>
                    <a className="link link-hover">Instagram</a>
                    <a className="link link-hover">Facebook</a>
                </nav>
            </footer>
        </>
    );
}

export default Footer;