import React from "react";
import { CheckCircle, AlertTriangle, AlertCircle } from "lucide-react";

const stressColorMap = {
  low: "#10b981", // elegant green
  moderate: "#f59e0b", // standard amber
  high: "#ef4444", // standard red
};

const PdfReport = React.forwardRef(({ name, score, aiFacts }, ref) => {
  const getLevel = (s) => (s <= 13 ? "low" : s <= 26 ? "moderate" : "high");
  const level = getLevel(score);
  const StressIcon = level === "low" ? CheckCircle : level === "moderate" ? AlertTriangle : AlertCircle;
  const stressColor = stressColorMap[level];
  const maxScore = 40;

  return (
    <div
      ref={ref}
      style={{
        width: "800px",
        height: "1131px", // strict A4 ratio
        backgroundColor: "white",
        color: "#111827",
        padding: "60px 80px",
        fontFamily: "system-ui, -apple-system, sans-serif",
        boxSizing: "border-box",
        position: "relative",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <img src="/emoneeds-logo.png" alt="emoneeds" style={{ height: "60px", width: "auto", marginBottom: "20px" }} />
        <h1 style={{ fontSize: "36px", fontWeight: "800", margin: "0 0 15px 0", color: "#111827" }}>Stress Assessment Report</h1>
        <h2 style={{ fontSize: "26px", fontWeight: "500", margin: "0", color: "#4b5563" }}>{name}</h2>
      </div>

      <p style={{ fontSize: "20px", lineHeight: "1.6", marginBottom: "60px", color: "#374151" }}>
        Hello <strong>{name}</strong>, this is your stress assessment Report based on your response powered by emoneeds.
      </p>

      {/* Circle & Stress Level */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "60px" }}>
        <div
          style={{
            width: "160px", height: "160px",
            borderRadius: "50%",
            border: `6px solid ${stressColor}`,
            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
            marginBottom: "25px",
            gap: "0px"
          }}
        >
          <span style={{ fontSize: "52px", fontWeight: "800", color: stressColor, lineHeight: "1.1", display: "block", textAlign: "center" }}>{score}</span>
          <span style={{ fontSize: "15px", color: "#6b7280", fontWeight: "500", display: "block", textAlign: "center", marginTop: "4px" }}>out of {maxScore}</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
          <span style={{ display: "flex", alignItems: "center" }}>
            <StressIcon color={"#111827"} size={28} />
          </span>
          <span style={{ fontSize: "28px", fontWeight: "800", color: "#111827", lineHeight: "1" }}>
            {level === "low" ? "Low" : level === "moderate" ? "Moderate" : "High"} - Stress
          </span>
        </div>
      </div>

      {/* AI Insights */}
      <div style={{ flex: 1 }}>
        <h3 style={{ fontSize: "26px", fontWeight: "800", borderBottom: "2px solid #e5e7eb", paddingBottom: "12px", marginBottom: "30px", color: "#111827" }}>
          AI - Insights
        </h3>
        {aiFacts && aiFacts.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {aiFacts.map((fact, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
                <span style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: "36px", height: "36px",
                  borderRadius: "50%",
                  backgroundColor: "#f3f4f6",
                  fontWeight: "800", fontSize: "16px", flexShrink: 0,
                  color: "#374151"
                }}>{i + 1}</span>
                <span style={{ fontSize: "20px", lineHeight: "1.6", paddingTop: "2px", color: "#374151" }}>{fact}</span>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ fontSize: "20px", color: "#6b7280" }}>No insights generated.</p>
        )}
      </div>

      {/* Footer messages */}
      <div style={{ marginTop: "auto", borderTop: "2px solid #e5e7eb", paddingTop: "30px" }}>
        <p style={{ fontSize: "20px", marginBottom: "30px", fontWeight: "600", color: "#111827" }}>
          We recommend you to visit emoneeds to know more about it.
        </p>

        <p style={{ fontSize: "14px", color: "#9ca3af", fontStyle: "italic", lineHeight: "1.5" }}>
          Disclaimer: Powered by Emoneeds. This automated brief reflects self-reported data intended for performance benchmarking, not clinical diagnosis.
        </p>
      </div>
    </div>
  );
});

export default PdfReport;
