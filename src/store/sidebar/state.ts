export interface Handler {
  handle: (target: string) => void
}

export interface HandlerState {
  handler: Handler
}

export default function (): HandlerState {
  return {
    handler: {
      handle: function(target: string) {
        // prevent unused-vars warning
        target
      }
    }
  }
}