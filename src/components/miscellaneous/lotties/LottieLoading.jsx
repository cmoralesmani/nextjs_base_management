// src/components/miscellaneous/lotties/LottieLoading.jsx

import Lottie from "lottie-react";
import React from "react";

import Loading from "public/assets/lotties/Loading.json";

export function LottieLoading() {
  return <Lottie animationData={Loading} />;
}
