import AuthBtn from "@/components/auth/auth-btn";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { AlignRight } from "lucide-react";
import { Link } from "react-router-dom";

const MobileNav = ({ navLinks }) => {
  return (
    <Drawer direction="bottom" shouldScaleBackground dismissible={true}>
      <DrawerTrigger>
        <AlignRight />
      </DrawerTrigger>
      <DrawerContent className="h-2/5">
        <DrawerHeader>
          <DrawerTitle className="text-2xl text-left">Neuroverse</DrawerTitle>
          <Separator />
        </DrawerHeader>

        <div>
          <nav>
            <ul>
              {navLinks.map((link, index: number) => (
                <li>
                  <DrawerClose asChild className="outline-none">
                    <Link to={link.href}>
                      <Button key={`nav-link-${index}`} variant="link">
                        {link.label}
                      </Button>
                    </Link>
                  </DrawerClose>
                </li>
              ))}
            </ul>
            <nav className="flex flex-col gap-4 p-4">
              <Button variant="outline" asChild>
                <Link to="/deploy">Deploy Your Agent</Link>
              </Button>
              <AuthBtn />
            </nav>
          </nav>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileNav;
