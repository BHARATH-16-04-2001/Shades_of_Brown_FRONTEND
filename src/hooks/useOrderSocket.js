import { useEffect, useRef } from "react";

const WS_BASE_URL =
  import.meta.env.VITE_WS_BASE_URL ||
  "ws://127.0.0.1:8000/ws";

const ORDER_TOKEN_KEY = "orderToken";

/**
 * Customer private order-status WebSocket.
 *
 * The token is stored in localStorage after checkout.
 *
 * Backend:
 *
 * ws://127.0.0.1:8000/ws/orders/?token=JWT
 */
export function useOrderSocket(
  onMessage
) {
  const onMessageRef =
    useRef(onMessage);

  /*
   * Always keep latest callback
   */
  useEffect(() => {
    onMessageRef.current =
      onMessage;
  }, [onMessage]);

  useEffect(() => {
    /*
     * Get customer order token
     */
    const orderToken =
      localStorage.getItem(
        ORDER_TOKEN_KEY
      );

    if (!orderToken) {
      console.log(
        "[useOrderSocket] No orderToken found. Socket not started."
      );

      return undefined;
    }

    let socket = null;
    let cancelled = false;
    let retry = 0;
    let reconnectTimer = null;

    const connect = () => {
      if (cancelled) {
        return;
      }

      const encodedToken =
        encodeURIComponent(
          orderToken
        );

      /*
       * IMPORTANT
       *
       * Backend routing:
       *
       * ws/orders/
       *
       * Therefore:
       *
       * ws://127.0.0.1:8000/ws/orders/?token=...
       */
      const socketUrl =
        `${WS_BASE_URL}/orders/?token=${encodedToken}`;

      console.log(
        "[useOrderSocket] Connecting:",
        socketUrl
      );

      socket =
        new WebSocket(socketUrl);

      /*
       * ----------------------------------------
       * CONNECTED
       * ----------------------------------------
       */

      socket.onopen = () => {
        console.log(
          "[useOrderSocket] Connected"
        );

        retry = 0;
      };

      /*
       * ----------------------------------------
       * MESSAGE
       * ----------------------------------------
       */

      socket.onmessage = (
        event
      ) => {
        try {
          const data =
            JSON.parse(
              event.data
            );

          console.log(
            "[useOrderSocket] Message received:",
            data
          );

          /*
           * Pass message to Orders.jsx
           */
          onMessageRef.current?.(
            data
          );
        } catch (error) {
          console.warn(
            "[useOrderSocket] Invalid WebSocket message:",
            error
          );
        }
      };

      /*
       * ----------------------------------------
       * ERROR
       * ----------------------------------------
       */

      socket.onerror = (
        error
      ) => {
        console.warn(
          "[useOrderSocket] WebSocket error:",
          error
        );
      };

      /*
       * ----------------------------------------
       * CLOSED
       * ----------------------------------------
       */

      socket.onclose = (
        event
      ) => {
        console.log(
          "[useOrderSocket] Socket closed:",
          event.code,
          event.reason
        );

        if (cancelled) {
          return;
        }

        /*
         * Invalid / expired token
         */
        if (
          event.code === 4401 ||
          event.code === 4403
        ) {
          console.warn(
            "[useOrderSocket] Authentication failed. Socket stopped."
          );

          return;
        }

        /*
         * Reconnect
         */
        const delay =
          Math.min(
            1000 *
              2 ** retry,
            15000
          );

        retry += 1;

        console.log(
          `[useOrderSocket] Reconnecting in ${delay}ms...`
        );

        reconnectTimer =
          setTimeout(
            connect,
            delay
          );
      };
    };

    connect();

    /*
     * Cleanup
     */
    return () => {
      cancelled = true;

      if (
        reconnectTimer
      ) {
        clearTimeout(
          reconnectTimer
        );
      }

      if (socket) {
        socket.close();
      }
    };
  }, []);
}