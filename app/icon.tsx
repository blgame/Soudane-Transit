import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        background: "#0B6B3A",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "6px",
        fontFamily: "Arial Black, Arial, sans-serif",
        fontWeight: 900,
        fontSize: "13px",
        color: "white",
        position: "relative",
        overflow: "hidden"
      }}
    >
      ST
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "10px",
          height: "6px",
          background: "#F47B20"
        }}
      />
    </div>,
    { ...size }
  );
}
