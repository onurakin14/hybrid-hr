"use client";

import * as React from "react";

function cn(...xs: Array<string | false | undefined | null>) {
  return xs.filter(Boolean).join(" ");
}

export default function CandidateActions({
  candidateId,
  candidateName,
}: {
  candidateId: number;
  candidateName: string;
}) {
  const [open, setOpen] = React.useState(false);

  function close() {
    setOpen(false);
  }

  function confirm() {
    console.log("Move to offer confirmed:", { candidateId, candidateName });
    close();
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 15a4 4 0 01-4 4H7l-4 2V7a4 4 0 014-4h10a4 4 0 014 4v8z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Message
        </button>

        <button className="inline-flex items-center gap-2 rounded-lg border border-rose-200 bg-white px-3 py-2 text-sm font-semibold text-rose-600 shadow-sm hover:bg-rose-50">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Reject
        </button>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-700"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 7l-11 11-5-5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Move to Offer
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Close"
            onClick={close}
            className="absolute inset-0 bg-black/30"
          />

          <div className="relative mx-auto mt-24 w-[92%] max-w-sm">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl">
              <div className="text-lg font-semibold text-slate-900">Move to Offer</div>
              <div className="mt-1 text-sm text-slate-500">
                Are you sure you want to move this candidate to offer stage?
              </div>

              <div className="mt-5 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={close}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirm}
                  className="rounded-lg bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-700"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
