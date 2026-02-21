const steps = ['Pending', 'Preparing', 'Out for Delivery', 'Delivered'];

const OrderTracker = ({ status }) => (
  <div className="flex justify-between mt-4">
    {steps.map((step) => (
      <div
        key={step}
        className={`px-3 py-1 rounded ${
          steps.indexOf(step) <= steps.indexOf(status)
            ? 'bg-green-500 text-white'
            : 'bg-gray-300'
        }`}
      >
        {step}
      </div>
    ))}
  </div>
);

export default OrderTracker;