import { IconArrow } from "@/components/common/Icons";
import { useStorage } from "@/contexts/StorageContext";
import { Modal } from "antd";
import Image from "next/image";
import { memo, useEffect, useState, useRef } from "react";
import ConfettiParticles from "./ConfettiParticles";
import { useTranslations } from "next-intl";

function PopupQuizComplete() {
  const t = useTranslations("quiz");
  const { isPopupQuizCompleteOpen, setIsPopupQuizCompleteOpen, setQuizStep,quizStep } = useStorage();
  const [showConfetti, setShowConfetti] = useState(false);
  const completeSoundRef = useRef<HTMLAudioElement | null>(null);

  // Khởi tạo audio element
  useEffect(() => {
    completeSoundRef.current = new Audio("/sounds/quiz-complete.mp3");

    return () => {
      completeSoundRef.current?.pause();
    };
  }, []);

  useEffect(() => {
    if (isPopupQuizCompleteOpen) {
      // Phát âm thanh hoàn thành chặng cuối
      if (completeSoundRef.current) {
        completeSoundRef.current.currentTime = 0;
        completeSoundRef.current.play().catch(() => {
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
      const hideTimer = setTimeout(() => {
        setShowConfetti(false);
      }, 0);
      return () => clearTimeout(hideTimer);
    }
  }, [isPopupQuizCompleteOpen]);

  return (
    <>
      <ConfettiParticles active={showConfetti} particleCount={20} />
      <Modal
        className="quiz-complete-modal custom-modal"
        open={isPopupQuizCompleteOpen}
        closeIcon={null}
        footer={null}
        centered
      >
        <div className="quiz-complete-modal-content">
          <Image
            id="quiz-stage-complete"
            src="/images/home/quiz-stage-complete.png"
            alt="Manulife Quiz Stage Complete"
            className={`mx-auto mb-3 w-[63%]`}
            width={0}
            height={0}
            sizes="100vw"
          />
          <h3 className="mb-5 text-center text-[18px] font-bold whitespace-pre-wrap">
            {t("complete_final_stage")}
          </h3>
          <hr className="mb-6 border-[#e5e7eb]" />
          <p className="mb-2 text-center font-bold text-[#16a34a]">{t("did_you_know")}</p>
         <p className="mb-2 text-center text-[#444] whitespace-pre-wrap">{t(`stages.2.content`)}</p>
              <p className="mb-6 text-center text-sm text-[#a3a3a3]">{t(`stages.2.from`)}</p>
          <hr className="mb-6 border-[#e5e7eb]" />
          <button
            className="secondary-btn flexCenter w-full gap-3"
            onClick={() => {
              setIsPopupQuizCompleteOpen(false);
              setQuizStep(quizStep + 1);
            }}
          >
            <p>Xem tuổi bao tử của bạn</p>
            <IconArrow />
          </button>
        </div>
      </Modal>
    </>
  );
}

export default memo(PopupQuizComplete);
