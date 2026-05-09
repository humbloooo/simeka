export interface FAQItem {
  question: string;
  answer: string;
  category: FAQCategory;
}

export type FAQCategory = "general" | "payments" | "nsfas" | "facilities" | "rules";

export const faqCategories: Record<FAQCategory, string> = {
  general: "General",
  payments: "Payments & Pricing",
  nsfas: "NSFAS",
  facilities: "Room & Facilities",
  rules: "Rules & Policies",
};

export const faqs: FAQItem[] = [
  // General
  {
    question: "How far is Simeka Heights from UNIVEN campus?",
    answer: "Simeka Heights is located approximately 1.3km from the UNIVEN campus — roughly a 15-minute walk or a quick 3-minute drive. Many students also use the free bus service we provide to and from campus.",
    category: "general",
  },
  {
    question: "When can I move in?",
    answer: "Move-in dates align with the UNIVEN academic calendar. We typically open for move-in from mid-January for first semester and mid-July for second semester. Early move-in can be arranged on request.",
    category: "general",
  },
  {
    question: "Is there a viewing available before I apply?",
    answer: "Yes! We offer both in-person viewings and virtual tours. Contact us to book a viewing appointment or request a video walkthrough of available rooms.",
    category: "general",
  },
  {
    question: "Can non-UNIVEN students apply?",
    answer: "While we primarily serve UNIVEN students, students from other nearby institutions may apply subject to availability. Contact us to discuss your situation.",
    category: "general",
  },
  // Payments
  {
    question: "What payment methods do you accept?",
    answer: "We accept bank transfers (EFT), direct NSFAS allocation, bursary payments, and cash deposits at our office. Payment plans can be discussed for self-funded students.",
    category: "payments",
  },
  {
    question: "Is there a deposit required?",
    answer: "Yes, a refundable deposit equivalent to one month's rent is required upon signing the lease agreement. This is refunded at the end of your lease, subject to room condition.",
    category: "payments",
  },
  {
    question: "What is included in the monthly rent?",
    answer: "Your rent includes the fully furnished room, WiFi, water, security, access to all common amenities (gym, study lounges, braai area), and weekly cleaning of common areas. Electricity is prepaid and charged separately.",
    category: "payments",
  },
  {
    question: "Can I pay in instalments?",
    answer: "Yes, we offer flexible payment plans for self-funded students. Contact our office to discuss a payment schedule that works for you.",
    category: "payments",
  },
  // NSFAS
  {
    question: "Is Simeka Heights NSFAS accredited?",
    answer: "Yes! Simeka Heights is fully NSFAS accredited. We work directly with NSFAS to process your accommodation allowance, making the payment process seamless.",
    category: "nsfas",
  },
  {
    question: "How does NSFAS payment work?",
    answer: "Once you're allocated to Simeka Heights, we submit your details to NSFAS for direct payment. Your accommodation allowance is paid directly to us, so you don't need to handle the payment yourself.",
    category: "nsfas",
  },
  {
    question: "What if my NSFAS allowance doesn't cover the full rent?",
    answer: "Our sharing room options are priced within the NSFAS accommodation allowance. For higher-tier rooms, you would pay the difference out of pocket. Our team can help you find the best option within your budget.",
    category: "nsfas",
  },
  // Facilities
  {
    question: "Are the rooms furnished?",
    answer: "Yes, all rooms come fully furnished with a single bed and mattress, study desk and chair, desk lamp, wardrobe with bookshelf, kitchen sink with lockers, stove, refrigerator, and table with chairs.",
    category: "facilities",
  },
  {
    question: "Is there WiFi and how fast is it?",
    answer: "Yes, we provide uncapped high-speed fibre WiFi throughout the building, including in your room. It supports streaming, video calls, and online learning without issues.",
    category: "facilities",
  },
  {
    question: "What happens during load shedding?",
    answer: "We have a backup generator and inverter system that kicks in automatically during load shedding. Essential services like security, lighting, and WiFi remain operational.",
    category: "facilities",
  },
  {
    question: "Is parking available?",
    answer: "Yes, parking is available and included in your rental. Most students also use the free bus service to campus.",
    category: "facilities",
  },
  // Rules
  {
    question: "Are visitors allowed?",
    answer: "Yes, visitors are welcome during designated visiting hours (08:00 - 22:00). All visitors must be signed in at reception and cannot stay overnight. This policy ensures the safety and comfort of all residents.",
    category: "rules",
  },
  {
    question: "Is there a curfew?",
    answer: "There is no curfew for residents. You have 24/7 biometric access to the building. However, we do ask residents to be considerate of noise levels after 22:00.",
    category: "rules",
  },
  {
    question: "Can I cancel my lease?",
    answer: "Cancellations require 30 days written notice. Early termination fees may apply depending on the timing. For NSFAS students, cancellations follow NSFAS guidelines. Contact our office for specific details.",
    category: "rules",
  },
  {
    question: "Are pets allowed?",
    answer: "Unfortunately, pets are not allowed at Simeka Heights. This is to ensure a clean, allergen-free environment for all residents.",
    category: "rules",
  },
];
