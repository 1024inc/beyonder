import Head from 'next/head'
import Script from 'next/script'
import App from '../src/App';
import React from "react";

export default function index() {
  return (
    <div>
      <Head>
          <title>Beyond runner</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
          <App pageName="Game" />
      </main>

      <footer></footer>
        <Script type="module" src="/scripts/script.js" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/5.1.3/pixi.min.js"></script>
    </div>
  )
}