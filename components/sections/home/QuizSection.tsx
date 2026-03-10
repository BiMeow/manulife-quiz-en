import PopupQuiz from "@/components/common/PopupQuiz";
import PopupQuizComplete from "@/components/common/PopupQuizComplete";
import Rules from "@/components/common/rules";
import { useStorage } from "@/contexts/StorageContext";
import { listStages } from "@/data/quiz";
import { cn } from "@/utils/main";
import { message } from "antd";
import { gsap } from "gsap";
import Image from "next/image";
import { memo, useEffect, useRef, useState } from "react";
import { useWindowSize } from "usehooks-ts";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const decoImages = [
  {
    image: "/images/home/quiz-deco-1.png",
    className: "top-[8%] left-0 w-[21.5%]",
  },
  {
    image: "/images/home/quiz-deco-2.png",
    className: "top-[35%] right-0 w-[21.5%]",
  },
  {
    image: "/images/home/quiz-deco-3.png",
    className: "bottom-0 right-[7%] w-[35%]",
  },
];

function QuizSection({ ...props }) {
  const { height } = useWindowSize();

  const { activeStage, setIsPopupQuizOpen, setIsPopupQuizCompleteOpen } = useStorage();
  const t = useTranslations();
  const stageItemsRef = useRef<HTMLDivElement[]>([]);
  const openPopupSoundRef = useRef<HTMLAudioElement | null>(null);

  const [isEnoughHeight, setIsEnoughHeight] = useState(false);

  useEffect(() => {
    setIsEnoughHeight(height >= 620);
  }, [height]);

  useEffect(() => {
    openPopupSoundRef.current = new Audio("/sounds/openPopup.mp3");

    return () => {
      openPopupSoundRef.current?.pause();
    };
  }, []);

  useEffect(() => {
    if (!stageItemsRef.current.length) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        stageItemsRef.current,
        {
          y: 40,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.15,
        },
      ).fromTo(
        "#quizEnd",
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        },
        0.5,
      );
    });

    return () => {
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (activeStage >= listStages.length) {
      setTimeout(() => {
        setIsPopupQuizCompleteOpen(true);
      }, 1000);
    }
  }, [activeStage]);

  return (
    <>
      <motion.div
        initial={{ scale: 1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        id="QuizSection"
        className={cn("hideScrollbar relative flex h-dvh max-h-[800px] flex-1 flex-col overflow-auto")}
      >
        <Image
          id="quizBg"
          src="/images/home/quiz-bg.png"
          alt="Manulife Quiz"
          className={`relative size-full object-cover`}
          width={0}
          height={0}
          sizes="100vw"
        />
        {decoImages.map((deco, index) => (
          <Image
            key={index}
            id={`quizDeco${index + 1}`}
            src={deco.image}
            alt="Manulife Quiz"
            className={`absolute ${deco.className} z-1 object-cover`}
            width={0}
            height={0}
            sizes="100vw"
          />
        ))}
        <div id="line" className="absolute top-1/2 left-1/2 z-3 w-[34%] -translate-x-1/2 -translate-y-1/2">
          <Image
            id="quizUnactiveLine"
            src="/images/home/quiz-unactive-line.png"
            alt="Manulife Quiz"
            className={`w-full`}
            width={0}
            height={0}
            sizes="100vw"
          />

          <div
            id="activeLine"
            className={`absolute bottom-0 left-0 w-full overflow-hidden duration-700 ease-in-out ${activeStage === 0 ? "h-[0%]" : activeStage === 1 ? "h-[40%]" : activeStage === 2 ? "h-[68%]" : "h-full"}`}
          >
            <Image
              id="quizActiveLine"
              src="/images/home/quiz-active-line.png"
              alt="Manulife Quiz"
              className={`absolute bottom-0 left-0 w-full`}
              width={0}
              height={0}
              sizes="100vw"
            />
          </div>
        </div>

        <div id="listStages">
          {listStages.map((question, index) => (
            <div
              id={`quizStage${index}`}
              key={index}
              ref={(el) => {
                if (el) {
                  stageItemsRef.current[index] = el;
                }
              }}
              className={question.className}
              onClick={() => {
                if (activeStage < index) {
                  message.warning(
                    `${t("quiz_stage_incomplete_prefix")}${activeStage + 1}${t("quiz_stage_incomplete_suffix")}`,
                  );
                } else if (activeStage > index) {
                  message.warning(
                    `${t("quiz_stage_completed_prefix")}${index + 1}${t("quiz_stage_completed_suffix")}`,
                  );
                } else {
                  if (openPopupSoundRef.current) {
                    openPopupSoundRef.current.currentTime = 0;
                    openPopupSoundRef.current.play().catch(() => {
                      // Ignore errors if autoplay is blocked
                    });
                  }

                  setIsPopupQuizOpen(true);
                }
              }}
            >
              {activeStage === index ? (
                <>
                  <Image
                    id="quizStage"
                    src={index === 0 ? "/images/home/quiz-start-question.png" : "/images/home/quiz-active-question.png"}
                    alt="Manulife Quiz"
                    className={`animation-scale w-full cursor-pointer`}
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                  <Image
                    id="quizTooltip"
                    src="/images/home/quiz-tooltip.png"
                    alt="Manulife Quiz"
                    className={`absolute top-[75%] left-1/2 w-[70%] -translate-x-1/2 animate-bounce`}
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                </>
              ) : (
                <Image
                  id="quizStage"
                  src={
                    activeStage < index
                      ? "/images/home/quiz-unactive-question.png"
                      : index === 0
                        ? "/images/home/quiz-start-done.png"
                        : "/images/home/quiz-done-question.png"
                  }
                  alt="Manulife Quiz"
                  className={`w-full ${activeStage < index && "animation-scale"}`}
                  width={0}
                  height={0}
                  sizes="100vw"
                />
              )}
            </div>
          ))}
        </div>

        <Image
          id="quizEnd"
          src="/images/home/quiz-end.png"
          alt="Manulife Quiz"
          className={`animation-swing absolute top-[15%] right-[10%] z-3 w-[43%]`}
          width={0}
          height={0}
          sizes="100vw"
        />

        {/* <div className="absolute bottom-2 left-0 z-3 w-full">
          <Rules />
        </div> */}
      </motion.div>

      <PopupQuiz />
      <PopupQuizComplete />
    </>
  );
}

export default memo(QuizSection);
