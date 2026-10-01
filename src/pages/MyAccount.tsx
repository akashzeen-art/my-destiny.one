import { useState } from "react";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { HUTCH_CONFIG } from "@/lib/config";
import { BRAND } from "@/lib/brand";
import { displayMsisdn } from "@/lib/hutchApi";

/**
 * My Profile / Account — ACTIVE Hutch session details (pid 21).
 * Unsubscribe redirects to `unsubUrl` from login API response.
 */
const MyAccount = () => {
  const { user, logout, isActive } = useAuth();
  const [confirming, setConfirming] = useState(false);

  if (!user || !isActive) {
    return (
      <Layout>
        <div className="grahveda-page max-w-lg mx-auto">
          <div className="grahveda-panel p-8 text-center">
            <h1 className="font-display text-2xl font-bold text-amber-50 mb-1">
              My Profile
            </h1>
            <p className="text-amber-400 text-sm font-medium mb-6">Sign In</p>
            <p className="text-orange-100/70 text-base font-medium mb-2">
              Access your account
            </p>
            <p className="text-orange-100/40 text-sm mb-8">
              Sign in with your mobile number to view subscription details.
            </p>
            <button
              type="button"
              onClick={() =>
                window.dispatchEvent(new CustomEvent("open-auth-modal"))
              }
              className="w-full grahveda-btn-primary py-3 rounded-xl font-semibold text-sm uppercase tracking-widest mb-3"
            >
              Sign In
            </button>
            <p className="text-orange-200/30 text-xs">
              Inactive numbers are redirected to subscribe for {HUTCH_CONFIG.PRODUCT_NAME}.
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  const handleUnsubscribe = () => {
    if (!confirming) {
      setConfirming(true);
      return;
    }
    // Doc: redirect to unsubUrl from ACTIVE login response
    const url = user.unsubUrl;
    logout();
    if (url) {
      window.location.href = url;
    }
  };

  return (
    <Layout>
      <div className="grahveda-page max-w-lg mx-auto">
        <div className="grahveda-panel p-6 sm:p-8">
          <h1 className="font-display text-2xl font-bold text-amber-50 mb-1 text-center">
            My Profile
          </h1>
          <p className="text-amber-400 text-sm font-medium mb-6 text-center">
            {HUTCH_CONFIG.PRODUCT_NAME}
          </p>

          <div className="space-y-3 mb-8 text-sm">
            <Row label="Mobile Number" value={displayMsisdn(user.msisdn)} />
            <Row label="Status" value="ACTIVE" valueClass="text-green-400 font-semibold" />
            <Row label="Product ID" value={String(HUTCH_CONFIG.PRODUCT_ID)} />
            <Row label="Activation Date" value={user.actDate} />
            <Row label="Renewal Date" value={user.renewDate} />
            <Row label="Price" value={user.pricePoint} />
            <Row label="Validity" value={`${user.validity} day(s)`} />
            <Row label="Service" value={BRAND.NAME} />
          </div>

          {confirming && (
            <p className="text-amber-200/80 text-xs text-center mb-3">
              Tap again to confirm. You will be redirected to unsubscribe.
            </p>
          )}

          <button
            type="button"
            onClick={handleUnsubscribe}
            disabled={!user.unsubUrl}
            className="w-full py-3 rounded-xl font-semibold text-sm uppercase tracking-widest mb-3 bg-red-700/90 hover:bg-red-600 text-white transition-colors disabled:opacity-60"
          >
            {confirming ? "Confirm Unsubscribe" : "Unsubscribe"}
          </button>

          {confirming && (
            <button
              type="button"
              onClick={() => setConfirming(false)}
              className="w-full py-2 text-orange-100/50 text-xs mb-3"
            >
              Cancel
            </button>
          )}

          <button
            type="button"
            onClick={logout}
            className="w-full grahveda-btn-primary py-3 rounded-xl font-semibold text-sm uppercase tracking-widest"
          >
            Logout
          </button>
        </div>
      </div>
    </Layout>
  );
};

function Row({
  label,
  value,
  valueClass,
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex justify-between gap-4 border-b border-orange-100/10 pb-2">
      <span className="text-orange-100/50">{label}</span>
      <span className={valueClass || "text-amber-50 text-right"}>{value}</span>
    </div>
  );
}

export default MyAccount;
