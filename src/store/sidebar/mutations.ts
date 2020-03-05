import * as State from './state'

export function target(state: State.HandlerState, target: string) {
  console.log('Sidebar: target=' + target);
  state.handler.handle(target);
}

export function install(state: State.HandlerState, target: State.Handler) {
  console.log('Sidebar: install=' + target);
  state.handler = target
}
