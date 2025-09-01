"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { ca } from "date-fns/locale";

export default function Home() {
  const { data: session } = authClient.useSession();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    await authClient.signUp.email(
      {
        email,
        password,
        name,
        callbackURL: "http://localhost:3000/api/auth/signup",
      },
      {
        onRequest: (ctx) => {
          // show loading
        },
        onSuccess: (ctx) => {
          // redirect to the dashboard or sign in page
        },
        onError: (ctx) => {
          // display the error message
          alert(ctx.error.message);
        },
      }
    );
  };

  const signIn = async () => {
    await authClient.signIn.email(
      {
        /**
         * The user email
         */
        email,
        /**
         * The user password
         */
        password,
        /**
         * A URL to redirect to after the user verifies their email (optional)
         */
        callbackURL: "/",
        /**
         * remember the user session after the browser is closed.
         * @default true
         */
        rememberMe: false,
      },
      {
        //callbacks
      }
    );
  };

  if (session) {
    return (
      <div className="flex flex-col p-8 gap-y-4">
        Logged in as {session.user.name}
        <Button onClick={() => authClient.signOut()}>Log out</Button>
      </div>
    );
  }

  return (
    <div>
      <div className="p-4 flex flex-col gap-4">
        <Input
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={signUp}>Create User</Button>
      </div>

      <div className="p-4 flex flex-col gap-4">
        <Input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={signIn}>Create User</Button>
      </div>
    </div>
  );
}
