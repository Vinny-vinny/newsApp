import { ArticleDataType } from "data/types";
import React, { FC } from "react";
import Badge from "components/Badge/Badge";
import BadgeArticle from "../Badge/BadgeArticle";

export interface CategoryBadgeListProps {
  className?: string;
  itemClass?: string;
  categories: ArticleDataType["categories"];
}

const CategoryBadgeList: FC<CategoryBadgeListProps> = ({
  className = "flex flex-wrap space-x-2",
  itemClass,
  categories,
}) => {
  return (
      <div></div>
    // <div
    //   className={`nc-CategoryBadgeList ${className}`}
    //   data-nc-id="CategoryBadgeList"
    // >
    //   {categories.map((item, index) => (
    //     <BadgeArticle
    //       className={itemClass}
    //       key={index}
    //       name={item.name}
    //       href={item.href}
    //       color={item.color as any}
    //     />
    //   ))}
    // </div>
  );
};

export default CategoryBadgeList;
