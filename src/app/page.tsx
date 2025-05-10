'use client';

import React, { useEffect, useState } from "react";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { auth } from "../lib/firebase";
import type { User } from "firebase/auth";
import ProfileDropdown from "../components/ProfileDropdown";
import { ModernSpinner } from "@/components/Spinner";
import Form from "@/components/Form";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut();
    setShowDropdown(false);
  };

  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;
    function handleClickOutside(event: MouseEvent) {
      if (buttonRef.current && buttonRef.current.contains(event.target as Node)) {
        return;
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && showDropdown) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside, true);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
    };
  }, [showDropdown, setShowDropdown, user]);

  return (
    <>
      <div className="flex justify-center p-1 mt-8">
        {loading ? (
          <div className="flex h-[50vh] items-center justify-center">
            <ModernSpinner />
          </div>
        ) : user ? (
          <div className="flex flex-col items-center w-full">
            <div className="flex flex-row items-center w-full p-4 max-[385px]:p-2">
              <div className="flex-1 flex justify-center">
                <h1 className="text-3xl font-bold max-[470px]:text-2xl max-[385px]:text-xl max-[310px]:text-lg text-red-700 tracking-wide">
                  Welcome to Blood Heroes
                </h1>
              </div>
              <div className="flex-none md:mr-5">
                <ProfileDropdown
                  userEmail={user.email || null}
                  showDropdown={showDropdown}
                  setShowDropdown={setShowDropdown}
                  handleLogout={handleLogout}
                />
              </div>
            </div>
            <Form userEmail={user.email || ''} />
          </div>
        ) : (
          <GoogleLoginButton />
        )}
      </div>

      <div></div>
    </>
  );
}
