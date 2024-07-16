import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";

const useFetch = (url, initialState) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(initialState);
    const [count, setCount] = useState(initialState.count);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        let isMounted = true;

        axios
            .get(url)
            .then((res) => {
                if (isMounted) {
                    if (!res.data.data) {
                        setData(res.data);
                        setCount(res.count);
                    } else {
                        setData(res.data.data);
                        setCount(res.data.count);
                    }
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

    return { data, loading, error, count };
};

export default useFetch;