import {
  IconChevronLeft,
  IconChevronRight,
  IconFileDescription,
  IconSignature,
} from "@tabler/icons-react";

import {
  ContractStatusBadge,
  type ContractStatus,
} from "./ContractStatusBadge";

type Contract = {
  id: string;
  client: string;
  service: string;
  effectiveDate: string;
  value: string;
  status: ContractStatus;
};

const contracts: Contract[] = [
  {
    id: "#PAY-2408",
    client: "Nguyễn Thu Thủy",
    service: "Signature Wedding Session",
    effectiveDate: "03 Tháng 10, 2024",
    value: "35.000.000đ",
    status: "signed",
  },
  {
    id: "#PAY-2405",
    client: "Trần Minh Quân",
    service: "Editorial Portrait Concept",
    effectiveDate: "12 Tháng 10, 2024",
    value: "12.500.000đ",
    status: "pending",
  },
  {
    id: "#PAY-2399",
    client: "Lê Bảo Anh",
    service: "Fashion Campaign Studio",
    effectiveDate: "18 Tháng 10, 2024",
    value: "28.000.000đ",
    status: "draft",
  },
  {
    id: "#PAY-2387",
    client: "Hoàng Gia Minh",
    service: "Event Coverage Premium",
    effectiveDate: "26 Tháng 9, 2024",
    value: "18.900.000đ",
    status: "signed",
  },
  {
    id: "#PAY-2374",
    client: "Phạm Linh Chi",
    service: "Commercial Retainer",
    effectiveDate: "08 Tháng 9, 2024",
    value: "42.000.000đ",
    status: "expired",
  },
];

export function ContractTable() {
  return (
    <section className="contract-table-card" aria-label="Danh sách thanh toán">
      <div className="contract-table-wrap">
        <table className="contract-table">
          <thead>
            <tr>
              <th scope="col">Mã thanh toán</th>
              <th scope="col">Khách hàng / Dịch vụ</th>
              <th scope="col">Ngày tạo</th>
              <th scope="col">Số tiền</th>
              <th scope="col">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((contract) => (
              <tr key={contract.id}>
                <td>
                  <strong>{contract.id}</strong>
                </td>
                <td>
                  <div className="contract-client-cell">
                    <IconFileDescription size={19} stroke={1.7} />
                    <span>
                      <strong>{contract.client}</strong>
                      <small>{contract.service}</small>
                    </span>
                  </div>
                </td>
                <td>{contract.effectiveDate}</td>
                <td>
                  <b>{contract.value}</b>
                </td>
                <td>
                  <ContractStatusBadge status={contract.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="contract-table-footer">
        <span>Hiển thị 1 đến 5 trong 18 khoản thanh toán</span>
        <div>
          <button type="button" aria-label="Trang trước" disabled>
            <IconChevronLeft size={18} />
          </button>
          <button type="button" aria-label="Trang sau">
            <IconChevronRight size={18} />
          </button>
        </div>
      </footer>

      <div className="contract-signature-note">
        <IconSignature size={22} stroke={1.6} />
        <p>
          Tất cả hóa đơn và khoản thanh toán được lưu trữ bản mềm, có thể đối
          soát trạng thái trước ngày chụp.
        </p>
      </div>
    </section>
  );
}
