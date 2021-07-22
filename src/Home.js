import React from 'react';
import Head from "next/head";
import Link from "next/link";

function validateFields() {
  removeInvalidNameChars();
}

function removeInvalidNameChars() {
  // Prevents users from typing numbers or special characers into the Name field
  document.getElementById('name').value =
    document.getElementById('name').value.replace(/[^a-zA-Z ]/g, '');
}

function index() {
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
                                                    <h1>
                                                        <img src="images/products/beyond.png" width="64" height="64" className="mb-4"/> Beyonder
                                                    </h1>
                                                </div>
                                                <div className="w-75 ml-5">
                                                    <div className="form-group mb-3">
                                                        <input type="text" onChange={validateFields} className="form-control" id="name" aria-describedby="nameHelp"
                                                               placeholder="Your Name"/>
                                                    </div>
                                                    <div className="form-group mb-3">
                                                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp"
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
                                                <button type="submit" className="btn btn-primary m-2">&#5130;</button>
                                                <button type="submit" className="btn btn-primary m-2">&#5123;</button>
                                                <button type="submit" className="btn btn-primary m-2">&#5125;</button>
                                                <button type="submit" className="btn btn-primary m-2">&#5121;</button>
                                                keyboard keys to navigate
                                            </span>
                                        </span>
                                    </span>

                                </div>
                                <div className="card-header border-bottom text-center">
                                    <span className="d-block">
                                        <span className="font-weight-bold">
                                            <span className="align-top font-medium">Collect Beyond Items and get 50 bonus points</span>
                                        </span>
                                    </span>
                                    <div className="row">
                                        <button type="submit" className="btn btn-primary m-2">
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
                                        <button type="submit" className="btn btn-primary m-2">
                                            <img src="images/cat.png" width="64" height="64"/>
                                        </button>
                                        <button type="submit" className="btn btn-primary m-2">
                                            <img src="images/blob.png" width="64" height="64"/>
                                        </button>
                                        <button type="submit" className="btn btn-primary m-2">
                                            <img src="images/animals.png" width="150" height="64"/>
                                        </button>
                                        <button type="submit" className="btn btn-primary m-2">
                                            <img src="images/door.png" width="64" height="64"/>
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
                                    <button type="button" className="btn btn-primary btn-block">
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

export default index;
