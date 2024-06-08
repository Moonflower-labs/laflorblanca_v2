import { RiInstagramLine } from "react-icons/ri";
import { FaFacebook, FaTelegram } from "react-icons/fa";
import { GrYoutube } from "react-icons/gr";

const Footer = () => {
  const staticPrefix = import.meta.env.PROD ? "/static" : "";

  const logoUrl = `${staticPrefix}/logo.jpeg`;
  return (
    <footer className="footer justify-center md:justify-normal p-10 bg-gradient-to-r from-secondary/80 to-primary/70 text-primary-content/75">
      <aside>
        <img
          src={logoUrl}
          width={50}
          height={50}
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <p className="text-primary-content">&copy; La Flor Blanca {new Date().getFullYear()}</p>

        <a
          className="link link-primary"
          href="https://portfolio-42z.pages.dev/"
          target="_blank"
        >
          &copy; Moonflower Labs
        </a>
      </aside>
      <nav>
        <h6 className="footer-title">Redes Sociales</h6>
        <div className="grid grid-flow-col gap-4">
          <a href="https://www.instagram.com/the_chic_noir" target="_blank">
            <RiInstagramLine size={25} />
          </a>
          <a href="https://t.me/VisioneslaFlorBlanca" target="_blank">
            <FaTelegram size={25} />
          </a>
          <a href="https://www.youtube.com/@LaFlorBlanca" target="_blank">
            <GrYoutube size={25} />
          </a>
          <a href="https://www.facebook.com/TheChicNoir1" target="_blank">
            <FaFacebook size={25} />
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
