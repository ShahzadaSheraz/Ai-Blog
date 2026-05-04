import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for AI Student Insights, including Google AdSense disclosures, cookies, and data practices.",
};

export default function PrivacyPolicyPage() {
  const updated = "May 4, 2026";
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Privacy Policy</h1>
      <p className="mt-2 text-sm text-zinc-500">Last updated: {updated}</p>

      <div className="prose-blog mt-10 space-y-6 text-zinc-300">
        <p>
          This Privacy Policy describes how <strong>{siteConfig.name}</strong> (“we”, “us”, or “our”)
          collects, uses, stores, and shares information when you visit {siteConfig.url} (the
          “Site”). By using the Site, you agree to this policy. If you do not agree, please discontinue
          use of the Site.
        </p>

        <h2>1. Information we collect</h2>
        <p>
          <strong>Information you provide voluntarily.</strong> If you contact us (for example through
          a mailto link or third-party form provider), we may receive your name, email address, and the
          contents of your message.
        </p>
        <p>
          <strong>Automatically collected information.</strong> Like many websites, we and our service
          providers may collect certain technical data automatically, such as IP address, browser type,
          device type, general location derived from IP, referring/exit pages, operating system,
          date/time stamps, and on-site activity (for example pages viewed and approximate scroll or
          interaction signals if enabled by our analytics tools).
        </p>

        <h2>2. Cookies and similar technologies</h2>
        <p>
          We use cookies, pixels, local storage, and similar technologies for essential site operation,
          performance measurement, personalization (where applicable), and advertising. Cookies are small
          text files stored on your device. You can control cookies through your browser settings;
          disabling cookies may impact certain features.
        </p>

        <h2>3. Google AdSense and advertising partners</h2>
        <p>
          Third-party vendors, including Google, may use cookies to serve ads based on a user’s prior
          visits to our Site or other websites. Google’s use of advertising cookies enables it and its
          partners to serve ads to users based on their visits to our Site and/or other sites on the
          Internet.
        </p>
        <p>
          You may opt out of personalized advertising by visiting{" "}
          <a href="https://www.google.com/settings/ads">Google Ads Settings</a> or{" "}
          <a href="https://www.aboutads.info/choices/">aboutads.info</a>. Alternatively, you can opt out
          of a third-party vendor’s use of cookies for personalized advertising by visiting{" "}
          <a href="https://www.aboutads.info/choices/">www.aboutads.info</a>.
        </p>
        <p>
          For users in the European Economic Area (EEA) and the United Kingdom, ads may be non-personalized
          where required, and consent signals may be managed through a consent management platform if we
          implement one. Where Google Ad Manager or AdSense EU user consent policies apply, we will
          configure tags accordingly and update this policy to describe the mechanism in use.
        </p>

        <h2>4. How we use information</h2>
        <p>We use collected information to:</p>
        <ul>
          <li>Operate, maintain, and improve the Site and our content</li>
          <li>Measure traffic, engagement, and content performance</li>
          <li>Communicate with you when you contact us</li>
          <li>Detect, investigate, and help prevent security issues, fraud, or abuse</li>
          <li>Comply with legal obligations and enforce our terms</li>
        </ul>

        <h2>5. Legal bases (EEA/UK users)</h2>
        <p>
          Where GDPR applies, we rely on appropriate legal bases such as consent (for non-essential
          cookies and certain marketing), legitimate interests (for analytics, security, and site
          improvements balanced against your rights), and contractual necessity where relevant.
        </p>

        <h2>6. Sharing of information</h2>
        <p>
          We may share information with service providers who assist us with hosting, analytics, email
          delivery, security, and advertising. These providers are permitted to use your information only as
          instructed by us. We may also disclose information if required by law, to protect rights, or in
          connection with a business transaction (such as a merger), subject to appropriate safeguards.
        </p>

        <h2>7. Data retention</h2>
        <p>
          We retain information only as long as needed for the purposes described in this policy,
          unless a longer retention period is required or permitted by law. Analytics and ad logs may be
          retained according to the retention settings of the underlying platforms.
        </p>

        <h2>8. Children’s privacy</h2>
        <p>
          The Site is not directed to children under 16, and we do not knowingly collect personal
          information from children. If you believe we have collected information from a child, please
          contact us and we will take steps to delete it.
        </p>

        <h2>9. International transfers</h2>
        <p>
          If you access the Site from outside the country where our servers or vendors operate, your
          information may be transferred across borders. Where required, we use appropriate safeguards
          such as standard contractual clauses.
        </p>

        <h2>10. Your rights and choices</h2>
        <p>
          Depending on your location, you may have rights to access, correct, delete, or restrict processing
          of your personal information, and to object to certain processing. You may also have the right to
          data portability and the right to lodge a complaint with a supervisory authority. To exercise
          rights, contact us at <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
        </p>

        <h2>11. Security</h2>
        <p>
          We implement reasonable administrative, technical, and organizational measures designed to protect
          information. No method of transmission over the Internet is 100% secure.
        </p>

        <h2>12. Changes to this policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will post the updated version on this
          page and revise the “Last updated” date. Material changes may be communicated through additional
          notice where appropriate.
        </p>

        <h2>13. Contact</h2>
        <p>
          Questions about this Privacy Policy: <Link href="/contact">Contact page</Link> or email{" "}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
        </p>
      </div>
    </div>
  );
}
