/* ==========================================================================
   SITE SETTINGS - the only file to edit at go-live.
   ========================================================================== */
window.MF_CONFIG = {

  /* 1) CONTACT FORM ENDPOINT
     Paste the form service's POST URL here, e.g.
       Formspree:  "https://formspree.io/f/abcdwxyz"
       Web3Forms:  "https://api.web3forms.com/submit"   (+ access_key below)
     Empty = the form falls back to opening the visitor's email app. */
  formEndpoint: "https://moshefarber.netlify.app/",

  /* Extra hidden fields some services need, e.g. Web3Forms:
       { access_key: "YOUR-ACCESS-KEY" } */
  formHiddenFields: {},

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
  linkedinPosts: []
};
