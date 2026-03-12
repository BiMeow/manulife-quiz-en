import { IconArrow } from "@/components/common/Icons";
import { useStorage } from "@/contexts/StorageContext";
import { cn } from "@/utils/main";
import Image from "next/image";
import { memo } from "react";
import { useWindowSize } from "usehooks-ts";
import { message } from "antd";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

function LoginSection({ ...props }) {
  const { height } = useWindowSize();
  const { quizStep, setQuizStep, yob, setYob } = useStorage();
  const t = useTranslations();

  const handleNext = () => {
    if (yob.length === 4 && Number(yob) > 1900 && Number(yob) < 2025) {
      setQuizStep(quizStep + 1);
    } else {
      message.warning(t("login_warning"));
    }
  };

  return (
    <>
      <motion.div
        initial={{ scale: 1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        id="LoginSection"
        className={cn("hideScrollbar flex h-dvh max-h-[1000px] flex-1 flex-col overflow-auto")}
      >
        <div className="relative">
          <Image
            id="introBanner"
            src="/images/home/login-banner.jpg"
            alt="Manulife Quiz"
            className={`w-full object-cover`}
            width={0}
            height={0}
            sizes="100vw"
          />
          <div className="absolute bottom-0 left-0 h-[50px] w-full bg-gradient-to-b from-transparent to-[#20a958]"></div>
        </div>
        <div id="content" className={`cusContainer asdfsadf mt-4 flex h-full flex-col justify-between space-y-3 pb-2`}>
          <h2 className="text-center text-[14px] leading-relaxed font-semibold whitespace-pre-wrap">
            {t("login_title")}
          </h2>
          <input
            type="tel"
            placeholder={t("login_placeholder")}
            className="cusInput"
            onChange={(e) => setYob(e.target.value)}
            maxLength={4}
            value={yob}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleNext();
              }
            }}
          />
          <button className="main-btn flexCenter w-full gap-3" onClick={() => handleNext()}>
            <span>{t("login_next")}</span>
            <IconArrow />
          </button>
        </div>
      </motion.div>
    </>
  );
}

export default memo(LoginSection);
