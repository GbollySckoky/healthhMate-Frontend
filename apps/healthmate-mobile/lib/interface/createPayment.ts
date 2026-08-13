type Currency = "NGN" | "USD";

// type PaymentMethod = "card" | "bank_transfer";


export interface CreatePayment {
  appointmentId: string;
  currency: Currency;
  // paymentMethod: PaymentMethod;
  metadata?: Record<string, string>;
}