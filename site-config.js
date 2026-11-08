/* ==========================================================================
   SITE SETTINGS - the only file to edit at go-live.
   ========================================================================== */
window.MF_CONFIG = {

  /* 1) CONTACT FORM ENDPOINT
     Paste the form service's POST URL here, e.g.
       Formspree:  "https://formspree.io/f/abcdwxyz"
       Web3Forms:  "https://api.web3forms.com/submit"   (+ access_key below)
     Empty = the form falls back to opening the visitor's email app. */
  formEndpoint: "https://api.web3forms.com/submit",

  /* Extra hidden fields some services need, e.g. Web3Forms:
       { access_key: "YOUR-ACCESS-KEY" } */
  formHiddenFields: { access_key: "8f3b3145-a82c-434e-8d30-041c7acb54eb", from_name: "moshefarber.com" },

  /* Where messages go (used by the email fallback). */
  fallbackEmail: "",

  /* 2) CAPTCHA (off while siteKey is empty)
     provider: "turnstile" (Cloudflare) or "hcaptcha"
     siteKey:  the public site key from that provider */
  captcha: { provider: "turnstile", siteKey: "" },

  /* Spam guard: submissions faster than this (seconds after the page
     loads) are treated as bots and silently dropped. */
  minSecondsToSubmit: 4,

  /* 3) LINKEDIN POSTS ("Recent thinking" section on the home page)
     Up to 3 post links. Any of these forms works:
       "https://www.linkedin.com/embed/feed/update/urn:li:share:7xxxxxxxxxxxxxxxxxx"
       "urn:li:activity:7xxxxxxxxxxxxxxxxxx"
       "https://www.linkedin.com/posts/mofarber_some-title-activity-7xxxxxxxxxxxxxxxxxx-AbCd"
     Empty list = the section stays hidden. */
  linkedinPosts: [
    {
      "url": "https://www.linkedin.com/posts/mofarber_over-the-years-ive-had-conversations-with-activity-7435333302133088256-Wg-5",
      "date": "March 2026",
      "excerpt": "Over the years I’ve had conversations with different companies that reached out for advice around their growth, strategy, and marketing. When looking a little deeper into what they’re doing, a pattern shows up in quite a few of them. Marketing is often being run as a separate activity."
    },
    {
      "url": "https://www.linkedin.com/posts/mofarber_marketingleadership-customerexperience-activity-7347981468817629184-qtmQ",
      "date": "July 2025",
      "excerpt": "You can spend all the money in the world on ads, lead generation, onboarding processes, and follow-up systems, but still lose everything in the way you actually follow up. I kept seeing ads from a company offering a service I was genuinely interested in…"
    },
    {
      "url": "https://www.linkedin.com/posts/mofarber_fractionalcmo-marketingleadership-businessgrowth-activity-7343617966560751617-G3-A",
      "date": "June 2025",
      "excerpt": "A quick peek behind the scenes, what I’ve really been up to as a Fractional CMO lately… Over the past months, I’ve been fortunate to work with multiple businesses across different industries, helping them navigate growth, sharpen their strategy, and align their marketing with real business goals."
    }
  ]
};
