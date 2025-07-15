"use client";

import React from "react";
import Cart from "./Cart";
import FormOrder from "./FormOrder";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function MenuCart() {
  const router = useRouter();
  const { cart } = useCart();
  return (
    <div className="flex flex-col gap-3 p-6">
      <span className="font-semibold text-2xl">Menu Anda</span>
      <div className="flex flex-col gap-2">
        {cart.length > 0 ? (
          cart.map((item) => <Cart key={item.id} product={item} />)
        ) : (
          <p>Keranjang Kosong</p>
        )}
      </div>
      <Button
        onClick={() => router.push("/user-menu")}
        className="w-auto sm:w-fit sm:self-center mt-5"
      >
        Tambah Menu Lainnya
      </Button>
      {cart.length > 0 && (
        <>
          <hr className="border-base-300 my-6" />
          <FormOrder />
        </>
      )}
    </div>
  );
}

export default MenuCart;
