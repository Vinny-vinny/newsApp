import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../reducers/authReducer";
import { RootState, AppDispatch } from "../../../store";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import NcLink from "components/NcLink/NcLink";
import Heading2 from "components/Heading/Heading2";
import Layout from "../layout";

const PageLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the input
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    // Dispatch login action
    const credentials = { email, password };
    dispatch(loginUser(credentials));
  };

  return (
      <Layout>
        <header className="text-center max-w-2xl mx-auto - mb-14 sm:mb-16 lg:mb-20">
          <Heading2>Login</Heading2>
          <span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
                    Sign in to your account
                </span>
        </header>

        <div className="max-w-md mx-auto space-y-6">
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
            <label className="block">
                        <span className="text-neutral-800 dark:text-neutral-200">
                            Email address
                        </span>
              <Input
                  type="email"
                  placeholder="example@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="mt-1"
              />
            </label>
            <label className="block">
                        <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                            Password
                        </span>
              <Input
                  type="password"
                  className="mt-1"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
              />
            </label>
            <ButtonPrimary type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </ButtonPrimary>
            {error && (
                <span className="block text-center text-red-500 mt-4">
                            {error}
                        </span>
            )}
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
                    Don't have an account? {` `}
            <NcLink href="/signup">Sign up</NcLink>
                </span>
        </div>
      </Layout>
  );
};

export default PageLogin;
