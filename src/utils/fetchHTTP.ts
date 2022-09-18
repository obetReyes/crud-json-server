
const fetchHTTP = () => {
    const customFetch = (endpoint:string, options:RequestInit) => {
        const defaultHeader:HeadersInit  = {
            accept:"application/json"
        }
        const abortController =  new AbortController();
        options.signal = abortController.signal;
        options.method = options.method || "GET"
       options.headers = options.headers ? { ...defaultHeader, ...options.headers } : defaultHeader;
        options.body = JSON.stringify(options.body) || null
        if(!options.body) delete options.body


        setTimeout(() => abortController.abort(), 6000);
    
        return fetch(endpoint, options)
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject({
              err: true,
              status: res.status || "00",
              statusText: res.statusText || "Ocurrió un error",
            })
      )
      .catch((err) => err);
    }

     const get = (endpoint:string, options:any = {}) => customFetch(endpoint, options);

  const post = (endpoint:string, options:any = {}) => {
    options.method = "POST";
    return customFetch(endpoint, options);
  };

  const put = (endpoint:string, options:any = {}) => {
    options.method = "PUT";
    return customFetch(endpoint, options);
  };

  const del = (endpoint:string, options:any = {}) => {
    options.method = "DELETE";
    return customFetch(endpoint, options);
  };


    return{
        get,
        post,
        put,
        del
    }
}

export default fetchHTTP;
