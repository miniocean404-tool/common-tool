export const getSizeDeviceType = () => {
  return {
    isMobile: matchMedia("screen and (max-width: 767px)").matches,
    isTablet: matchMedia("screen and  (max-width: 1023px) and (min-width: 768px)").matches,
    isDesktop: matchMedia("screen and (min-width: 1023.1px)").matches,
  };
};
