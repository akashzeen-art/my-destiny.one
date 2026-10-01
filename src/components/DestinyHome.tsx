import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BRAND } from "@/lib/brand";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { useAuth } from "@/contexts/AuthContext";
import { isGatedServicePath } from "@/lib/serviceAccess";

const LOGO = "/destiny/images/logo.png";

const MENU_LINKS = [
  { label: "Horoscope", path: "/horoscope" },
  { label: "Talk to Medium", path: "/talk-to-astra" },
  { label: "About Astrology", path: "/about" },
  { label: "Tarot", path: "/tarot" },
  { label: "Numerology", path: "/numerology" },
  { label: "Dream interpretation", path: "/dreams" },
  { label: "Chinese horoscope", path: "/chinese-horoscope" },
  { label: "About Astrology Houses", path: "/astrology-houses" },
  { label: "Planets", path: "/planets" },
  { label: "Downloads", path: "/downloads" },
] as const;

const CATEGORIES = [
  { label: "Horoscope", path: "/horoscope", image: 1 },
  { label: "Talk to Medium", path: "/talk-to-astra", image: 2 },
  { label: "Astrology", path: "/about", image: 3 },
  { label: "Tarot", path: "/tarot", image: 4 },
  { label: "Numerology", path: "/numerology", image: 5 },
  { label: "Dream interpretation", path: "/dreams", image: 6 },
  { label: "Chinese horoscope", path: "/chinese-horoscope", image: 7 },
  { label: "About Astrology Houses", path: "/astrology-houses", image: 8 },
  { label: "Planets", path: "/planets", image: 9 },
] as const;

const DESTINY_CSS = [
  "/destiny/css/bootstrap.min.css",
  "/destiny/css/lines.css",
  "/destiny/css/style.css",
  "/destiny/css/home-overrides.css",
] as const;

function useDestinyStyles() {
  useEffect(() => {
    const links: HTMLLinkElement[] = [];
    DESTINY_CSS.forEach((href) => {
      if (document.querySelector(`link[data-destiny-home="${href}"]`)) return;
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.dataset.destinyHome = href;
      document.head.appendChild(link);
      links.push(link);
    });
    document.body.classList.add("destiny-home");
    document.documentElement.classList.add("destiny-home");
    return () => {
      links.forEach((l) => l.remove());
      document.body.classList.remove("destiny-home");
      document.documentElement.classList.remove("destiny-home");
    };
  }, []);
}

function useDestinyScroll() {
  useEffect(() => {
    const flowers = () =>
      document.querySelectorAll<HTMLElement>(".destiny-home-root .flowers");
    const planets = () =>
      document.querySelectorAll<HTMLElement>(".destiny-home-root .planets");
    const butterflies = () =>
      document.querySelectorAll<HTMLElement>(".destiny-home-root .butterfly");
    const womanface = () =>
      document.querySelector<HTMLElement>(".destiny-home-root .womanface");

    const onScroll = () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop;
      const mobile = window.innerWidth < 992;
      const threshold = mobile ? 40 : 60;

      flowers().forEach((el) => {
        if (scrollPos >= threshold) {
          el.classList.add("blooming");
          el.classList.remove("shrink");
        } else {
          el.classList.remove("blooming");
        }
      });
      planets().forEach((el) => {
        if (scrollPos >= threshold) {
          el.classList.add("blooming");
          el.classList.remove("shrink");
        } else {
          el.classList.remove("blooming");
        }
      });
      butterflies().forEach((el) => {
        if (scrollPos >= threshold) el.classList.add("fly");
        else el.classList.remove("fly");
      });

      const face = womanface();
      if (face) {
        if (scrollPos < 218) {
          face.style.right = `${0 + scrollPos / (mobile ? 15 : 8)}vh`;
        } else {
          face.style.right = mobile ? "12vh" : "18.7vh";
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

const DestinyHome = () => {
  useDestinyStyles();
  useDestinyScroll();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { requestService } = useSubscription();
  const { isActive } = useAuth();

  const go = useCallback(
    (path: string) => {
      setMenuOpen(false);
      if (isGatedServicePath(path)) {
        requestService(path);
      } else {
        navigate(path);
      }
    },
    [navigate, requestService],
  );

  useEffect(() => {
    document.body.classList.toggle("destiny-menu-open", menuOpen);
    return () => document.body.classList.remove("destiny-menu-open");
  }, [menuOpen]);

  return (
    <div className="destiny-home-root" data-spy="scroll" data-target=".site-navbar-target" data-offset="300">
      <div className="container-fluid index5 position-absolute p-0 destiny-nav-chrome">
        <nav className="top_logo pt-2">
          <div className="container-xxl">
            <div className="row">
              <div className="d-flex relative col-12">
                <Link className="navbar-brand-two mx-auto d-inline-block" to="/">
                  <img className="logo" src={LOGO} alt={BRAND.NAME} />
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <nav className="navbar navbar-dark bg-dark">
          <div className="container-fluid destiny-nav-actions">
            {!menuOpen && (
              <button
                type="button"
                className="destiny-profile-btn"
                onClick={() => {
                  if (isActive) {
                    navigate("/my-account");
                  } else {
                    window.dispatchEvent(new CustomEvent("open-auth-modal"));
                  }
                }}
              >
                My Profile
              </button>
            )}
            <button
              className="navbar-toggler custom-toggler"
              type="button"
              aria-controls="navbarToggleExternalContent"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span className="navbar-toggler-icon" />
            </button>
          </div>
        </nav>
      </div>

      <div
        className={`destiny-nav-drawer${menuOpen ? " is-open" : ""}`}
        id="navbarToggleExternalContent"
        aria-hidden={!menuOpen}
      >
        <div className="bg-dark">
          <nav className="top_logo index4 pt-2 mb-2">
            <div className="container">
              <div className="d-flex">
                <Link
                  className="navbar-brand-two mx-auto d-inline-block"
                  to="/"
                  onClick={() => setMenuOpen(false)}
                >
                  <img className="logo" src={LOGO} alt={BRAND.NAME} />
                </Link>
              </div>
            </div>
          </nav>
          {MENU_LINKS.map((item) => (
            <button
              key={item.label}
              type="button"
              className="menu_button"
              onClick={() => go(item.path)}
            >
              {item.label}
            </button>
          ))}
          <button
            type="button"
            className="menu_button"
            onClick={() => {
              setMenuOpen(false);
              if (isActive) {
                navigate("/my-account");
              } else {
                window.dispatchEvent(new CustomEvent("open-auth-modal"));
              }
            }}
          >
            My Profile
          </button>
        </div>
      </div>

      <div className="container-fluid index4 relative mb-5 min-vh-100 vh-100 main">
        <div className="container-xxl col-lg-10 index4 mb-5 vh-100">
          <div className="row relative">
            <div className="col-12">
              <div className="landing-title">
                Discover the hidden mysteries of your life by the stars
              </div>
            </div>
          </div>

          <div className="butterflybox">
            {[0, 1, 2].map((i) => (
              <div className="butterfly" key={i}>
                <div className="butterfly-turn">
                  <div className="butterfly-flutter" />
                </div>
              </div>
            ))}
          </div>

          <div className="head-girl" />
          <div className="womanface" />
          <div className="cards" />
          <div className="flowers shrink" />
          <div className="planets shrink" />
          <div className="position-absolute zodiac_box">
            <div className="zodiac-main" />
          </div>
          <div className="stars index0" />
          <div className="lines index0">
            {Array.from({ length: 11 }).map((_, i) => (
              <div className="line-container" key={i}>
                <div className="animated-line" />
              </div>
            ))}
          </div>
          <div className="cards" />
        </div>

        <div className="container-xxl col-lg-10 index4 mb-5 vh-100">
          <div className="row my-3 g-2">
            {CATEGORIES.map((item, idx) => (
              <div
                key={item.label}
                className={`col-6 col-md-4${idx === CATEGORIES.length - 1 ? " pb-5" : ""}`}
              >
                <button
                  type="button"
                  className={`category_button${idx === CATEGORIES.length - 1 ? " pb-5 mb-5" : ""}`}
                  onClick={() => go(item.path)}
                >
                  <div
                    className={`button-image button-image-${item.image} relative my-3`}
                  >
                    <div className="blob-box">
                      <div />
                    </div>
                  </div>
                  {item.label}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="footer mt-auto py-3 text-center fixed-bottom index4">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <p className="mb-0">
                Copyright © 2026 All rights reserved{" "}
                <Link to="/">{BRAND.NAME}</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinyHome;
