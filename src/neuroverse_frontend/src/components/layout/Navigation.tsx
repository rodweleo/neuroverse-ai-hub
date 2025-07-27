import { useIsMobile } from "@/hooks/use-mobile";
import MobileNav from "./Navigation/MobileNav";
import WebNav from "./Navigation/WebNav";

const navLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Agents",
    href: "/agent-marketplace",
  },
  {
    label: "Tools",
    href: "/tools-marketplace",
  },
];

export default function Navigation() {
  const isMobile = useIsMobile();
  if (isMobile) {
    return <MobileNav navLinks={navLinks} />;
  }
  return <WebNav navLinks={navLinks} />;
}
