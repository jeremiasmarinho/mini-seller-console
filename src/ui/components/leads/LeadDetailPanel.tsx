import { useEffect, useMemo, useState } from "react";
import type { Lead, LeadStatus } from "../../../types";

type Props = {
  lead: Lead | null;
  onClose: () => void;
  onRequestSave: (args: {
    id: string;
    email: string;
    status: LeadStatus;
  }) => Promise<void>;
  onConvert?: (lead: Lead) => void;
};

const statusOptions: LeadStatus[] = [
  "New",
  "Contacted",
  "Qualified",
  "Unqualified",
];
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LeadDetailPanel({
  lead,
  onClose,
  onRequestSave,
  onConvert,
}: Props) {
  const isOpen = !!lead;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<LeadStatus>("New");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (lead) {
      setEmail(lead.email);
      setStatus(lead.status);
      setError(null);
      setSaving(false);
      setDirty(false);
    }
  }, [lead]);

  const emailValid = useMemo(() => emailRegex.test(email), [email]);
  const canSave =
    !!lead &&
    !saving &&
    emailValid &&
    (dirty || email !== lead.email || status !== lead.status);

  async function handleSave() {
    if (!lead) return;
    if (!emailValid) {
      setError("Invalid email format.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await onRequestSave({ id: lead.id, email, status });
      onClose();
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : "Failed to save changes.";
      setError(errorMessage);
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Toggle root marker class so other fixed elements can be hidden via CSS
  useEffect(() => {
    const cls = "lead-panel-open";
    if (isOpen) document.documentElement.classList.add(cls);
    else document.documentElement.classList.remove(cls);
    return () => document.documentElement.classList.remove(cls);
  }, [isOpen]);

  return (
    <>
      {/* Enhanced Backdrop */}
      <div
        style={{ zIndex: 2147483000 }}
        className={`fixed inset-0 bg-gradient-to-br from-slate-900/60 via-slate-800/40 to-slate-900/60 backdrop-blur-md transition-all duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      {/* Premium Panel */}
      <aside
        data-panel
        style={{
          zIndex: 2147483001,
          borderColor: "var(--border-glass)",
        }}
        className={`fixed right-0 top-0 h-full w-full max-w-2xl glass-effect shadow-2xl transform transition-all duration-500 ease-out border-l flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        {/* Header with gradient */}
        <div
          className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 border-b"
          style={{ borderColor: "var(--border-secondary)" }}
        >
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Lead Details</h3>
                <p className="text-white/80 text-sm">
                  Manage lead information and status
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {onConvert && lead && (
                <button
                  onClick={() => onConvert(lead)}
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-all duration-200 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Convert to Opportunity
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-xl transition-colors text-white"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6 space-y-6 min-h-0">
          {lead ? (
            <>
              {/* Lead Profile Card */}
              <div
                className="glass-card rounded-2xl p-6"
                style={{
                  borderColor: "var(--border-secondary)",
                }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {lead.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full border-3 border-white shadow-lg"></div>
                  </div>
                  <div className="flex-1">
                    <h4
                      className="text-2xl font-bold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {lead.name}
                    </h4>
                    <p
                      className="font-medium text-lg"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {lead.company}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className="inline-flex items-center gap-1 text-sm px-3 py-1 rounded-full"
                        style={{
                          color: "var(--text-secondary)",
                          backgroundColor: "var(--bg-primary)",
                        }}
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          />
                        </svg>
                        {lead.source}
                      </span>
                      <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full">
                        <svg
                          className="w-4 h-4 text-amber-500"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <span className="font-bold text-amber-700">
                          {lead.score}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div
                className="glass-card rounded-2xl p-6"
                style={{
                  borderColor: "var(--border-secondary)",
                }}
              >
                <label
                  className="block text-sm font-semibold mb-3"
                  style={{ color: "var(--text-primary)" }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    Email Address
                  </div>
                </label>
                <div className="relative">
                  <input
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setDirty(true);
                    }}
                    className={`w-full px-4 py-3 border rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 ${
                      emailValid
                        ? "focus:ring-blue-500/50 focus:border-blue-500"
                        : "border-red-300 focus:ring-red-500/50 focus:border-red-500"
                    }`}
                    style={{
                      backgroundColor: "var(--bg-primary)",
                      borderColor: emailValid
                        ? "var(--border-primary)"
                        : "#fca5a5",
                      color: "var(--text-primary)",
                    }}
                    placeholder="Enter email address..."
                  />
                  <div className="absolute right-3 top-3">
                    {emailValid ? (
                      <svg
                        className="w-5 h-5 text-emerald-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      email && (
                        <svg
                          className="w-5 h-5 text-red-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      )
                    )}
                  </div>
                </div>
                {email && !emailValid && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Please enter a valid email address
                  </p>
                )}
              </div>

              {/* Status Field */}
              {/* Status Field */}
              <div
                className="glass-card rounded-2xl p-6"
                style={{
                  borderColor: "var(--border-secondary)",
                }}
              >
                <label
                  className="block text-sm font-semibold mb-3"
                  style={{ color: "var(--text-primary)" }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    Lead Status
                  </div>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {statusOptions.map((s) => {
                    const statusConfig = {
                      New: {
                        bg: "bg-blue-100 text-blue-700 border-blue-200",
                        icon: "🆕",
                      },
                      Contacted: {
                        bg: "bg-amber-100 text-amber-700 border-amber-200",
                        icon: "📞",
                      },
                      Qualified: {
                        bg: "bg-emerald-100 text-emerald-700 border-emerald-200",
                        icon: "✅",
                      },
                      Unqualified: {
                        bg: "bg-red-100 text-red-700 border-red-200",
                        icon: "❌",
                      },
                    };
                    const config = statusConfig[s];
                    const isSelected = status === s;

                    return (
                      <button
                        key={s}
                        onClick={() => {
                          setStatus(s);
                          setDirty(true);
                        }}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                          isSelected
                            ? `${config.bg} ${config.bg.replace(
                                "100",
                                "200"
                              )} ring-2 ring-offset-2 ring-blue-500/50 shadow-lg transform scale-105`
                            : "hover:shadow-md"
                        }`}
                        style={
                          !isSelected
                            ? {
                                backgroundColor: "var(--bg-primary)",
                                borderColor: "var(--border-primary)",
                                color: "var(--text-primary)",
                              }
                            : {}
                        }
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-1">{config.icon}</div>
                          <div
                            className={`font-semibold ${
                              isSelected ? config.bg.split(" ")[1] : ""
                            }`}
                            style={
                              !isSelected
                                ? { color: "var(--text-primary)" }
                                : {}
                            }
                          >
                            {s}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div
                  className="border rounded-2xl p-4"
                  style={{
                    backgroundColor: "#fef2f2",
                    borderColor: "#fecaca",
                  }}
                >
                  <div className="flex items-center gap-2 text-red-700">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="font-medium">{error}</span>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "var(--bg-primary)" }}
              >
                <svg
                  className="w-10 h-10"
                  style={{ color: "var(--text-secondary)" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h4
                className="text-lg font-semibold mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                No Lead Selected
              </h4>
              <p style={{ color: "var(--text-secondary)" }}>
                Select a lead from the table to view details
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div
          className="flex-shrink-0 p-6 border-t glass-card"
          style={{
            borderColor: "var(--border-secondary)",
          }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {dirty && (
                <div className="flex items-center gap-2 text-amber-600 text-sm font-medium">
                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                  Unsaved changes
                </div>
              )}
            </div>
            <div className="flex items-center justify-end w-full sm:w-auto">
              <button
                onClick={handleSave}
                disabled={!canSave}
                className="relative w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium transition-all duration-200 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {saving ? (
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Saving...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Save Changes
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
