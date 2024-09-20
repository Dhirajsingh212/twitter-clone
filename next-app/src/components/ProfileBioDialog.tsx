"use client";

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
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { updateBio } from "@/actions";
import { useSession } from "next-auth/react";
import Spinner from "./Spinner";

interface Inputs {
  bio: string;
  location: string;
  link: string;
}

export default function ProfileBioDialog(props: Inputs) {
  const [inputForm, setInputForm] = useState<Inputs>({
    bio: props.bio,
    location: props.location,
    link: props.link,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const session = useSession();

  const changeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setInputForm((prev: Inputs) => {
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
        toast.warning("Empty changes cannot be applied.");
        return;
      }

      if (
        bio === props.bio &&
        location === props.location &&
        link === props.link
      ) {
        toast.success("Updated successfully.");
        return;
      }

      if (bio.length > 160 || location.length > 20 || link.length > 60) {
        toast.warning("Characters should be in limit.");
        return;
      }

      const id = Number((session.data?.user as any).id);
      await updateBio(id, bio, location, link);
      toast.success("Updated Bio.");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (session.status !== "authenticated") {
    return <Spinner />;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Edit X Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] dark:bg-black dark:border dark:text-white  shadow-2xl bg-white">
        <DialogHeader>
          <DialogTitle>Edit X Profile</DialogTitle>
          <DialogDescription>
            Make changes to your X profile here. Click save when you're done.
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
