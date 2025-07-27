import { useAuth } from "@/contexts/use-auth-client";
import { Button } from "@/components/ui/button";

export default function ContinueWithIcpAuthenticatorBtn() {
  const { signInWithIcpAuthenticator } = useAuth();

  return (
    <Button
      type="button"
      onClick={signInWithIcpAuthenticator}
      className="w-full flex items-center justify-center"
      variant="outline"
    >
      <img
        src="/logos/ICP_Logo.png"
        alt="ICP Authenticator"
        width="25px"
        height="25px"
      />
      <span className="font-semibold">CONTINUE WITH ICP AUTHENTICATOR</span>
    </Button>
  );
}
