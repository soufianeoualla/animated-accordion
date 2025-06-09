import { ChevronUp } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { v4 as uuid } from "uuid";
import type { LucideIcon } from "lucide-react";

type DataItem = {
  question: string;
  answer: string;
  icon: LucideIcon;
};

type Item = DataItem & {
  id: string;
};

const ExpandedItem = ({
  item,
  handleCollapse,
}: {
  item: Item;
  handleCollapse: () => void;
}) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, backgroundColor: "#fff", borderColor: "#fff" }}
    animate={{ opacity: 1, backgroundColor: "#f8fafc", borderColor: "#e2e8f0" }}
    exit={{ opacity: 0 }}
    transition={{
      type: "spring",
      mass: 1.5,
      damping: 12,
      stiffness: 50,
    }}
    onClick={handleCollapse}
    className="border border-slate-200 bg-slate-50 rounded-4xl py-4 px-6 w-full shadow-xs"
  >
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-x-3">
        <item.icon className="text-neutral-500" width={24} height={24} />
        <span className="font-medium text-neutral-900">{item.question}</span>
      </div>
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 180 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <ChevronUp className="text-neutral-500 w-6 h-6" />
      </motion.div>
    </div>
    <motion.p
      className="pl-9 mt-2 text-neutral-500"
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {item.answer}
    </motion.p>
  </motion.div>
);

const Item = ({
  item,
  handleExpand,
}: {
  item: Item;
  handleExpand: () => void;
}) => (
  <div
    onClick={handleExpand}
    className="flex justify-between items-center w-full cursor-pointer"
  >
    <div className="flex items-center gap-x-3">
      <item.icon className="text-neutral-500" width={24} height={24} />
      <span className="font-medium text-neutral-900">{item.question}</span>
    </div>
    <ChevronUp className="text-neutral-500 w-6 h-6" />
  </div>
);

const Accordion = ({ data }: { data: DataItem[] }) => {
  const [items] = useState<Item[]>(
    data.map((item) => ({ ...item, id: uuid() }))
  );
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleExpand = (id: string) => {
    setExpandedId(id);
  };

  const expandedItem = items.find((item) => item.id === expandedId);
  const firstArray = expandedItem
    ? items.slice(
        0,
        items.findIndex((i) => i.id === expandedId)
      )
    : items;
  const secondArray = expandedItem
    ? items.slice(items.findIndex((i) => i.id === expandedId) + 1)
    : [];

  return (
    <div className="space-y-2 w-[450px] text-sm">
      <AnimatePresence mode="wait">
        {expandedItem ? (
          <>
            {firstArray.length > 0 && (
              <motion.div
                initial={{ y: 10 }}
                animate={{ y: 0 }}
                transition={{
                  type: "spring",
                  mass: 1.5,
                  damping: 12,
                  stiffness: 100,
                }}
                className="bg-white border border-neutral-200 rounded-4xl py-4 px-6 space-y-6 flex flex-col items-start w-full shadow-xs"
              >
                {firstArray.map((item) => (
                  <Item
                    key={item.id}
                    item={item}
                    handleExpand={() => handleExpand(item.id)}
                  />
                ))}
              </motion.div>
            )}

            <ExpandedItem
              key={`expanded-${expandedItem.id}`}
              item={expandedItem}
              handleCollapse={() => setExpandedId(null)}
            />

            {secondArray.length > 0 && (
              <motion.div
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                transition={{
                  type: "spring",
                  mass: 1.5,
                  damping: 12,
                  stiffness: 100,
                }}
                className="bg-white border border-neutral-200 rounded-4xl py-4 px-6 space-y-6 flex flex-col items-start w-full shadow-xs"
              >
                {secondArray.map((item) => (
                  <Item
                    key={item.id}
                    item={item}
                    handleExpand={() => handleExpand(item.id)}
                  />
                ))}
              </motion.div>
            )}
          </>
        ) : (
          <div className="bg-white border border-neutral-200 rounded-4xl py-4 px-6 space-y-6 flex flex-col items-start w-full shadow-xs">
            {items.map((item) => (
              <Item
                key={item.id}
                item={item}
                handleExpand={() => handleExpand(item.id)}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordion;
