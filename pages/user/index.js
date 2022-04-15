import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import useSWR from 'swr';
import {useRouter} from 'next/router';
import Link from 'next/link';
import cookie from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const router=useRouter()
  const {data} = useSWR('../api/me', async function(args) {
    const res = await fetch(args);
    return res.json();
  });
  console.log(data)
  if (!data) return <h1>Loading...</h1>;
  let loggedIn = false;
  if (data.email) {
    loggedIn = true;
  }
  toast("Sucessfully Log Out..")
  return (
    <div>
      <Head>
        <title>Welcome to landing page</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="body">
            <h1>LOGOUT</h1>

      <h2>welcome to RKMGEC</h2>
      {loggedIn && (
        <>
          <h1>Welcome {data.name}!</h1>
          <button className='button'
            onClick={() => {
              cookie.remove('token');
              // revalidate();
              <ToastContainer/>
              setTimeout(() => {
                
                router.push('./user/login');
              }, 3000);
            }}>
            Logout
          </button>
        </>
      )}
      {!loggedIn && (
        <>
     { router.push('../user/login')}
        </>
      )}
    </div>
    </div>
  );
}

export default Home;