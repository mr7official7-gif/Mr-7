export type PaymentStatus =
  | 'Pending Payment'
  | 'Payment Verification'
  | 'Paid'
  | 'Processing'
  | 'Completed'
  | 'Cancelled';

export type OrderStatus =
  | 'Pending Payment'
  | 'Payment Verification'
  | 'Paid'
  | 'Processing'
  | 'Completed'
  | 'Cancelled';

export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  price: number;
  originalPrice?: number;
  isPopular?: boolean;
  features: string[];
  badge?: string;
  category: 'account' | 'coins' | 'custom';
  description?: string;
}

export interface CoinPackage {
  id: string;
  coins: number;
  price: number;
  isBestValue?: boolean;
  perCoinRate?: number;
}

export interface PaymentMethodOption {
  id: string;
  name: string;
  type: 'manual' | 'gateway' | 'cod';
  accountTitle?: string;
  accountNumber?: string;
  bankName?: string;
  instructions: string;
  badge?: string;
  iconName?: string;
}

export interface Order {
  id: string; // e.g. MR7-2026-0001
  customerName: string;
  phone: string;
  productId: string;
  productName: string;
  quantity: number;
  coinCount?: number;
  amount: number;
  paymentMethod: string;
  transactionId?: string;
  screenshotUrl?: string;
  additionalNotes?: string;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  createdAt: string;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  review: string;
  date: string;
  location?: string;
  verified?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface StoreConfig {
  brandName: string;
  tagline: string;
  heroSubtitle: string;
  supportWhatsApp: string;
  supportWhatsAppRaw: string;
  supportEmail: string;
  baseCoinRate: number; // e.g. 5 PKR / coin
  products: Product[];
  coinPackages: CoinPackage[];
  paymentMethods: PaymentMethodOption[];
  faqs: FAQItem[];
}
