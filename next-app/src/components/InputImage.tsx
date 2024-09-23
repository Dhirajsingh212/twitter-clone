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

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />
      <Suspense fallback={<Spinner />}>
        <Carousel className="my-10">
          <CarouselContent className=" w-96">
            {imagePreviews.map((preview, index) => (
              <CarouselItem className="w-full">
                <img
                  key={index}
                  src={preview}
                  alt={`Preview ${index}`}
                  style={{ maxWidth: "300px", margin: "10px" }}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </Suspense>
    </div>
  );
};

export default MultipleImagePreview;
