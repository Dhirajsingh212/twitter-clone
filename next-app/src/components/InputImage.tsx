"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";
import Spinner from "./Spinner";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

const InputImage = ({ images, setImages }: any) => {
  const handleImageChange = (event: any) => {
    const files = Array.from(event.target.files);
    const imagePreviewsArray: any = [];

    files.forEach((file: any) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        imagePreviewsArray.push(reader.result);
        if (imagePreviewsArray.length === files.length) {
          setImages(imagePreviewsArray);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages((currentImages: any) =>
      currentImages.filter((img: any, i: number) => i !== index)
    );
  };

  return (
    <div>
      <label
        htmlFor="fileinput"
        className="hover:cursor-pointer flex flex-row gap-2 items-center"
      >
        <ImageIcon />
        {images.length > 0 && <p>{images.length} Images.</p>}
      </label>
      <input
        className="hidden"
        id="fileinput"
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />
      <Suspense fallback={<Spinner />}>
        {images.length > 0 && (
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ">
            <Carousel className="w-full">
              <CarouselContent className="-ml-1 flex-col">
                {images.map((image: any, index: number) => (
                  <CarouselItem
                    key={index}
                    className="pl-1 basis-full sm:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-1">
                      <Card className="max-sm:w-40 max-sm:h-40">
                        <CardContent className="flex aspect-square items-center justify-center p-2 relative">
                          <Image
                            src={image}
                            alt={`Slide ${index + 1}`}
                            width={600}
                            height={400}
                            className="rounded-lg object-cover w-full h-full"
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-4 right-4"
                            onClick={() => removeImage(index)}
                            aria-label={`Remove image ${index + 1}`}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <div className="flex justify-center mt-4 space-x-2 max-sm:hidden">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </Carousel>
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default InputImage;
