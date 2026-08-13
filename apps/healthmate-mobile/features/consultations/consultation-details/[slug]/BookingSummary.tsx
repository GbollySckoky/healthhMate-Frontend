interface BookingSummaryProps {
  amount: number;
}

const BookingSummary = ({ amount }: BookingSummaryProps) => {
  return (
    <div className="flex items-center justify-between">
      <span className="font-semibold">Total</span>

      <span className="text-lg font-semibold text-green-600">
        ₦{amount.toLocaleString()}
      </span>
    </div>
  );
};

export default BookingSummary;