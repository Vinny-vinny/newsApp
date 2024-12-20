import React, { FC } from "react";
import Avatar from "components/Avatar/Avatar";
import {ArticleDataType, PostDataType} from "data/types";
import Link from "components/Link";

export interface PostCardMetaProps {
  className?: string;
  meta: Pick<ArticleDataType, "date_published" | "author">;
  hiddenAvatar?: boolean;
  avatarSize?: string;
}

const ArticleCardMeta: FC<PostCardMetaProps> = ({
  className = "leading-none text-xs",
  meta,
  hiddenAvatar = false,
  avatarSize = "h-7 w-7 text-sm",
}) => {
  const { date_published, author } = meta;

  return (
    <div
      className={`nc-PostCardMeta inline-flex items-center flex-wrap text-neutral-800 dark:text-neutral-200 ${className}`}
    >
      <Link href="#" className="relative flex items-center space-x-2">
        {!hiddenAvatar && (
          <Avatar
            radius="rounded-full"
            sizeClass={avatarSize}
            // imgUrl={author.avatar}
            userName={author}
          />
        )}
        <span className="block text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium">
          {author}
        </span>
      </Link>
      <>
        <span className="text-neutral-500 dark:text-neutral-400 mx-[6px] font-medium">
          ·
        </span>
        <span className="text-neutral-500 dark:text-neutral-400 font-normal">
          {date_published}
        </span>
      </>
    </div>
  );
};

export default ArticleCardMeta;
