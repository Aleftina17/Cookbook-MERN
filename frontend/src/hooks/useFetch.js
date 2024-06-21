import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";

const useFetch = (url, initialState) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(initialState);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        let isMounted = true;

        axios
            .get(url)
            .then((res) => {
                if (isMounted) {
                    setData(res.data.data) || res.data;
                    setLoading(false);
                }
            })
            .catch((err) => {
                if (isMounted) {
                    setError(err);
                    enqueueSnackbar("Server error.", { variant: "error" });
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [url, enqueueSnackbar]);

    return { data, loading, error };
};

export default useFetch;