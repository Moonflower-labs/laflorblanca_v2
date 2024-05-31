import { CartItemPrice, ProductItem } from "../../utils/definitions";
import { useState } from "react";

const Product = ({
  item,
  addToCart,
}: {
  item: ProductItem;
  addToCart: (product: ProductItem, selectedPrice: CartItemPrice) => void;
}) => {
  // const fetcher = useFetcher({ key: "add-to-bag" });
  const [selectedPrice, setSelectedPrice] = useState<CartItemPrice>({
    id: item.prices[0].id,
    amount: item.prices[0].unit_amount,
  });
 
  const handlePriceSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const priceId = e.currentTarget.value;
    const priceAmount =
      e.currentTarget.selectedOptions[0].getAttribute("data-amount");

    if (priceAmount !== null) {
      const priceAmountNumber = Number(priceAmount);

      const selectedPrice: CartItemPrice = {
        id: priceId,
        amount: priceAmountNumber,
      };
      setSelectedPrice(selectedPrice);
    }
  };

  return (
    <div className="card w-96 glass mx-auto shadow-lg">
      <figure className="px-10 pt-10">
        <img
          src={item?.product?.images[0]}
          alt=""
          className="aspect-square rounded-xl"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{item?.product?.name}</h2>
        <p>{item?.product?.description}</p>
        <div className="card-actions justify-center">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Elige uno</span>
              <span className="label-text-alt">Alt label</span>
            </div>
            <select
              className="select select-bordered mb-3"
              onChange={handlePriceSelection}
            >
              {item?.prices &&
                item.prices.map((price) => (
                  <option
                    key={price.id}
                    value={price.id}
                    data-amount={price.unit_amount}
                  >
                    {price.metadata?.title} {price.metadata?.size}{" "}
                    {price.metadata?.color} £{price.unit_amount / 100}
                  </option>
                ))}
            </select>
          </label>
          <button
            className="btn btn-primary"
            onClick={() => addToCart(item, selectedPrice)}
          >
            Añadir a la cesta
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
