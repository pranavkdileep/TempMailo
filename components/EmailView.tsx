"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";

interface EmailViewProps {
  email: {
    id: string;
    from: string;
    to: string;
    cc: string;
    subject: string;
    body_text: string;
    body_html: string;
    created_at: string;
    isRead: boolean;
    isUnread?: boolean;
  };
  onBack: () => void;
}

function EmailView({ email, onBack }: EmailViewProps) {
  return (
    <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <button 
            className="flex items-center gap-2 rounded-md h-10 px-4 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Inbox</span>
          </button>
        </div>
        <div className="p-6 md:p-8">
          <h1 className="text-slate-900 text-2xl md:text-3xl font-bold leading-tight tracking-tight mb-4">
            Subject: {email.subject}
          </h1>
          <div className="space-y-3 text-sm text-slate-600 mb-6 border-b border-slate-200 pb-6">
            <div className="flex items-center gap-2">
              <span className="font-medium text-slate-800">From:</span>
              <span>{email.from}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-slate-800">To:</span>
              <span>{email.to}</span>
            </div>
            {email.cc && (
              <div className="flex items-center gap-2">
                <span className="font-medium text-slate-800">CC:</span>
                <span>{email.cc}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className="font-medium text-slate-800">Date:</span>
              <span>{email.created_at}</span>
            </div>
          </div>
          <article className="prose prose-slate max-w-none text-slate-700 text-base leading-relaxed">
            {email.body_html ? (
              <div dangerouslySetInnerHTML={{ __html: email.body_html }} />
            ) : (
              <div className="whitespace-pre-wrap">{email.body_text}</div>
            )}
          </article>
        </div>
      </div>
    </main>
  );
}

export default EmailView;