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
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md transform bg-white shadow-xl transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">Lead Details</h2>
          <button
            onClick={onClose}
            className="rounded p-2 text-gray-500 hover:bg-gray-100"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {lead ? (
          <div className="flex h-[calc(100%-56px)] flex-col">
            <div className="flex-1 space-y-4 overflow-auto p-4">
              <div>
                <div className="text-sm text-gray-500">Name</div>
                <div className="font-medium">{lead.name}</div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <div className="text-sm text-gray-500">Company</div>
                  <div className="font-medium">{lead.company}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Source</div>
                  <div className="font-medium">{lead.source}</div>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Email</label>
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setDirty(true);
                  }}
                  type="email"
                  className={`w-full rounded border px-3 py-2 outline-none focus:ring-2 ${
                    emailValid
                      ? "border-gray-300 focus:ring-blue-500"
                      : "border-red-400 focus:ring-red-500"
                  }`}
                  placeholder="name@company.com"
                />
                {!emailValid && (
                  <p className="mt-1 text-sm text-red-600">
                    Invalid email format
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Status</label>
                <select
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value as LeadStatus);
                    setDirty(true);
                  }}
                  className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {error && (
                <div className="rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
                  {error}
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 border-t p-4">
              {onConvert && lead && (
                <button
                  onClick={() => onConvert(lead)}
                  disabled={saving}
                  className="mr-auto rounded bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-60"
                >
                  Convert Lead
                </button>
              )}
              <button
                onClick={onClose}
                disabled={saving}
                className="rounded border px-4 py-2 text-sm hover:bg-gray-50 disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!canSave}
                className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 text-gray-500">No lead selected.</div>
        )}
      </aside>
    </>
  );
}
