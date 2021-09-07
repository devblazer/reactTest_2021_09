This hook is designed to simplify the process of using fetch to aqcuire data and incorporate it into normal component flow.  Upon changing, setting of the url, it will fetch the data.  The data response (JSON only), or error response are tracked into state variables, along side a state variable (isLoading) indicating if the hook is still busy fetching data.

An object of these state variables are exposed to this end: {data, error, isLoading}.

Currently there is no AbortController implementation.