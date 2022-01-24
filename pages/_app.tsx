import type { AppProps } from 'next/app';
import Head from 'next/head';

import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.scss';
import { ToastContainer } from 'react-toastify';

import Flexbox from '../uis/Flexbox/Flexbox';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover"
        />
        <title>Dashboard Data Harga Komoditas</title>
      </Head>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Flexbox classNames="mainContainer">
        <Component {...pageProps} />;
      </Flexbox>
    </>
  );
}

export default MyApp;
