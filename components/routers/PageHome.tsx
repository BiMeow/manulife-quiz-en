"use client";

import Mobile from "@/components/sections/home/Mobile";
import { IconVolumeOn, IconVolumeOff } from "@/components/common/Icons";
import { memo, useEffect, useState, useRef } from "react";

function PageHome() {
  

  return (
    <>
      <div id="PageHome" className={`fadeIn flexCenter relative min-h-dvh`}>
        <Mobile />
      </div>
    </>
  );
}

export default memo(PageHome);
