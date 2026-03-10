import PopupRules from "@/components/common/PopupRules";
import { useStorage } from "@/contexts/StorageContext";
import { memo } from "react";

function Rules({ ...props }) {
  const { setIsPopupRulesOpen } = useStorage();

  return (
    <>
      <div id="Rules" className={``}>
        <p className="mx-auto w-fit text-xs font-medium underline" onClick={() => setIsPopupRulesOpen(true)}>
          Thể lệ chương trình
        </p>
      </div>

      <PopupRules />
    </>
  );
}

export default memo(Rules);
