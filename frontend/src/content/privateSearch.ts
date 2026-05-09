export type PrivateSearchItem = {
  label: string;
  to: string;
  keywords: string[];
};

export const privateSearchItems: PrivateSearchItem[] = [
  { label: "My Orders", to: "/app/orders", keywords: ["orders", "purchases", "buy"] },
  { label: "My Messages", to: "/app/messages", keywords: ["messages", "chat", "inbox"] },
  { label: "My Bookings", to: "/app/bookings", keywords: ["bookings", "appointments", "reservation"] },
  { label: "Saved Services", to: "/app/saved-services", keywords: ["saved", "services", "favorites"] },
  { label: "Payments", to: "/app/payments", keywords: ["payments", "wallet", "transactions"] },
  { label: "Jobs Applied", to: "/app/applications", keywords: ["jobs", "applications", "applied"] },
  { label: "Products", to: "/services/store", keywords: ["products", "store", "commerce"] },
  { label: "Services", to: "/services", keywords: ["services", "platform", "directory"] },
  { label: "Support Tickets", to: "/app/support-tickets", keywords: ["support", "tickets", "help"] },
];

export const privateSearchPopular = [
  { label: "Store", to: "/services/store" },
  { label: "Jobs", to: "/services/jobs" },
  { label: "Health", to: "/services/health" },
  { label: "Education", to: "/services/education" },
  { label: "Sports", to: "/services/sports" },
  { label: "Stream", to: "/services/stream" },
];
