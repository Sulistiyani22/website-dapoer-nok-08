"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableFooter,
  TableRow,
} from "@/components/ui/table";
import InputField from "@/components/general/InputField";
import SelectField from "@/components/general/SelectField";
import { table_number } from "@/lib/constants";
import { RupiahIRD } from "@/lib/utils";
import moment from "moment";

function IncomeList({ order }) {
  const [search, setSearch] = useState("");
  const [table, setTable] = useState("");
  const completedOrder = order.filter((item) => item.has_payed === true);
  const filteredOrder =
    (search || table) && completedOrder.length > 0
      ? completedOrder
          .filter((item) =>
            search
              ? item.customer_name.toLowerCase().includes(search.toLowerCase())
              : item
          )
          .filter((item) =>
            table ? item.table_number === parseInt(table) : item
          )
      : completedOrder;

  const totalRevenue = filteredOrder.reduce(
    (acc, currOrder) => acc + currOrder.total_price,
    0
  );

  return (
    <div>
      <div className="bg-base-200 flex flex-col sm:flex-row sm:items-center justify-between p-2 my-6 rounded-lg">
        <span className="text-2xl">Pemasukkan</span>
        <div className="flex gap-2">
          <div className="sm:w-80">
            <InputField
              dark={false}
              type="text"
              id="order"
              name="order"
              placeholder="Cari Pemesan"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>
          <SelectField
            id="meja"
            name="meja"
            value={table}
            options={table_number}
            onChange={setTable}
            placeholder="Pilih nomor meja"
          />
        </div>
      </div>
      {filteredOrder.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Nomor Meja</TableHead>
              <TableHead className="w-[200px]">Nama</TableHead>
              <TableHead>Tipe</TableHead>
              <TableHead>Pemasukkan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrder.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-medium">
                  {moment(item.order_time).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell className="font-medium">
                  {item.table_number ?? "-"}
                </TableCell>
                <TableCell className="font-medium">
                  {item.customer_name}
                </TableCell>
                <TableCell className="font-medium">
                  {item.takeaway ? "Take Away" : "Dine In"}
                </TableCell>
                <TableCell className="font-medium">
                  {RupiahIRD(item.total_price)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow className="text-2xl">
              <TableCell colSpan={5}>Total</TableCell>
              <TableCell>{RupiahIRD(totalRevenue)}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      ) : (
        <span className="text-center">Pesanan tidak ditemukan</span>
      )}
    </div>
  );
}

export default IncomeList;
