"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogDescription,
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import InputField from "@/components/general/InputField";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { RupiahIRD } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";
import {
  useCreateOrderMutation,
  useGetOrdersQuery,
} from "@/lib/redux/api/orderApi";

function PaymentModal({ name, table, takeaway }) {
  const { cart, clearCart, totalPrice } = useCart();

  const [open, setOpen] = useState(false); // formatted string
  const [value, setValue] = useState(""); // formatted string
  const [rawValue, setRawValue] = useState(0); // unformatted number
  const change = rawValue - totalPrice;

  const handleChange = (e) => {
    const raw = e.target.value.replace(/\D/g, ""); // remove non-digits
    const number = parseInt(raw || "0", 10);
    setRawValue(number);
    setValue(number === 0 ? "" : RupiahIRD(number));
  };

  const ListCard = ({ product }) => {
    return (
      <div className="bg-base-200 min-h-14 sm:min-h-20 sm:h-auto flex gap-1">
        <div className="basis-2/3 flex gap-2 p-2">
          <Image
            src={product.image}
            height={100}
            width={100}
            alt={product.name}
            className="w-auto h-14 sm:h-auto"
          />
          <div className="flex flex-col gap-1">
            <span className="text-sm sm:text-lg font-medium">
              {product.name}
            </span>
            <span className="text-xs sm:text-base">-{product.quantity}-</span>
          </div>
        </div>
        <div className="basis-1/3 flex flex-col justify-center items-center gap-1">
          <span className="text-sm">
            {RupiahIRD(product.price * product.quantity)}
          </span>
        </div>
      </div>
    );
  };
  const [createOrder] = useCreateOrderMutation();

  const handlePlaceOrder = async () => {
    const payload = {
      customer_name: name,
      table_number: !takeaway ? table : null,
      order_list: cart,
      has_payed: true,
      total_price: totalPrice,
      takeaway,
    };

    if (rawValue < totalPrice) {
      return toast.success("Error", {
        description: "Nominal kurang dari Total Harga",
      });
    }

    await createOrder(payload).unwrap();
    toast.success("Sukses", {
      description: "Berhasil membuat pesanan",
    });

    setTimeout(() => {
      clearCart();
      setOpen(false);
    }, 500);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Pesan</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rincian Pesanan</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-72 w-auto">
          {cart.length > 0 ? (
            cart.map((item) => <ListCard key={item.id} product={item} />)
          ) : (
            <p>Keranjang Kosong</p>
          )}
        </ScrollArea>
        <DialogDescription className="flex justify-between font-bold text-black">
          <span>Total</span>
          <span>{RupiahIRD(totalPrice)},-</span>
        </DialogDescription>
        <hr />
        <InputField
          type="text"
          id="cash"
          name="cash"
          label="masukkan nominal uang :"
          placeholder="Rp."
          inputMode="numeric"
          value={value}
          onChange={(e) => handleChange(e)}
        />
        <InputField
          type="text"
          id="cash"
          name="cash"
          label="jumlah kembalian : "
          placeholder="Rp."
          inputMode="numeric"
          value={RupiahIRD(change)}
          disabled
        />
        <DialogFooter className="flex-col">
          <DialogClose asChild>
            <Button variant="destructive">Batal</Button>
          </DialogClose>
          <Button
            variant="success"
            onClick={handlePlaceOrder}
            disabled={rawValue < totalPrice}
          >
            Bayar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default PaymentModal;
