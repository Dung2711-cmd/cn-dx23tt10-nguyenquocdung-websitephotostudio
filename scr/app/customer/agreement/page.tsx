import { AgreementWorkspace } from "@/components/customer";

export default function CustomerAgreementPage() {
  return (
    <main className="customer-agreement-page">
      <header className="agreement-page-header">
        <div>
          <h1>Hợp đồng</h1>
          <p>
            Theo dõi hợp đồng dịch vụ, trạng thái ký, các khoản thanh toán và hóa đơn cần lưu trữ
            cho từng booking của bạn.
          </p>
        </div>
      </header>

      <AgreementWorkspace />
    </main>
  );
}
