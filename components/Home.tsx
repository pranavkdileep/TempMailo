"use client";

import React, { useState, useEffect } from "react";
import {
  Copy,
  Check,
  RefreshCw,
  Trash2,
  Github,
  Menu,
  MailOpen,
  MailCheck,
} from "lucide-react";
import EmailView from "./EmailView";
import {
  deletecurrentEmail,
  getcurrentEmail,
  getEmails,
  registerEmail,
} from "@/actions/actions";

import Image from "next/image";

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
  const [currentEmail, setCurrentEmail] = useState("loading...");
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [emails, setEmails] = useState<Email[]>([]);
  const [loadingGenerate, setLoadingGenerate] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingEmails, setLoadingEmails] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    setLoadingGenerate(true);
    getcurrentEmail()
      .then((email) => {
        console.log("Current email:", email);
        setCurrentEmail(email);
      })
      .catch((error) => {
        console.error("Error fetching current email:", error);
        setCurrentEmail("Failed to load email");
      });
    setLoadingGenerate(false);
  }, []);
  useEffect(() => {
    if(!currentEmail || currentEmail === "loading...") return;
    getEmails(currentEmail)
      .then((emails) => {
        console.log("Fetched emails:", emails);
        setEmails(emails);
        setLoadingEmails(false);
      })
      .catch((error) => {
        console.error("Error fetching emails:", error);
        setEmails([]);
        setLoadingEmails(false);
      });
  }, [currentEmail]);

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const generateNewEmail = async () => {
    setLoadingGenerate(true);
    const randomString = Math.random().toString(36).substring(2, 8);
    const newemail = await registerEmail(randomString);
    setCurrentEmail(newemail);
    setLoadingGenerate(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentEmail).then(() => {
      setIsCopied(true);
      console.log("Email copied to clipboard:", currentEmail);
    }).catch((error) => {
      console.error("Failed to copy email:", error);
    });
  };

  const deleteEmail = async () => {
    await deletecurrentEmail();
    setCurrentEmail("");
    setSelectedEmail(null);
    setEmails([]);
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
                <Image
                  src="/logo.svg"
                  alt="TempMailo Logo - Temporary Email Service"
                  width={48}
                  height={48}
                  ></Image>
              </div>
              <h1 className="text-slate-900 text-xl font-bold leading-tight tracking-tight">
                TempMailo
              </h1>
            </div>
            <nav className="hidden sm:flex items-center gap-6">
              <a
                className="text-slate-500 hover:text-slate-900 transition-colors"
                href="https://github.com/pranavkdileep/TempMailo"
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
              © 2025 TempMailo. All rights reserved.
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
            <Image
                  src="/logo.svg"
                  alt="TempMailo Logo - Temporary Email Service"
                  width={48}
                  height={48}
                  ></Image>
            </div>
            <h1 className="text-slate-900 text-xl font-bold leading-tight tracking-tight">
              TempMailo
            </h1>
          </div>
          <nav className="hidden sm:flex items-center gap-6">
            <a
              className="text-slate-500 hover:text-slate-900 transition-colors"
              href="https://github.com/pranavkdileep/TempMailo"
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
                      {isCopied ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <Copy className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md justify-center">
                  <button
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg h-11 px-5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold leading-normal tracking-wide transition-colors shadow-sm"
                    onClick={generateNewEmail}
                  >
                    <RefreshCw className={`h-4 w-4 ${loadingGenerate ? "animate-spin" : ""}`} />
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
                <button className="flex items-center justify-center rounded-md h-9 w-9 text-slate-500 hover:bg-slate-100 hover:text-blue-600 transition-colors"
                  onClick={() => {
                    setLoadingEmails(true);
                    getEmails(currentEmail)
                      .then((emails) => {
                        console.log("Fetched emails:", emails);
                        setEmails(emails);
                        setLoadingEmails(false);
                      })
                      .catch((error) => {
                        console.error("Error fetching emails:", error);
                        setEmails([]);
                        setLoadingEmails(false);
                      });
                  }}
                >
                <RefreshCw className={`h-5 w-5 ${loadingEmails ? "animate-spin" : ""}`} />
                </button>
              </div>
              {!loadingEmails ? <>
                { emails.length != 0 ? (<div className="divide-y divide-slate-200">
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
              </div>):(
                <div className="text-center text-slate-500">
                  <p>No emails found.</p>
                </div>
              )}
              </>:(
                <div className="text-center text-slate-500">
                  <p>Loading emails...</p>
                </div>
              )}
            </section>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-8 text-center">
          <p className="text-slate-500 text-sm">
            © 2025 TempMailo. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default HomePage;
