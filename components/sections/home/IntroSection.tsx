import { IconArrow } from "@/components/common/Icons";
import Rules from "@/components/common/rules";
import { useStorage } from "@/contexts/StorageContext";
import Image from "next/image";
import { memo } from "react";
import { useWindowSize } from "usehooks-ts";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

function IntroSection({ ...props }) {
  const { height } = useWindowSize();
  const { setQuizStep } = useStorage();
  const t = useTranslations();
  return (
    <>
      <motion.div
        initial={{ scale: 1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        id="IntroSection"
        className={`flex flex-1 flex-col ${height > 620 ? "h-dvh overflow-hidden" : ""} `}
      >
        <Image
          id="introBanner"
          src="/images/home/intro-banner.png"
          alt="Manulife Quiz"
          className={`w-full object-cover`}
          width={0}
          height={0}
          sizes="100vw"
        />
        <div id="content" className={`cusContainer mt-4 flex h-full flex-col justify-between space-y-3 pb-2`}>
          <h1 className="text-center text-[8.26667vw] font-bold uppercase whitespace-pre-line">
            {t("intro_title")}
          </h1>
          <p className="mx-auto w-max border-t border-[#ffffff1a] pt-3 text-center text-[4.8vw] font-semibold whitespace-pre-wrap">
            {t("intro_subtitle")}
          </p>
          <button className="main-btn flexCenter w-full gap-3" onClick={() => setQuizStep(2)}>
            <p>{t("intro_start")}</p>
            <IconArrow />
          </button>
          {/* <Rules /> */}
        </div>
      </motion.div>
    </>
  );
}

export default memo(IntroSection);
