import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"; // To access URL parameters
import { fetchSingleArticle } from "../reducers/newsReducer";
import { RootState,AppDispatch } from "store"; // Adjust with your actual store path

const SingleArticlePage = () => {
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

    if (singleArticleLoading) {
        return <div>Loading...</div>;
    }

    if (singleArticleError) {
        return <div>Error: {singleArticleError}</div>;
    }

    if (!singleArticle) {
        return <div>Article not found</div>;
    }

    const { title, content } = singleArticle;

    return (
        <div>
            <b>{title}</b>
            <p>
                {content}
            </p>
        </div>
    );
};

export default SingleArticlePage;
