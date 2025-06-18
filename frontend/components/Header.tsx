import { Clapperboard } from "lucide-react";

const Header = () => {
  return (
    <>
      <header>
        <div className="header-container">
          <div className="web-title-container">
            <Clapperboard size={18} strokeWidth={2} />
            <p className="web-title">Movie Collection</p>
          </div>
          <div className="header-links">
            <p>About</p>
            <p>Contact</p>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
