import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../../../reducers/registerReducer";
import {RootState, AppDispatch} from "../../../store";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import NcLink from "components/NcLink/NcLink";
import Heading2 from "components/Heading/Heading2";
import Layout from "../layout";


const PageSignUp = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {loading, success, error} = useSelector((state: RootState) => state.register);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirmation] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Check if passwords match before submitting
        if (password !== password_confirmation) {
            alert("Passwords do not match");
            return;
        }

        if (!name || !email) {
            alert("name and email fields are required")
        }

        // Dispatch the sign-up action
        const userData = {
            name,
            email,
            password,
            password_confirmation,
        };
        dispatch(registerUser(userData));
    };

    return (
        <Layout>
            <header className="text-center max-w-2xl mx-auto - mb-14 sm:mb-16 lg:mb-20">
                <Heading2>Sign up</Heading2>
                <span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
          Sign Up to create your personalized news preferences
        </span>
            </header>

            <div className="max-w-md mx-auto space-y-6">
                {/* FORM */}
                <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
                    <label className="block">
            <span className="text-neutral-800 dark:text-neutral-200">
              Name
            </span>
                        <Input
                            type="text"
                            placeholder="your fullname"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            className="mt-1"
                        />
                    </label>
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
                        <Input type="password" className="mt-1" value={password}
                               onChange={(e) => setPassword(e.target.value)}/>
                    </label>
                    <label className="block">
            <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
              Confirm Password
            </span>
                        <Input type="password" className="mt-1" value={password_confirmation}
                               onChange={(e) => setPasswordConfirmation(e.target.value)}/>
                    </label>
                    <ButtonPrimary type="submit" disabled={loading}>
                        {loading ? "Registering..." : "Continue"}
                    </ButtonPrimary>
                    {error && (
                        <span className="block text-center text-red-500 mt-4">
              {error}
            </span>
                    )}
                </form>

                {/* ==== */}
                <span className="block text-center text-neutral-700 dark:text-neutral-300">
          Already have an account? {` `}
                    <NcLink href="/login">Sign in</NcLink>
        </span>
            </div>
        </Layout>
    );
};
export default PageSignUp;
