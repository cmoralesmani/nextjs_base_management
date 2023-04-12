// src/layouts/SiteLayout/HeadSEO.jsx

import React from "react";
import Head from "next/head";

export default function HeadSEO() {
  return (
    <Head>
      <title>Sitio con NextJS</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    </Head>
  );
}
