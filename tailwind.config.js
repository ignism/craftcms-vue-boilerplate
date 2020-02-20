const theme = {
  fontFamily: {
    sans: "Inter, sans-serif"
  },
  screens: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    fw: "1600px"
  },
  transitionDuration: {
    100: "100ms",
    200: "200ms",
    300: "300ms",
    400: "400ms",
    500: "500ms",
    600: "600ms",
    700: "700ms",
    800: "800ms",
    900: "900ms",
    1000: "1000ms",
    short: "200ms",
    medium: "400ms",
    long: "800ms"
  },
  extend: {
    colors: {
      white: "#F8F8F8",
      black: "#0C0C0C"
    },
    spacing: {
      "1/12": "8.33333%",
      "2/12": "16.66667%",
      "3/12": "25%",
      "4/12": "33.33333%",
      "5/12": "41.66667%",
      "6/12": "50%",
      "7/12": "58.33333%",
      "8/12": "66.66667%",
      "9/12": "75%",
      "10/12": "83.33333%",
      "11/12": "91.66667%",
      full: "100%"
    }
  }
}

const siteConfig = {
  screens: {
    sm: theme.screens.sm,
    md: theme.screens.md,
    lg: theme.screens.lg,
    xl: theme.screens.xl,
    fw: theme.screens.fw
  },
  gutter: {
    sm: "16px",
    md: "24px",
    lg: "32px"
  },
  section: {
    offset: {
      sm: "20px",
      md: "32px",
      lg: "40px"
    }
  },
  page: {
    maxWidth: "2000px",
    offset: {
      sm: "20px",
      md: "32px",
      lg: "40px"
    }
  },
  duration: {
    short: theme.transitionDuration.short,
    medium: theme.transitionDuration.medium,
    long: theme.transitionDuration.long
  }
}

theme.config = siteConfig

module.exports = {
  theme: theme,
  variants: {},
  plugins: []
}