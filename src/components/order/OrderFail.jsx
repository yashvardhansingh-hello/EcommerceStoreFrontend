import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { server } from "../../features/config";
import Loading from "../Loading";
import Lottie from "react-lottie-player";
import CancelAnimation from "../../assets/cancelled.json";

import {
  FaRobot,
  FaRocket,
  FaBolt,
  FaEye,
  FaBullseye,
  FaCogs,
  FaShoppingCart,
  FaTimesCircle,
} from "react-icons/fa";

const floatingIcons = [
  FaShoppingCart,
  FaRobot,
  FaRocket,
  FaBolt,
  FaEye,
  FaBullseye,
  FaCogs,
];

const generatePositions = () =>
  floatingIcons.map(() => {
    const positions = ["top", "bottom"];
    const sides = ["left", "right"];
    const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const randomPercent = () => `${Math.floor(Math.random() * 80) + 10}%`;

    return {
      [random(positions)]: randomPercent(),
      [random(sides)]: randomPercent(),
      size: 88 + Math.random() * 40,
      rotate: Math.random() * 30 - 15,
    };
  });

const FloatingIcon = ({ Icon, style, scrollY, index }) => {
  const depth = 0.15 + (index % 5) * 0.03;
  const time = Date.now() / 1000;
  const floatOffset = Math.sin(time + index) * 10;
  const translateY = scrollY * depth + floatOffset;

  return (
    <Icon
      style={{
        position: "absolute",
        color: "#FF6B6B",
        opacity: 0.8,
        filter: "blur(6px)",
        transform: `translateY(${translateY}px) rotate(${style.rotate}deg)`,
        transition: "transform 0.1s linear",
        ...style,
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 0,
      }}
      size={style.size}
    />
  );
};

export default function PaymentCancel() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const address = searchParams.get("address");
  const name = searchParams.get("name");
  const phone = searchParams.get("phone");
  const cartItemsObj = JSON.parse(searchParams.get("cartItems") || "[]");

  const cartItems = cartItemsObj.map((item) => ({
    productId: item.productId,
    quantity: item.quantity,
    price: item.price,
  }));

  const [order, setOrder] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [positions] = useState(generatePositions());

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    const interval = setInterval(() => setScrollY(window.scrollY), 40);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

    const [showSuccess, setShowSuccess] = useState(true);
  

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const { data } = await axios.post(
          `${server}/api/v1/order/payment/verify`,
          { sessionId, address, name, cartItems, phone },
          { withCredentials: true }
        );
        setOrder(data?.order);
        setTimeout(() => setShowSuccess(false), 3000);

      } catch (error) {
        console.error("Payment cancel verification failed:", error);
      }
    };

    if (sessionId) verifyPayment();
  }, [sessionId]);

  if (!order) return <Loading />;

  return (
    <div className="min-h-screen relative overflow-hidden bg-base-100 py-10 px-4 text-neutral-content">
      {floatingIcons.map((Icon, i) => (
        <FloatingIcon
          key={i}
          Icon={Icon}
          style={positions[i]}
          scrollY={scrollY}
          index={i}
        />
      ))}

     {showSuccess && <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in">
        <div className="text-center animate-bounce-in flex flex-col justify-center items-center">
          <Lottie
            loop
            animationData={CancelAnimation}
            play
            style={{ width: 300, height: 300 }}
          />
          <h1 className="text-3xl font-bold text-red-400">Payment Canceled!</h1>
          <p className="text-sm mt-2">
            Something went wrong. Please try again.
          </p>
        </div>
      </div>}

      <div className="max-w-6xl mx-auto mt-6 space-y-6 z-10 relative">
        <div className="text-center mb-10 flex flex-col justify-center items-center">
          <FaTimesCircle className="text-red-400 size-[5rem]" />
          <h1 className="text-5xl font-bold text-red-400 mt-6">
            Order Failed 😢
          </h1>
          <p className="text-md font-extralight mt-3 text-conent">
            Sorry, {order?.name}. Your payment was not completed.
          </p>
        </div>

        <div className="max-w-3xl mx-auto p-4">
          <div className="backdrop-blur-[50px] rounded-xl shadow-md border border-base-300 p-6 space-y-6">
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-2xl font-bold text-base-content mb-2">
                Order Attempt Details
              </h2>
              <p className="text-base-content/70 text-sm">
                Here's what we received before the cancellation:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-base text-base-content justify-center items-center">
              <div>
                <span className="block text-sm font-medium text-base-content/70">
                  Order ID
                </span>
                <span className="text-md font-normal">{order._id}</span>
              </div>

              <div>
                <span className="block text-sm font-medium text-base-content/70">
                  Phone
                </span>
                <span className="text-lg">{order.phone}</span>
              </div>

              <div>
                <span className="block text-sm font-medium text-base-content/70">
                  Address
                </span>
                <span className="text-md font-light">{order.address}</span>
              </div>

              <div>
                <span className="block text-sm font-medium text-base-content/70">
                  Payment Method
                </span>
                <span className="text-lg capitalize">{order.paymentWay}</span>
              </div>

              <div>
                <span className="block text-sm font-medium text-base-content/70">
                  Status
                </span>
                <span className="badge badge-lg badge-error mt-1">
                  {order.status}
                </span>
              </div>

              <div>
                <span className="block text-sm font-medium text-base-content/70">
                  Total Amount
                </span>
                <span className="text-lg font-semibold">
                  ${order.orderTotal}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-base-content mb-3">
                Items in Cart
              </h3>
              <div className="space-y-4">
                {order.products?.map((item, idx) => {
                  const product = item.productId;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-4 p-3 border border-base-300 rounded-lg bg-base-200"
                    >
                      <img
                        src={product?.image?.url}
                        alt={product?.name}
                        className="w-[10rem] h-[10rem] object-cover rounded-lg border"
                      />
                      <div className="flex-1">
                        <p className="font-bold text-xl text-base-content capitalize ">
                          {product?.title}
                        </p>
                        <p className="text-sm text-base-content/70">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-sm text-base-content/70 font-bold">
                          Price: ${item.price}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="text-center">
              <button
                className="p-3 px-5 rounded-full bg-error hover:bg-opacity-80 my-6 text-white"
                onClick={() => navigate("/cart")}
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
