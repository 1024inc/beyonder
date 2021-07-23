import React, { useState, useEffect, useRef, useContext } from 'react';
import io from 'socket.io-client';
import Head from 'next/head';
import  { ConfigContext } from "./App";

function useSocket(url) {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // const socketIo = io(url);
        const socketIo = io(url, { autoConnect: false });

        setSocket(socketIo);
        function cleanup() {
            socketIo.disconnect();
        }
        return cleanup;
    }, []);
    return socket;
}


const Game = () => {
    const context = useContext(ConfigContext);
    const [mounted, setMounted] = useState(false);
    const socket = useSocket('http://localhost:4998')
    // const socket = useSocket('http://10.128.0.17:4998')
    const [statsContainer, setStatsContainer] = useState('')
    const [ranking, setRanking] = useState('')
    const [users, setUsers] = useState([]);
    let username = context.userName;
    let email = context.email;
            let allUsers = [];
            let u = [];

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (socket) {
            socket.on("users", (users) => {
                users.forEach((user) => {
                    user.self = user.userID === socket.id;
                    console.log(user)
                    // initReactiveProperties(user);
                });
                // put the current user first, and then sort by username
                let allUsers = users.sort((a, b) => {
                    if (a.self) return -1;
                    if (b.self) return 1;
                    if (a.username < b.username) return -1;
                    return a.username > b.username ? 1 : 0;
                });
                console.log('user1', allUsers)
                setUsers(allUsers);
            });
        }
    })

    useEffect(() => {
        let statsContainer = document.getElementById('product-credit');
        if (socket) {
            socket.auth = {username};
            socket.connect();
        }
        function handleEvent(payload) {
            setRanking(payload.message);
            console.log('received from server', payload);
        }

        if (socket) {
            socket.on('ranking', handleEvent)
            socket.on('ranking', data => {setRanking(data);})
        }


        if (socket && statsContainer) {
            let score = statsContainer.innerHTML;
            console.log('score client --> server', score )
            socket.emit('score', score)
        }

        if (socket) {
            socket.on("users", (users) => {
                users.forEach((user) => {
                    user.self = user.userID === socket.id;
                    console.log(user)
                    // initReactiveProperties(user);
                });
                // put the current user first, and then sort by username
                allUsers = users.sort((a, b) => {
                    if (a.self) return -1;
                    if (b.self) return 1;
                    if (a.username < b.username) return -1;
                    return a.username > b.username ? 1 : 0;
                });
                console.log('user1', allUsers)
                setUsers(allUsers);
            });

            socket.on("user connected", (user) => {
                console.log('***users', user)
            });
            socket.on("connect_error", (err) => {
                if (err.message === "invalid username") {
                    console.log("User already selected")
                }
            });
            // useful for debugging
            socket.onAny((event, ...args) => {
                console.log(event, args);
            });
        }
    }, [socket])

    if (users.length > 1) {
        console.log("u", u)
        u = users
    }



    console.log('leng of users', users.length)
    const itemCount = useRef(null);
    const playerName = context.userName;
    const playerBCBalance = 0;
    const numberOfPlayers = users.length;


    return (
        mounted && users && <div className="container m-4">
            <Head>
                <script type="module" src="/scripts/script.js"></script>
            </Head>
            <h4 className="mb-3">
                Wellocome, Narwhal The Beyonder {playerName}
                <span id="collect" className="opacity-0 ml-2">
                            collect
                            <span className="product-image"></span>
                            <span id="product-label"></span> Icon
                            and avoid
                             <span id="blob-description" className=" ml-1"> </span>
                            <span id="blob-icon" className="mx-2"></span>
                            Icon
                        </span>
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
                                    <div className='card-header border-top text-center px-0'>
                                        <h5>Top Ten Players ({numberOfPlayers})</h5>
                                        <div>1. <span>{u[0]?.username}</span> - {ranking}</div>
                                        <div>2. <span>{u[1]?.username}</span> - {ranking}</div>
                                        <div>3. <span>{u[2]?.username}</span> - {ranking}</div>
                                        <div>4. <span>{u[3]?.username}</span> - {ranking}</div>
                                        <div>5. <span>{u[4]?.username}</span> - {ranking}</div>
                                        <div>6. <span>{u[5]?.username}</span> - {ranking}</div>
                                        <div>7. <span>{u[6]?.username}</span> - {ranking}</div>
                                        <div>8. <span>{u[7]?.username}</span> - {ranking}</div>
                                        <div>9. <span>{u[8]?.username}</span> - {ranking}</div>
                                        <div>10. <span>{u[9]?.username}</span> - {ranking}</div>

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

export default Game;

