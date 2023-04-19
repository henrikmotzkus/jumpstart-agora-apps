import React from "react";
import { CheckoutHistory, CheckoutType } from "../../providers/GlobalContext";
import { ExpressCheckout, HeatMap, SelfCheckout, StandardCheckout } from "../../images";

interface HeatMapCardProps {
    className?: string;
    checkoutHistory: CheckoutHistory[];
}

const getCheckoutImage = (checkoutType: CheckoutType) => {
    switch (checkoutType) {
        case CheckoutType.Standard:
            return <img src={StandardCheckout} className="mw-100" style={{ width: "60%" }} />;
        case CheckoutType.Express:
            return <img src={ExpressCheckout} className="mw-100" style={{ width: "80%" }} />;
        case CheckoutType.SelfService:
            return <img src={SelfCheckout} className="mw-100" style={{ width: "50%" }} />;
    }
};

const getCheckoutColorClass = (checkoutType: CheckoutType) => {
    switch (checkoutType) {
        case CheckoutType.Standard:
            return " border-purple";
        case CheckoutType.Express:
            return " border-yellow";
        case CheckoutType.SelfService:
            return " border-cyan";
    }
};

function HeatMapCard(props: HeatMapCardProps) {
    return (
        <div className={"bg-secondary rounded p-3 " + props.className}>
            <div className="row">
                {props.checkoutHistory.map((item) => {
                    return (
                        <div key={item.checkoutId} className="col d-flex flex-column">
                            <div className="flex-grow-1 d-flex align-items-center row">
                                <div className="col-3 d-flex flex-column justify-content-between h-100">
                                    {Array(item.queueLength)
                                        .fill(0)
                                        .map((x, i) => {
                                            return <img key={i} src={HeatMap} />;
                                        })}
                                </div>
                                <div className="col-9">{getCheckoutImage(item.checkoutType)}</div>
                            </div>
                            <div
                                className={
                                    "d-flex text-white justify-content-between align-items-center border rounded-1 position-relative mt-4" +
                                    getCheckoutColorClass(item.checkoutType)
                                }
                            >
                                <div
                                    className="position-absolute bg-primary"
                                    style={{ left: "2px", width: "0.6rem", height: "95%", borderRadius: "0.1rem" }}
                                ></div>
                                <div className="fs-6 ms-4">Checkout {item.checkoutId}</div>
                                <div className="fs-3 me-4">{item.queueLength}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default HeatMapCard;
