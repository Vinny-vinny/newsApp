import React, { FC } from "react";
import {ArticleDataType} from "data/types";
import Image from "components/Image";

export interface PostFeaturedMediaProps {
  className?: string;
  post: ArticleDataType;
  isHover?: boolean;
}

const PostFeaturedMedia: FC<PostFeaturedMediaProps> = ({
  className = "w-full h-full",
  post,
  isHover = false,
}) => {
  const { image } =
    post;
  return (
    <div className={`nc-PostFeaturedMedia relative ${className}`}>
        <Image
          alt="featured"
          fill
          className="object-cover"
          src={image}
          sizes="(max-width: 600px) 480px, 800px"
        />
    </div>
  );
};

export default PostFeaturedMedia;
