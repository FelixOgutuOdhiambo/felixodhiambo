import { ImageResponse } from "next/og";
import { PERSON } from "@/lib/site-config";

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
          justifyContent: "center",
          padding: "80px",
          background: "#FDFCFB",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 28,
            color: "#D02622",
            fontFamily: "sans-serif",
            fontWeight: 600,
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 28,
              height: 2,
              background: "#D02622",
            }}
          />
          {PERSON.location}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 500,
            color: "#2A201E",
            marginTop: 24,
          }}
        >
          {PERSON.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "#3E5667",
            marginTop: 20,
            maxWidth: 900,
            fontFamily: "sans-serif",
          }}
        >
          {PERSON.positioning}
        </div>
      </div>
    ),
    { ...size }
  );
}
