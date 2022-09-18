import { useEffect, useState} from 'react';
import { Loader } from './components/Loader';

import './App.css';
import fetchHTTP from './utils/fetchHTTP';

interface Data{
  id:Date;
}


function App() {
  const [error, setError] = useState<any>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [db, setDb] = useState<[]  | any>([])
  let url:string = 'http://localhost:3004/comments';


  useEffect(() => {
    setLoading(true);
    fetchHTTP()
      .get(url)
      .then((res) => {
        //console.log(res);
        if (!res.err) {
          setDb(res);
          setError(false);
        } else {
          setDb([]);
          setError(res)
        }
        setLoading(false);
        
      });
  
    }, [url]);


  return (
    <div className="App">
     <h1>quotes from everyone</h1>
     {/* ############################# form ############################# */}
    <form>
      <label htmlFor='name'>name</label>
      <input id='name' name='name'/>
      <label htmlFor='quote'>your quote</label>
      <input id='quote' name='quote'/>
      <input type='submit' value='post your quote'/>
    </form>
       {/* ############################# form ############################# */}


    <section>
   {loading  && <Loader/>}
<table>
    <thead>
    <tr>
      <th>name</th>
      <th>quote</th>
    </tr>
  </thead>
 <tbody>
          {db.length > 0  ? (
            db.map((el:any) => (
              <tr key={el.id}>
                <td>{el.name}</td>
                <td>{el.body}</td>
              </tr>
            ))
          ) : (
               <tr>
               {!loading && !error &&<td>Sin datos</td>}
            </tr>
          )}
          <tr>
                {error && <td>{error.statusText}</td>}
            </tr>
        </tbody>
    
    

</table>

    </section>
    </div>
  );
}

export default App;
