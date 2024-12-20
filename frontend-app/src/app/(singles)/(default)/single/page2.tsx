import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../../store";
import NcImage from "components/NcImage/NcImage";
import SingleHeader from "app/(singles)/SingleHeaderA";
import Layout from "../layout2";
import {useParams} from "react-router-dom";
import {fetchSingleArticle} from "../../../../reducers/newsReducer";

const PageSingle = () => {
  const {id} = useParams<{ id: string }>(); // Get article ID from URL parameters
  const dispatch = useDispatch<AppDispatch>();
  const [newsData, setNewsData] = useState<{
    image: string;
  }>({
    image: ""
  });
  // Fetching the article from Redux store
  const {singleArticle} = useSelector(
      (state: RootState) => state.news
  );
  useEffect(() => {
    if (id) {
      dispatch(fetchSingleArticle(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (singleArticle) {
      setNewsData(singleArticle)
    }
  }, [singleArticle]);

  return (
    <Layout>
      <div className={`nc-PageSingle pt-8 lg:pt-16`}>
        <header className="container rounded-xl">
          <div className="max-w-screen-md mx-auto">
            <SingleHeader />
          </div>
        </header>
        <NcImage
          alt="single"
          containerClassName="container my-10 sm:my-12"
          className="w-full rounded-xl"
          src={newsData.image}
          width={1260}
          height={750}
          sizes="(max-width: 1024px) 100vw, 1280px"
        />
      </div>
    </Layout>
  );
};

export default PageSingle;
