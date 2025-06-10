import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

import type { LucideIcon } from "lucide-react";
import { cn } from "../utils";

type DataItem = {
  question: string;
  answer: string;
  icon: LucideIcon;
};

const AccordionItem = ({
  item,
  handleExpand,
  expandedItem,
  index,
  isExpanded,
  lastIndex,
}: {
  item: DataItem;
  handleExpand: () => void;
  expandedItem: number | null;
  isExpanded: boolean;
  index: number;
  lastIndex: number;
}) => {
  const hasExpandedItem = typeof expandedItem === "number";

  return (
    <motion.div
      onClick={handleExpand}
      className={cn(
        "border-slate-200 bg-white py-4 px-6 shadow-xs w-[450px] cursor-pointer border-l border-r",
        isExpanded && " border",
        index === lastIndex && "border-b",
        index === 0 && "border-t",
        hasExpandedItem && expandedItem + 1 === index && "border-t",
        hasExpandedItem && expandedItem - 1 === index && "border-b"
      )}
      initial={false}
      animate={{
        backgroundColor: isExpanded
          ? "#FDFDFD"
          : "rgb(255, 255, 255)",
        marginTop: isExpanded ? (index === 0 ? "0px" : "16px") : "0px",
        marginBottom: isExpanded ? "16px" : "0px",
        borderRadius: (() => {
          if (isExpanded) {
            return "36px";
          }

          let topRadius = "0px";
          let bottomRadius = "0px";

          if (index === 0 || (hasExpandedItem && expandedItem + 1 === index)) {
            topRadius = "36px";
          }

          if (
            index === lastIndex ||
            (hasExpandedItem && expandedItem - 1 === index)
          ) {
            bottomRadius = "36px";
          }

          return `${topRadius} ${topRadius} ${bottomRadius} ${bottomRadius}`;
        })(),
      }}
      transition={{
        type: "spring",
        damping: 16,
        stiffness: 120,
        mass: 1.5,
      }}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-3">
          <item.icon className="text-neutral-500" width={24} height={24} />
          <span className="font-medium text-neutral-900">{item.question}</span>
        </div>

        {!isExpanded && <ChevronDown className="text-neutral-500 w-6 h-6" />}
        {isExpanded && (
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 180 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <ChevronDown className="text-neutral-500 w-6 h-6" />
          </motion.div>
        )}
      </div>
      {isExpanded && (
        <motion.p
          className="pl-9 mt-2 text-neutral-500"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {item.answer}
        </motion.p>
      )}
    </motion.div>
  );
};

const Accordion = ({ data }: { data: DataItem[] }) => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  return (
    <>
      {data.map((item, index) => (
        <AccordionItem
          expandedItem={expandedItem}
          isExpanded={expandedItem === index}
          key={index}
          index={index}
          lastIndex={data.length - 1}
          item={item}
          handleExpand={() =>
            setExpandedItem((prev) => (prev === index ? null : index))
          }
        />
      ))}
    </>
  );
};

export default Accordion;
