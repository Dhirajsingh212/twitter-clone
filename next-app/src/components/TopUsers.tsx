"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Topuser } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { Eye } from "lucide-react";
import Link from "next/link";

export default function TopUsers({
  TopUsersData,
}: {
  TopUsersData: Topuser[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-full dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">
            Top Users to Follow
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.ul className="space-y-4">
            <AnimatePresence>
              {TopUsersData.map((user: Topuser, index: number) => (
                <Link key={user.id} href={`/profile/${user.id}`}>
                  <motion.li
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-2 rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                      <Avatar>
                        <AvatarImage
                          src={user.profilePic}
                          alt={user.username}
                        />
                        <AvatarFallback>
                          {user && user.username?.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.username}</p>
                        <p className="text-sm line-clamp-1 text-gray-500 dark:text-gray-400">
                          {user.bio}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Eye className="size-4" />
                      </motion.div>
                    </div>
                  </motion.li>
                </Link>
              ))}
            </AnimatePresence>
          </motion.ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}
