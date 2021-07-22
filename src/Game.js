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
        <div>
            <Head>
                <script type="module" src="/scripts/script.js" > </script>
            </Head>
            <div className='bg-primary container'>
                <div className='row'>
                    <div id='app' className='mt-4 col-md-9 p-0' > </div>
                    <div className=' mt-4 col-md-3 p-0'>
                        <div id='ranking' className='mt-4 col-md-3 p-0'> {ranking}</div>
                        <div id='stats' className='mt-4 col-md-3 p-0' ref={itemCount}> 100 </div>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default Game;

