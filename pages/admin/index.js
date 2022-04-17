import {useRouter} from 'next/router';
import useSWR from "swr";
import Link from 'next/link'
import React from "react";
// router = useRouter()
function Admin() {
    const router=useRouter()
  const { data } = useSWR("/api/me", async function (args) {
    const res = await fetch(args);
    return res.json();
  });
  console.log(data);
  if (!data) return <h1>Loading...</h1>;
  let loggedIn = false;
  if (data.admin == true) {
    loggedIn = true;
  }
  return (
    <div className='body'  style={{paddingTop:`22vh`,textAlign:`center`}}>
      {loggedIn && (
        <div div className='container'>
          {" "}
          <h1 >Welcome {data.name}!!!<h3>you are an ADMIN of RKMGEC</h3></h1>

          <Link href={"../admin/booksUpdate" } passHref><div className='btn'><h2>booksupdate</h2></div></Link>
        </div>
      )}
      {!loggedIn && (
        <>
          <h1>Sorry Youre not an Admin !!!</h1>
        </>
      )}
       <style jsx>{`
        h1 {
          color: blue;
        }
        h2 {
          color: blueviolet;
        }
        h3 {
          color: green;
        }
        h1 {
          font-style: oblique;
        }
        h2 {
          font-style: initial;
        }
        h3 {
          font-style: italic;
          font-size: 25px;
        }
        h4 {
          color: red;
        }
        p {
          color: green;
        }
       
      `}</style>
    </div>
  );
}
export default Admin;
