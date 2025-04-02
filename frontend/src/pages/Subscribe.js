import { useEffect } from "react";

function Subscribe() {
  useEffect(() => {
    const loadRazorpay = async () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    };
    loadRazorpay();
  }, []);

  const handlePayment = async () => {
    const response = await fetch("http://localhost:5000/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const order = await response.json();

    var options = {
      key: "YOUR_RAZORPAY_KEY_ID",
      amount: order.amount,
      currency: order.currency,
      name: "SSC Mock Test",
      description: "₹10 Subscription Plan",
      order_id: order.id,
      handler: function (response) {
        alert("Payment Successful!");
      },
    };

    var rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="text-center p-6">
      <h2 className="text-xl font-bold">Subscribe for ₹10/year</h2>
      <button onClick={handlePayment} className="bg-blue-500 text-white px-4 py-2 mt-4">
        Pay ₹10
      </button>
    </div>
  );
}

export default Subscribe;
