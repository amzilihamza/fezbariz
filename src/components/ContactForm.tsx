"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export function ContactForm() {
  const t = useTranslations("contact");
  const [sent, setSent] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="space-y-5"
    >
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-charcoal">
          {t("nameLabel")}
        </label>
        <input
          id="name"
          name="name"
          required
          className="w-full rounded-lg border border-sand-dark bg-white px-4 py-2.5 text-sm outline-none focus:border-terracotta"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-charcoal">
          {t("emailLabel")}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-lg border border-sand-dark bg-white px-4 py-2.5 text-sm outline-none focus:border-terracotta"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-charcoal">
          {t("messageLabel")}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full rounded-lg border border-sand-dark bg-white px-4 py-2.5 text-sm outline-none focus:border-terracotta"
        />
      </div>
      <button
        type="submit"
        className="rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-terracotta-dark"
      >
        {t("submit")}
      </button>
      {sent && (
        <p className="text-sm text-forest">
          {t("submit") === "Envoyer"
            ? "Merci, votre message a bien été noté."
            : "Thanks, your message has been noted."}
        </p>
      )}
    </form>
  );
}
