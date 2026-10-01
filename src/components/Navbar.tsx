import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { isGatedServicePath } from "@/lib/serviceAccess";

/** Cosmic Astro drawer links — order matches reference menu. */
const MENU_LINKS = [
  { path: "/horoscope", label: "Horoscope" },
  { path: "/talk-to-astra", label: "Talk to Astra" },
  { path: "/about", label: "About Astrology" },
  { path: "/tarot", label: "Tarot" },
  { path: "/numerology", label: "Numerology" },
  { path: "/dreams", label: "Dream interpretation" },
  { path: "/chinese-horoscope", label: "Chinese horoscope" },
  { path: "/astrology-houses", label: "About Astrology Houses" },
  { path: "/planets", label: "Planets" },
  { path: "/palm-analysis", label: "Palm analysis" },
  { path: "/astrology", label: "Birth chart reading" },
  { path: "/downloads", label: "Downloads" },
] as const;

const BackArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="57.571"
    height="35.98"
    viewBox="0 0 57.571 35.98"
    className="cosmic-back-arrow-svg"
    aria-hidden
  >
    <path
      d="M1.06,111.472,15.453,97.079a3.6,3.6,0,1,1,5.088,5.088L12.3,110.415H53.98a3.6,3.6,0,1,1,0,7.2H12.3l8.251,8.251a3.6,3.6,0,0,1-5.088,5.088L1.066,116.558A3.589,3.589,0,0,1,1.06,111.472Z"
      transform="translate(-0.007 -96.025)"
      fill="#fff"
    />
  </svg>
);

const HamburgerIcon = ({ open }: { open: boolean }) =>
  open ? (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ) : (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M4 8h24M4 16h24M4 24h24"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { requestService } = useSubscription();
  const showBack = location.pathname !== "/" && !drawerOpen;

  /** Cosmic Astro: nested → parent section; section pages → home. */
  const handleBack = () => {
    const path = location.pathname;
    if (path.startsWith("/horoscope/")) {
      navigate("/horoscope");
      return;
    }
    if (path.startsWith("/numerology/")) {
      navigate("/numerology");
      return;
    }
    if (path.startsWith("/chinese-horoscope/")) {
      navigate("/chinese-horoscope");
      return;
    }
    if (path.startsWith("/planets/")) {
      navigate("/planets");
      return;
    }
    navigate("/");
  };

  const isActive = (path: string) => {
    if (path === "/horoscope") return location.pathname.startsWith("/horoscope");
    if (path === "/numerology") return location.pathname.startsWith("/numerology");
    if (path === "/chinese-horoscope")
      return location.pathname.startsWith("/chinese-horoscope");
    if (path === "/planets") return location.pathname.startsWith("/planets");
    return location.pathname === path;
  };

  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("cosmic-nav-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("cosmic-nav-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("cosmic-nav-open");
    };
  }, [drawerOpen]);

  const openLogin = () => {
    setDrawerOpen(false);
    window.dispatchEvent(new CustomEvent("open-auth-modal"));
  };

  const handleMenuNav = (path: string) => {
    setDrawerOpen(false);
    if (isGatedServicePath(path)) {
      requestService(path);
    } else {
      navigate(path);
    }
  };

  return (
    <div className="relative z-[100]">
      <header className={cn("relative safe-area-top", drawerOpen ? "z-[70]" : "z-50")}>
        <div className="container mx-auto px-4 pt-2 pb-1">
          <div className="relative flex items-center justify-center min-h-[56px]">
            {showBack && (
              <button
                type="button"
                onClick={handleBack}
                className="cosmic-back-arrow"
                aria-label="Go back"
              >
                <BackArrowIcon />
              </button>
            )}

            {!drawerOpen && (
              <Link
                to="/"
                className="relative z-10 mx-auto inline-flex max-w-[150px] shrink-0"
              >
                <img
                  src={BRAND.LOGO}
                  alt={BRAND.NAME}
                  className="h-auto w-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </Link>
            )}

            {!drawerOpen && (
              <button
                type="button"
                onClick={() => {
                  if (user) {
                    navigate("/my-account");
                  } else {
                    openLogin();
                  }
                }}
                className="absolute right-12 top-1/2 z-[60] -translate-y-1/2 rounded-full border border-[#AB8D60]/55 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#C7B59E] hover:border-[#AB8D60] hover:text-white sm:right-14 sm:px-3 sm:text-[11px]"
              >
                My Profile
              </button>
            )}

            <button
              type="button"
              onClick={() => setDrawerOpen((o) => !o)}
              className={cn(
                "rounded-md p-2 text-white hover:opacity-90",
                drawerOpen
                  ? "fixed right-3 top-2 z-[80]"
                  : "absolute right-0 top-1/2 z-[60] -translate-y-1/2"
              )}
              aria-label={drawerOpen ? "Close menu" : "Open menu"}
              aria-expanded={drawerOpen}
            >
              <HamburgerIcon open={drawerOpen} />
            </button>
          </div>
        </div>
      </header>

      {drawerOpen && (
        <div
          className="cosmic-nav-drawer fixed inset-0 z-[55] overflow-y-auto overscroll-contain"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="cosmic-nav-drawer-bg fixed inset-0" aria-hidden />
          <div className="cosmic-nav-drawer-stars fixed inset-0 pointer-events-none" aria-hidden />
          <div className="cosmic-nav-drawer-clouds fixed inset-0 pointer-events-none" aria-hidden />

          <div className="relative z-10 flex min-h-full flex-col px-4 pb-24 pt-14">
            <div className="mx-auto mb-8 w-full max-w-[150px]">
              <Link to="/" onClick={() => setDrawerOpen(false)}>
                <img
                  src={BRAND.LOGO}
                  alt={BRAND.NAME}
                  className="mx-auto w-full object-contain"
                />
              </Link>
            </div>

            <nav className="relative z-10 flex flex-1 flex-col items-center text-center">
              {MENU_LINKS.map((item) => (
                <button
                  key={`${item.label}-${item.path}`}
                  type="button"
                  onClick={() => handleMenuNav(item.path)}
                  className={cn(
                    "cosmic-menu-btn",
                    isActive(item.path) && "is-active"
                  )}
                >
                  {item.label}
                </button>
              ))}

              {user ? (
                <>
                  <Link
                    to="/my-account"
                    onClick={() => setDrawerOpen(false)}
                    className={cn(
                      "cosmic-menu-btn",
                      location.pathname === "/my-account" && "is-active"
                    )}
                  >
                    My Profile
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setDrawerOpen(false);
                    }}
                    className="cosmic-menu-btn"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={openLogin}
                  className="cosmic-menu-btn"
                >
                  Login
                </button>
              )}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
