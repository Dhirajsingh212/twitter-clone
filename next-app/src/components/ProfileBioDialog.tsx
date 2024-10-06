"use client";

import { updateBio } from "@/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { uploadImages } from "@/lib/utils";
import { ProfileBioInputs } from "@/types";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import ProfileImagePreview from "./ProfileImagePreview";
import Spinner from "./Spinner";
import { Skeleton } from "./ui/skeleton";

export default function ProfileBioDialog(props: ProfileBioInputs) {
  const [inputForm, setInputForm] = useState<ProfileBioInputs>({
    bio: props.bio,
    location: props.location,
    link: props.link,
  });
  const [image, setImage] = useState([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const session = useSession();

  const changeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setInputForm((prev: ProfileBioInputs) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  const submitHandler = async () => {
    try {
      setIsLoading(true);
      const { bio, location, link } = inputForm;
      if (bio.length === 0 && location.length === 0 && link.length === 0) {
        toast.error("Empty changes cannot be applied.");
        return;
      }

      if (image.length > 1) {
        toast.error("Max of 1 image can be uploaded.");
      }

      if (
        bio === props.bio &&
        location === props.location &&
        link === props.link &&
        image.length === 0
      ) {
        toast.success("Updated successfully.");
        return;
      }

      if (bio.length > 160 || location.length > 20 || link.length > 60) {
        toast.error("Characters should be in limit.");
        return;
      }

      const id = Number((session.data?.user as any).id);
      let urls: string[] = [];

      if (image.length === 1) {
        const imageResponse = await uploadImages(image);
        urls = imageResponse.uploadedImagesData.map(
          (element: any) => element.url
        );
      }

      await updateBio(id, bio, location, link, urls);

      toast.success("Updated Bio.");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (session.status !== "authenticated") {
    return <Skeleton className="w-20 min-h-10 rounded-sm" />;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Edit X Profile</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[280px] rounded-xl sm:max-w-[425px] dark:bg-black dark:border dark:text-white  shadow-2xl bg-white">
        <DialogHeader>
          <DialogTitle>Edit X Profile</DialogTitle>
          <DialogDescription>
            {
              "Make changes to your X profile here. Click save when you're done."
            }
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4 py-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="bio">
              Bio
              <span className="text-gray-600 pl-1">
                {"(Max of 160 chars.)"}
              </span>
            </Label>
            <Textarea
              name="bio"
              value={inputForm.bio}
              onChange={changeHandler}
              id="bio"
              placeholder="Tell the world about yourself"
              className="resize-none focus-visible:ring-0"
              rows={3}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="location">
              Location{" "}
              <span className="text-gray-600 pl-1">{"(Max of 20 chars.)"}</span>
            </Label>
            <Input
              name="location"
              value={inputForm.location}
              onChange={changeHandler}
              id="location"
              placeholder="Where are you based?"
              className="focus-visible:ring-0"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="link">
              Link{" "}
              <span className="text-gray-600 pl-1">{"(Max of 60 chars.)"}</span>
            </Label>
            <Input
              name="link"
              onChange={changeHandler}
              value={inputForm.link}
              id="link"
              placeholder="https://example.com"
              type="url"
              className="focus-visible:ring-0"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="link">
              Profile picture
              <span className="text-gray-600 pl-1">{"(Max of 1 Image.)"}</span>
            </Label>
            <ProfileImagePreview images={image} setImages={setImage} />
          </div>
        </div>
        <DialogFooter>
          <Button disabled={isLoading} onClick={submitHandler}>
            {isLoading ? <Spinner /> : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
