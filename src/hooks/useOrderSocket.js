import { useEffect, useRef } from 'react'

const WS_BASE_URL =
  import.meta.env.VITE_WS_BASE_URL || 'ws://127.0.0.1:8000/ws'

const ENCRYPTED_PHONE_KEY = 'encryptedPhone'

/**
 * Customer private order-status WebSocket.
 *
 * The encryptedPhone is stored in localStorage after checkout.
 * The backend should use this encryptedPhone to put the socket
 * connection into the customer's private group.
 *
 * Usage:
 *
 * useOrderSocket((data) => {
 *   console.log('Order update:', data)
 * })
 */
export function useOrderSocket(onMessage) {
  const onMessageRef = useRef(onMessage)

  // Always keep the latest callback
  useEffect(() => {
    onMessageRef.current = onMessage
  }, [onMessage])

  useEffect(() => {
    // Get encrypted phone from localStorage
    const encryptedPhone = localStorage.getItem(ENCRYPTED_PHONE_KEY)

    // No order/customer information yet
    if (!encryptedPhone) {
      console.log(
        '[useOrderSocket] No encryptedPhone found. Socket not started.'
      )
      return undefined
    }

    let socket = null
    let cancelled = false
    let retry = 0
    let reconnectTimer = null

    const connect = () => {
      if (cancelled) return

      const encodedPhone = encodeURIComponent(encryptedPhone)

      const socketUrl =
        `${WS_BASE_URL}/orders/?encryptedPhone=${encodedPhone}`

      console.log('[useOrderSocket] Connecting:', socketUrl)

      socket = new WebSocket(socketUrl)

      socket.onopen = () => {
        console.log('[useOrderSocket] Connected')
        retry = 0
      }

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)

          console.log(
            '[useOrderSocket] Order update received:',
            data
          )

          onMessageRef.current?.(data)
        } catch (error) {
          console.warn(
            '[useOrderSocket] Invalid WebSocket message:',
            error
          )
        }
      }

      socket.onerror = (error) => {
        console.warn('[useOrderSocket] WebSocket error:', error)
      }

      socket.onclose = (event) => {
        console.log(
          '[useOrderSocket] Socket closed:',
          event.code,
          event.reason
        )

        if (cancelled) return

        // Authentication / invalid encrypted phone
        // Do not endlessly reconnect.
        if (event.code === 4401 || event.code === 4403) {
          console.warn(
            '[useOrderSocket] Authentication failed. Socket stopped.'
          )
          return
        }

        // Exponential reconnect
        const delay = Math.min(
          1000 * 2 ** retry,
          15000
        )

        retry += 1

        console.log(
          `[useOrderSocket] Reconnecting in ${delay}ms...`
        )

        reconnectTimer = setTimeout(connect, delay)
      }
    }

    connect()

    return () => {
      cancelled = true

      if (reconnectTimer) {
        clearTimeout(reconnectTimer)
      }

      socket?.close()
    }
  }, [])
}
