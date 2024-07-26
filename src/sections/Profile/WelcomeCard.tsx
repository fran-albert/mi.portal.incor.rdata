"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/auth";
import { FaHeartbeat, FaSmile } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { User } from "@/types/User/User";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

export default async function WelcomeCardComponent({
  session,
}: {
  session: Session;
}) {
  const [profile, setProfile] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    setIsLoading(true);
    // const userRepository = createApiPatientRepository();

    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        // const userData = await loadUser(Number(session?.user?.id));
        // setProfile(userData ?? null);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // if (isLoading) {
  //   return <Loading />;
  // }

  if (!profile) {
    return null;
  }

  return (
    <>
      <div className="flex justify-center items-center mx-4 sm:mx-auto">
        <Card className="w-full max-w-2xl bg-gray-100 shadow-xl rounded-lg overflow-hidden">
          <CardHeader className="bg-gray-100 flex items-center gap-4 p-4">
            <Avatar>
              <AvatarImage
                src={
                  profile?.photo
                    ? `https://incor-ranking.s3.us-east-1.amazonaws.com/storage/avatar/${profile.photo}`
                    : "https://incor-ranking.s3.us-east-1.amazonaws.com/storage/avatar/default.png"
                }
              />
              <AvatarFallback>Imagen del Usuario</AvatarFallback>
            </Avatar>
            <CardTitle className="text-incor">
              Hola, {profile?.firstName}!
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="p-4">
            <div className="flex flex-col items-center gap-4">
              <FaHeartbeat className="text-red-500" size={30} />
              <p className="text-center text-lg text-gray-900">
                Desde INCOR estamos comprometidos con tu salud y bienestar.{" "}
                <br /> ¡Te deseamos un día lleno de energía y salud!
              </p>
              <FaSmile className="text-yellow-400" size={30} />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
