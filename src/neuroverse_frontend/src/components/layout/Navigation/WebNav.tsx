import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const WebNav = ({ navLinks }) => {
  return (
    <nav>
      <ul className="flex items-center gap-4">
        {navLinks.map((link, index: number) => (
          <li>
            <Link to={link.href}>
              <Button key={`nav-link-${index}`} variant="link">
                {link.label}
              </Button>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default WebNav;
