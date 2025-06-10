"use client";

import React, { useState, useEffect } from "react";
import {
  Copy,
  RefreshCw,
  Trash2,
  Github,
  Menu,
  MailOpen,
  MailCheck,
} from "lucide-react";
import EmailView from "./EmailView";
import { deletecurrentEmail, getcurrentEmail, registerEmail } from "@/actions/actions";

interface Email {
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
}

function HomePage() {
  const [currentEmail, setCurrentEmail] = useState(
    "loading..."
  );
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [emails] = useState<Email[]>([
    {
      id: "1",
      from: "support@tempmail.com",
      to: "temp.email.demo@mailbox.com",
      cc: "",
      subject: "Welcome to TempMail!",
      body_text: "Welcome to TempMail! Your temporary email service is now active. You can start receiving emails immediately.",
      body_html: "<p>Welcome to TempMail! Your temporary email service is now active. You can start receiving emails immediately.</p>",
      created_at: "2 hours ago",
      isRead: false,
      isUnread: true
    },
    {
      id: "2",
      from: "noreply@github.com",
      to: "temp.email.demo@mailbox.com",
      cc: "",
      subject: "GitHub Security Alert",
      body_text: "We noticed a new sign-in to your GitHub account from a new device.",
      body_html: "<p>We noticed a new sign-in to your GitHub account from a new device.</p>",
      created_at: "5 hours ago",
      isRead: true,
      isUnread: false
    },
    {
      id: "3",
      from: "newsletters@techcrunch.com",
      to: "temp.email.demo@mailbox.com",
      cc: "marketing@techcrunch.com",
      subject: "Weekly Tech Newsletter - AI Breakthroughs",
      body_text: "This week in tech: Major AI breakthroughs, startup funding rounds, and the latest in cybersecurity.",
      body_html: "<h2>This week in tech:</h2><p>Major AI breakthroughs, startup funding rounds, and the latest in cybersecurity.</p>",
      created_at: "1 day ago",
      isRead: true,
      isUnread: false
    },
    {
      id: "4",
      from: "notifications@linkedin.com",
      to: "temp.email.demo@mailbox.com",
      cc: "",
      subject: "John Doe wants to connect with you",
      body_text: "John Doe would like to add you to their professional network on LinkedIn.",
      body_html: "<p>John Doe would like to add you to their professional network on LinkedIn.</p>",
      created_at: "2 days ago",
      isRead: false,
      isUnread: true
    },
    {
      id: "5",
      from: "billing@aws.amazon.com",
      to: "temp.email.demo@mailbox.com",
      cc: "finance@aws.amazon.com",
      subject: "Your AWS Monthly Bill is Ready",
      body_text: "Your AWS bill for this month is $47.32. View your detailed usage and billing information.",
      body_html: "<p>Your AWS bill for this month is <strong>$47.32</strong>. View your detailed usage and billing information.</p>",
      created_at: "3 days ago",
      isRead: true,
      isUnread: false
    }
  ]);

  useEffect(() => {
    getcurrentEmail().then((email) => {
        console.log("Current email:", email);
        setCurrentEmail(email);
    }).catch((error) => {
      console.error("Error fetching current email:", error);
      setCurrentEmail("Failed to load email");
    })
  }, []);

  const generateNewEmail = async () => {
    const randomString = Math.random().toString(36).substring(2, 8);
    const newemail = await registerEmail(randomString);
    setCurrentEmail(newemail)
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentEmail);
  };

  const deleteEmail = async () => {
    await deletecurrentEmail();
    setCurrentEmail("");
  };

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
  };

  const handleBackToInbox = () => {
    setSelectedEmail(null);
  };

  if (selectedEmail) {
    return (
      <div className="relative flex size-full min-h-screen flex-col overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          {/* Header */}
          <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 bg-white px-6 sm:px-10 py-4 shadow-sm">
            <div className="flex items-center gap-3 text-slate-900">
              <div className="size-7 text-blue-600">
                <svg
                  fill="none"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
              <h1 className="text-slate-900 text-xl font-bold leading-tight tracking-tight">
                TempMail
              </h1>
            </div>
            <nav className="hidden sm:flex items-center gap-6">
              <a
                className="text-slate-500 hover:text-slate-900 transition-colors"
                href="#"
              >
                <Github className="h-6 w-6" />
              </a>
            </nav>
            <button className="sm:hidden flex items-center justify-center rounded-md h-9 w-9 bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors">
              <Menu className="h-6 w-6" />
            </button>
          </header>

          <EmailView email={selectedEmail} onBack={handleBackToInbox} />

          {/* Footer */}
          <footer className="py-8 text-center">
            <p className="text-slate-500 text-sm">
              © 2024 TempMail. All rights reserved.
            </p>
          </footer>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex size-full min-h-screen flex-col overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 bg-white px-6 sm:px-10 py-4 shadow-sm">
          <div className="flex items-center gap-3 text-slate-900">
            <div className="size-7 text-blue-600">
              <svg
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <h1 className="text-slate-900 text-xl font-bold leading-tight tracking-tight">
              TempMail
            </h1>
          </div>
          <nav className="hidden sm:flex items-center gap-6">
            <a
              className="text-slate-500 hover:text-slate-900 transition-colors"
              href="#"
            >
              <Github className="h-6 w-6" />
            </a>
          </nav>
          <button className="sm:hidden flex items-center justify-center rounded-md h-9 w-9 bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors">
            <Menu className="h-6 w-6" />
          </button>
        </header>

        {/* Main Content */}
        <main className="px-4 sm:px-8 md:px-20 lg:px-40 flex flex-1 justify-center py-8 sm:py-12 bg-slate-50">
          <div className="layout-content-container flex flex-col w-full max-w-3xl">
            {/* Email Address Section */}
            <section className="bg-white p-6 sm:p-8 rounded-xl shadow-lg mb-8">
              <h2 className="text-slate-800 text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-center mb-6 sm:mb-8">
                Your Temporary Email Address
              </h2>
              <div className="flex flex-col items-center gap-4 sm:gap-6">
                <div className="w-full max-w-md">
                  <div className="relative">
                    <input
                      className="form-input flex w-full resize-none overflow-hidden rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-300 bg-slate-50 focus:border-blue-500 h-14 placeholder:text-slate-400 p-4 text-base font-normal leading-normal pr-12"
                      readOnly
                      type="email"
                      value={currentEmail}
                    />
                    <button
                      className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-md h-10 w-10 text-slate-500 hover:bg-slate-200 hover:text-blue-600 transition-colors"
                      title="Copy email address"
                      onClick={copyToClipboard}
                    >
                      <Copy className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md justify-center">
                  <button
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg h-11 px-5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold leading-normal tracking-wide transition-colors shadow-sm"
                    onClick={generateNewEmail}
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span className="truncate">Generate New</span>
                  </button>
                  <button
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg h-11 px-5 bg-slate-200 hover:bg-slate-300 text-slate-700 hover:text-slate-800 text-sm font-semibold leading-normal tracking-wide transition-colors"
                    onClick={deleteEmail}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="truncate">Delete Email</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Inbox Section */}
            <section className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-slate-800 text-xl sm:text-2xl font-bold leading-tight tracking-tight">
                  Inbox
                </h2>
                <button className="flex items-center justify-center rounded-md h-9 w-9 text-slate-500 hover:bg-slate-100 hover:text-blue-600 transition-colors">
                  <RefreshCw className="h-5 w-5" />
                </button>
              </div>
              <div className="divide-y divide-slate-200">
                {emails.map((email) => (
                  <div
                    key={email.id}
                    className="flex items-center gap-4 hover:bg-slate-50 px-2 py-4 cursor-pointer transition-colors rounded-md -mx-2"
                    onClick={() => handleEmailClick(email)}
                  >
                    <div
                      className={`flex items-center justify-center rounded-full shrink-0 size-12 ${
                        email.isUnread
                          ? "bg-blue-100 text-blue-600"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {email.isUnread ? (
                        <MailOpen className="h-6 w-6" />
                      ) : (
                        <MailCheck className="h-6 w-6" />
                      )}
                    </div>
                    <div className="flex flex-col justify-center flex-1 min-w-0">
                      <p
                        className={`text-base leading-normal truncate ${
                          email.isUnread
                            ? "text-slate-800 font-medium"
                            : "text-slate-700 font-normal"
                        }`}
                      >
                        {email.from}
                      </p>
                      <p className="text-slate-500 text-sm font-normal leading-normal truncate">
                        {email.subject}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-slate-500 text-xs font-medium leading-normal mb-1">
                        {email.created_at}
                      </p>
                      {email.isUnread && (
                        <span className="inline-flex items-center justify-center rounded-full bg-blue-500 text-white text-xs font-semibold size-5">
                          1
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-8 text-center">
          <p className="text-slate-500 text-sm">
            © 2024 TempMail. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default HomePage;