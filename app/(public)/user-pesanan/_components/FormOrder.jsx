import React, { useMemo, useState } from "react";
import InputField from "@/components/general/InputField";
import SelectField from "@/components/general/SelectField";
import SwitchField from "@/components/general/SwitchField";
import PaymentModal from "./PaymentModal";
import { table_number } from "@/lib/constants";
import { useGetOrdersQuery } from "@/lib/redux/api/orderApi";

function FormOrder() {
  const [takeaway, setTakeaway] = useState(false);
  const [table, setTable] = useState("");
  const [name, setName] = useState("");

  const { data: orders = [] } = useGetOrdersQuery();

  const usedTableNumbers = useMemo(() => {
    return orders
      .filter((order) => order.table_number && !order.takeaway)
      .map((order) => String(order.table_number));
  }, [orders]);

  const availableTableNumbers = useMemo(() => {
    return table_number.filter((t) => !usedTableNumbers.includes(t.name));
  }, [usedTableNumbers]);

  return (
    <div className="flex flex-col gap-6 text-2xl">
      <span className="font-semibold">Isi Data Pesanan</span>
      {!takeaway && (
        <SelectField
          id="meja"
          name="meja"
          label="Nomor Meja"
          value={table}
          options={availableTableNumbers}
          onChange={setTable}
          placeholder="Pilih nomor meja"
        />
      )}
      <InputField
        id="nama"
        name="nama"
        label="Nama"
        placeholder="Nama Anda"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <SwitchField
        label={takeaway ? "Take away" : "Dine in"}
        checked={takeaway}
        onChange={setTakeaway}
      />
      <PaymentModal name={name} table={table} takeaway={takeaway} />
    </div>
  );
}

export default FormOrder;
