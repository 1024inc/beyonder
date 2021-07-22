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


const Game = () => {
    const socket = useSocket('http://localhost:4998')
    // const socket = useSocket('http://10.128.0.17:4998')
    const [statsContainer, setStatsContainer] = useState('')
    const [ranking, setRanking] = useState('')

    useEffect(() => {
        let statsContainer = document.getElementById('stats');

        function handleEvent(payload) {
            setRanking(payload.message);
            console.log('received from server', payload);
        }

        if (socket) {
            socket.on('ranking', handleEvent)
            // socket.on('ranking', data => {setRanking(data);})
        }

        if (socket) {
            socket.on('news', handleEvent)
            // socket.on('news', data => {setRanking(data);})
        }

        if (socket && statsContainer) {
            let score = statsContainer.innerHTML;
            console.log('message to server', score )
            socket.emit('mes', score)
        }

    }, [socket])

    const itemCount = useRef(null);

    return (



        <div className="container m-4">
            <Head>
                <script type="module" src="/scripts/script.js"></script>
            </Head>
                    <h4 className="mb-3">Beyonder Alice collect Pricing Icon  <img src="images/products/pricing.png" width="32" height="32"/> 1 out of 5</h4>

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
                                         <div id='ranking' className='card-header border-bottom text-center'>
                                             <h5>Top Players</h5>
                                             <div>1. <span>Alice</span> - {ranking}</div>
                                             <div>2. <span>Bob</span> - {ranking}</div>
                                        </div>
                                        <div id='stats' className='card-header text-center' ref={itemCount}>
                                            <h5>Your Score</h5>
                                            <div>100</div>
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
                            <img src="images/products/pricing.png" width="64" height="64"/>
                            Dynamic & Demand-Driven Pricing The tool you need to maximize revenue and drive occupancy.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Game;

