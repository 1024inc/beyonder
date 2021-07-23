import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import Head from 'next/head';



function useSocket(url) {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socketIo = io(url);

        setSocket(socketIo);
        function cleanup() {
            socketIo.disconnect();
        }
        return cleanup;
    }, []);
    return socket;
}


const Game1 = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
      setMounted(true)
  }, [])
    const socket = useSocket('http://localhost:4998')
    // const socket = useSocket('http://10.128.0.17:4998')
    const [statsContainer, setStatsContainer] = useState('')
    const [ranking, setRanking] = useState('')

    useEffect(() => {
        let statsContainer = document.getElementById('product-credit');
        let currentCredit = statsContainer;

        function handleEvent(payload) {
            setRanking(payload.message);
            console.log('received from server', payload);
        }

        if (socket) {
            socket.on('ranking', handleEvent)
            // socket.on('ranking', data => {setRanking(data);})
        }

        // if (socket) {
        //     socket.on('news', handleEvent)
        //     // socket.on('news', data => {setRanking(data);})
        // }

        if (socket && statsContainer) {
            let score = statsContainer.innerHTML;
            console.log('client --> server', score )
            socket.emit('score', score)
        }

    }, [socket])

    const itemCount = useRef(null);
    const playerName = 'Alice';
    const playerBCBalance = 0;
    const numberOfPlayers = 0;

    return (
        mounted && <div className="container m-4">
            <Head>
                <script type="module" src="/scripts/script.js"></script>
            </Head>
                    <h4 className="mb-3">
                        Narwhal The Beyonder {playerName} collect
                        <span className="product-image"></span>
                        <span id="product-label"></span> Icon
                        and avoid
                         <span id="blob-description" className=" ml-1"> </span>
                        <span id="blob-icon" className="mx-2"></span>
                        Icon
                    </h4>

            <div className="row  text-center" >
                <div className="col-md-8">
                    <div className="card bg-primary shadow-inset border-light p-3">
                        <div className="card-body shadow-soft border border-light rounded">
                            <div id='app' className='border rounded' > </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                        <div className="card bg-primary shadow-inset border-light p-3">
                            <div className="card-body shadow-soft border border-light rounded p-4">
                                <div className="row">
                                    <div className='p-0'>
                                        <div id='stats' className='card-header text-center px-0 pt-0' ref={itemCount}>
                                            <h5>Your stats </h5>
                                            Credits:
                                            $
                                            <span id="product-credit" className="mx-1"></span>
                                            out of 25
                                            <div className="mt-2">
                                                <img src='images/products/pricing_64.png' id='p' className="opacity-3" width="32" height="32"/>
                                                <img src='images/products/insights_64.png'id='i' className="opacity-3" width="32" height="32"/>
                                                <img src='images/products/signal_64.png'id='s' className="opacity-3" width="32" height="32"/>
                                                <img src='images/products/relay_64.png'id='r' className="opacity-3" width="32" height="32"/>
                                                <img src='images/products/guidance_64.png' id='g' className="opacity-3" width="32" height="32"/>
                                            </div>
                                         </div>
                                         <div id='ranking' className='card-header border-top text-center px-0'>
                                             <h5>Top Ten Players ({numberOfPlayers})</h5>
                                             <div>1. <span>Alice</span> - {ranking}</div>
                                             <div>2. <span>Bob</span> - {ranking}</div>
                                             <div>1. <span>Alice</span> - {ranking}</div>
                                             <div>2. <span>Bob</span> - {ranking}</div>
                                             <div>1. <span>Alice</span> - {ranking}</div>
                                             <div>2. <span>Bob</span> - {ranking}</div>
                                             <div>1. <span>Alice</span> - {ranking}</div>
                                             <div>2. <span>Bob</span> - {ranking}</div>
                                             <div>1. <span>Alice</span> - {ranking}</div>
                                             <div>2. <span>Bob</span> - {ranking}</div>
                                        </div>
                                        <div className='card-header border-top text-center px-0 pb-0 ml-3'>
                                            <h5>Share</h5>
                                            <img src='images/social/icons8-facebook-48.png' width="32" height="32"/>
                                            <img src='images/social/icons8-instagram-48.png' width="32" height="32"/>
                                            <img src='images/social/icons8-pinterest-48.png' width="32" height="32"/>
                                            <img src='images/social/icons8-twitter-48.png' width="32" height="32"/>
                                            <img src='images/social/icons8-tiktok-48.png' width="32" height="32"/>
                                        </div>
                                     </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            <div className="row  text-center" >
                <div className="col-md-8">
                    <div className="card bg-primary shadow-inset border-light p-3">
                        <div className="card-body shadow-soft border border-light rounded">

                            <span className="product-image"></span>
                            <span id="product-description"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Game1;

