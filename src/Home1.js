import React, { useState, useEffect, useRef } from 'react';
import Head from "next/head";
import Link from "next/link";
import io from "socket.io-client";

function validateFields() {
  removeInvalidNameChars();
}

function removeInvalidNameChars() {
  // Prevents users from typing numbers or special characers into the Name field
  document.getElementById('name').value =
    document.getElementById('name').value.replace(/[^a-zA-Z ]/g, '');
}

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


function Home1() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const socket = useSocket('http://localhost:4998')
    // const socket = useSocket('http://10.128.0.17:4998')
      useEffect(() => {
        validateFields()
        setName(name)
      }, [name])

      useEffect(() => {
        setEmail(email);
      }, [email])


    // const sendUserLogin = useEffect(() => {
    //     const userLogin = {"name": name, "email":email};
    //     if (socket) {
    //         console.log('client -> server', userLogin )
    //         socket.emit('login', userLogin)
    //     }
    // }, [socket, name, email])

    // sendUserLogin();

    function sendUserLogin() {
        const userLogin = {"name": name, "email":email};
        if (socket) {
            console.log('client -> server', userLogin )
            socket.emit('login', userLogin)
        }
    }

    return (
        <div>
            <Head>
                <script type="module" src="/scripts/home/script.js"></script>
            </Head>

            <div className="container container-table">
                <div className="col vertical-center-row mt-4">
                    <div className="row">
                        <div className="col-12 col-md-8">
                            <div className="card bg-primary shadow-soft border-light p-4">
                                <div className="card-header border-bottom text-center">
                                    <span className="d-block">
                                        <span className="font-weight-bold">
                                            <span className="align-top font-medium">
                                                <div className="text-center">
                                                        <img src="images/title_front.png" className="mb-4"/>
                                                </div>
                                                <div className="w-75 ml-5">
                                                    <div className="form-group mb-3">
                                                        <input type="text" onChange={(e) => {setName(e.target.value)}} className="form-control" id="name" aria-describedby="nameHelp" value={name}
                                                               placeholder="Your Name"/>
                                                    </div>
                                                    <div className="form-group mb-3">
                                                        <input type="email" onChange={(e) => {setEmail(e.target.value)}} className="form-control" id="email" aria-describedby="emailHelp" value={email}
                                                               placeholder="Your email"/>
                                                    </div>
                                                </div>
                                            </span>
                                        </span>
                                    </span>
                                </div>
                                <div className="card-header border-bottom text-center">
                                    <span className="d-block">
                                        <span className="font-weight-bold">
                                            <span className="align-top font-medium">
                                                Use
                                                <span className="m-2">&#5130;</span>
                                                <span className="m-2">&#5123;</span>
                                                <span className="m-2">&#5125;</span>
                                                <span className="m-2">&#5121;</span>
                                                keyboard keys to navigate
                                            </span>
                                        </span>
                                    </span>

                                </div>
                                <div className="card-header border-bottom text-center">
                                    <span className="d-block">
                                        <span className="font-weight-bold">
                                            <span className="align-top font-medium">Collect Beyond Items and get $25 Beyond Credits</span>
                                        </span>
                                    </span>
                                    <div className="row">
                                        <button type="submit" className="btn btn-primary m-2 ml-5">
                                            <a href="https://www.beyondpricing.com/products/insights">
                                                <img src="images/products/insights.png" width="64" height="64"/>
                                            </a>
                                        </button>
                                        <button type="submit" className="btn btn-primary m-2">
                                            <a href="https://www.beyondpricing.com/products/signal">
                                                <img src="images/products/signal.png" width="64" height="64"/>
                                            </a>
                                        </button>
                                        <button type="submit" className="btn btn-primary m-2">
                                            <a href="https://www.beyondpricing.com/products/pricing">
                                                <img src="images/products/pricing.png" width="64" height="64"/>
                                            </a>
                                        </button>
                                        <button type="submit" className="btn btn-primary m-2">
                                            <a href="https://www.beyondpricing.com/products/auidance">
                                                <img src="images/products/guidance.png" width="64" height="64"/>
                                            </a>
                                        </button>
                                        <button type="submit" className="btn btn-primary m-2">
                                            <a href="https://www.beyondpricing.com/products/relay">
                                                <img src="images/products/relay.png" width="64" height="64"/>
                                            </a>
                                        </button>
                                    </div>
                                </div>
                                <div className="card-header border-bottom text-center">
                                    <span className="d-block">
                                        <span className="font-weight-bold">
                                            <span className="align-top font-medium">Avoid this</span>
                                        </span>
                                    </span>
                                    <div className="row">
                                        <button type="submit" className="btn btn-primary m-2 ml-6" data-toggle="tooltip" data-placement="bottom">
                                            <img src="images/blobs/low_occupancy.svg" width="64" height="64" className="mr-1"/>
                                            Low occupancy
                                        </button>
                                        <button type="submit" className="btn btn-primary m-2" data-toggle="tooltip" data-placement="bottom">
                                            <img src="images/blobs/double_bookings.svg" width="64" height="64" className="mr-1"/>
                                            Double bookings
                                        </button>
                                        <button type="submit" className="btn btn-primary m-2" data-toggle="tooltip" data-placement="bottom">
                                            <img src="images/blobs/bad_guests.svg" width="64" height="64" className="mr-1"/>
                                            Bad guests
                                        </button>
                                        <button type="submit" className="btn btn-primary m-2" data-toggle="tooltip" data-placement="bottom">
                                            <img src="images/blobs/low_bookings.svg" width="64" height="64" className="mr-1"/>
                                            Low bookings
                                        </button>
                                        <button type="submit" className="btn btn-primary m-2" data-toggle="tooltip" data-placement="bottom">
                                            <img src="images/blobs/guidance_64.png" width="64" height="64" className="mr-1"/>
                                            Low revenue
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                <div className="form-check square-check mb-3">
                                    <input className="form-check-input" type="checkbox" value="" id="remember"/>
                                    <label className="form-check-label" htmlFor="remember">
                                        Would like to receive marketing staff
                                    </label>
                                </div>
                                <Link href="/game">
                                    <button id="lets-play" onClick={() => sendUserLogin} type="button" className="btn btn-primary btn-block">
                                        <span className="fas fa-cart-plus mr-3">
                                            Let's Play
                                        </span>
                                    </button>
                                </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home1;
