import Head from 'next/head';
import App from '../src/App';
import React from "react";


export default function index() {
  return (
    <div>
      <Head>
          <title> Beyond runner </title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
          <App pageName="Game" />
      </main>

      <footer></footer>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script  src="/scripts/pixi.js" />
    </div>
  );
};
