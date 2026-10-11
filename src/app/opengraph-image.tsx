import { ImageResponse } from "next/og";

export const alt = "Aldrich Sabando — Applied AI & Software Engineering";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0D0F11",
          color: "#F0F1F2",
          padding: "64px 72px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #303438",
            paddingBottom: 22,
            fontSize: 20,
            letterSpacing: 3,
            color: "#858B91",
          }}
        >
          <div style={{ display: "flex" }}>ALDRICH SABANDO</div>
          <div style={{ display: "flex" }}>APPLIED AI · SOFTWARE ENGINEERING</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 72,
              lineHeight: 1.04,
              letterSpacing: -2.5,
            }}
          >
            <div style={{ display: "flex" }}>I build systems that turn</div>
            <div style={{ display: "flex" }}>complex inputs into</div>
            <div style={{ display: "flex" }}>useful outcomes.</div>
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 24, color: "#858B91" }}>
            Multimodal AI · Computer vision · Full-stack systems
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #303438",
            paddingTop: 22,
            fontSize: 20,
            letterSpacing: 2,
            color: "#858B91",
          }}
        >
          <div style={{ display: "flex" }}>TULONGGURO · LITURGYGEN · INTELSY</div>
          <div style={{ display: "flex" }}>PAMPANGA, PHILIPPINES</div>
        </div>
      </div>
    ),
    size,
  );
}
