import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Cookie, X, Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      // Show banner after a short delay
      setTimeout(() => setShowBanner(true), 1000);
    } else {
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem("cookieConsent", JSON.stringify(prefs));
    setPreferences(prefs);
    setShowBanner(false);
    setShowSettings(false);

    // Initialize analytics if accepted
    if (prefs.analytics && (window as any).gtag) {
      (window as any).gtag("consent", "update", {
        analytics_storage: "granted",
      });
    }
  };

  const acceptAll = () => {
    savePreferences({
      necessary: true,
      analytics: true,
      marketing: true,
    });
  };

  const acceptNecessary = () => {
    savePreferences({
      necessary: true,
      analytics: false,
      marketing: false,
    });
  };

  const openSettings = () => {
    setShowSettings(true);
  };

  return (
    <>
      {/* Cookie Settings Button (always visible) */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        onClick={() => setShowSettings(true)}
        className="fixed bottom-6 left-6 z-40 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
        aria-label="Cookie Settings"
      >
        <Cookie className="w-5 h-5" />
      </motion.button>

      {/* Cookie Consent Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border shadow-2xl"
          >
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <Cookie className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        We Value Your Privacy
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        We use cookies to enhance your browsing experience, analyze site traffic, 
                        and provide personalized content. By clicking "Accept All", you consent to 
                        our use of cookies. You can manage your preferences at any time.{" "}
                        <Link
                          to="/cookie-policy"
                          className="text-primary hover:underline"
                        >
                          Learn more
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    onClick={acceptNecessary}
                    className="whitespace-nowrap"
                  >
                    Necessary Only
                  </Button>
                  <Button
                    variant="outline"
                    onClick={openSettings}
                    className="whitespace-nowrap"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Customize
                  </Button>
                  <Button onClick={acceptAll} className="whitespace-nowrap">
                    Accept All
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cookie Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Cookie className="w-5 h-5" />
              Cookie Preferences
            </DialogTitle>
            <DialogDescription>
              Manage your cookie preferences. You can enable or disable different 
              types of cookies below.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Necessary Cookies */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b">
              <div className="flex-1">
                <Label className="text-base font-semibold">
                  Necessary Cookies
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  These cookies are essential for the website to function properly. 
                  They cannot be disabled.
                </p>
              </div>
              <Switch checked={true} disabled />
            </div>

            {/* Analytics Cookies */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b">
              <div className="flex-1">
                <Label className="text-base font-semibold">
                  Analytics Cookies
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  These cookies help us understand how visitors interact with our 
                  website by collecting and reporting information anonymously.
                </p>
              </div>
              <Switch
                checked={preferences.analytics}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, analytics: checked })
                }
              />
            </div>

            {/* Marketing Cookies */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <Label className="text-base font-semibold">
                  Marketing Cookies
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  These cookies are used to track visitors across websites to 
                  display relevant advertisements and marketing campaigns.
                </p>
              </div>
              <Switch
                checked={preferences.marketing}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, marketing: checked })
                }
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowSettings(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => savePreferences(preferences)}>
              Save Preferences
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
