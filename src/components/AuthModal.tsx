import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BRAND } from "@/lib/brand";
import { HUTCH_CONFIG } from "@/lib/config";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Phone, Sparkles, Star } from "lucide-react";

const HUTCH_COUNTRY_CODE = "94";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  defaultTab?: "login" | "signup";
}

const AuthModal = ({ isOpen, onClose, onSuccess }: AuthModalProps) => {
  const { login, isLoading } = useAuth();
  const [mobile, setMobile] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const result = await login(mobile);
    if (result.success) {
      setMobile("");
      if (onSuccess) onSuccess();
      else onClose();
      return;
    }

    setErrorMessage(result.error || "Login failed. Please try again.");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[95vw] sm:w-full sm:max-w-md glass-card border-cosmic/30 p-4 sm:p-6 max-h-[95vh] overflow-y-auto">
        <DialogHeader className="text-center space-y-2 sm:space-y-3">
          <div className="flex items-center justify-center gap-2 mb-1 sm:mb-2">
            <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-cosmic animate-glow" />
            <DialogTitle className="text-xl sm:text-2xl cosmic-text font-bold">
              {BRAND.NAME}
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs sm:text-sm text-muted-foreground">
            Enter your mobile number to access {HUTCH_CONFIG.PRODUCT_NAME}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5 mt-4 sm:mt-6">
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="login-msisdn" className="text-sm font-medium">
              Mobile Number
            </Label>
            <div className="flex overflow-hidden rounded-lg border border-border/50 focus-within:border-cosmic/50">
              <span className="flex items-center bg-background/80 px-3 text-sm font-semibold text-muted-foreground select-none">
                +{HUTCH_COUNTRY_CODE}
              </span>
              <div className="relative flex-1">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
                <Input
                  id="login-msisdn"
                  type="tel"
                  inputMode="numeric"
                  placeholder="7XXXXXXXX"
                  value={mobile}
                  onChange={(e) => {
                    let digits = e.target.value.replace(/\D/g, "");
                    if (digits.startsWith(HUTCH_COUNTRY_CODE)) digits = digits.slice(HUTCH_COUNTRY_CODE.length);
                    if (digits.startsWith("0")) digits = digits.slice(1);
                    setMobile(digits.slice(0, 10));
                  }}
                  className="border-0 rounded-none pl-10 h-11 sm:h-12 text-sm sm:text-base bg-background/50 focus-visible:ring-0 focus-visible:ring-offset-0"
                  required
                  autoComplete="tel"
                  autoFocus
                  disabled={isLoading}
                  maxLength={10}
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-stellar-gradient hover:opacity-90 grahveda-glow h-11 sm:h-12 text-sm sm:text-base font-medium transition-all touch-manipulation"
            disabled={isLoading || !mobile.trim()}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2 animate-spin" />
                Checking subscription...
              </>
            ) : (
              <>
                <Star className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Continue
              </>
            )}
          </Button>
        </form>

        {errorMessage && (
          <div className="mt-3 sm:mt-4 p-3 sm:p-3.5 rounded-lg bg-red-500/10 border border-red-500/30">
            <p className="text-xs sm:text-sm text-red-400 text-center leading-relaxed">
              {errorMessage}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
