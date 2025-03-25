import React from "react";

const PrivacyPolicy = () => {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
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
        <h1 style={{ fontSize: "2rem", color: "#1e3a8a" }}>Privacy Policy</h1>
        <p>
          At <strong>thehistoryofthetottenham.com</strong>, we take your privacy as seriously as Spurs take winning trophies.
        </p>
        <p>
          We may collect data like cookies, analytics, and other anonymous information. This data is used to serve Google ads, measure performance, and keep the roast going.
        </p>
        <p>
          We do not sell your data. Frankly, we wouldn't even know how — we’re too busy laughing at 2008 highlights.
        </p>
        <p>
          By using this site, you consent to the use of cookies and Google’s advertising tech. You can disable cookies in your browser settings to opt out.
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

export default PrivacyPolicy;
