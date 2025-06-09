import { Headphones, MapPin, RefreshCcw, Tag, Truck, type LucideProps } from "lucide-react";
import Accordion from "./components/accordion";

type FAQItem = {
  id: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  question: string;
  answer: string;
};
const faqData: Omit<FAQItem, "id">[] = [
  {
    question: "What is your return policy?",
    answer:
      "You can return any item within 30 days of purchase for a full refund, as long as it's in its original condition.",
    icon: RefreshCcw,
  },
  {
    question: "How long does shipping take?",
    answer:
      "Shipping usually takes 3-5 business days within the US, and 7-14 business days for international orders.",
    icon: Truck,
  },
  {
    question: "Do you offer customer support?",
    answer:
      "Yes! Our customer support is available via email and live chat from 9am to 6pm (EST), Monday to Friday.",
    icon: Headphones,
  },
  {
    question: "Can I track my order?",
    answer:
      "Absolutely. Once your order is shipped, you’ll receive a tracking number via email.",
    icon: MapPin,
  },
  {
    question: "Are there any discounts for bulk purchases?",
    answer:
      "Yes, we offer discounts for bulk or wholesale orders. Please contact sales@example.com for details.",
    icon: Tag,
  },
];

function App() {
  return (
    <>
      <Accordion data={faqData} />
    </>
  );
}

export default App;
