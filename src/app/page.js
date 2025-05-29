"use client";
import { useAuth } from "@/components/authProvider";
import Image from "next/image";
import { useState } from "react";
import useSWR from 'swr'
import { ThemeToggleButton } from "@/components/themeToggleButton";


const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Home() {
  const auth = useAuth();
  const {data, error, isLoading} = useSWR("http://127.0.0.1:8000/api/hello", fetcher)
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>
        {auth.isAuthenticated ? "Hello user" : "Hello guest"}
      </div>
      <div>
      <ThemeToggleButton />
      </div>
      <div>
        {JSON.stringify(data)}
      </div>
    </div>
  );
}
