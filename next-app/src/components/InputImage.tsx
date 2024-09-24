"use client";
import React, { Suspense, useState } from "react";
import Spinner from "./Spinner";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ImageIcon, X } from "lucide-react";

const MultipleImagePreview = () => {
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleImageChange = (event: any) => {
    const files = Array.from(event.target.files);
    const imagePreviewsArray: any = [];

    files.forEach((file: any) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        imagePreviewsArray.push(reader.result);
        if (imagePreviewsArray.length === files.length) {
          setImagePreviews(imagePreviewsArray);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    console.log(imagePreviews);
    setImagePreviews((currentImages) =>
      currentImages.filter((img, i) => i !== index)
    );
  };

  const clickHandler = async () => {
    const files = imagePreviews;
    if (files.length === 0) return;
    const formData = new FormData();
    imagePreviews.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });
  };

  return (
    <div>
      <Button onClick={clickHandler}>Post Content</Button>
      <label htmlFor="fileinput" className="hover:cursor-pointer">
        <ImageIcon />
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
        {imagePreviews.length > 0 && (
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ">
            <Carousel className="w-full">
              <CarouselContent className="-ml-1 flex-col">
                {imagePreviews.map((image, index) => (
                  <CarouselItem className="pl-1 basis-full sm:basis-1/2 lg:basis-1/3">
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

export default MultipleImagePreview;
