import {Outlet, LiveReload, Link, Links, Meta} from 'remix';
import globalStylesUrl from '~/styles/global.css'

export const links = () => [{ rel: 'stylesheet', href:globalStylesUrl}]

export const meta = () => {
  const description = "A blog";
  const keywords = "js, react";

  return{
    description,
    keywords
  }
}

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet/>
      </Layout>
    </Document>
  )
}

function Document({children,title}) {
  return <html lang='en'>
    <head>
      <Links/>
      <title>{title ? title: 'Remix Blog'}</title>
      <Meta/>
    </head>
    <body>
      {children}
      {process.env.NODE_ENV ==='development' ?
      <LiveReload /> : null}
    </body>
  </html>
}

function Layout({children}) {
  return (
    <>
      <nav className='navbar'>
        <Link to='' className='logo'>
          Remix
        </Link>

        <ul className='nav'>
          <li>
            <Link to='/posts'>Posts</Link>
          </li>
        </ul>
      </nav>
      <div className="container">
        {children}
      </div>
    </>
  )
}