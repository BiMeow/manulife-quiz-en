import { useStorage } from "@/contexts/StorageContext";
import { Modal } from "antd";
import { memo } from "react";

function PopupRules({ ...props }) {
  const { isPopupRulesOpen, setIsPopupRulesOpen } = useStorage();

  return (
    <>
      <Modal className="rules-modal custom-modal" open={isPopupRulesOpen} closeIcon={null} footer={null} centered>
        <div className="rules-modal-content space-y-3">
          <h3 className="text-[18px] font-bold">Thể lệ chương trình</h3>
          <div id="content" className="max-h-[70dvh] overflow-y-auto">
            <ul className="list-decimal space-y-4 pl-5">
              <li>
                Chỉ những khách hàng nhận được link mời tham gia bài quiz từ Manulife mới đủ điều kiện tham gia chương
                trình. Trong trường hợp một khách hàng tham gia nhiều lần, Ban Tổ Chức chỉ ghi nhận kết quả hợp lệ đầu
                tiên trên hệ thống.
              </li>
              <li>
                Vui lòng điền đầy đủ số điện thoại và email ở cuối bài quiz. Đây là điều kiện cần thiết để Ban Tổ Chức
                ghi nhận thông tin và gửi quà trong trường hợp khách hàng trúng thưởng.
              </li>
              <li>
                Mã tham gia bốc thăm trúng thưởng chỉ có hiệu lực khi khách hàng nhận được email xác nhận chính thức từ
                Manulife. Những mã không nhận được xác nhận sẽ không đủ điều kiện nhận thưởng.
              </li>
            </ul>
          </div>
          <hr className="border-[#e5e7eb]" />
          <button className="secondary-btn flexCenter w-full" onClick={() => setIsPopupRulesOpen(false)}>
            Đóng
          </button>
        </div>
      </Modal>
    </>
  );
}

export default memo(PopupRules);
