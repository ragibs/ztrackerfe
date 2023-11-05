"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { SelectTrigger } from "@radix-ui/react-select";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
} from "../ui/select";
import Image from "next/image";

const AddModal = ({ searchResults, setOpen }: any) => {
  console.log(searchResults);
  return (
    <>
      <DialogContent className="max-[640px]:max-w-xs sm:max-w-sm">
        <DialogHeader>
          <div className="flex items-center flex-col gap-5 py-4">
            <DialogTitle>Add {searchResults?.title}</DialogTitle>
            <Image
              src={searchResults?.img}
              width={100}
              height={100}
              alt={searchResults?.title}
            />
          </div>
          <DialogDescription className="py-4">
            Please choose the size and color you would like to track
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-between">
          <div>
            <form action="" className="flex justify-between w-full">
              <div className="w-1/2">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Sizes</SelectLabel>
                      {searchResults.sizes?.map((size: any) => (
                        <SelectItem value={size.size} key={size.size}>
                          {size.size}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              {searchResults.colors?.length > 1 ? (
                <div className="w-1/2">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Colors</SelectLabel>
                        {searchResults.colors?.map((color: any) => (
                          <SelectItem value={color} key={color}>
                            {color}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                ""
              )}
            </form>
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setOpen(false);
              }}
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </>
  );
};

export default AddModal;
