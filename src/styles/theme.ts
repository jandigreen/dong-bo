const windowSize = {
  small: "screen and (max-width: 600px)",
  base: "screen and (max-width: 768px)",
  large: "screen and (max-width: 1024px)",
};

const fontSize = {
  xs: "10px",
  sm: "12px",
  base: "14px",
  md: "16px",
  lg: "18px",
};

const fontWeight = {
  light: "300",
  normal: "400",
  medium: "500",
  bold: "700",
  ExtraBold: "800",
};

// const lightversion = {
//   background: "#fff",
//   fontPrimary: "black",
//   fontSecondary: "gray",
//   primary: "#00a0ff",
//   secondary: "#ddd",
//   hover: "#00a0ff50",
// };

// const repo = {
//   open: "red",
//   close: "blue",
// };

// const theme = {
//   windowSize,
//   repo,
//   fontSize,
//   lightversion,
// };

const lightversion = {
  background: "#fff",
  fontPrimary: "#000",
  fontSecondary: "#7e8292",
  primary: "#3383fd",
  error: "#fd3333",
  //   secondary: "#ddd",
  //   hover: "#00a0ff50",
};

const theme = {
  windowSize,
  lightversion,
  fontSize,
  fontWeight,
};

export default theme;
