import { useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";

const useFetch = (url, initialState, page, limit) => {
    const [data, setData] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [count, setCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(url, {
                    params: {
                        page,
                        limit,
                    },
                });
                setData(response.data);
                setCount(response.data.count || 0);
                setTotalPages(response.data.totalPages || 0);
            } catch (err) {
                setError(err);
                enqueueSnackbar(err.message, { variant: "error" });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, page, limit, enqueueSnackbar]);

    return { data, loading, error, count, totalPages };
};

export default useFetch;