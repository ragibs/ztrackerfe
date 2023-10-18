import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

const Product = () => {
  return (
    <div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <span className="text-xs sm:text-lg">1</span>
            <Image
              className="hidden sm:block"
              src="https://static.zara.net/photos///2023/I/0/1/p/8790/390/932/3/w/563/8790390932_2_2_1.jpg?ts=1697360396910"
              alt="WRINKLED DOTTED BLOUSE ZW COLLECTION"
              width={40}
              height={50}
            />
            <p className="text-xs sm:text-lg">
              WRINKLED DOTTED BLOUSE ZW COLLECTION
            </p>

            <p className="text-xs sm:text-lg">$69.99</p>
          </AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Product;
