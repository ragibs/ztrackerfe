import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { Button } from "../ui/button";

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
            <div>
              <div className="flex gap-3 flex-wrap justify-center text-xs sm:text-base">
                <div>
                  <p className="font-extralight mb-2">Retail Price</p>
                  <p className="font-semibold text-center">$69.99</p>
                </div>
                <div>
                  <p className="font-extralight mb-2">Sale Price</p>
                  <p className="font-semibold text-center">$49.99</p>
                </div>
                <div>
                  <p className="font-extralight mb-2">Date Added</p>
                  <p className="font-semibold text-center">Oct 19 2023</p>
                </div>
                <div>
                  <p className="font-extralight mb-2">Last Checked</p>
                  <p className="font-semibold text-center">15 mins ago</p>
                </div>
                <div>
                  <p className="font-extralight mb-2">Sizes Tracked</p>
                  <p className="font-semibold text-center">S,M</p>
                </div>
                <div>
                  <p className="font-extralight mb-2">Stock</p>
                  <p className="font-semibold text-center">Instock</p>
                </div>
              </div>
              <div className="flex justify-center gap-3 mt-7 sm:justify-end">
                <Button className="text-xs sm:text-base">Buy Now</Button>
                <Button variant="outline" className="text-xs sm:text-base">
                  Edit
                </Button>
                <Button variant="destructive" className="text-xs sm:text-base">
                  Delete
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Product;
