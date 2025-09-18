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
      const errorMessage = e instanceof Error ? e.message : "Failed to save changes.";
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

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-gradient-to-br from-black/50 to-slate-900/60 backdrop-blur-sm transition-all duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />
      
      {/* Panel */}
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-lg transform bg-white/95 backdrop-blur-md shadow-2xl transition-all duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } overflow-hidden`}
        role="dialog"
        aria-modal="true"
        style={{
          animation: isOpen ? 'slideInRight 0.5s ease-out' : undefined
        }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold">Lead Details</h2>
                <p className="text-blue-100 text-sm">Edit contact information</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {lead ? (
          <div className="flex h-[calc(100%-112px)] flex-col">
            <div className="flex-1 space-y-6 overflow-auto p-6">
              {/* Lead Info Card */}
              <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 border border-white/50 shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {lead.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">{lead.name}</h3>
                    <p className="text-slate-600 font-medium">{lead.company}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                    <div className="text-xs text-slate-500 font-medium mb-1">SCORE</div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span className="text-lg font-bold text-slate-700">{lead.score}</span>
                    </div>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                    <div className="text-xs text-slate-500 font-medium mb-1">SOURCE</div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      <span className="font-medium text-slate-700">{lead.source}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Editable Fields */}
              <div className="space-y-6">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <h4 className="font-semibold text-slate-800">Edit Contact</h4>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <input
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setDirty(true);
                          }}
                          type="email"
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-200 outline-none ${
                            emailValid
                              ? "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
                              : "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/20"
                          } bg-white/70 backdrop-blur-sm`}
                          placeholder="Enter email address"
                        />
                        {emailValid ? (
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        ) : email && (
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      {!emailValid && email && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Please enter a valid email address
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <select
                          value={status}
                          onChange={(e) => {
                            setStatus(e.target.value as LeadStatus);
                            setDirty(true);
                          }}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 outline-none bg-white/70 backdrop-blur-sm appearance-none"
                        >
                          {statusOptions.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                  <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
              )}
            </div>

            {/* Actions Footer */}
            <div className="bg-white/50 backdrop-blur-sm border-t border-white/20 p-6">
              <div className="flex items-center justify-between gap-4">
                {onConvert && lead && (
                  <button
                    onClick={() => onConvert(lead)}
                    disabled={saving}
                    className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed transform hover:scale-105"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    Convert to Opportunity
                  </button>
                )}
                
                <div className="flex gap-3 ml-auto">
                  <button
                    onClick={onClose}
                    disabled={saving}
                    className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 disabled:opacity-60"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={!canSave}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed transform hover:scale-105"
                  >
                    {saving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-slate-500">
              <svg className="w-16 h-16 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <p className="text-lg font-medium">No lead selected</p>
              <p className="text-sm">Select a lead from the table to view details</p>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
