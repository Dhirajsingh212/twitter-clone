"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Edit2, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { updateUsernameAndEmail } from "@/actions";

export default function SettingForm({
  emailProp,
  usernameProp,
}: {
  emailProp: string;
  usernameProp: string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(usernameProp);
  const [email, setEmail] = useState(emailProp);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsEditing(false);

    if (email === emailProp && username === usernameProp) {
      toast.success("updated user");
      return;
    }
    try {
      if (await updateUsernameAndEmail(email, username, emailProp)) {
        toast.success("Updated user profile");
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      toast.error("Something went wrong.");
    }
  };

  const inputVariants = {
    disabled: { opacity: 0.7 },
    enabled: { opacity: 1 },
  };

  return (
    <div className="lg:w-1/2 p-4 space-y-6">
      <motion.h1
        className="text-3xl font-bold w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Settings
      </motion.h1>

      <motion.div
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <motion.div
            variants={inputVariants}
            animate={isEditing ? "enabled" : "disabled"}
          >
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={!isEditing}
              className="w-full"
            />
          </motion.div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <motion.div
            variants={inputVariants}
            animate={isEditing ? "enabled" : "disabled"}
          >
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEditing}
              className="w-full"
            />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="flex justify-end space-x-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {!isEditing ? (
          <Button onClick={handleEdit} variant="outline">
            <Edit2 className="w-4 h-4 mr-2" />
            Edit
          </Button>
        ) : (
          <Button onClick={handleSave} variant="default">
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
        )}
      </motion.div>
    </div>
  );
}
