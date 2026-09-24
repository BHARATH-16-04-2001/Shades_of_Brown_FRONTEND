import React, {
  useCallback,
  useEffect,
  useState,
} from "react";

import { motion } from "framer-motion";

import { getOrders } from "../services/orderService";

import {
  formatDate,
  formatPrice,
} from "../utils/format";

import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

import { useOrderSocket } from "../hooks/useOrderSocket";

/*
|--------------------------------------------------------------------------
| Status Styles
|--------------------------------------------------------------------------
*/

const statusStyles = {
  PENDING:
    "bg-line text-coffee",

  CONFIRMED:
    "bg-gold/25 text-clayDark",

  PREPARING:
    "bg-clay/20 text-clayDark",

  READY:
    "bg-sage/20 text-sage",

  COMPLETED:
    "bg-coffee/10 text-coffee",

  CANCELLED:
    "bg-red-100 text-red-600",
};

/*
|--------------------------------------------------------------------------
| Order Card
|--------------------------------------------------------------------------
*/

function OrderCard({
  order,
  index,
  justUpdated,
}) {
  /*
   * Normalize status
   */
  const status =
    order.status?.toUpperCase();

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 16,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
        delay: Math.min(
          index * 0.05,
          0.3
        ),
      }}
      className={`
        rounded-2xl
        bg-offwhite
        border
        shadow-card
        p-5
        sm:p-6
        transition-all
        duration-300
        ${
          justUpdated
            ? "border-sage ring-2 ring-sage/20"
            : "border-line"
        }
      `}
    >
      <div className="flex items-start justify-between gap-4 mb-3">

        <div>
          <p className="font-display text-lg text-espresso">
            Order #
            {order.order_number ||
              order.orderId}
          </p>

          {order.created_at && (
            <p className="text-xs text-coffee/50 mt-0.5">
              {formatDate(
                order.created_at
              )}
            </p>
          )}
        </div>

        <span
          className={`
            shrink-0
            px-3
            py-1
            rounded-full
            text-xs
            font-medium
            ${
              statusStyles[
                status
              ] ||
              "bg-line text-coffee"
            }
          `}
        >
          {status}
        </span>
      </div>

      {Array.isArray(
        order.items
      ) &&
        order.items.length > 0 && (
          <ul className="text-sm text-coffee/70 space-y-1 mb-4">

            {order.items.map(
              (item, itemIndex) => (
                <li
                  key={
                    item.id ||
                    itemIndex
                  }
                >
                  {item.quantity} ×{" "}
                  {item.food_name}

                  <span className="float-right">
                    {formatPrice(
                      item.total_price
                    )}
                  </span>
                </li>
              )
            )}

          </ul>
        )}

      <div className="flex items-center justify-between pt-3 border-t border-line">

        <span className="font-semibold text-espresso">
          {formatPrice(
            order.total
          )}
        </span>

        <button className="text-sm font-medium text-coffee hover:text-clayDark transition-colors">
          View details
        </button>

      </div>

      {justUpdated && (
        <motion.p
          initial={{
            opacity: 0,
            y: 5,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mt-3 text-xs font-medium text-sage"
        >
          Order status updated
        </motion.p>
      )}
    </motion.article>
  );
}

/*
|--------------------------------------------------------------------------
| Orders Page
|--------------------------------------------------------------------------
*/

export default function Orders() {
  const [orders, setOrders] =
    useState([]);

  const [status, setStatus] =
    useState("loading");

  /*
   * Order that was just updated
   */
  const [
    justUpdatedId,
    setJustUpdatedId,
  ] = useState(null);

  /*
   * ------------------------------------------
   * Load customer orders
   * ------------------------------------------
   */

  useEffect(() => {
    let cancelled = false;

    getOrders()
      .then((data) => {
        if (cancelled) {
          return;
        }

        console.log(
          "[Orders] API response:",
          data
        );

        setOrders(
          Array.isArray(
            data.orders
          )
            ? data.orders
            : []
        );

        setStatus("ready");
      })
      .catch((error) => {
        console.error(
          "[Orders] Failed to load orders:",
          error
        );

        if (cancelled) {
          return;
        }

        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  /*
   * ------------------------------------------
   * WebSocket message
   * ------------------------------------------
   */

  const handleSocketMessage =
    useCallback(
      (message) => {
        console.log(
          "[Orders] WebSocket message:",
          message
        );

        /*
         * We only care about
         * order status updates
         */
        if (
          message.type !==
          "order_status_update"
        ) {
          return;
        }

        /*
         * Backend sends:
         *
         * {
         *   type:
         *     "order_status_update",
         *   order_id: 15,
         *   status: "READY"
         * }
         */

        const orderId =
          message.order_id;

        const newStatus =
          message.status;

        if (!orderId) {
          console.warn(
            "[Orders] WebSocket update has no order_id"
          );

          return;
        }

        /*
         * --------------------------------------
         * UPDATE REACT STATE
         * --------------------------------------
         */

        setOrders(
          (currentOrders) => {
            let found = false;

            const updated =
              currentOrders.map(
                (order) => {

                  /*
                   * IMPORTANT:
                   *
                   * Use orderId,
                   * NOT id.
                   */
                  const currentOrderId =
                    order.orderId ??
                    order.id;

                  if (
                    String(
                      currentOrderId
                    ) ===
                    String(
                      orderId
                    )
                  ) {
                    found = true;

                    return {
                      ...order,
                      status:
                        newStatus,
                    };
                  }

                  return order;
                }
              );

            console.log(
              "[Orders] Status update applied:",
              {
                orderId,
                newStatus,
                found,
              }
            );

            return updated;
          }
        );

        /*
         * Show visual update
         */
        setJustUpdatedId(
          orderId
        );

        /*
         * Remove highlight
         */
        window.setTimeout(
          () => {
            setJustUpdatedId(
              (current) =>
                String(
                  current
                ) ===
                String(
                  orderId
                )
                  ? null
                  : current
            );
          },
          2000
        );
      },
      []
    );

  /*
   * ------------------------------------------
   * CUSTOMER WEBSOCKET
   * ------------------------------------------
   *
   * The hook itself reads:
   *
   * localStorage.orderToken
   *
   */

  useOrderSocket(
    handleSocketMessage
  );

  /*
   * ------------------------------------------
   * UI
   * ------------------------------------------
   */

  return (
    <section className="max-w-4xl mx-auto px-5 sm:px-8 py-12 sm:py-16">

      <h1 className="font-display text-3xl text-espresso mb-8">
        Your orders
      </h1>

      {status ===
        "loading" && (
        <LoadingSpinner
          label="Fetching your orders…"
          count={3}
        />
      )}

      {status ===
        "error" && (
        <EmptyState
          title="Couldn't load orders"
          message="Please refresh and try again."
        />
      )}

      {status ===
        "ready" &&
        (orders.length ===
        0 ? (
          <EmptyState
            title="No orders yet"
            message="Once you place an order, you'll be able to track it here."
          />
        ) : (
          <div className="grid sm:grid-cols-2 gap-5">

            {orders.map(
              (
                order,
                index
              ) => (
                <OrderCard
                  key={
                    order.orderId ??
                    order.id
                  }
                  order={
                    order
                  }
                  index={
                    index
                  }
                  justUpdated={
                    String(
                      justUpdatedId
                    ) ===
                    String(
                      order.orderId ??
                        order.id
                    )
                  }
                />
              )
            )}

          </div>
        ))}

    </section>
  );
}