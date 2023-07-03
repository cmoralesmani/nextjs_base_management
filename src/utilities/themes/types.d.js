export const themes = {
  dark: {
    sidebar: {
      backgroundColor: "var(--white)",
      // color: "var(--white)",
    },
    menu: {
      // menuContent: "var(--blue)",
      // icon: "var(--white)",
      active: {
        // backgroundColor: "var(--blue-secondary)",
        color: "var(--blue)",
        fontWeight: "bold !important",
      },
      hover: {
        // backgroundColor: "var(--gray-light-transparent)",
        // color: "var(--gray-light)",
      },
      disabled: {
        color: "var(--gray-dark)",
      },
    },
  },
  light: {
    sidebar: {
      backgroundColor: "var(--white)",
    },
    menu: {
      menuContent: "var(--gray-light)",
      active: {
        backgroundColor: "var(--blue)",
        color: "var(--white)",
      },
      hover: {
        // backgroundColor: "var(--gray-light-transparent)",
        // color: "var(--gray-light)",
      },
      disabled: {
        color: "var(--gray-dark)",
      },
    },
    subMenuExpandIcon: {
      color: "var(--blue)",
      active: {
        color: "var(--white)",
      },
    },
  },
};
