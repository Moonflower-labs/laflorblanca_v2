import { useNavigate } from "react-router";
import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { ImBin } from "react-icons/im";
import { Link, useLocation } from "react-router-dom";
import { CartProduct } from "../../utils/definitions";
import { CgShoppingCart } from "react-icons/cg";
import { useCart } from "../../context/CartContext";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, incrementItemQuantity, decreaseItemQuantity, deleteItem } = useCart()
  const [isVisible, setIsVisible] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);
  const handleModal = () => {
    setIsVisible(!isVisible);
  };
 


  const calculateTotalItems=(cartItems: CartProduct[]) => {
    let totalItems = 0;
    if (cartItems.length > 0) {
      cartItems.forEach((item) => {
        totalItems += item.quantity;
      });
    }
    return totalItems;
  }

  return (
    <>
      <div className="indicator cursor-pointer"  ref={cartRef} onClick={handleModal}>
        {cartItems.length > 0 && (
          <motion.span
            key={calculateTotalItems(cartItems)}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="badge badge-sm badge-secondary indicator-item indicator-end"
          >
            {calculateTotalItems(cartItems)}
          </motion.span>
        )}
        <CgShoppingCart
          size={30}
          className="ms-2 text-primary cursor-pointer"
          onClick={handleModal}
        />
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            key="shoppingCart"
            ref={cartRef}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed top-0 right-0 w-full h-full z-50 flex"
            onClick={handleModal}
          >
            <div className="w-full h-full fixed right-0 backdrop-blur-sm flex flex-col gap-3 items-center justify-center">
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-base-100 p-10 min-h-16 text-center rounded-lg z-[100] relative w-screen max-w-screen-sm max-h-screen overflow-y-auto"
              >
                {" "}
                <button>
                  <IoClose
                    size={25}
                    className="absolute top-3 right-3"
                    onClick={handleModal}
                  />
                </button>
                <p className="absolute top-4 left-24 font-semibold">
                  {" "}
                  Artículos de compra
                </p>
                <div className="overflow-x-auto">
                  {cartItems.length ? (
                    <>
                      <table className="table">
                        {/* head */}
                        <thead>
                          <tr className="text-center">
                            <th className="">Imagen</th>
                            <th className="">Artículo</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Cambiar</th>
                          </tr>
                        </thead>
                        <tbody>
                          <AnimatePresence>
                            {cartItems.length && cartItems.map((item) => (
                              <motion.tr key={item.id}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0 }}>
                                <td>
                                  <div className="flex items-center gap-3">
                                    <div className="avatar">
                                      <div className="mask mask-squircle w-12 h-12">
                                        <img
                                          src={item.image}
                                          alt="Imagen de producto"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  {item?.name}
                                  <br />
                                  <span className="badge badge-primary badge-sm">
                                    {item?.description?.slice(0, 10)}...
                                  </span>
                                </td>
                                <td className="text-center">
                                  £{item?.amount / 100}
                                </td>
                                <td className="text-center">
                                  {item?.quantity || 1}
                                </td>
                                <th className="">
                                  <div className="flex gap-2 align-middle my-auto">
                                    {" "}
                                    <button
                                      onClick={() =>
                                        decreaseItemQuantity(item.id)
                                      }
                                      className="btn btn-outline btn-primary btn-xs"
                                    >
                                      -
                                    </button>
                                    <button
                                      onClick={() =>
                                        incrementItemQuantity(item.id)
                                      }
                                      className="btn btn-outline btn-primary  btn-xs"
                                    >
                                      +
                                    </button>
                                    <button
                                      onClick={() => deleteItem(item.id)}
                                      className="btn btn-ghost btn-xs"
                                    >
                                      <ImBin
                                        size={22}
                                        className="my-auto text-red-500"
                                      />
                                    </button>
                                  </div>
                                </th>
                              </motion.tr>
                            ))}
                          </AnimatePresence>
                        </tbody>
                      </table>
                      <div className="font-semibold my-3">
                        Total: £
                        {cartItems.reduce(
                          (total, item) => total + item.amount * item.quantity, 0) / 100
                        }
                      </div>
                    </>
                  ) : (
                    <div>Su cesta está vacía.</div>
                  )}
                </div>
                <div className="flex flex-col gap-4">
                  {cartItems.length > 0 && (
                    <button
                      onClick={() => {
                        setIsVisible(false);
                        navigate("/checkout", { state: cartItems });
                      }}
                      className="btn btn-primary mt-5"
                      disabled={location.pathname.includes("/checkout")}
                    >
                      Checkout
                    </button>
                  )}
                {!location.pathname.includes("/store") && (
                    <Link
                    to={"/store"}
                    className="link-primary"
                    onClick={() => setIsVisible(false)}
                  >
                    Ir a la tienda
                  </Link>
                )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ShoppingCart;
