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

export default function ProfileBioDialog() {
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
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell the world about yourself"
              className="resize-none focus-visible:ring-0"
              rows={3}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="Where are you based?"
              className="focus-visible:ring-0"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="link">Link</Label>
            <Input
              id="link"
              placeholder="https://example.com"
              type="url"
              className="focus-visible:ring-0"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
