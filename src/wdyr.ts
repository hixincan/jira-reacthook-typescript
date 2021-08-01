import React from "react";

if (process.env.NODE_ENV === "development") {
  const whyDidYouRender = require("@welldone-software/why-did-you-render");
  whyDidYouRender(React, {
    // 可以显示指定
    // ProjectList.whyDidYouRender = true;
    trackAllPureComponents: false,
  });
}
