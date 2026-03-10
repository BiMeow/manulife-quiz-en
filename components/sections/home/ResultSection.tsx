import { IconArrow } from "@/components/common/Icons";
import ConfettiParticles from "@/components/common/ConfettiParticles";
import { useStorage } from "@/contexts/StorageContext";
import { listResults } from "@/data/quiz";
import Image from "next/image";
import { memo, useMemo, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

function ResultSection() {
  const locale = useLocale();

  const { listSelectedAnswer, yob } = useStorage();
  const [showConfetti, setShowConfetti] = useState(false);
  const completeSoundRef = useRef<HTMLAudioElement | null>(null);
  const goodResultSoundRef = useRef<HTMLAudioElement | null>(null);
  const t = useTranslations();
  const tQuiz = useTranslations("quiz");

  const result = useMemo(() => {
    if (!listSelectedAnswer.length) return null;

    const totalValue = listSelectedAnswer.reduce((acc: number, curr: any) => acc + curr.value, 0);

    if (totalValue >= 6 && totalValue < 10) {
      return listResults[0];
    }

    if (totalValue >= 10 && totalValue < 14) {
      return listResults[1];
    }

    return listResults[2];
  }, [listSelectedAnswer]);

  // Khởi tạo audio element
  useEffect(() => {
    completeSoundRef.current = new Audio("/sounds/quiz-complete.mp3");
    goodResultSoundRef.current = new Audio("/sounds/good-result.mp3");

    return () => {
      completeSoundRef.current?.pause();
      goodResultSoundRef.current?.pause();
    };
  }, []);

  // Phát âm thanh và hiển thị confetti khi result section được hiển thị
  useEffect(() => {
    if (result) {
      if (result?.isGood) {
        if (goodResultSoundRef.current) {
          goodResultSoundRef.current.currentTime = 0;
          goodResultSoundRef.current.play().catch(() => {
            // Ignore errors if autoplay is blocked
          });
        }
        // Sử dụng setTimeout để tránh setState đồng bộ trong effect
        const showTimer = setTimeout(() => {
          setShowConfetti(true);
        }, 0);

        // Tắt confetti sau 3 giây
        const hideTimer = setTimeout(() => {
          setShowConfetti(false);
        }, 3000);

        return () => {
          clearTimeout(showTimer);
          clearTimeout(hideTimer);
        };
      } else {
        if (completeSoundRef.current) {
          completeSoundRef.current.currentTime = 0;
          completeSoundRef.current.play().catch(() => {
            // Ignore errors if autoplay is blocked
          });
        }
      }
    } else {
      const hideTimer = setTimeout(() => {
        setShowConfetti(false);
      }, 0);
      return () => clearTimeout(hideTimer);
    }
  }, [result]);

  return (
    <>
      <ConfettiParticles active={showConfetti} particleCount={75} />
      <motion.div
        initial={{ scale: 1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        id="ResultSection"
        className={`hideScrollbar relative h-dvh max-h-[1000px] overflow-auto`}
        style={{ backgroundColor: result?.bgColor }}
      >
        <div className="relative h-full overflow-auto px-5 py-[65px]">
          <div className="content relative z-10 text-center">
            <p className="mb-[10px] text-center font-semibold tracking-[1px]">{t("result_heading")}</p>
            <Image
              id="logo"
              src={result?.image || ""}
              alt="Manulife Logo"
              className={`mx-auto mb-[10px] w-[60%]`}
              width={0}
              height={0}
              sizes="100vw"
            />
            <div className="mb-6 px-3">
              <p className="text-[19px] leading-relaxed font-bold tracking-[1px]">
                {result && tQuiz(`results.${result.idResult - 1}.subtitle`)} <br />{" "}
                <span className="font-extrabold">{result && tQuiz(`results.${result.idResult - 1}.title`)}</span>
              </p>
              <hr className="mx-auto mt-[18px] mb-6 w-[85%] border-t border-[#ffffff4f]" />
              <p className="mb-[26px] font-bold">
                {t("result_real_age")} [{2025 - Number(yob)}] -{" "}
                {result && tQuiz(`results.${result.idResult - 1}.subDescription`)}
              </p>
              <p className="mb-6 leading-relaxed whitespace-pre-line">
                {result && tQuiz(`results.${result.idResult - 1}.description`)}
              </p>
              <i className="mb-6 text-[11px]">{t("result_disclaimer")}</i>
              <hr className="mx-auto mt-[18px] w-[85%] border-t border-[#ffffff4f]" />
            </div>
            {locale === "vi" ? (
              <a
                href="https://www.manulife.com.vn/vi/form-onground.html?utm_source=manwah_quiz&utm_campaign=csr2025_register"
                className="main-btn flexCenter w-full gap-3"
              >
                <p className="whitespace-pre-wrap">{t("result_cta")}</p>
                <IconArrow />
              </a>
            ) : (
              <div className="main-btn flexCenter w-full flex-col gap-3 rounded-[20px]! text-[13px]!">
                <p>Thank you for participating in the quiz!</p>
                <p className="font-medium! text-[12px]!">
                  For every quiz submission, Manulife will make a contribution on your behalf to support the Vietnam
                  Young Physicians Association in purchasing medical equipment for gut health care.
                </p>
                <p>Together, we are helping build a healthier Vietnam💚</p>
              </div>
            )}
          </div>

          <Image
            id="resultDeco"
            src={result?.imageDeco || ""}
            alt="Manulife Result"
            className={`absolute bottom-0 left-0 w-full`}
            width={0}
            height={0}
            sizes="100vw"
          />
        </div>
      </motion.div>
    </>
  );
}

export default memo(ResultSection);
