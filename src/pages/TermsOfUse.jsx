import React from "react";

const TermsOfUse = () => {
  return (
    <div
    style={{
      backgroundColor: "transparent",
      color: "#111827",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "800px" }}>
        <h1 style={{ fontSize: "2rem", color: "#1e3a8a" }}>Terms of Use</h1>
        <p>
          This site is a parody. All content is meant for entertainment purposes only. If you’re a Spurs fan and feel personally attacked — don’t worry, we roast other clubs too. Eventually.
        </p>
        <p>
          By using this site, you agree to laugh, not sue us, and accept that Tottenham may never win anything. You also agree that any emotional damage caused by our 404 page is strictly your fault.
        </p>
        <p>
          We are not affiliated with Tottenham Hotspur FC. Any resemblance to real events, people, or tactical failures is entirely intentional and deeply funny.
        </p>

        <p style={{ marginTop: "2rem" }}>
          <a
            href="/"
            style={{
              color: "#1d4ed8",
              fontWeight: "bold",
              textDecoration: "underline",
            }}
          >
            Return to the Mausoleum
          </a>
        </p>

        <footer className="site-footer" style={{ marginTop: "3rem" }}>
          <p>
            © 2025{" "}
            <a href="https://thehistoryofthetottenham.com" target="_blank" rel="noopener noreferrer">
            thehistoryofthetottenham.com
            </a>{" "}
            — No trophies were harmed in the making of this site.
          </p>
          <p>
            <a
              href="https://github.com/teknotel17/the-history-of-the-tottenham"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>{" "}
            | Sponsored by <strong>NoCup Finance™</strong>
          </p>
          <p>
            <a href="/privacy-policy">Privacy Policy</a> |{" "}
            <a href="/terms-of-use">Terms of Use</a> |{" "}
            <a href="mailto:info@thehistoryofthetottenham.com">Contact</a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default TermsOfUse;
