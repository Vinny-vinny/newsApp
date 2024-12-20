import React, { FC } from "react";
import ButtonCircle from "components/Button/ButtonCircle";
import rightImg from "images/SVG-subcribe2.png";
import Badge from "components/Badge/Badge";
import Input from "components/Input/Input";
import Image from "components/Image";
import { useNavigate } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export interface SectionSubscribe2Props {
  className?: string;
}

const SectionSubscribe2: FC<SectionSubscribe2Props> = ({ className = "" }) => {
  const navigate = useNavigate(); // Hook for navigation

  const handleJoinNow = () => {
    navigate("/login"); // Redirect to login form
  };

  return (
      <div
          className={`nc-SectionSubscribe2 relative flex flex-col lg:flex-row items-center ${className}`}
      >
        <div className="flex-shrink-0 mb-14 lg:mb-0 lg:mr-10 lg:w-2/5">
          <h2 className="font-semibold text-4xl">Join to set your news preferences 🎉</h2>

          <ul className="space-y-5 mt-10">
            <li className="flex items-center space-x-4">
              <Badge name="01" />
              <span className="font-medium text-neutral-700 dark:text-neutral-300">
              Get more discounts
            </span>
            </li>
            <li className="flex items-center space-x-4">
              <Badge color="red" name="02" />
              <span className="font-medium text-neutral-700 dark:text-neutral-300">
              Get premium magazines
            </span>
            </li>
          </ul>

          {/* Join Now Button */}
          <button
              onClick={handleJoinNow}
              className="mt-8 px-6 py-3 rounded-lg text-white bg-primary-6000 hover:bg-primary-700 transition"
          >
            Join Now
          </button>
        </div>
        <div className="flex-grow">
          <Image
              alt="subsc"
              sizes="(max-width: 768px) 100vw, 50vw"
              src={rightImg}
          />
        </div>
      </div>
  );
};

export default SectionSubscribe2;
