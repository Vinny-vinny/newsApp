import React, { FC, useEffect, useState } from "react";
import CategoryBadgeList from "components/CategoryBadgeList/CategoryBadgeList";
import SingleTitle from "./SingleTitle";
import PostMeta2 from "components/PostMeta2/PostMeta2";
import SingleMetaAction2 from "./SingleMetaAction2";
import { DEMO_CATEGORIES } from "data/taxonomies";
import { fetchSingleArticle } from "../../reducers/newsReducer";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";

export interface SingleHeaderProps {
  hiddenDesc?: boolean;
  titleMainClass?: string;
  className?: string;
}

const SingleHeader: FC<SingleHeaderProps> = ({
                                               titleMainClass,
                                               hiddenDesc = false,
                                               className = "",
                                             }) => {

  const [newsData, setNewsData] = useState<{
    title: string;
    description: string;
  }>({
    title: "Default Title",
    description: "Default Description"
  });

  const { id } = useParams<{ id: string }>(); // Get article ID from URL parameters
  const dispatch = useDispatch<AppDispatch>();
  // Fetching the article from Redux store
  const { singleArticle, singleArticleLoading, singleArticleError } = useSelector(
      (state: RootState) => state.news
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleArticle(id)); // Dispatch the action to fetch single article by ID
    }
  }, [id, dispatch]);

  // Update local state after fetching article data
  useEffect(() => {
    if (singleArticle) {
      setNewsData(singleArticle)
    }
  }, [singleArticle]);

  if (singleArticleLoading) {
    return <div>Loading news...</div>;
  }

  if (singleArticleError) {
    return <div className="text-red-500">{singleArticleError}</div>;
  }

  return (
      <div className={`nc-SingleHeader ${className}`}>
        <div className="space-y-5">
          <CategoryBadgeList
              itemClass="!px-3"
              categories={[DEMO_CATEGORIES[1]]}
          />
          <SingleTitle mainClass={titleMainClass} title={newsData.title} />
          {!hiddenDesc && (
              <span className="block text-base text-neutral-500 md:text-lg dark:text-neutral-400 pb-1">
                        {newsData.description}
                    </span>
          )}
          <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex flex-col sm:flex-row justify-between sm:items-end space-y-5 sm:space-y-0 sm:space-x-5">
            <PostMeta2
                size="large"
                className="leading-none flex-shrink-0"
                hiddenCategories
                avatarRounded="rounded-full shadow-inner"
            />
            <SingleMetaAction2 />
          </div>
        </div>
      </div>
  );
};

export default SingleHeader;
