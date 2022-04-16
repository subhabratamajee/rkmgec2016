import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer/>
      <style jsx>{`
      main{min-height:60vh;
     
    }
      `}</style>
    </>
  )
}