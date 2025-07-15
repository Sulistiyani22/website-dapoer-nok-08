import React from "react";
import Image from "next/image";
import { RupiahIRD } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";

function Cart({ product }) {
  const { updateQuantity, removeItem } = useCart();
  return (
    <div className="min-h-14 sm:min-h-20 sm:h-auto flex gap-1">
      <div className="bg-base-200 basis-2/3 flex gap-2 p-2 rounded-xl">
        <Image
          src={product.image}
          height={100}
          width={100}
          alt={product.name}
          className="w-auto h-14 sm:h-auto rounded-xl"
        />
        <div className="flex flex-col gap-1">
          <span className="text-sm sm:text-lg font-medium">{product.name}</span>
          <span className="text-xs sm:text-base">
            {RupiahIRD(product.price)}
          </span>
        </div>
      </div>
      <div className="basis-1/3 flex flex-col gap-1">
        <Button
          onClick={() => removeItem(product)}
          variant="secondary"
          className="basis-1/2 rounded-xl"
        >
          Hapus Menu
        </Button>
        <div className="basis-1/2 h-full flex justify-evenly">
          <Button
            onClick={() => updateQuantity(product, "plus")}
            variant="secondary"
            className="h-auto flex-1 rounded-xl"
          >
            +
          </Button>
          <Button
            variant="secondary"
            className="bg-white h-auto flex-1 disabled:opacity-100"
            disabled
          >
            {product.quantity}
          </Button>
          <Button
            onClick={() => updateQuantity(product, "min")}
            variant="secondary"
            className="h-auto flex-1 rounded-xl"
          >
            -
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
